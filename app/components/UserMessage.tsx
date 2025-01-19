'use client';
import { useGameState } from '@/app/context/GameContext';
import { usePathname } from 'next/navigation';

export function UserMessage() {
  const { state, dispatch } = useGameState();
  const pathname = usePathname();

  // Don't show message on admin page
  if (pathname === '/admin' || !state.adminMessage) return null;

  const handleClose = async () => {
    // Clear message on server
    await fetch('/api/game', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        action: 'CLEAR_MESSAGE'
      })
    });
    // Clear message locally
    dispatch({ type: 'CLEAR_MESSAGE' });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-black border-2 border-green-500 p-6 rounded-lg max-w-md w-full">
        <div className="text-green-500 mb-4 whitespace-pre-wrap">
          {state.adminMessage}
        </div>
        <button
          onClick={handleClose}
          className="bg-green-500 text-black px-4 py-2 rounded hover:bg-green-400 w-full"
        >
          Close
        </button>
      </div>
    </div>
  );
} 