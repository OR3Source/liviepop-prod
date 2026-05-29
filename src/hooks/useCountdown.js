import { useState, useEffect } from 'react';

function getNextNoonEST() {
  const now = new Date();
  const est = new Date(now.toLocaleString('en-US', { timeZone: 'America/New_York' }));
  const noon = new Date(est);
  noon.setHours(12, 0, 0, 0);
  
  if (est >= noon) {
    noon.setDate(noon.getDate() + 1);
  }
  
  return new Date(noon.toLocaleString('en-US', { timeZone: 'America/New_York' }));
}

export function useCountdown() {
  const [target] = useState(getNextNoonEST);
  
  const calc = () => {
    const diff = target - new Date();
    if (diff <= 0) return { h: 0, m: 0, s: 0 };
    return {
      h: Math.floor(diff / 3600000),
      m: Math.floor((diff % 3600000) / 60000),
      s: Math.floor((diff % 60000) / 1000),
    };
  };

  const [time, setTime] = useState(calc);

  useEffect(() => {
    const timer = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(timer);
  }, [target]);

  return time;
}