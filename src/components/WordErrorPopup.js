import React, { useEffect } from 'react';
import './WordErrorPopup.css';

const WordErrorPopup = ({ word, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 2000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="word-error-popup">
      <span className="word-error-text">"{word}" isn't a word</span>
    </div>
  );
};

export default WordErrorPopup;