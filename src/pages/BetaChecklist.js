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
  { id: 'd1-points', label: (
    <div className="beta-points-info">
      <h3 className="beta-points-title">Points Breakdown</h3>
      <ul className="beta-points-list">
        <li className="beta-points-item">
          <span className="beta-points-bullet" />
          <span>Current day win: <span className="beta-points-value">50 pts + streak bonus (2.50× streak)</span></span>
        </li>
        <li className="beta-points-item">
          <span className="beta-points-bullet" />
          <span>Bonus win: <span className="beta-points-value">15 pts</span></span>
        </li>
        <li className="beta-points-item">
          <span className="beta-points-bullet" />
          <span>Loss: <span className="beta-points-value">0 pts</span></span>
        </li>
      </ul>
    </div>
  ) },
];

const DAY_TWO = [
  { id: 'd2-bonus-review', label: <>Review your <Link to="/bonus" className="beta-inline-link">bonus puzzle</Link> results from yesterday — they should be saved</> },
  { id: 'd2-daily', label: <>Play <Link to="/" className="beta-inline-link">today's puzzle</Link> and WIN (streak only updates on wins)</> },
  { id: 'd2-about', label: <>Read the <Link to="/about" className="beta-inline-link">About</Link> page</> },
  { id: 'd2-privacy', label: <>Read the <Link to="/privacy" className="beta-inline-link">Privacy</Link> page</> },
  { id: 'd2-contact', label: <>Send a message via the <Link to="/contact" className="beta-inline-link">Contact</Link> form</> },
  { id: 'd2-logout', label: 'Sign out and sign back in' },
];

const DAY_THREE = [
  { id: 'd3-mobile', label: 'Test on a mobile device (phone)' },
  { id: 'd3-ipad', label: 'Test on a tablet (iPad, Android tablet, etc.)' },
  { id: 'd3-desktop', label: 'Test on a desktop/laptop browser' },
  { id: 'd3-share', label: 'Share your score / screenshot' },
];

const DAY_FOUR = [
  { id: 'd4-edge', label: 'Try edge cases: refresh mid-game, back button, etc.' },
  { id: 'd4-bugs', label: 'Report any bugs or weird behavior' },
  { id: 'd4-feedback', label: 'Send general feedback / feature requests' },
];

const BUG_REPORT_LINK = 'https://github.com/YOUR_USERNAME/YOUR_REPO/issues/new?template=bug_report.md';
const FEEDBACK_LINK = 'https://discord.com/invite/YOUR_INVITE';

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
        {renderDay('Day Two: Extended Features', DAY_TWO)}
        {renderDay('Day Three: Cross-Device', DAY_THREE)}
        {renderDay('Day Four: Edge Cases & Wrap Up', DAY_FOUR)}
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