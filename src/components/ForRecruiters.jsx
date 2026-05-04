import { useEffect, useRef, useState } from 'react';
import { supabase } from '../supabaseClient';
import './ForRecruiters.css';

const benefits = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M8 12L11 15L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Pre-Verified Candidates',
    desc: 'Every developer on Vericofolio has verified skills backed by real coding performance — no more resume guesswork.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M16 16L21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Smart Search & Filters',
    desc: 'Find developers by tech stack, verified skill level, project quality, platform rankings, and more.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M4 20L8 14L12 17L16 10L20 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="20" cy="4" r="2" fill="currentColor"/>
      </svg>
    ),
    title: 'Real Skill Analytics',
    desc: 'View detailed analytics on candidates: coding streaks, problem-solving stats, GitHub activity, and project portfolios.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M8 12H16M12 8V16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Direct Outreach',
    desc: 'Connect with candidates directly through the platform. No middlemen, no delays — just genuine talent matches.',
  },
];

const ForRecruiters = () => {
  const sectionRef = useRef(null);
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
        .insert([{ email: email.trim(), source: 'recruiters' }]);

      if (supabaseError) {
        if (supabaseError.code === '23505') {
          setError('This email is already on the waitlist.');
        } else {
          setError('Failed to request access. Please try again.');
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
          if (entry.isIntersecting) entry.target.classList.add('recruiters--visible');
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="recruiters" id="recruiters" ref={sectionRef}>
      <div className="recruiters__container">
        <div className="recruiters__header">
          <span className="recruiters__badge">For Recruiters</span>
          <h2 className="recruiters__heading">
            Hire Developers You Can <span className="recruiters__heading-accent">Actually Trust</span>
          </h2>
          <p className="recruiters__sub">
            Stop relying on resumes and self-reported skills. Vericofolio gives you 
            access to developers with verified, data-backed profiles.
          </p>
        </div>

        <div className="recruiters__grid">
          {benefits.map((b, i) => (
            <div className="recruiters__card" key={i} style={{ '--delay': `${i * 0.1}s` }}>
              <div className="recruiters__card-icon">{b.icon}</div>
              <h3 className="recruiters__card-title">{b.title}</h3>
              <p className="recruiters__card-desc">{b.desc}</p>
            </div>
          ))}
        </div>

        {/* Recruiter waitlist */}
        <div className="recruiters__cta-block">
          <div className="recruiters__cta-content">
            <h3 className="recruiters__cta-title">Get Early Recruiter Access</h3>
            <p className="recruiters__cta-desc">
              Be among the first recruiters to access our verified talent pool when we launch.
            </p>
          </div>
          <form className="recruiters__form" onSubmit={handleSubmit} id="recruiter-waitlist-form">
            <input
              type="email"
              placeholder="Your work email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="recruiters__form-input"
              id="recruiter-email-input"
              required
            />
            <button type="submit" className="recruiters__form-btn" id="recruiter-waitlist-btn" disabled={loading}>
              {loading ? 'Submitting...' : submitted ? '✓ You\'re In!' : 'Request Access'}
            </button>
          </form>
          {error && <p className="recruiters__form-error" style={{ position: 'absolute', bottom: '16px', right: '48px', fontSize: '13px', fontWeight: '600', color: '#ef4444' }}>{error}</p>}
          {submitted && !error && (
            <p className="recruiters__form-success">We'll reach out when recruiter access is ready!</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default ForRecruiters;
