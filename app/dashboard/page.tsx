'use client';
import { Terminal } from '@/app/components/Terminal';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const router = useRouter();

  const handleButtonClick = (action: string) => {
    if (action === 'terminal') {
      router.push('/');
    } else {
      setPopupMessage('Currently Unavailable');
      setShowPopup(true);
    }
  };

  return (
    <div className="min-h-screen bg-black p-4">
      <Terminal>
        <div className="space-y-6">
          <h1 className="text-xl font-bold">{`Planetary Operational Research Network (PORN) DASHBOARD`}</h1>
          
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => handleButtonClick('door')}
              className="bg-black text-green-500 border border-green-500 px-4 py-6 rounded hover:bg-green-500 hover:text-black transition-colors"
            >
              Open Door
            </button>
            
            <button
              onClick={() => handleButtonClick('lights')}
              className="bg-black text-green-500 border border-green-500 px-4 py-6 rounded hover:bg-green-500 hover:text-black transition-colors"
            >
              Turn on Lights
            </button>
            
            <button
              onClick={() => handleButtonClick('recording')}
              className="bg-black text-green-500 border border-green-500 px-4 py-6 rounded hover:bg-green-500 hover:text-black transition-colors"
            >
              Start Recording
            </button>
            
            <button
              onClick={() => handleButtonClick('terminal')}
              className="bg-black text-green-500 border border-green-500 px-4 py-6 rounded hover:bg-green-500 hover:text-black transition-colors"
            >
              Enter Terminal
            </button>
          </div>
        </div>
      </Terminal>

      {showPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-black border-2 border-green-500 p-6 rounded-lg max-w-md w-full">
            <div className="text-green-500 mb-4">
              {popupMessage}
            </div>
            <button
              onClick={() => setShowPopup(false)}
              className="bg-green-500 text-black px-4 py-2 rounded hover:bg-green-400 w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 