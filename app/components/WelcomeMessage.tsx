'use client';
import { useState, useEffect } from 'react';
import { TypewriterEffect } from '@/app/components/TypewriterEffect';
import { useGameState } from '@/app/context/GameContext';

const LoadingSpinner = () => {
    const [frame, setFrame] = useState(0);
    const [progress, setProgress] = useState(0);
    const frames = ['|', '/', '─', '\\'];

    useEffect(() => {
        // Update spinner animation every 200ms
        const spinnerTimer = setInterval(() => {
            setFrame(prev => (prev + 1) % frames.length);
        }, 200);

        // Update progress every second
        // 300 seconds (5 minutes) = 0.333% per second
        const progressTimer = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(progressTimer);
                    return 100;
                }
                return Math.min(prev + 0.333, 100);
            });
        }, 1000);

        return () => {
            clearInterval(spinnerTimer);
            clearInterval(progressTimer);
        };
    }, []);

    return (
        <pre className="text-green-500">
{`
[${frames[frame]}] Restoring system from backup...
Progress: [${'>'.repeat(Math.floor(progress * 0.15))}${' '.repeat(15 - Math.floor(progress * 0.15))}] ${progress.toFixed(1)}%
`}
        </pre>
    );
};

export function WelcomeMessage() {
    const { state } = useGameState();
    const [showFullMessage, setShowFullMessage] = useState(false);
    const [showSpinner, setShowSpinner] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setShowFullMessage(true), 1000);
        const spinnerTimer = setTimeout(() => setShowSpinner(true), 10000);
        
        return () => {
            clearTimeout(timer);
            clearTimeout(spinnerTimer);
        };
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
                        text="WARNING: No signs of life detected in facility."
                        delay={5000}
                    />
                    <TypewriterEffect
                        text="Robot Dog Security System: ACTIVE"
                        delay={8000}
                    />
                    {!state.isStarted && showSpinner && (
                        <div className="mt-4">
                            <LoadingSpinner />
                        </div>
                    )}
                    {state.isStarted && (
                        <TypewriterEffect
                            text="EMERGENCY PROTOCOL ACTIVATED"
                            delay={10000}
                        />
                    )}
                </>
            )}
        </div>
    );
} 