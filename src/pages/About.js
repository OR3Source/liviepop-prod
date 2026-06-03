import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="gabout-page">

      <div className="gabout-header">
        <p className="gabout-label">the game</p>
        <h1 className="gabout-title">About <span className="gabout-title-pink">LiviePop</span></h1>
      </div>

      <div className="gabout-card">

        <div className="gabout-manifesto">
          <p className="gabout-manifesto-text">
            Guess the Olivia Rodrigo lyric.<br />
            <span className="gabout-manifesto-pink">One phrase. Every day.</span>
          </p>
        </div>

        <div className="gabout-section">
          <h2 className="gabout-heading">How To Play</h2>
          <p className="gabout-text">
            Each day there is a new hidden Olivia Rodrigo lyric. Type in a guess using the on-screen keyboard and hit ENTER. Every letter gets colored to help you zero in on the answer.
          </p>
          <div className="gabout-legend">
            <div className="gabout-legend-row">
              <div className="gabout-tile correct">A</div>
              <p className="gabout-text">Right letter, right spot.</p>
            </div>
            <div className="gabout-legend-row">
              <div className="gabout-tile present">B</div>
              <p className="gabout-text">Right letter, wrong spot.</p>
            </div>
            <div className="gabout-legend-row">
              <div className="gabout-tile absent">C</div>
              <p className="gabout-text">Not in the phrase at all.</p>
            </div>
          </div>
        </div>

        <div className="gabout-section">
          <h2 className="gabout-heading">Rules</h2>
          <ul className="gabout-list">
            <li>You get 6 attempts to guess the phrase.</li>
            <li>Each guess must use real English words.</li>
            <li>The phrase length and word breaks are shown in the grid.</li>
            <li>A new puzzle drops every day at midnight ET.</li>
            <li>Log in to save your score and streak.</li>
          </ul>
        </div>

        <div className="gabout-section">
          <h2 className="gabout-heading">Scoring</h2>
          <p className="gabout-text">
            Points are awarded based on how few guesses you use. Fewer attempts means more points. Build a daily streak to multiply your score over time.
          </p>
        </div>

        <div className="gabout-section">
          <h2 className="gabout-heading">Disclaimer</h2>
          <p className="gabout-text">
            LiviePop is a fan-made game and is not affiliated with Olivia Rodrigo, her management, Geffen Records, or Interscope Records. All lyrics belong to their respective owners.
          </p>
        </div>

      </div>
    </div>
  );
};

export default About;