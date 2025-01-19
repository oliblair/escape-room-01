import { Terminal } from '@/app/components/Terminal';
import { MeltdownMessage } from '@/app/components/MeltdownMessage';

export default function MeltdownPage() {
  return (
    <div className="min-h-screen bg-black p-4">
      <Terminal>
        <MeltdownMessage />
      </Terminal>
    </div>
  );
} 