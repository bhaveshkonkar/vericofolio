import { useState, useRef, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import './FeatureSuggestion.css';

const FeatureSuggestion = () => {
  const sectionRef = useRef(null);
  const [suggestion, setSuggestion] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('suggestion--visible');
        });
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (suggestion.trim()) {
      setLoading(true);
      setError(null);

      const { error: supabaseError } = await supabase
        .from('suggestions')
        .insert([
          { 
            suggestion: suggestion.trim(), 
            email: email.trim() || null 
          }
        ]);

      if (supabaseError) {
        setError('Failed to submit suggestion. Please try again.');
        console.error(supabaseError);
        setLoading(false);
      } else {
        setSubmitted(true);
        setSuggestion('');
        setEmail('');
        setLoading(false);
        setTimeout(() => {
          setSubmitted(false);
          setError(null);
        }, 5000);
      }
    }
  };

  return (
    <section className="suggestion" id="suggestion" ref={sectionRef}>
      <div className="suggestion__container">
        <div className="suggestion__content">
          <div className="suggestion__header">
            <span className="suggestion__badge">Shape The Future</span>
            <h2 className="suggestion__heading">
              Have a Feature <span className="suggestion__heading-accent">Idea?</span>
            </h2>
            <p className="suggestion__sub">
              We're building Vericofolio for you. Let us know what features would make this the perfect platform for your career.
            </p>
          </div>

          <div className="suggestion__form-wrapper">
            {submitted ? (
              <div className="suggestion__success-state">
                <div className="suggestion__success-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="#22c55e" strokeWidth="2"/>
                    <path d="M8 12L11 15L16 9" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3>Thank you for your feedback!</h3>
                <p>Your suggestion has been recorded. We read every single one.</p>
                <button onClick={() => setSubmitted(false)} className="suggestion__btn-secondary">
                  Submit another idea
                </button>
              </div>
            ) : (
              <form className="suggestion__form" onSubmit={handleSubmit}>
                <div className="suggestion__input-group">
                  <label htmlFor="suggestion-text">What should we build next?</label>
                  <textarea
                    id="suggestion-text"
                    placeholder="e.g. A way to import projects directly from GitHub..."
                    value={suggestion}
                    onChange={(e) => setSuggestion(e.target.value)}
                    required
                    rows="3"
                    className="suggestion__textarea"
                  ></textarea>
                </div>
                
                <div className="suggestion__input-group">
                  <label htmlFor="suggestion-email">Email (Optional - if you'd like updates)</label>
                  <input
                    type="email"
                    id="suggestion-email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="suggestion__input"
                  />
                </div>

                <button type="submit" className="suggestion__btn-submit" disabled={loading || !suggestion.trim()}>
                  {loading ? 'Submitting...' : 'Submit Idea'}
                </button>

                {error && <p className="suggestion__error">{error}</p>}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSuggestion;
