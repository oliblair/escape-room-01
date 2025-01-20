export interface GameState {
  isStarted: boolean;
  currentStage: number;
  encryptionCode: string[];
  timeRemaining: number;
  isComplete: boolean;
  adminMessage: string | null;
  showAd: boolean;
}

export type GameAction = 
  | { type: 'START_GAME'; payload: string[] | GameState }
  | { type: 'RESET_GAME' }
  | { type: 'CHECK_CODE'; payload: string }
  | { type: 'UPDATE_TIME'; payload: number }
  | { type: 'JUMP_TO_STAGE'; payload: number }
  | { type: 'SET_MESSAGE'; payload: string }
  | { type: 'CLEAR_MESSAGE' }
  | { type: 'SET_AD'; payload: boolean }
  | { type: 'CLOSE_AD' };