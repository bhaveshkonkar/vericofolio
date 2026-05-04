import { useEffect, useRef } from 'react';
import './HowItWorks.css';

const steps = [
  {
    number: '01',
    title: 'Build Your Profile',
    description: 'Create a comprehensive developer profile with your skills, experience, and education.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
        <circle cx="13" cy="10" r="4.5" stroke="white" strokeWidth="2"/>
        <path d="M5 23C5 19 8.5 16 13 16C17.5 16 21 19 21 23" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Verify Your Skills',
    description: 'Connect your coding platforms and let us verify your skills through real performance.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
        <path d="M6 13L11 18L20 8" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="3" y="3" width="20" height="20" rx="5" stroke="white" strokeWidth="2"/>
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Showcase Your Work',
    description: 'Add your best projects, contributions, and achievements to create a stunning portfolio.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
        <rect x="3" y="5" width="20" height="16" rx="3" stroke="white" strokeWidth="2"/>
        <path d="M3 10H23" stroke="white" strokeWidth="2"/>
        <circle cx="6.5" cy="7.5" r="0.8" fill="white"/>
        <circle cx="9" cy="7.5" r="0.8" fill="white"/>
        <circle cx="11.5" cy="7.5" r="0.8" fill="white"/>
      </svg>
    ),
  },
  {
    number: '04',
    title: 'Get Discovered',
    description: 'Top recruiters find and reach out to you based on your verified skills and portfolio.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
        <circle cx="11" cy="11" r="6.5" stroke="white" strokeWidth="2"/>
        <path d="M16 16L23 23" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
      </svg>
    ),
  },
];

const HowItWorks = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('hiw--visible');
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="hiw" id="how-it-works" ref={sectionRef}>
      <div className="hiw__container">
        <div className="hiw__header">
          <span className="hiw__badge">Simple Process</span>
          <h2 className="hiw__heading">
            How It <span className="hiw__heading-accent">Works</span>
          </h2>
          <p className="hiw__sub">
            Get started in minutes and start getting discovered by top companies.
          </p>
        </div>

        <div className="hiw__timeline">
          {/* Connection line */}
          <div className="hiw__line" aria-hidden="true">
            <div className="hiw__line-fill"></div>
          </div>

          {steps.map((step, i) => (
            <div className="hiw__step" key={i} style={{ '--delay': `${i * 0.12}s` }}>
              <div className="hiw__step-icon">
                {step.icon}
              </div>
              <span className="hiw__step-num">{step.number}</span>
              <h3 className="hiw__step-title">{step.title}</h3>
              <p className="hiw__step-desc">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
