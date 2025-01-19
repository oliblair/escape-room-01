import { Terminal } from '@/app/components/Terminal';
import { VictoryMessage } from '@/app/components/VictoryMessage';

export default function VictoryPage() {
  return (
    <div className="min-h-screen bg-black p-4">
      <Terminal>
        <VictoryMessage />
      </Terminal>
    </div>
  );
} 