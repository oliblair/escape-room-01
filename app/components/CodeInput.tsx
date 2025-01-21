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
      if (code === state.encryptionCode[state.currentStage]) {
        setMessage('Correct code!');
        dispatch({ type: 'CHECK_CODE', payload: code });
      } else {
        setMessage('Incorrect code. Starting over from the beginning... just give up now.');
        dispatch({ type: 'JUMP_TO_STAGE', payload: 0 }); // Force reset to stage 0
      }
      setCurrentInput('');
      
      // Clear message after 5 seconds
      setTimeout(() => setMessage(''), 5000);
    }
  };


  const currentClue = [
    "I sit there waiting patiently for your clumsy hands to slap me silly. Despite your pounding, I stay in one place. Hit the right spot and I'll make a high pitch scream. The only way to stop it is with a choke. What am I?",
    "Turn me on, squeeze your finger and my head will keep spinning until you release your finger. What am I?",
    "You wrap one sweaty hand around my neck and then place the other on my skimpy underwear. What am I?",
    "If you turn me on I'll suck until I'm full. What am I?",
    "I'm long, black and I've got wood. What am I? At first glance I resemble an interracial Orgy. What am I?",
    "Giver her the _ (one letter). What am I?",
    "My only purpose is your toes on my tongue. What am I?",
    "I'm big and boxy, you'll see me coming. You'll hear me loud and I flash everyone when running. I've got a bed that's large with a metal frame but if you end up inside me you might feel lame. What am I?",
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
              placeholder="Enter 2 Character Code..."
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