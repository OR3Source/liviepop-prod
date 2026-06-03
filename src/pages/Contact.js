import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import './Contact.css';
import { Mail, MessageSquare, Send, AlertTriangle, CheckCircle } from 'lucide-react';

const InstagramIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="20" height="20" rx="6" stroke="#E5457E" strokeWidth="2"/>
    <circle cx="12" cy="12" r="5" stroke="#E5457E" strokeWidth="2"/>
    <circle cx="17.5" cy="6.5" r="1.5" fill="#E5457E"/>
  </svg>
);

const XIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.5 2H21L14.5 10.5L22 22H16L11 15.5L5.5 22H2L9 13L2 2H8L12.5 8L17.5 2Z" fill="#E5457E"/>
  </svg>
);

const Contact = () => {
  const form = useRef();
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const sendEmail = (e) => {
    e.preventDefault();
    setError('');

    emailjs.sendForm('service_zvjde2v', 'template_cdxoouu', form.current, {
      publicKey: 'DVvgE8F-3kmfGiKTl',
    }).then(
      () => {
        setSubmitted(true);
        form.current.reset();
        setTimeout(() => setSubmitted(false), 5000);
      },
      (err) => {
        setError('Something went wrong. Try again!');
        console.log(err.text);
      }
    );
  };

  return (
    <div className="contact-page">
      <div className="contact-header">
        <p className="section-label">Get in Touch</p>
        <h1 className="contact-title">
          Contact <span style={{ color: '#E5457E' }}>Us</span>
        </h1>
      </div>

      <div className="login-dash" />

      <div className="contact-card">
        <span className="login-card-dash" />

        <div className="contact-card-inner">

          <div className="contact-intro">
            <p className="contact-intro-text">
              Have a question or found a bug? We're listening.
            </p>
          </div>

          <div className="contact-socials">
            <a href="mailto:support@liviepop.com" className="social-link">
              <Mail size={18} />
              <span>support@liviepop.com</span>
            </a>
            <a href="https://instagram.com/liviepop" target="_blank" rel="noopener noreferrer" className="social-link">
              <InstagramIcon size={18} />
              <span>@liviepop</span>
            </a>
            <a href="https://x.com/0R3Source" target="_blank" rel="noopener noreferrer" className="social-link">
              <XIcon size={18} />
              <span>@0R3Source</span>
            </a>
          </div>

          <div className="contact-divider">
            <span className="divider-line" />
            <span className="divider-text">or send a message</span>
            <span className="divider-line" />
          </div>

          <form ref={form} onSubmit={sendEmail} className="contact-form">

            <div className="contact-form-row">
              <div className="contact-input-group">
                <label className="contact-label">Name *</label>
                <input
                  type="text"
                  name="name"
                  placeholder="ur name..."
                  required
                  className="contact-input"
                />
              </div>
              <div className="contact-input-group">
                <label className="contact-label">Email *</label>
                <input
                  type="email"
                  name="email"
                  placeholder="ur email..."
                  required
                  className="contact-input"
                />
              </div>
            </div>

            <div className="contact-input-group">
              <label className="contact-label">Subject</label>
              <input
                type="text"
                name="title"
                placeholder="what's this about?"
                className="contact-input"
              />
            </div>

            <div className="contact-input-group">
              <label className="contact-label">Message *</label>
              <textarea
                name="message"
                placeholder="spill ur guts..."
                required
                className="contact-textarea"
                rows={5}
              />
            </div>

            {error && (
              <div className="contact-error">
                <AlertTriangle size={14} />
                <span>{error}</span>
              </div>
            )}

            {submitted && (
              <div className="contact-success">
                <CheckCircle size={14} />
                <span>Message sent! We'll get back to you soon.</span>
              </div>
            )}

            <button type="submit" className="contact-submit-btn">
              <Send size={16} />
              SEND MESSAGE
            </button>
          </form>

          <div className="contact-disclaimer">
            <MessageSquare size={14} />
            <p>
              <strong>Note:</strong> We're not affiliated with Olivia Rodrigo or her team.
              This form is for <span style={{ fontFamily: 'Griffy, cursive' }}>CR</span> inquiries only. For official matters,
              please reach out to her team.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Contact;