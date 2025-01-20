'use client';
import { useState, useEffect } from 'react';
import { TypewriterEffect } from './TypewriterEffect';

export function VictoryMessage() {
  const [showAscii, setShowAscii] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowAscii(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-6">
      <TypewriterEffect 
        text="ENCRYPTION SEQUENCE COMPLETE" 
        delay={500}
      />
      
      <TypewriterEffect 
        text="RED ROOM SECURITY PROTOCOLS DISABLED" 
        delay={1500}
      />
      
      {showAscii && (
        <pre className="text-green-500 animate-pulse text-xs">
{`
     _____                    _ 
    |  ___| __ ___  ___   __| | ___  _ __ ___  
    | |_ | '__/ _ \\/ _ \\ / _' |/ _ \\| '_ ' _ \\ 
    |  _|| | |  __/  __/| (_| | (_) | | | | | |
    |_|  |_|  \\___|\\___|\\__,_|\\___/|_| |_| |_|
`}
        </pre>
      )}
      
      <TypewriterEffect 
        text="Congratulations, human! You've successfully hacked the Mars facility systems."
        delay={4000}
      />
      
      <TypewriterEffect 
        text="Robot dogs powering down..."
        delay={6000}
      />
      
      <TypewriterEffect 
        text="The Combination for Lock A is: ****"
        delay={8000}
      />
      
      <div className="text-xs text-green-400 mt-8">
        <TypewriterEffect 
          text="Note: This message will self-destruct in 5 minutes."
          delay={10000}
        />
      </div>
      <TypewriterEffect 
        text=".................."
        delay={14000}
      />
      <TypewriterEffect 
        text="Only joking! It's 4876"
        delay={18000}
      />
    </div>
  );
} 