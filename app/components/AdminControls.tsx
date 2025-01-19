'use client';
import { useState, useEffect } from 'react';
import { useGameState } from '@/app/context/GameContext';
import { GameState } from '@/app/types/game';

interface LogEntry {
    timestamp: string;
    attempt: string;
    success: boolean;
    stage: number;
    expectedCode: string;
  }

export function AdminControls() {
  const { state, dispatch } = useGameState();
  const [encryptionCode, setEncryptionCode] = useState('4e-8s-s3-8s-s5-5s-89-am');
  const [selectedStage, setSelectedStage] = useState(0);
  const [logEntries, setLogEntries] = useState<LogEntry[]>([]);

  useEffect(() => {
    const fetchLogs = () => {
      fetch('/api/game/log').then(res => res.json()).then(data => {
        setLogEntries(data.logs || []);
      });
    };

    // Initial fetch
    fetchLogs();

    // Set up interval for auto-refresh
    const interval = setInterval(fetchLogs, 1000);

    return () => clearInterval(interval);
  }, []);

  const startGame = async () => {
    const codes = encryptionCode.split('-');
    const gameStatePayload: GameState = {
      isStarted: true,
      encryptionCode: codes,
      timeRemaining: state.timeRemaining,
      currentStage: 0,
      isComplete: false,
      adminMessage: null
    };

    await fetch('/api/game', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        action: 'START_GAME',
        encryptionCode: codes,
        timeRemaining: state.timeRemaining
      })
    });
    
    dispatch({ type: 'START_GAME', payload: gameStatePayload });
  };

  const resetGame = async () => {
    await fetch('/api/game', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'RESET_GAME' })
    });
    dispatch({ type: 'RESET_GAME' });
  };

  const jumpToStage = async () => {
    await fetch('/api/game', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        action: 'JUMP_TO_STAGE',
        stage: selectedStage
      })
    });
    dispatch({ type: 'JUMP_TO_STAGE', payload: selectedStage });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h1 className="text-xl font-bold">ADMIN CONTROL PANEL</h1>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block">
              Encryption Code:
              <input 
                type="text" 
                value={encryptionCode}
                onChange={(e) => setEncryptionCode(e.target.value)}
                className="ml-2 bg-black border border-green-500 px-2 py-1 w-full"
              />
            </label>
            
            <div className="space-y-2">
              <label className="block">
                Countdown Time (minutes):
                <input
                  type="number"
                  value={Math.floor(state.timeRemaining / 60)}
                  onChange={(e) => dispatch({ 
                    type: 'UPDATE_TIME', 
                    payload: Math.max(1, parseInt(e.target.value)) * 60 
                  })}
                  className="ml-2 bg-black border border-green-500 px-2 py-1 w-24"
                  min="1"
                />
              </label>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={startGame}
                disabled={state.isStarted}
                className="bg-green-500 text-black px-4 py-2 rounded hover:bg-green-400 disabled:opacity-50 flex-1"
              >
                {state.isStarted ? 'Game In Progress' : 'Start Game'}
              </button>
              
              <button
                onClick={resetGame}
                className="bg-red-500 text-black px-4 py-2 rounded hover:bg-red-400"
              >
                Reset Game
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block">
              Jump to Stage:
              <select
                value={selectedStage}
                onChange={(e) => setSelectedStage(Number(e.target.value))}
                className="ml-2 bg-black border border-green-500 px-2 py-1"
              >
                {Array.from({length: 9}, (_, i) => (
                  <option key={i} value={i}>Stage {i}</option>
                ))}
              </select>
            </label>
            <button
              onClick={jumpToStage}
              className="bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-400 w-full"
            >
              Jump to Stage
            </button>
          </div>
        </div>

        <div className="border border-green-500/30 rounded p-4">
          <h2 className="text-lg font-bold mb-2">Current Status</h2>
          <div className="space-y-1 text-sm">
            <p>Current Stage: {state.currentStage}/8</p>
            <p>Time Remaining: {Math.floor(state.timeRemaining / 60)}:{(state.timeRemaining % 60).toString().padStart(2, '0')}</p>
            <p>Game Status: {state.isStarted ? 'In Progress' : 'Not Started'}</p>
          </div>
        </div>

        <div className="border border-green-500/30 rounded p-4 max-h-64 overflow-y-auto">
          <h2 className="text-lg font-bold mb-2">Attempt Log</h2>
          <div className="space-y-2 text-sm">
            {[...logEntries].reverse().map((entry, i) => (
              <div key={i} className={`grid grid-cols-4 gap-4 ${
                entry.attempt === 'TIP_REQUEST' 
                  ? 'text-yellow-500' 
                  : entry.success 
                    ? 'text-green-500' 
                    : 'text-red-500'
              }`}>
                <span>{new Date(entry.timestamp).toLocaleTimeString()}</span>
                <span>Stage {entry.stage}: {entry.attempt}</span>
                <span>Expected: {entry.expectedCode}</span>
                <span>{entry.success ? '✓' : entry.attempt === 'TIP_REQUEST' ? '?' : '✗'}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="border border-green-500/30 rounded p-4">
          <h2 className="text-lg font-bold mb-2">Send Message to Players</h2>
          <div className="space-y-2">
            <textarea
              className="w-full h-24 bg-black border border-green-500 p-2 text-green-500 resize-none"
              placeholder="Type a message to send to players..."
              id="adminMessage"
            />
            <button
              onClick={() => {
                const textarea = document.getElementById('adminMessage') as HTMLTextAreaElement;
                if (!textarea) return;
                
                fetch('/api/game', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ 
                    action: 'SET_MESSAGE',
                    message: textarea.value || null
                  })
                });
                dispatch({ type: 'SET_MESSAGE', payload: textarea.value });
                textarea.value = '';
              }}
              className="bg-green-500 text-black px-4 py-2 rounded hover:bg-green-400 w-full"
            >
              Send Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 