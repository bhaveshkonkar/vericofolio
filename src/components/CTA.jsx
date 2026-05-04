import { useEffect, useRef, useState } from 'react';
import { supabase } from '../supabaseClient';
import './CTA.css';

const stats = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="9" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="17" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M2 20C2 17 5 14.5 9 14.5C11 14.5 12.7 15.2 14 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M15 18.5C15 16.5 16 15.5 17 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    value: '2,400+',
    label: 'On the Waitlist',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="4" width="18" height="16" rx="3" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M7 9H17M7 13H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    value: '200+',
    label: 'Companies Interested',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 3L14.5 9L21 9.5L16 14L17.5 20.5L12 17L6.5 20.5L8 14L3 9.5L9.5 9L12 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
    ),
    value: '10+',
    label: 'Platforms Integrated',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M7 8L12 4L17 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M7 12H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M7 16L12 20L17 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    value: '100%',
    label: 'Free to Start',
  },
];

const useCountUp = (target, inView, duration = 2000) => {
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    if (!inView) return;
    const numStr = target.replace(/[^0-9.]/g, '');
    const suffix = target.replace(/[0-9.,]/g, '');
    const num = parseFloat(numStr);
    const hasComma = target.includes(',');
    const start = Date.now();

    const animate = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(2, -10 * progress);
      const current = Math.floor(eased * num);
      setDisplay((hasComma ? current.toLocaleString() : String(current)) + suffix);
      if (progress < 1) requestAnimationFrame(animate);
      else setDisplay(target);
    };
    requestAnimationFrame(animate);
  }, [inView, target, duration]);

  return display;
};

const StatCard = ({ stat, inView, delay }) => {
  const value = useCountUp(stat.value, inView);
  return (
    <div className="cta__stat" style={{ '--delay': delay }}>
      <div className="cta__stat-icon">{stat.icon}</div>
      <div className="cta__stat-value">{value}</div>
      <div className="cta__stat-label">{stat.label}</div>
    </div>
  );
};

const CTA = () => {
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);
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
        .insert([{ email: email.trim(), source: 'cta' }]);

      if (supabaseError) {
        if (supabaseError.code === '23505') {
          setError('This email is already on the waitlist.');
        } else {
          setError('Failed to join waitlist. Please try again.');
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('cta--visible');
            setInView(true);
          }
        });
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="cta" id="cta" ref={sectionRef}>
      <div className="cta__glow cta__glow--1" aria-hidden="true"></div>
      <div className="cta__glow cta__glow--2" aria-hidden="true"></div>

      <div className="cta__container">
        <div className="cta__left">
          <h2 className="cta__heading">
            Ready to Take Your<br/>
            Developer Journey to<br/>
            the <span className="cta__heading-accent">Next Level?</span>
          </h2>
          <p className="cta__desc">
            Join the waitlist today. Be the first to build your
            verified profile when we launch.
          </p>

          <form className="cta__form" onSubmit={handleSubmit} id="cta-waitlist-form">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="cta__form-input"
              id="cta-email-input"
              required
            />
            <button type="submit" className="cta__form-btn" id="cta-waitlist-btn" disabled={loading}>
              {loading ? 'Joining...' : submitted ? '✓ You\'re In!' : 'Join Waitlist'}
            </button>
          </form>
          {error && <p className="cta__form-error" style={{ color: '#ef4444', fontSize: '13px', marginTop: '8px' }}>{error}</p>}
          {submitted && !error && (
            <p className="cta__form-success">🎉 Welcome aboard! We'll email you when we launch.</p>
          )}

          <p className="cta__form-note">No spam. Unsubscribe anytime. Launching soon.</p>
        </div>

        <div className="cta__right">
          {stats.map((s, i) => (
            <StatCard key={i} stat={s} inView={inView} delay={`${i * 0.1}s`} />
          ))}
        </div>
      </div>

      <div className="cta__footer-note">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.2"/>
          <path d="M7 4V7.5M7 9.5V10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        </svg>
        100% Free to get started. No credit card required.
      </div>
    </section>
  );
};

export default CTA;
