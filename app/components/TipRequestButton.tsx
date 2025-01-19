'use client';
import { useState } from 'react';
import { useGameState } from '@/app/context/GameContext';

export function TipRequestButton() {
  const { state } = useGameState();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [attempts, setAttempts] = useState(0);
  const [canClick, setCanClick] = useState(false);

  const moveButton = () => {
    if (attempts >= 3) return;
    
    const x = Math.random() * (window.innerWidth - 200);
    const y = Math.random() * (window.innerHeight - 100);
    setPosition({ x, y });
    setAttempts(prev => {
      const newAttempts = prev + 1;
      if (newAttempts >= 3) setCanClick(true);
      return newAttempts;
    });
  };

  const requestTip = async () => {
    await fetch('/api/game/log', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        attempt: 'TIP_REQUEST',
        success: false,
        stage: state.currentStage + 1,
        expectedCode: 'N/A'
      })
    });
  };

  if (state.currentStage >= 8) return null;

  return (
    <button
      onClick={canClick ? requestTip : undefined}
      onMouseEnter={canClick ? undefined : moveButton}
      style={{
        position: 'fixed',
        left: `${position.x}px`,
        top: `${position.y}px`,
        transition: 'all 0.3s ease'
      }}
      className="bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-400"
    >
      Request Extra Tip {attempts >= 3 ? '(Nice try!)' : ''}
    </button>
  );
} 