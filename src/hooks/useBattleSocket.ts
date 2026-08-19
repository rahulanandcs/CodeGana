import { useState, useEffect, useRef, useCallback } from 'react';

export type BattleState = 'idle' | 'searching' | 'battling' | 'won' | 'lost';

export function useBattleSocket() {
  const [battleState, setBattleState] = useState<BattleState>('idle');
  const [myHealth, setMyHealth] = useState(100);
  const [opponentHealth, setOpponentHealth] = useState(100);
  
  const [myId, setMyId] = useState<string | null>(null);
  const myIdRef = useRef<string | null>(null); 
  
  // NEW: Store the synced sequence of questions
  const [sequence, setSequence] = useState<number[]>([]);
  
  const socketRef = useRef<WebSocket | null>(null);

  // Accept difficulty as an argument
  const connectToBattle = useCallback((difficulty: 'basic' | 'intermediate') => {
    setBattleState('searching');
    setMyHealth(100);
    setOpponentHealth(100);

    // Append difficulty to the path
    const ws = new WebSocket(`ws://127.0.0.1:8000/ws/battle/${difficulty}`);
    socketRef.current = ws;

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      switch (data.type) {
        case 'CONNECTED':
          myIdRef.current = data.my_id;
          setMyId(data.my_id);
          break;

        case 'WAITING_FOR_OPPONENT':
          setBattleState('searching');
          break;

        case 'MATCH_FOUND':
          setSequence(data.sequence); // Save the synchronized problem sequence!
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
    };

    ws.onclose = () => setBattleState('idle');
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