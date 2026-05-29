import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, MessageCircleQuestionMark } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Header.css';
import headerBottomDesktop from '../assets/outline-dashed-RED.png';
import headerBottomMobile from '../assets/outline-dash-RED.png';
import { PiYarnBold } from 'react-icons/pi';

const Header = ({ onOpenHelp }) => {
  const location = useLocation();
  const { user } = useAuth();

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const currentPath = location.pathname;

  const today = new Date().toLocaleDateString('en-CA', {
    timeZone: 'America/New_York'
  });

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  const prevDate = yesterday.toLocaleDateString('en-CA', {
    timeZone: 'America/New_York'
  });

  const headerBottom = isMobile
    ? headerBottomMobile
    : headerBottomDesktop;

  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'Leaderboard', path: '/leaderboard' },
    user
      ? { name: 'Profile', path: '/profile' }
      : { name: 'Login', path: '/login' }
  ];

  return (
    <div className="header-wrapper">
      <header className="header">
        <div className="header-container">

          <button
            className="hamburger-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            {menuOpen ? (
              <X size={24} strokeWidth={2} />
            ) : (
              <Menu size={24} strokeWidth={2} />
            )}
          </button>

          <Link to="/" className="logo">
            <PiYarnBold
              style={{
                display: 'inline',
                verticalAlign: 'middle',
                fontSize: '40px',
                color: '#FDB1CB'
              }}
            />
            LIVIE<span>POP</span>
          </Link>

          {location.pathname.includes('/play/') && (
            <button
              className="help-btn"
              onClick={onOpenHelp}
              aria-label="How to play"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10,
                flexShrink: 0,
                color: '#000',
                padding: 0
              }}
            >
              <MessageCircleQuestionMark
                size={30}
                strokeWidth={3}
                fill="white"
              />
            </button>
          )}

        </div>

        <div className={`side-menu ${menuOpen ? 'side-menu--open' : ''}`}>
          <div
            className="side-menu-overlay"
            onClick={() => setMenuOpen(false)}
          />

          <nav className="side-menu-panel">
            <button
              className="side-menu-close"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              <X size={20} strokeWidth={2} />
            </button>

            <div className="side-menu-tagline">
              you seem pretty sad for a girl who is always winning
            </div>

            <ul className="side-menu-list">
              {menuItems.map(({ name, path }) => (
                <li key={name}>
                  <Link
                    to={path}
                    className={`side-menu-link${
                      currentPath === path
                        ? ' side-menu-link--active'
                        : ''
                    }`}
                    onClick={() => setMenuOpen(false)}
                  >
                    <span>{name}</span>
                  </Link>
                </li>
              ))}
            </ul>

            {user && (
              <ul className="side-menu-sublist">
                <li>
                  <Link
                    to={`/play/${today}`}
                    onClick={() => setMenuOpen(false)}
                    style={{
                      textDecoration: 'none',
                      color: 'inherit'
                    }}
                  >
                    Play
                  </Link>
                </li>

                <li>
                  <Link
                    to={`/play/prev/${prevDate}`}
                    onClick={() => setMenuOpen(false)}
                    style={{
                      textDecoration: 'none',
                      color: 'inherit'
                    }}
                  >
                    Previous Day
                  </Link>
                </li>
              </ul>
            )}

          </nav>
        </div>

      </header>

      <img
        src={headerBottom}
        alt=""
        className="header-wave"
      />
    </div>
  );
};

export default Header;