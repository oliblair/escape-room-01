'use client';
import { useState, useEffect, useRef } from 'react';
import { useGameState } from '@/app/context/GameContext';

export function VideoAd() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const videoRef = useRef<HTMLVideoElement>(null);
  const { state, dispatch } = useGameState();

  useEffect(() => {
    return () => {
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
        videoRef.current.src = '';
      }
    };
  }, []);

  useEffect(() => {
    if (!state.showAd && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      videoRef.current.src = '';
    }
  }, [state.showAd]);

  useEffect(() => {
    if (state.currentStage === 5) {
      dispatch({ type: 'SET_AD', payload: true });
    }
  }, [state.currentStage, dispatch]);

  const moveButton = () => {
    const x = Math.random() * (window.innerWidth - 100);
    const y = Math.random() * (window.innerHeight - 40);
    setPosition({ x, y });
  };

  const handleVideoEnd = () => {
    dispatch({ type: 'CLOSE_AD' });
  };

  if (!state.showAd) return null;

  return (
    <div className="fixed inset-0 bg-black z-40 flex flex-col items-center justify-center">
      <div className="text-green-500 text-xl mb-4">Loading sponsored advert...</div>
      <video
        ref={videoRef}
        src="/videos/advert1.mp4"
        className="w-full h-full object-contain"
        autoPlay
        onEnded={handleVideoEnd}
      />
      <button
        onMouseEnter={moveButton}
        style={{
          position: 'fixed',
          right: `${position.x}px`,
          bottom: `${position.y}px`,
          transition: 'all 0.2s ease'
        }}
        className="bg-black text-green-500 border border-green-500 px-4 py-2 rounded hover:bg-green-500 hover:text-black"
      >
        Skip Ad
      </button>
    </div>
  );
} 