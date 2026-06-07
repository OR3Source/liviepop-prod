import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './BetaChecklist.css';
import { CheckCircle, Circle, Bug, MessageSquare, ExternalLink, AlertTriangle } from 'lucide-react';

const DAY_ONE = [
  { id: 'd1-signup', label: <>Sign up for a new account via the <Link to="/login" className="beta-inline-link">login</Link> page</> },
  { id: 'd1-login', label: <>Log in with an existing account on the <Link to="/login" className="beta-inline-link">login</Link> page</> },
  { id: 'd1-daily', label: <>Play and complete <Link to="/" className="beta-inline-link">today's puzzle</Link> (win or lose)</> },
  { id: 'd1-bonus', label: <>Play a <Link to="/bonus" className="beta-inline-link">bonus puzzle</Link> from a previous day</> },
  { id: 'd1-profile', label: <>Check <Link to="/profile" className="beta-inline-link">profile</Link> shows correct info</> },
  { id: 'd1-leaderboard', label: <>View the <Link to="/leaderboard" className="beta-inline-link">leaderboard</Link></> },
  { id: 'd1-share', label: 'Log any bugs you find.' },
];

const DayOnePoints = () => (
  <div className="beta-points-info">
    <h3 className="beta-points-title">Points Breakdown</h3>
    <div className="beta-points-list">
      <div className="beta-points-item">
        
        <span>Current day win: <span className="beta-points-value">50 pts + 2.50 pts (streak bonus)</span></span>
      </div>
      <div className="beta-points-item">
        
        <span>Bonus win: <span className="beta-points-value">15 pts</span></span>
      </div>
      <div className="beta-points-item">
        
        <span>Loss: <span className="beta-points-value">0 pts</span></span>
      </div>
    </div>
  </div>
);

const DAY_TWO = [
  { id: 'd2-bonus-review', label: <>Review your <Link to="/bonus" className="beta-inline-link">bonus puzzle</Link> results from yesterday. p.s. they should be saved</> },
  { id: 'd2-daily', label: <>Play <Link to="/" className="beta-inline-link">today's puzzle</Link> (streak only updates on wins)</> },
  { id: 'd2-about', label: <>Read the <Link to="/about" className="beta-inline-link">About</Link> page</> },
  { id: 'd2-privacy', label: <>Read the <Link to="/privacy" className="beta-inline-link">Privacy</Link> page</> },
  { id: 'd2-contact', label: <>Send a message via the <Link to="/contact" className="beta-inline-link">Contact</Link> form</> },
  { id: 'd2-logout', label: 'Sign out and sign back in' },
  { id: 'd2-share', label: 'Log any bugs you find.' }
];

const DAY_THREE = [
  { id: 'd3-device-1', label: 'Start a puzzle on one device but don\'t finish it.' },
  { id: 'd3-device-2', label: 'Log in on another device. Did your progress save?' },
  { id: 'd3-device-3', label: 'Finish the puzzle on the second device.' },
  { id: 'd3-device-4', label: 'Log in to device one if you aren\'t already, and check if the results match.' },
  { id: 'd3-share', label: 'Log any bugs you find.' },
];

const DAY_FOUR = [
  { id: 'd4-daily', label: <>Complete <Link to="/" className="beta-inline-link">today's puzzle</Link></> },
  { id: 'd4-loved', label: 'Tell me one thing you loved.' },
  { id: 'd4-fix', label: 'Tell me one thing that annoyed you or felt off.' },
  { id: 'd4-daily-q', label: 'Would you actually play this every day?' },
  { id: 'd4-competitive', label: 'Would you want this to be more competitive?' },
  { id: 'd4-prizes', label: 'Would you want to play for prizes (quarterly)?' },
  { id: 'd4-bugs', label: 'Log your feedback and any final bugs.' },
];
const BUG_REPORT_LINK = 'https://tally.so/r/xXzRjd';
const FEEDBACK_LINK = 'https://tally.so/r/2Eo10b';

function BetaChecklist() {
  const [checked, setChecked] = useState(() => {
    const saved = localStorage.getItem('beta_checklist');
    return saved ? JSON.parse(saved) : {};
  });

  const toggle = (id) => {
    const next = { ...checked, [id]: !checked[id] };
    setChecked(next);
    localStorage.setItem('beta_checklist', JSON.stringify(next));
  };

  const allItems = [...DAY_ONE, ...DAY_TWO, ...DAY_THREE, ...DAY_FOUR];
  const completed = allItems.filter(i => checked[i.id]).length;
  const total = allItems.length;
  const percent = Math.round((completed / total) * 100);

  const renderDay = (title, items) => (
    <div className="beta-day">
      <h2 className="beta-day-title">{title}</h2>
      <div className="beta-items">
        {items.map((item) => (
          <button
            key={item.id}
            className={`beta-item ${checked[item.id] ? 'checked' : ''}`}
            onClick={() => toggle(item.id)}
          >
            {checked[item.id] ? (
              <CheckCircle size={20} color="#A92E43" />
            ) : (
              <Circle size={20} color="#ccc" />
            )}
            <span className="beta-item-label">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="beta-page">
      <div className="beta-header">
        <p className="beta-label">BETA TESTING</p>
        <h1 className="beta-title">
          Tester <span style={{ color: '#A92E43' }}>Checklist</span>
        </h1>
        <p className="beta-subtitle">
          Follow each day&apos;s tasks. Check items off as you complete them.
        </p>
      </div>

      <div className="beta-progress">
        <div className="beta-progress-bar">
          <div 
            className="beta-progress-fill" 
            style={{ width: `${percent}%` }}
          />
        </div>
        <span className="beta-progress-text">{completed} / {total} completed</span>
      </div>

      <div className="beta-disclaimer">
        <AlertTriangle size={16} color="#A92E43" />
        <p>
          <strong>Note:</strong> Your progress saves to this browser only. 
          If you switch devices, your checkmarks won&apos;t transfer. 
          Screenshots are encouraged for bug reports!
        </p>
      </div>

      <div className="beta-card">
        {renderDay('Day One: Core Features', DAY_ONE)}
        <DayOnePoints />
        {renderDay('Day Two: Extended Features', DAY_TWO)}
        {renderDay('Day Three: Cross Device Testing', DAY_THREE)}
        {renderDay('Day Four: Honesty Hurts', DAY_FOUR)}
      </div>

      <div className="beta-links">
        <a href={BUG_REPORT_LINK} target="_blank" rel="noopener noreferrer" className="beta-link bug">
          <Bug size={16} />
          Report a Bug
          <ExternalLink size={14} />
        </a>
        <a href={FEEDBACK_LINK} target="_blank" rel="noopener noreferrer" className="beta-link feedback">
          <MessageSquare size={16} />
          Send Feedback
          <ExternalLink size={14} />
        </a>
      </div>

      <div className="beta-version">
        <span>v0.1.0-beta</span>
        <span>•</span>
        <span>Build 2026.06.07</span>
      </div>
    </div>
  );
}

export default BetaChecklist;