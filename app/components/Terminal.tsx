import { ReactNode } from 'react';

export function Terminal({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-4xl mx-auto rounded-lg border-2 border-green-500/50 bg-black/90 p-6 font-mono text-green-500 shadow-lg shadow-green-500/20">
      <div className="flex gap-2 mb-4">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
      </div>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
} 