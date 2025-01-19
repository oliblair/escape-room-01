'use client';
import { useState, useEffect } from 'react';
import { useGameState } from '@/app/context/GameContext';

export function TipRequestButton() {
  const { state, dispatch } = useGameState();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [attempts, setAttempts] = useState(0);
  const [canClick, setCanClick] = useState(false);
  const [isHidden, setIsHidden] = useState(true);

  // Reset button state when stage changes
  useEffect(() => {
    setAttempts(0);
    setCanClick(false);
    setIsHidden(true);
    
    // Reset position to bottom center
    const x = (window.innerWidth - 200) / 2;
    const y = window.innerHeight - 100;
    setPosition({ x, y });

    // Show button after 30 seconds
    const timer = setTimeout(() => {
      setIsHidden(false);
    }, 30000);

    return () => clearTimeout(timer); // Cleanup timer
  }, [state.currentStage]);

  // Set initial position at bottom center
  useEffect(() => {
    const x = (window.innerWidth - 200) / 2; // 200 is approximate button width
    const y = window.innerHeight - 100; // 100 pixels from bottom
    setPosition({ x, y });
  }, []);

  const moveButton = () => {
    if (attempts >= 10) return;
    
    const x = Math.random() * (window.innerWidth - 200);
    const y = Math.random() * (window.innerHeight - 100);
    setPosition({ x, y });
    setAttempts(prev => {
      const newAttempts = prev + 1;
      if (newAttempts >= 10) setCanClick(true);
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
    
    // Set message through game state
    await fetch('/api/game', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        action: 'SET_MESSAGE',
        message: "Answer this riddle and you will get the tip in a seperate message. I'm something you can hold, Yet never fully grasp. I'm often shared in whispers, Or left on display to bask. I can make you sweat, Though I'm cool to the touch. I'm best when I'm slow. But can leave you in a rush. What am I?"
      })
    });
    dispatch({ 
      type: 'SET_MESSAGE', 
      payload: "Answer this riddle and you will get the tip in a seperate message. I'm something you can hold, Yet never fully grasp. I'm often shared in whispers, Or left on display to bask. I can make you sweat, Though I'm cool to the touch. I'm best when I'm slow. But can leave you in a rush. What am I?"
    });
    
    setIsHidden(true);
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
        return 'Slowly';
      case 4:
        return 'Bit quicker...';
      case 5:
        return 'Struggling to hit the right button?';
      case 6:
        return 'Nearly there...';
      case 7:
        return 'Harder...';
      case 8:
        return 'Almost...';
      case 9:
        return 'One more time!';
      case 10:
        return 'Phew, I\'m glad that\'s over!';
      default:
        return 'Request Extra Tip';
    }
  };

  if (state.currentStage >= 8 || isHidden) return null;

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
      className="bg-black text-green-500 border border-green-500 px-4 py-2 rounded hover:bg-green-500 hover:text-black"
    >
      {getButtonText()}
    </button>
  );
} 