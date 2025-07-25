'use client';

import { useEffect, useState } from 'react';
import { Hourglass } from 'lucide-react';

type Props = {
  onTick?: (seconds: number) => void;
};

export default function ElapsedTimer({ onTick }: Props) {
  const [secondsElapsed, setSecondsElapsed] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsElapsed(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (onTick) onTick(secondsElapsed);
  }, [secondsElapsed, onTick]);

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center gap-1 text-xs text-zinc-600 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded-full shadow-sm">
      <Hourglass className="w-3 h-6 text-yellow-500" />
      <span className="font-medium">Elapsed:</span>
      <span>{formatTime(secondsElapsed)}</span>
    </div>
  );
}
