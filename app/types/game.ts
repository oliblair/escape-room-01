export interface GameState {
  isStarted: boolean;
  currentStage: number;
  encryptionCode: string[];
  timeRemaining: number;
  isComplete: boolean;
}

export interface GameAction {
  type: 'START_GAME' | 'SET_CODE' | 'CHECK_CODE' | 'NEXT_STAGE' | 'UPDATE_TIME' | 'RESET_GAME' | 'JUMP_TO_STAGE';
  payload?: any;
} 