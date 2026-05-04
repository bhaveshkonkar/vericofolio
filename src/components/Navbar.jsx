import { useState, useEffect } from 'react';
import logoImg from '../assets/vericofolio_logo.png';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToWaitlist = () => {
    setMobileOpen(false);
    document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} id="navbar">
      <div className="navbar__inner container">
        <a href="#" className="navbar__logo" id="nav-logo">
          <img src={logoImg} alt="Vericofolio" className="navbar__logo-img" />
          <span className="navbar__logo-text">Vericofolio</span>
        </a>

        <ul className={`navbar__links ${mobileOpen ? 'navbar__links--open' : ''}`} id="nav-links">
          <li><a href="#features" className="navbar__link" onClick={() => setMobileOpen(false)}>Features</a></li>
          <li><a href="#how-it-works" className="navbar__link" onClick={() => setMobileOpen(false)}>How It Works</a></li>
          <li><a href="#recruiters" className="navbar__link" onClick={() => setMobileOpen(false)}>For Recruiters</a></li>
          
        </ul>

        <div className="navbar__actions">
          <button className="navbar__btn navbar__btn--primary" id="nav-waitlist" onClick={scrollToWaitlist}>
            Join Waitlist
          </button>
        </div>

        <button
          className={`navbar__hamburger ${mobileOpen ? 'navbar__hamburger--open' : ''}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          id="nav-hamburger"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
