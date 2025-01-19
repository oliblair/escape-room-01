'use client';
import { useGameState } from '@/app/context/GameContext';
import { useEffect } from 'react';

export function CountdownTimer() {
  const { state, dispatch } = useGameState();

  useEffect(() => {
    if (!state.isStarted) return;

    const updateServerTime = async (newTime: number) => {
      await fetch('/api/game', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          action: 'UPDATE_TIME',
          timeRemaining: newTime
        })
      });
    };

    const syncTimer = async () => {
      const response = await fetch('/api/game');
      const serverState = await response.json();
      if (serverState.timeRemaining !== state.timeRemaining) {
        dispatch({ type: 'UPDATE_TIME', payload: serverState.timeRemaining });
      }
    };

    // Initial sync
    syncTimer();

    // Update local and server time every second
    const interval = setInterval(async () => {
      if (state.timeRemaining > 0) {
        const newTime = state.timeRemaining - 1;
        dispatch({ type: 'UPDATE_TIME', payload: newTime });
        await updateServerTime(newTime);
      }
    }, 1000);

    // Sync with server every 5 seconds to prevent drift
    const syncInterval = setInterval(syncTimer, 5000);

    return () => {
      clearInterval(interval);
      clearInterval(syncInterval);
    };
  }, [state.isStarted, state.timeRemaining, dispatch]);

  if (!state.isStarted) return null;

  return (
    <div className="fixed top-0 left-0 right-0 bg-red-500/20 text-red-500 p-2 text-center font-bold">
      EMERGENCY PROTOCOL ACTIVATED - Time remaining: {Math.floor(state.timeRemaining / 60)}:{(state.timeRemaining % 60).toString().padStart(2, '0')}
    </div>
  );
} 