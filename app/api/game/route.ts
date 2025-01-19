import { NextResponse } from 'next/server';
import { GameState } from '@/app/types/game';

let gameState: GameState = {
  isStarted: false,
  currentStage: 0,
  encryptionCode: ['4e', '8s', 's3', '8s', 's5', '5s', '89', 'am'],
  timeRemaining: 3600, // 1 hour in seconds
  isComplete: false,
};

export async function GET() {
  return NextResponse.json(gameState);
}

export async function POST(request: Request) {
  const data = await request.json();
  
  switch (data.action) {
    case 'START_GAME':
      if (data.encryptionCode) {
        gameState = { 
          ...gameState, 
          isStarted: true,
          encryptionCode: data.encryptionCode,
          currentStage: 0,
          timeRemaining: 3600,
        };
      } else {
        gameState.isStarted = true;
      }
      break;
    case 'RESET_GAME':
      gameState = {
        isStarted: false,
        currentStage: 0,
        encryptionCode: gameState.encryptionCode,
        timeRemaining: 3600,
        isComplete: false,
      };
      break;
    case 'CHECK_CODE':
      if (gameState.encryptionCode[gameState.currentStage] === data.code.toLowerCase()) {
        gameState = {
          ...gameState,
          currentStage: gameState.currentStage + 1
        };
      }
      break;
    case 'UPDATE_TIME':
      gameState.timeRemaining = data.timeRemaining;
      break;
    case 'JUMP_TO_STAGE':
      gameState = {
        ...gameState,
        currentStage: parseInt(data.stage)
      };
      break;
  }

  return NextResponse.json(gameState);
} 