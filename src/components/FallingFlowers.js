import React, { useEffect, useState, useCallback } from 'react';
import './FallingFlowers.css';
import flower1 from '../assets/flower1.png';
import flower2 from '../assets/flower2.png';
import flower3 from '../assets/flower3.png';

const FallingFlowers = ({ enabled = true }) => {
  const [flowers, setFlowers] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const maxFlowers = isMobile ? 7 : 20;
  const flowersArray = [flower1, flower2, flower3];

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const createFlower = useCallback(() => {
    const id = Date.now() + Math.random();
    const side = Math.random() > 0.5 ? 'left' : 'right';
    const image = flowersArray[Math.floor(Math.random() * flowersArray.length)];

    const horizontalOffset = 5 + Math.random() * 20;
    const size = 40 + Math.random() * 40;
    const duration = 6 + Math.random() * 7;
    const delay = Math.random() * 2;

    // MUCH less rotation — gentle wobble instead of wild spinning
    const rotationAmount = 13 + Math.random() * 19; // 15-40 degrees max

    const swayAmount = 10 + Math.random() * 40;

    return {
      id,
      side,
      image,
      horizontalOffset,
      size,
      duration,
      delay,
      rotationAmount,
      swayAmount,
    };
  }, [flowersArray]);

  useEffect(() => {
    if (!enabled) {
      setFlowers([]);
      return;
    }

    const interval = setInterval(() => {
      setFlowers(prev => {
        const now = Date.now();
        const active = prev.filter(f => {
          const age = (now - f.id) / 1000;
          return age < (f.duration + f.delay + 2);
        });

        if (active.length < maxFlowers) {
          return [...active, createFlower()];
        }
        return active;
      });
    }, 800);

    return () => clearInterval(interval);
  }, [createFlower, maxFlowers, enabled]);

  if (!enabled) return null;

  return (
    <div className="falling-flowers-container">
      {flowers.map(flower => (
        <img
          key={flower.id}
          src={flower.image}
          alt=""
          className={`falling-flower falling-flower--${flower.side}`}
          style={{
            width: `${flower.size}px`,
            height: `${flower.size}px`,
            [flower.side === 'left' ? 'left' : 'right']: `${flower.horizontalOffset}%`,
            animationDuration: `${flower.duration}s`,
            animationDelay: `${flower.delay}s`,
            '--rotation': `${flower.rotationAmount}deg`,
            '--sway': `${flower.swayAmount}px`,
          }}
        />
      ))}
    </div>
  );
};

export default FallingFlowers;