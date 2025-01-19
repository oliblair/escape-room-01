'use client';
import { useState, useEffect } from 'react';
import { useGameState } from '@/app/context/GameContext';

export function TipRequestButton() {
  const { state } = useGameState();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [attempts, setAttempts] = useState(0);
  const [canClick, setCanClick] = useState(false);

  // Set initial position at bottom center
  useEffect(() => {
    const x = (window.innerWidth - 200) / 2; // 200 is approximate button width
    const y = window.innerHeight - 100; // 100 pixels from bottom
    setPosition({ x, y });
  }, []);

  const moveButton = () => {
    if (attempts >= 8) return;
    
    const x = Math.random() * (window.innerWidth - 200);
    const y = Math.random() * (window.innerHeight - 100);
    setPosition({ x, y });
    setAttempts(prev => {
      const newAttempts = prev + 1;
      if (newAttempts >= 8) setCanClick(true);
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

  const getButtonText = () => {
    switch (attempts) {
      case 0:
        return 'Request Extra Tip';
      case 1:
        return 'Just the Tip';
      case 2:
        return 'Keep it going';
      case 3:
        return 'Faster';
      case 4:
        return 'Slower';
      case 5:
        return 'Struggling to hit the right button?';
      case 6:
        return 'Nearly there...';
      case 7:
        return 'Closer...';
      case 8:
        return 'Just give me the tip';
      default:
        return 'Request Extra Tip';
    }
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
      {getButtonText()}
    </button>
  );
} 