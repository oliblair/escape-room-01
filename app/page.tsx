import { Terminal } from '@/app/components/Terminal';
import { WelcomeMessage } from '@/app/components/WelcomeMessage';

export default function Home() {
  return (
    <div className="min-h-screen bg-black p-4">
      <Terminal>
        <WelcomeMessage />
      </Terminal>
    </div>
  );
}
