'use client';
import { useState, useEffect } from 'react';
import { TypewriterEffect } from '@/app/components/TypewriterEffect';
import { useGameState } from '@/app/context/GameContext';

export function WelcomeMessage() {
    const { state } = useGameState();
    const [showFullMessage, setShowFullMessage] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setShowFullMessage(true), 1000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="space-y-4">
            <TypewriterEffect text="INITIALIZING SPACEX MARS FACILITY PLANETARY OPERATIONAL RESEARCH NETWORK..." />
            {showFullMessage && (
                <>
                    <div className="text-xl font-bold text-red-500">RED ROOM TERMINAL</div>
                    <TypewriterEffect
                        text="Welcome to the SpaceX Mars Facility Recording Studio Control System"
                        delay={2000}
                    />
                    <TypewriterEffect
                        text="ERROR: SYSTEM INTEGRITY CHECK FAILED"
                        delay={4000}
                    />
                    <TypewriterEffect
                        text="WARNING: No human life signs detected in facility."
                        delay={5000}
                    />
                    <TypewriterEffect
                        text="Robot Dog Security System: ACTIVE"
                        delay={8000}
                    />
                    {!state.isStarted ? (
                        <TypewriterEffect
                            text="Restoring system from backup..."
                            delay={10000}
                        />
                    ) : (
                        <TypewriterEffect
                            text="EMERGENCY PROTOCOL ACTIVATED - Time remaining:"
                            delay={10000}
                        />
                    )}
                    {state.isStarted && (
                        <div className="text-2xl font-bold text-red-500">
                            {Math.floor(state.timeRemaining / 60)}:{(state.timeRemaining % 60).toString().padStart(2, '0')}
                        </div>
                    )}
                </>
            )}
        </div>
    );
} 