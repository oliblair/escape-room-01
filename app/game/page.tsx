import { Terminal } from '@/app/components/Terminal';
import { CodeInput } from '@/app/components/CodeInput';
import { TipRequestButton } from '@/app/components/TipRequestButton';

export default function GamePage() {
  return (
    <div className="min-h-screen bg-black p-4">
      <Terminal>
        <CodeInput />
      </Terminal>
      <TipRequestButton />
    </div>
  );
} 