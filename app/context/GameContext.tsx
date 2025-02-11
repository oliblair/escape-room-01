'use client';
import { createContext, useContext, useReducer, useEffect } from 'react';
import { GameState, GameAction } from '@/app/types/game';

const GameContext = createContext<{
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
} | null>(null);

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'START_GAME':
      if (action.payload && typeof action.payload === 'object' && 'isStarted' in action.payload) {
        // If payload is the full game state from API
        return { ...action.payload };
      }
      // If payload is just the encryption codes
      return { 
        ...state, 
        isStarted: true,
        encryptionCode: Array.isArray(action.payload) ? action.payload : state.encryptionCode 
      };
    case 'RESET_GAME':
      return {
        isStarted: false,
        currentStage: 0,
        encryptionCode: [],
        timeRemaining: 3600,
        isComplete: false,
        adminMessage: null,
        showAd: false
      };
    case 'CHECK_CODE':
      return {
        ...state,
        currentStage: state.encryptionCode[state.currentStage] === action.payload
          ? state.currentStage + 1
          : 0  // Reset to stage 0 on incorrect attempt
      };
    case 'UPDATE_TIME':
      return { ...state, timeRemaining: action.payload as number };
    case 'JUMP_TO_STAGE':
      return {
        ...state,
        currentStage: action.payload as number
      };
    case 'SET_MESSAGE':
      return { ...state, adminMessage: action.payload as string };
    case 'CLEAR_MESSAGE':
      return { ...state, adminMessage: null };
    case 'SET_AD':
      return { ...state, showAd: action.payload };
    case 'CLOSE_AD':
      return { ...state, showAd: false };
    default:
      return state;
  }
}

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, {
    isStarted: false,
    currentStage: 0,
    encryptionCode: [],
    timeRemaining: 3600,
    isComplete: false,
    adminMessage: null,
    showAd: false
  });

  useEffect(() => {
    const initializeState = async () => {
      const response = await fetch('/api/game');
      const data = await response.json();
      dispatch({ type: 'START_GAME', payload: data });
    };
    initializeState();
  }, []);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}

export const useGameState = () => {
  const context = useContext(GameContext);
  if (!context) throw new Error('useGameState must be used within GameProvider');
  return context;
} 