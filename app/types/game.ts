export interface GameState {
  isStarted: boolean;
  currentStage: number;
  encryptionCode: string[];
  timeRemaining: number;
  isComplete: boolean;
}

type GamePayload = {
  'START_GAME': GameState | string[];
  'SET_CODE': string[];
  'CHECK_CODE': string;
  'NEXT_STAGE': number;
  'UPDATE_TIME': number;
  'RESET_GAME': void;
  'JUMP_TO_STAGE': number;
}

export interface GameAction {
  type: keyof GamePayload;
  payload?: GamePayload[keyof GamePayload];
} 