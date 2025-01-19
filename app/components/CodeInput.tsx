'use client';
import { useState } from 'react';
import { useGameState } from '@/app/context/GameContext';
import { TypewriterEffect } from './TypewriterEffect';

export function CodeInput() {
  const { state, dispatch } = useGameState();
  const [currentInput, setCurrentInput] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = currentInput.toLowerCase();
    
    // Log the attempt
    await fetch('/api/game/log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          attempt: code,
          success: code === state.encryptionCode[state.currentStage],
          stage: state.currentStage + 1,
          expectedCode: state.encryptionCode[state.currentStage]
        })
      });

    const response = await fetch('/api/game', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'CHECK_CODE',
        code: code
      })
    });
    
    if (response.ok) {
      const data = await response.json();
      if (data.currentStage > state.currentStage) {
        setMessage('Correct code!');
        dispatch({ type: 'CHECK_CODE', payload: code });
        setCurrentInput('');
      } else {
        setMessage('Incorrect code. Try again.');
      }
      
      // Clear message after 2 seconds
      setTimeout(() => setMessage(''), 2000);
    }
  };

  const currentClue = [
    "Check the microphone stand base",
    "Look under the mixing desk",
    "Behind the speaker",
    "Inside the guitar case",
    "Under the drum throne",
    "Check the amplifier",
    "Behind the recording booth door",
    "Inside the headphone case"
  ][state.currentStage] || "";

  return (
    <div className="space-y-4">
      <div className="text-xl font-bold">
        Progress: {state.currentStage}/8 codes found
      </div>
      
      <div className="font-mono">
        Current encryption code: {state.encryptionCode
          .map((code, i) => i < state.currentStage ? code : '??')
          .join('-')}
      </div>

      {state.currentStage < 8 && (
        <>
          <TypewriterEffect text={`CLUE ${state.currentStage + 1}: ${currentClue}`} />
          
          <form onSubmit={handleSubmit} className="space-y-2">
            <input
              type="text"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              placeholder="Enter code..."
              className="bg-black border border-green-500 px-2 py-1 text-green-500 w-full"
              maxLength={2}
            />
            <button
              type="submit"
              className="bg-green-500 text-black px-4 py-2 rounded hover:bg-green-400 w-full"
            >
              Submit Code
            </button>
            {message && (
              <div className={`text-center ${message.includes('Correct') ? 'text-green-500' : 'text-red-500'}`}>
                {message}
              </div>
            )}
          </form>
        </>
      )}

      {state.currentStage >= 8 && (
        <TypewriterEffect text="CONGRATULATIONS! All encryption codes found. System unlocked!" />
      )}
    </div>
  );
} 