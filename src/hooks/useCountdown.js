import { useState, useEffect } from 'react';

function getNextMidnightEST() {
  const now = new Date();
  const est = new Date(now.toLocaleString('en-US', { timeZone: 'America/New_York' }));
  const midnight = new Date(est);
  midnight.setHours(24, 0, 0, 0);
  return new Date(midnight.toLocaleString('en-US', { timeZone: 'America/New_York' }));
}

export function useCountdown() {
  const [target] = useState(getNextMidnightEST);

  const [time, setTime] = useState(() => {
    const diff = target - new Date();
    if (diff <= 0) return { h: 0, m: 0, s: 0 };
    return {
      h: Math.floor(diff / 3600000),
      m: Math.floor((diff % 3600000) / 60000),
      s: Math.floor((diff % 60000) / 1000),
    };
  });

  useEffect(() => {
    const calc = () => {
      const diff = target - new Date();
      if (diff <= 0) return { h: 0, m: 0, s: 0 };
      return {
        h: Math.floor(diff / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      };
    };
    const timer = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(timer);
  }, [target]);

  return time;
}