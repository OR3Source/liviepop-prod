import React from 'react';
import './HowToPlay.css';
import { MessageCircleQuestionMark } from 'lucide-react';

const HowToPlay = ({ onClose }) => {
  return (
    <div className="htp-overlay" onClick={onClose}>
      <div className="htp-modal" onClick={e => e.stopPropagation()}>
        <button className="htp-close" onClick={onClose} aria-label="Close">✕</button>

        <div className="htp-header">
          <span className="htp-icon"><MessageCircleQuestionMark size={30} strokeWidth={3} fill='white' /></span>
          <h2 className="htp-title">HOW TO PLAY</h2>
        </div>

        <p className="htp-desc">
          Find the secret phrase. After each attempt, the color of the letters will help you:
        </p>

        <div className="htp-example">
          <div className="htp-row">
            <div className="htp-cell">P</div>
            <div className="htp-cell htp-present">I</div>
            <div className="htp-cell">S</div>
            <div className="htp-cell">C</div>
            <div className="htp-cell">E</div>
            <div className="htp-cell">S</div>
          </div>
          <p className="htp-caption">The letter <strong>I</strong> is in the phrase, but not in this word.</p>
        </div>

        <div className="htp-example">
          <div className="htp-row">
            <div className="htp-cell">A</div>
            <div className="htp-cell htp-correct">N</div>
            <div className="htp-cell htp-present">D</div>
          </div>
          <p className="htp-caption"><strong>N</strong> is in the correct position. <strong>D</strong> is in this word but in the wrong position.</p>
        </div>

        <div className="htp-example">
          <div className="htp-row">
            <div className="htp-cell htp-correct">G</div>
            <div className="htp-cell htp-correct">E</div>
            <div className="htp-cell htp-correct">M</div>
            <div className="htp-cell htp-correct">I</div>
            <div className="htp-cell htp-correct">N</div>
            <div className="htp-cell htp-correct">I</div>
          </div>
          <p className="htp-caption"><strong>All</strong> letters are in the correct position for this phrase.</p>
        </div>

      </div>
    </div>
  );
};

export default HowToPlay;
