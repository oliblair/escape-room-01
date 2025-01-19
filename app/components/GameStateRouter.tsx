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
      if (serverState.isStarted !== state.isStarted) {
        dispatch({ type: 'START_GAME', payload: serverState });
      }

      // If game hasn't started, ensure we're on home page
      if (!serverState.isStarted && window.location.pathname !== '/') {
        router.push('/');
        return;
      }

      // If game has started, move to game page
      if (serverState.isStarted && window.location.pathname === '/') {
        router.push('/game');
        return;
      }

      // If game is complete, redirect to victory page
      if (serverState.currentStage >= 8 && window.location.pathname !== '/victory') {
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