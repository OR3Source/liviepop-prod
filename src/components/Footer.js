import React, { useState, useEffect } from 'react';
import './Footer.css';
import footerTopDesktop from '../assets/outline-dashed-RED.png';
import footerTopMobile from '../assets/outline-dash-RED.png';

const Footer = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const footerTop = isMobile ? footerTopMobile : footerTopDesktop;

  const footerLinks = [
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Privacy', href: '/privacy' },
    { name: 'Coming Soon', href: '#', griffy: true }
  ];

  return (
    <>
      <img src={footerTop} alt="" className="footer-wave" />
      <footer className="footer">
        <div className="footer-container">

          <div className="footer-top-row">
            <nav className="footer-nav">
              {footerLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="footer-link"
                  style={link.griffy ? { fontFamily: 'Griffy, cursive' } : undefined}
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </div>

          <hr className="footer-divider"/>

          <div className="footer-bottom-row">
            <div className="disclaimer-line">
              <span className="disclaimer-footer">DISCLAIMER</span>
              <span className="disclaimer-text">We have no affiliation with olivia rodrigo or olivia rodrigo's team.</span>
            </div>
            <p className="footer-copy">
              <span style={{ fontFamily: 'Griffy' }}>&copy;</span>
              <span style={{ fontFamily: 'BM HANNA Air OTF' }}> {new Date().getFullYear()}</span> LiviePop.
            </p>
          </div>

        </div>
      </footer>
    </>
  );
};

export default Footer;