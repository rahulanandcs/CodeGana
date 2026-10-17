import { useState, useEffect, useRef, useCallback } from 'react';

export type BattleState = 'idle' | 'searching' | 'battling' | 'won' | 'lost';

export function useBattleSocket() {
  const [battleState, setBattleState] = useState<BattleState>('idle');
  const [myHealth, setMyHealth] = useState(100);
  const [opponentHealth, setOpponentHealth] = useState(100);
  const [sequence, setSequence] = useState<number[]>([]);
  
  const myIdRef = useRef<string | null>(null);
  const socketRef = useRef<WebSocket | null>(null);

  const connectToBattle = useCallback((difficulty: 'basic' | 'intermediate') => {
    setBattleState('searching');
    setMyHealth(100);
    setOpponentHealth(100);

    // Dynamic Host and Secure Protocol Resolution
    const rawHost = import.meta.env.VITE_SERVER_URL || "localhost:8080";
    const cleanHost = rawHost.replace(/^(wss?:\/\/|https?:\/\/)/, '');
    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    
    // Connect to FastAPI endpoint
    const socketUrl = `${protocol}//${cleanHost}/ws/battle/${difficulty}?pool_size=10`;
    const ws = new WebSocket(socketUrl);
    
    socketRef.current = ws;

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        switch (data.type) {
          case 'CONNECTED':
            myIdRef.current = data.my_id; // Stored safely in ref without throwing error
            break;

          case 'WAITING_FOR_OPPONENT':
            setBattleState('searching');
            break;

          case 'MATCH_FOUND':
            setSequence(data.sequence);
            setBattleState('battling');
            break;

          case 'HEALTH_UPDATE':
            if (data.target === myIdRef.current) {
              setMyHealth(data.new_health);
            } else {
              setOpponentHealth(data.new_health);
            }
            break;

          case 'GAME_OVER':
            if (data.winner === myIdRef.current) {
              setBattleState('won');
            } else {
              setBattleState('lost');
            }
            break;
        }
      } catch (err) {
        console.error("Failed to parse WebSocket message:", err);
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket Error:", error);
    };

    ws.onclose = () => {
      setBattleState('idle');
    };
  }, []);

  const sendAttack = useCallback(() => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify({ type: 'TEST_PASSED' }));
    }
  }, []);

  const disconnectFromBattle = useCallback(() => {
    if (socketRef.current) {
      socketRef.current.close();
      socketRef.current = null;
    }
    setBattleState('idle');
    setMyHealth(100);
    setOpponentHealth(100);
    setSequence([]);
  }, []);

  useEffect(() => {
    return () => {
      if (socketRef.current) socketRef.current.close();
    };
  }, []);

  return {
    battleState,
    myHealth,
    opponentHealth,
    sequence,
    connectToBattle,
    sendAttack,
    disconnectFromBattle
  };
}