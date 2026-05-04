import { useState } from 'react';
import logoImg from '../assets/vericofolio_logo.png';
import { supabase } from '../supabaseClient';
import './Footer.css';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email.trim()) {
      setLoading(true);
      setError(null);

      const { error: supabaseError } = await supabase
        .from('waitlist')
        .insert([{ email: email.trim(), source: 'footer' }]);

      if (supabaseError) {
        if (supabaseError.code === '23505') {
          setError('Already joined');
        } else {
          setError('Error');
          console.error(supabaseError);
        }
        setLoading(false);
      } else {
        setSubmitted(true);
        setEmail('');
        setLoading(false);
        setTimeout(() => {
          setSubmitted(false);
          setError(null);
        }, 4000);
      }
    }
  };

  return (
    <footer className="footer" id="footer">
      <div className="footer__container">
        <div className="footer__top">
          <div className="footer__brand">
            <a href="#" className="footer__logo">
              <img src={logoImg} alt="Vericofolio" className="footer__logo-img" />
              <span className="footer__logo-text">Vericofolio</span>
            </a>
            <p className="footer__brand-desc">
              Build verified developer profiles. Showcase real skills. 
              Get discovered by top recruiters. Launching soon.
            </p>
            <div className="footer__newsletter">
              <form className="footer__newsletter-form" onSubmit={handleSubmit}>
                <input
                  type="email"
                  placeholder="Get launch updates"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="footer__newsletter-input"
                  required
                />
                <button type="submit" className="footer__newsletter-btn" disabled={loading}>
                  {loading ? '...' : submitted ? '✓' : '→'}
                </button>
              </form>
              {error && <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '6px' }}>{error}</p>}
              {submitted && !error && <p style={{ color: '#22c55e', fontSize: '12px', marginTop: '6px' }}>Thanks for joining!</p>}
            </div>
          </div>

          <div className="footer__links-group">
            <h4 className="footer__links-title">Product</h4>
            <ul className="footer__links">
              <li><a href="#features">Features</a></li>
              <li><a href="#how-it-works">How It Works</a></li>
              <li><a href="#recruiters">For Recruiters</a></li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copyright">© 2026 Vericofolio. All rights reserved.</p>
          <div className="footer__socials">
            <a href="https://www.linkedin.com/company/vericofolio" target="_blank" rel="noopener noreferrer" className="footer__social" aria-label="LinkedIn">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect x="2" y="2" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.3"/>
                <path d="M5.5 7v3.5M5.5 5.5V5.51M8.5 10.5V8.5C8.5 7.67 9.17 7 10 7C10.83 7 11.5 7.67 11.5 8.5V10.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
