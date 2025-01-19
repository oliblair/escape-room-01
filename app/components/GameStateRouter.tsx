'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useGameState } from '@/app/context/GameContext';

export function GameStateRouter({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { state, dispatch } = useGameState();

  useEffect(() => {
    const checkAndRedirect = async () => {
      // If on admin page, don't redirect
      if (window.location.pathname === '/admin') return;

      // Get latest game state from server
      const response = await fetch('/api/game');
      const serverState = await response.json();

      // Update local state if different from server
      if (serverState.isStarted !== state.isStarted || 
          serverState.currentStage !== state.currentStage ||
          serverState.adminMessage !== state.adminMessage) {
        dispatch({ type: 'START_GAME', payload: serverState });
      }

      // If game hasn't started and not on home page, redirect to home
      if (!serverState.isStarted && window.location.pathname !== '/') {
        router.push('/');
        return;
      }

      // If game has started and we're on home page, go to meltdown
      if (serverState.isStarted && window.location.pathname === '/') {
        router.push('/meltdown');
        return;
      }

      // If game is complete and not on victory page, redirect to victory
      if (serverState.currentStage >= 8 && window.location.pathname !== '/victory' && window.location.pathname !== '/meltdown') {
        router.push('/victory');
      }
    };

    // Initial check
    checkAndRedirect();

    // Set up interval to check every second
    const interval = setInterval(checkAndRedirect, 1000);

    return () => clearInterval(interval);
  }, [state.isStarted, state.currentStage, router, dispatch]);

  return children;
} 