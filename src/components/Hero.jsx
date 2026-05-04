import { useState } from 'react';
import heroImg from '../assets/hero_img.png';
import { supabase } from '../supabaseClient';
import './Hero.css';

const Hero = () => {
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
        .insert([{ email: email.trim(), source: 'hero' }]);

      if (supabaseError) {
        if (supabaseError.code === '23505') {
          // Unique violation error code (PostgreSQL)
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

  return (
    <section className="hero" id="hero">
      {/* Decorative dots */}
      <div className="hero__dots hero__dots--tr" aria-hidden="true">
        {Array.from({ length: 25 }).map((_, i) => <span key={i} className="hero__dot" />)}
      </div>
      <div className="hero__dots hero__dots--bl" aria-hidden="true">
        {Array.from({ length: 16 }).map((_, i) => <span key={i} className="hero__dot" />)}
      </div>

      <div className="hero__container">
        {/* ── Left Column ── */}
        <div className="hero__left">
          <span className="hero__pill">
            <span className="hero__pill-dot"></span>
            Coming Soon — Join the Waitlist
          </span>

          <h1 className="hero__heading">
            <span className="hero__heading-line">Build. Verify.</span>
            <span className="hero__heading-line">Showcase. <span className="hero__heading-accent">Get Hired.</span></span>
          </h1>

          <p className="hero__desc">
            Vericofolio is a platform for developers to build verified profiles,
            showcase real skills, and get discovered by top recruiters. We're
            launching soon — be the first to get access.
          </p>

          {/* Waitlist form */}
          <form className="hero__waitlist" onSubmit={handleSubmit} id="hero-waitlist-form">
            <div className="hero__waitlist-input-wrap">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="hero__waitlist-icon">
                <rect x="2" y="4" width="14" height="10" rx="2" stroke="#a3a3a3" strokeWidth="1.5"/>
                <path d="M2 6L9 10L16 6" stroke="#a3a3a3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="hero__waitlist-input"
                id="hero-email-input"
                required
              />
            </div>
            <button type="submit" className="hero__waitlist-btn" id="hero-waitlist-btn" disabled={loading}>
              {loading ? (
                'Joining...'
              ) : submitted ? (
                <>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8L6.5 11.5L13 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  You're In!
                </>
              ) : (
                'Join Waitlist'
              )}
            </button>
          </form>
          {error && <p className="hero__waitlist-error" style={{ color: '#ef4444', fontSize: '13px', marginTop: '8px' }}>{error}</p>}
          {submitted && !error && (
            <p className="hero__waitlist-success">🎉 You've been added to the waitlist! We'll be in touch soon.</p>
          )}

          <p className="hero__waitlist-note">
            No spam, ever. Be the first to know when we launch.
          </p>

          <div className="hero__proof">
            <div className="hero__proof-count">
              <span className="hero__proof-number">2,400+</span>
              <span className="hero__proof-label">developers already on the waitlist</span>
            </div>
          </div>
        </div>

        {/* ── Right Column — Hero Image ── */}
        <div className="hero__right">
          <div className="hero__img-wrap">
            <img src={heroImg} alt="Vericofolio dashboard preview" className="hero__img" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
