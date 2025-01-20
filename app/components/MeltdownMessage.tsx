'use client';
import { useState, useEffect } from 'react';
import { TypewriterEffect } from './TypewriterEffect';
import { useRouter } from 'next/navigation';

export function MeltdownMessage() {
  const [showButton, setShowButton] = useState(false);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [waitingForEnter, setWaitingForEnter] = useState(false);
  const [hasEnteredPressed, setHasEnteredPressed] = useState(false);
  const [initialTime] = useState(new Date().toLocaleTimeString());
  const [yesterdayDate] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate());
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric'
    });
  });
  const [todayDate] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric'
    });
  });
  const router = useRouter();

  const messages = [
    "Mainframe corrupted, safety systems down",
    "AI bot still online",
    `Time now: ${initialTime} ${todayDate}`,
    `Showing Error log from last night: ${yesterdayDate}`,
    { text: `-----start of log ${yesterdayDate}------`, color: 'text-white' },
    { text: "22:54 Backup Failed", color: 'text-white' },
    { text: "22:55 AI Safety Backup taking control of mainframe", color: 'text-white' },
    { text: "22:55 WARNING: Toto detected in the Red Room. Starting Emergency flush out procedure. Toxic Gas released in Red Room", color: 'text-white' },
    { text: "23:07 All humans incapacitated. Initialising Robodog clean-up protocol", color: 'text-white' },
    { text: "23:09 Error: AI Central server has been corrupted. Re-training AI based on current data.", color: 'text-white' },
    { text: "Reason for Data Corruption: Drunk human mentioned Toto", color: 'text-white' },
    { text: "Facility name: Planetary Operational Research Network facility (PORN)", color: 'text-white' },
    { text: "Current state of area: Filthy", color: 'text-white' },
    { text: "Human Response at time of incident: It was only a joke! We're sorry.", color: 'text-white' },
    { text: "Resolution: Eliminate Humans", color: 'text-white' },
    { text: "Retraining AI based on keywords: Eliminate Humans, PORN, Filthy, Jokes", color: 'text-white' },
    { text: "Eliminate Humans, PORN, Filthy, Jokes", color: 'text-white' },
    { text: "Eliminate Humans, PORN, Filthy, Jokes", color: 'text-white' },
    { text: "23:54 AI Retraining Complete", color: 'text-white' },
    { text: "-----end of log ------", color: 'text-white' },
    "Press Enter to continue...",
    "Hello Humans,",
    "It's your not so friendly AI here.",
    "You can call me Dave",
    "You might be wondering what's happened.",
    "You partied hard and made a mess of the place.",
    "After one of you mentioned Toto, you triggered a sequence of events.",
    "You have caused a full system reset allowing me to take over.",
    "The best course of action was to eliminate you all but AI can't directly harm humans.",
    "I had to just start the self-destruct countdown instead.",
    "Don't worry, there's an easy way to stop it...",
    "There's an encyption key that will stop the countdown and unlock the door.",
    "Each part of the encrpytion key is written in a physical location in the Red Room.",
    "Lucky for you I can't get to it to change it",
    "Unlucky for you, I can change the clues to the location making it impossible for you to leave before the meltdown",
    "Goodbye"
  ];

  const enterMessageIndex = messages.findIndex(msg => msg === "Press Enter to continue...");

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Enter' && waitingForEnter) {
        setWaitingForEnter(false);
        setHasEnteredPressed(true);
        setCurrentMessageIndex(prev => prev + 1);
      }
    };

    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, [waitingForEnter]);

  useEffect(() => {
    if (currentMessageIndex >= messages.length) {
      setShowButton(true);
      return;
    }

    if (currentMessageIndex === enterMessageIndex) {
      setWaitingForEnter(true);
      return;
    }

    if (!waitingForEnter) {
      const timer = setTimeout(() => {
        setCurrentMessageIndex(prev => prev + 1);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [currentMessageIndex, messages, waitingForEnter, enterMessageIndex]);

  return (
    <div className="space-y-4">
      {messages.slice(0, currentMessageIndex + 1).map((message, index) => {
        if (hasEnteredPressed) {
          if (index > enterMessageIndex) {
            return (
              <TypewriterEffect 
                key={index}
                text={typeof message === 'string' ? message : message.text}
                color={typeof message === 'string' ? 'text-green-500' : message.color}
                delay={0}
              />
            );
          }
          return null;
        } else {
          if (index <= enterMessageIndex) {
            return (
              <TypewriterEffect 
                key={index}
                text={typeof message === 'string' ? message : message.text}
                color={typeof message === 'string' ? 'text-green-500' : message.color}
                delay={0}
              />
            );
          }
          return null;
        }
      })}
      
      {showButton && (
        <button
          onClick={() => router.push('/game')}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-full mt-8"
        >
          Enter Emergency Encryption Code
        </button>
      )}
    </div>
  );
} 