'use client';

import { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';

type CountdownTimerProps = {
  timeInSeconds: number;
};

export default function CountdownTimer({ timeInSeconds }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState(timeInSeconds);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
      .toString()
      .padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  return (
    <div className="inline-flex items-center gap-2 text-sm px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm">
      <Clock className="w-4 h-4" />
      <span>{formatTime(timeLeft)}</span>
    </div>
  );
}
