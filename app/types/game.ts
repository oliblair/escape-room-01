export interface GameState {
  isStarted: boolean;
  currentStage: number;
  encryptionCode: string[];
  timeRemaining: number;
  isComplete: boolean;
  adminMessage: string | null;
}

type GamePayload = {
  'START_GAME': GameState;
  'SET_CODE': string[];
  'CHECK_CODE': string;
  'NEXT_STAGE': number;
  'UPDATE_TIME': number;
  'RESET_GAME': void;
  'JUMP_TO_STAGE': number;
  'SET_MESSAGE': string | null;
  'CLEAR_MESSAGE': void;
}

export interface GameAction {
  type: keyof GamePayload;
  payload?: GamePayload[keyof GamePayload];
} 