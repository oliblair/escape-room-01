'use client';
import { useEffect, useState } from 'react';
import screenfull from 'screenfull';

export function FullscreenWrapper({ children }: { children: React.ReactNode }) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(screenfull.isFullscreen);
    };

    if (screenfull.isEnabled) {
      screenfull.on('change', handleFullscreenChange);
    }

    return () => {
      if (screenfull.isEnabled) {
        screenfull.off('change', handleFullscreenChange);
      }
    };
  }, []);

  const toggleFullscreen = () => {
    if (screenfull.isEnabled) {
      screenfull.toggle();
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {!isFullscreen && (
        <button
          onClick={toggleFullscreen}
          className="fixed top-4 right-4 z-50 bg-green-500 text-black px-4 py-2 rounded hover:bg-green-400"
        >
          Enter Fullscreen
        </button>
      )}
      {children}
    </div>
  );
} 