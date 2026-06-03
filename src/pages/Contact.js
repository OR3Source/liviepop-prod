import { useRef } from 'react';
import emailjs from '@emailjs/browser';

function Contact() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs.sendForm('service_zvjde2v', 'template_cdxoouu', form.current, {
      publicKey: 'DVvgE8F-3kmfGiKTl',
    }).then(() => {
      alert('Message sent!');
      form.current.reset();
    }, (error) => {
      alert('Failed to send. Try again.');
    });
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '40px 20px', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#333' }}>Contact</h2>
      <form ref={form} onSubmit={sendEmail} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input type="text" name="username" placeholder="Username (optional)" style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '16px' }} />
        <input type="text" name="name" placeholder="Your Name" required style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '16px' }} />
        <input type="email" name="email" placeholder="Your Email" required style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '16px' }} />
        <input type="text" name="title" placeholder="Subject" required style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '16px' }} />
        <textarea name="message" placeholder="Your Message" required rows="5" style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '16px', resize: 'vertical' }} />
        <button type="submit" style={{ padding: '14px', borderRadius: '8px', border: 'none', background: '#007bff', color: 'white', fontSize: '16px', cursor: 'pointer', fontWeight: 'bold' }}>Send</button>
      </form>
    </div>
  );
}

export default Contact;