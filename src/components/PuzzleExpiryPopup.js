import React, { useEffect } from 'react';
import './WordErrorPopup.css';

const PuzzleExpiryPopup = ({ onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 2000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="word-error-popup">
      <span className="word-error-text">Puzzle ends in 5 minutes!</span>
    </div>
  );
};

export default PuzzleExpiryPopup;