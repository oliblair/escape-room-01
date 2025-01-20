'use client';
import { useState, useEffect } from 'react';

export function TypewriterEffect({ 
  text, 
  delay = 0,
  color = 'text-green-500'  // Add default color
}: { 
  text: string;
  delay?: number;
  color?: string;
}) {
  const [displayText, setDisplayText] = useState('');
  const [startTyping, setStartTyping] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStartTyping(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!startTyping) return;

    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= text.length) {
        setDisplayText(text.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [text, startTyping]);

  return (
    <div className={`font-mono ${color}`}>
      {displayText}
      {displayText.length < text.length && <span className="animate-pulse">▊</span>}
    </div>
  );
} 