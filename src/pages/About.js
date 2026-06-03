import React from 'react';
import { MessageCircleQuestionMark, Gamepad2, Trophy, ScrollText, AlertTriangle } from 'lucide-react';
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
            Can you unravel it? 
            <br />
            <span className="gabout-manifesto-pink">One phrase. Every day.</span>
          </p>
        </div>

        <div className="gabout-section">
          <h2 className="gabout-heading"><Gamepad2 size={18} /> How To Play</h2>
          <p className="gabout-text">
            Every day there's a new phrase to figure out. Type your guess using the keyboard and hit ENTER. Each letter will get colored to help you narrow it down.
          </p>
          <p className="gabout-text">
            If you ever forget the rules while playing, tap the <MessageCircleQuestionMark size={15} style={{ verticalAlign: 'middle', color: '#A92E43' }} /> in the top right corner.
          </p>
          <div className="gabout-legend">
            <div className="gabout-legend-row">
              <div className="gabout-tile correct">L</div>
              <p className="gabout-text">Is in the correct postion.</p>
            </div>
            <div className="gabout-legend-row">
              <div className="gabout-tile present">I</div>
              <p className="gabout-text">Is in the phrase, but wrong position.</p>
            </div>
            <div className="gabout-legend-row">
              <div className="gabout-tile absent">V</div>
              <p className="gabout-text">Is not in the phrase at all.</p>
            </div>
          </div>
        </div>

        <div className="gabout-section">
          <h2 className="gabout-heading"><ScrollText size={18} /> Rules</h2>
          <ul className="gabout-list">
            <li>You get <strong>23</strong> attempts to guess the phrase.</li>
            <li>A new puzzle drops every day at midnight ET.</li>
            <li>Log in to track your score and join the leaderboard.</li>
            <li>Streak bonuses add 2.50 points per day. Only current day puzzle counts.</li>
            <li><strong>Missed a day?</strong> Play it anytime for up to 15 points. No streak bonus added.</li>
          </ul>
        </div>

        <div className="gabout-section">
          <h2 className="gabout-heading"><Trophy size={18} /> Leaderboard</h2>
          <p className="gabout-text">
            Every win adds to your score and streak. Players are ranked by total points, with ties broken by current streak. 
            Switch tabs to see who has the longest streaks.
          </p>
        </div>

        <div className="gabout-section">
          <h2 className="gabout-heading"><AlertTriangle size={18} /> Disclaimer</h2>
          <p className="gabout-text">
            LiviePop is a fan-made game and is not affiliated with Olivia Rodrigo, her management, Geffen Records, or Interscope Records. All phrases belong to their respective owners.
          </p>
        </div>

      </div>
    </div>
  );
};

export default About;