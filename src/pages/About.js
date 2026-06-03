import React from 'react';
import { MessageCircleQuestionMark } from 'lucide-react';
import './About.css';

const About = () => {
  return (
    <div className="gabout-page">

      <div className="gabout-help-icon">
        <MessageCircleQuestionMark size={28} color="#A92E43" />
      </div>

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
            Every day there's a new phrase to figure out. Type your guess using the keyboard and hit ENTER. Each letter will get colored to help you narrow it down.
          </p>
          <p className="gabout-text">
            If you ever forget the rules while playing, tap the <MessageCircleQuestionMark size={15} style={{ verticalAlign: 'middle', color: '#A92E43' }} /> in the top right corner.
          </p>
          <div className="gabout-legend">
            <div className="gabout-legend-row">
              <div className="gabout-tile correct">A</div>
              <p className="gabout-text">Is in the correct postion.</p>
            </div>
            <div className="gabout-legend-row">
              <div className="gabout-tile present">B</div>
              <p className="gabout-text">Is in the phrase, but wrong position.</p>
            </div>
            <div className="gabout-legend-row">
              <div className="gabout-tile absent">C</div>
              <p className="gabout-text">Is not in the phrase at all.</p>
            </div>
          </div>
        </div>

        <div className="gabout-section">
          <h2 className="gabout-heading">Rules</h2>
          <ul className="gabout-list">
            <li>You get 23 attempts to guess the phrase.</li>
            <li>A new puzzle drops every day at midnight ET.</li>
            <li>Log in to track your score and join the leaderboard.</li>
            <li>Streak bonuses add 2.50 points per day. Only current day puzzle counts.</li>
            <li>Missed a day? Play it anytime for up to 15 points. No streak bonus added.</li>
          </ul>
        </div>

        <div className="gabout-section">
          <h2 className="gabout-heading">Leaderboard</h2>
          <p className="gabout-text">
            Each victory will contribute towards your total score and streak. The ranking table is based on the total points you have earned, while the tiebreak is done according to the current streak.
            Switch tabs to see who's on the longest streak.
          </p>
        </div>

        <div className="gabout-section">
          <h2 className="gabout-heading">Disclaimer</h2>
          <p className="gabout-text">
            LiviePop is a fan-made game and is not affiliated with Olivia Rodrigo, her management, Geffen Records, or Interscope Records. All phrases belong to their respective owners.
          </p>
        </div>

      </div>
    </div>
  );
};

export default About;