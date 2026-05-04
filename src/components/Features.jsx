import { useEffect, useRef } from 'react';
import './Features.css';

const features = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="11" stroke="#f97316" strokeWidth="2"/>
        <path d="M9 14L12.5 17.5L19 11" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Verified Profile',
    description: 'Get your skills and projects verified and build trust instantly.',
    gradient: 'linear-gradient(135deg, #fff7ed, #ffedd5)',
    borderColor: 'rgba(249, 115, 22, 0.15)',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="4" y="6" width="20" height="16" rx="3" stroke="#f97316" strokeWidth="2"/>
        <path d="M4 12H24" stroke="#f97316" strokeWidth="2"/>
        <rect x="7" y="15" width="6" height="4" rx="1" fill="#fdba74"/>
      </svg>
    ),
    title: 'Showcase Work',
    description: 'Add projects, achievements and showcase what you have built.',
    gradient: 'linear-gradient(135deg, #fff7ed, #ffedd5)',
    borderColor: 'rgba(249, 115, 22, 0.15)',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M4 22L10 14L14 18L20 10L24 6" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="24" cy="6" r="2.5" fill="#f97316"/>
        <path d="M4 24H24" stroke="#fdba74" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Track Progress',
    description: 'Detailed analytics to track your growth and consistency.',
    gradient: 'linear-gradient(135deg, #fff7ed, #ffedd5)',
    borderColor: 'rgba(249, 115, 22, 0.15)',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="11" r="5" stroke="#f97316" strokeWidth="2"/>
        <path d="M6 24C6 19.58 9.58 16 14 16C18.42 16 22 19.58 22 24" stroke="#f97316" strokeWidth="2" strokeLinecap="round"/>
        <path d="M20 7L24 3M24 3V7M24 3H20" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Get Discovered',
    description: 'Be visible to top recruiters and increase your chances of getting hired.',
    gradient: 'linear-gradient(135deg, #fff7ed, #ffedd5)',
    borderColor: 'rgba(249, 115, 22, 0.15)',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 4L16.8 10.8L24 11.6L18.8 16.4L20.2 23.6L14 20L7.8 23.6L9.2 16.4L4 11.6L11.2 10.8L14 4Z" stroke="#f97316" strokeWidth="2" strokeLinejoin="round"/>
        <circle cx="14" cy="14" r="3" fill="#fdba74"/>
      </svg>
    ),
    title: 'Stand Out',
    description: 'A verified profile helps you stand out from millions of developers.',
    gradient: 'linear-gradient(135deg, #fff7ed, #ffedd5)',
    borderColor: 'rgba(249, 115, 22, 0.15)',
  },
];

const platforms = [
  { name: 'LeetCode', icon: '</>' },
  { name: 'CodeForces', icon: '{ }' },
  { name: 'GitHub', icon: '⊕' },
  { name: 'HackerRank', icon: '◈' },
];

const Features = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('features--visible');
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="features" id="features" ref={sectionRef}>
      <div className="features__container">
        <div className="features__header">
          <h2 className="features__heading">
            Everything You Need to<br/>
            <span className="features__heading-accent">Prove Your Skills</span>
          </h2>
        </div>

        <div className="features__grid">
          {features.map((f, i) => (
            <div className="features__card" key={i} style={{ '--delay': `${i * 0.08}s` }}>
              <div className="features__card-icon-bg" style={{ background: f.gradient, border: `1.5px solid ${f.borderColor}` }}>
                {f.icon}
              </div>
              <h3 className="features__card-title">{f.title}</h3>
              <p className="features__card-desc">{f.description}</p>
            </div>
          ))}
        </div>

        {/* Platform bar */}
        <div className="features__platforms">
          {platforms.map((p, i) => (
            <div className="features__platform" key={i}>
              <span className="features__platform-icon">{p.icon}</span>
              <span className="features__platform-name">{p.name}</span>
            </div>
          ))}
          <span className="features__platform-more">and more…</span>
        </div>
      </div>
    </section>
  );
};

export default Features;
