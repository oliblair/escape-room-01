import { Terminal } from '@/app/components/Terminal';
import { CodeInput } from '@/app/components/CodeInput';
import { TipRequestButton } from '@/app/components/TipRequestButton';
import { VideoAd } from '@/app/components/VideoAd';

export default function GamePage() {
  return (
    <div className="min-h-screen bg-black p-4">
      <Terminal>
        <CodeInput />
      </Terminal>
      <TipRequestButton />
      <VideoAd />
    </div>
  );
} 