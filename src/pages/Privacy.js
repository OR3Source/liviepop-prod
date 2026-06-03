import React from 'react';
import './Privacy.css';

const Privacy = () => {
  return (
    <div className="gabout-page">
      <div className="gabout-header">
        <p className="gabout-label">Legal</p>
        <h1 className="gabout-title">Privacy <span className="gabout-title-pink">Policy</span></h1>
      </div>

      <div className="gabout-card">

        <div className="gabout-section">
          <h2 className="gabout-heading">1. Introduction</h2>
          <p className="gabout-text">
            Welcome to <strong>LiviePop</strong>. We respect your privacy and are committed to protecting any personal information you may provide while using our website. This Privacy Policy explains what data we collect, how we use it, and your rights regarding that data.
          </p>
          <p className="gabout-text">
            <strong>Important:</strong> LiviePop is a fan-made, non-commercial game. We are <strong>not</strong> affiliated with Olivia Rodrigo, her management team, Geffen Records, or Interscope Records in any capacity.
          </p>
        </div>

        <div className="gabout-section">
          <h2 className="gabout-heading">2. Information We Collect</h2>
          <p className="gabout-text">We collect minimal information to provide core functionality:</p>
          <ul className="gabout-list">
            <li><strong>Account Information:</strong> When you create an account, we collect your email address, username, and a password (stored securely via Firebase Authentication).</li>
            <li><strong>Game Data:</strong> Your scores, streaks, win/loss history, and leaderboard entries are stored in Firebase Firestore to track your progress.</li>
            <li><strong>User Preferences:</strong> Your game settings and display preferences are saved to personalize your experience.</li>
            <li><strong>Technical Data:</strong> Standard server logs and Supabase analytics for site performance and security purposes.</li>
          </ul>
          <p className="gabout-text"><strong>We do not collect:</strong> Real names, phone numbers, addresses, payment information, government IDs, or any other sensitive personal data.</p>
        </div>

        <div className="gabout-section">
          <h2 className="gabout-heading">3. How We Use Your Information</h2>
          <p className="gabout-text">Your data is used solely to:</p>
          <ul className="gabout-list">
            <li>Authenticate your account and keep you signed in</li>
            <li>Save your scores, streaks, and game history across sessions</li>
            <li>Display your ranking on the public leaderboard</li>
            <li>Improve website performance and fix bugs</li>
            <li>Prevent abuse and maintain fair play</li>
          </ul>
        </div>

        <div className="gabout-section">
          <h2 className="gabout-heading">4. Data Storage & Security</h2>
          <p className="gabout-text">Your data lives in <strong>Supabase</strong>. We don't sell it, share it, or use it for ads. That's it.</p>
        </div>

        <div className="gabout-section">
          <h2 className="gabout-heading">5. Cookies & Tracking</h2>
          <p className="gabout-text">We use essential cookies to maintain your login session and remember your preferences. We do not use tracking cookies, third-party analytics (beyond Firebase's basic usage stats), or any form of behavioral advertising.</p>
        </div>

        <div className="gabout-section">
          <h2 className="gabout-heading">6. Third-Party Services</h2>
          <p className="gabout-text">We use the following third-party services:</p>
          <ul className="gabout-list">
            <li><strong>Supabase</strong> - Authentication, database, and hosting infrastructure</li>
            <li><strong>Cloudflare</strong> - Website hosting and deployment</li>
            <li><strong>EmailJS</strong> - Email delivery and contact form integration</li>
          </ul>
          <p className="gabout-text">Each of these services has their own privacy policies. We encourage you to review them if you have concerns.</p>
        </div>

        <div className="gabout-section">
          <h2 className="gabout-heading">7. Your Rights</h2>
          <p className="gabout-text">You have the right to:</p>
          <ul className="gabout-list">
            <li>Access the personal data we hold about you</li>
            <li>Update or correct your account information at any time</li>
            <li>Delete your account and all associated data permanently</li>
            <li>Use the site without creating an account (with limited features)</li>
          </ul>
          <p className="gabout-text">To request data deletion, contact us at the email listed on our <a href="/contact">Contact</a> page.</p>
        </div>

        <div className="gabout-section">
          <h2 className="gabout-heading">8. Children's Privacy</h2>
          <p className="gabout-text">LiviePop is safe for all ages. We do not knowingly collect personal information from children under 13. If you believe a child has provided us with personal data without parental consent, please contact us immediately and we will remove it.</p>
        </div>

        <div className="gabout-section">
          <h2 className="gabout-heading">9. Changes to This Policy</h2>
          <p className="gabout-text">We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date. Continued use of the site after changes constitutes acceptance of the revised policy.</p>
        </div>

        <div className="gabout-section">
          <h2 className="gabout-heading">10. Contact Us</h2>
          <p className="gabout-text">If you have any questions about this Privacy Policy or how we handle your data, please visit our <a href="/contact">Contact</a> page.</p>
        </div>

        <div className="gabout-footer">
          <p className="gabout-footer-date">Effective Date: June 3, 2026</p>
        </div>

      </div>
    </div>
  );
};

export default Privacy;