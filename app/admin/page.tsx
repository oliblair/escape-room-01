'use client';
import { Terminal } from '@/app/components/Terminal';
import { AdminControls } from '@/app/components/AdminControls';

export default function AdminPanel() {
  return (
    <div className="min-h-screen bg-black p-4">
      <Terminal>
        <AdminControls />
      </Terminal>
    </div>
  );
} 