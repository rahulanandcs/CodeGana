from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from typing import Dict, List
import uuid
import json
import random

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Allows connection from any origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class BattleManager:
    def __init__(self):
        # Store dictionary mapping WebSocket to a dictionary containing player info and pool_size
        self.active_connections: Dict[WebSocket, dict] = {}
        self.waiting_lounge_basic: List[WebSocket] = []
        self.waiting_lounge_inter: List[WebSocket] = []
        self.active_rooms: Dict[str, dict] = {}
        self.player_rooms: Dict[WebSocket, str] = {}

    async def connect(self, websocket: WebSocket, difficulty: str, pool_size: int):
        await websocket.accept()
        player_id = str(uuid.uuid4())[:8]
        
        # Save player info including pool_size
        self.active_connections[websocket] = {"id": player_id, "pool_size": pool_size}
        
        await websocket.send_json({"type": "CONNECTED", "my_id": player_id})
        await self.matchmake(websocket, difficulty)

    def disconnect(self, websocket: WebSocket):
        if websocket in self.waiting_lounge_basic:
            self.waiting_lounge_basic.remove(websocket)
        if websocket in self.waiting_lounge_inter:
            self.waiting_lounge_inter.remove(websocket)
        
        room_id = self.player_rooms.get(websocket)
        if room_id:
            del self.active_rooms[room_id]
            del self.player_rooms[websocket]
            
        self.active_connections.pop(websocket, None)

    async def matchmake(self, websocket: WebSocket, difficulty: str):
        queue = self.waiting_lounge_basic if difficulty == 'basic' else self.waiting_lounge_inter
        
        if len(queue) > 0:
            opponent_ws = queue.pop(0)
            room_id = f"room_{uuid.uuid4().hex[:6]}"
            
            p1_data = self.active_connections[websocket]
            p2_data = self.active_connections[opponent_ws]

            actual_pool_size = min(p1_data["pool_size"], p2_data["pool_size"])
            target_questions = 8 if difficulty == 'basic' else 4
            
            safe_num_questions = min(target_questions, actual_pool_size)

            # GENERATED ONCE FOR THE ROOM (Ensures identical order for both players)
            sequence = random.sample(range(actual_pool_size), safe_num_questions)

            self.active_rooms[room_id] = {
                "difficulty": difficulty,
                "sequence": sequence,
                "damage_per_win": 100 / safe_num_questions, 
                "players": {
                    websocket: {"id": p1_data["id"], "health": 100},
                    opponent_ws: {"id": p2_data["id"], "health": 100}
                }
            }
            
            self.player_rooms[websocket] = room_id
            self.player_rooms[opponent_ws] = room_id

            match_payload = {
                "type": "MATCH_FOUND",
                "room_id": room_id,
                "difficulty": difficulty,
                "sequence": sequence,
                "p1_id": p1_data["id"],
                "p2_id": p2_data["id"]
            }
            
            await websocket.send_json(match_payload)
            await opponent_ws.send_json(match_payload)
        else:
            queue.append(websocket)
            await websocket.send_json({"type": "WAITING_FOR_OPPONENT"})

    async def process_attack(self, websocket: WebSocket):
        room_id = self.player_rooms.get(websocket)
        if not room_id:
            return

        room = self.active_rooms[room_id]
        attacker_id = self.active_connections[websocket]["id"]
        damage = room["damage_per_win"]
        
        for ws, state in room["players"].items():
            if ws != websocket:
                state["health"] = max(0, state["health"] - damage)
                
                health_payload = {
                    "type": "HEALTH_UPDATE",
                    "attacker": attacker_id,
                    "target": state["id"],
                    "new_health": state["health"]
                }
                await ws.send_json(health_payload)
                await websocket.send_json(health_payload)

                if state["health"] <= 0:
                    win_payload = {"type": "GAME_OVER", "winner": attacker_id}
                    await ws.send_json(win_payload)
                    await websocket.send_json(win_payload)

manager = BattleManager()

# Accepts pool_size query parameter matching the frontend URL request
@app.websocket("/ws/battle/{difficulty}")
async def battle_endpoint(websocket: WebSocket, difficulty: str, pool_size: int = 10):
    await manager.connect(websocket, difficulty, pool_size)
    try:
        while True:
            data = await websocket.receive_text()
            payload = json.loads(data)
            if payload.get("type") == "TEST_PASSED":
                await manager.process_attack(websocket)
    except WebSocketDisconnect:
        manager.disconnect(websocket)