import { NextResponse } from 'next/server';

const attemptLog: {
  timestamp: string;
  attempt: string;
  success: boolean;
  stage: number;
  expectedCode: string;
}[] = [];

export async function GET() {
  return NextResponse.json({ logs: attemptLog });
}

export async function POST(request: Request) {
  const data = await request.json();
  attemptLog.push({
    timestamp: new Date().toISOString(),
    attempt: data.attempt,
    success: data.success,
    stage: data.stage,
    expectedCode: data.expectedCode
  });
  return NextResponse.json({ success: true });
} 