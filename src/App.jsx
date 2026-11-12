import { useState } from 'react';

// ---------------------------------------------------------------
// Yahan se text / menu badal sakte hain.
// ---------------------------------------------------------------
const SITE = {
  name: 'BAO:G',
  arabic: 'باؤجی',
  subtitle: 'The Dining Residence',
  fullName: 'BAO:G – The Dining Residence',
  tag: 'Under construction',
  badge: 'Coming Soon',
  text: 'Our website is being prepared. Please check back soon.',
};

// Menu pehle jaisa hi hai.
const NAV_ITEMS = [
  'Home',
  'About Us',
  'Menu',
  'Gallery',
  'Booking',
  'Franchise',
  'Contact Us',
];

function Ornament() {
  return (
    <div className="ornament" aria-hidden="true">
      <span className="ornament-line" />
      <svg width="30" height="30" viewBox="0 0 30 30" focusable="false">
        <g fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M15 2c3 5 3 8 0 13-3-5-3-8 0-13z" />
          <path d="M15 28c3-5 3-8 0-13-3 5-3 8 0 13z" />
          <path d="M2 15c5-3 8-3 13 0-5 3-8 3-13 0z" />
          <path d="M28 15c-5-3-8-3-13 0 5 3 8 3 13 0z" />
        </g>
        <circle cx="15" cy="15" r="2.2" fill="currentColor" />
      </svg>
      <span className="ornament-line" />
    </div>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('Home');

  const handleNav = (e, item) => {
    // Pages abhi tayar nahi hain, is liye sirf highlight badalta hai.
    e.preventDefault();
    setActive(item);
    setMenuOpen(false);
  };

  return (
    <div className="page">
      <header className="site-header">
        <div className="container header-inner">
          <div className="brand">
            <img className="brand-logo" src="/emblem.png" alt="" width="52" height="52" />
            <div>
              <div className="brand-name">{SITE.name}</div>
              <div className="brand-sub">{SITE.subtitle}</div>
            </div>
          </div>

          <button
            type="button"
            className="menu-toggle"
            aria-expanded={menuOpen}
            aria-controls="main-nav"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
              {menuOpen ? (
                <path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              )}
            </svg>
          </button>

          <nav
            id="main-nav"
            aria-label="Main"
            className={`main-nav${menuOpen ? ' is-open' : ''}`}
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item}
                href="#"
                className={item === active ? 'is-active' : ''}
                aria-current={item === active ? 'page' : undefined}
                onClick={(e) => handleNav(e, item)}
              >
                {item}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main className="hero">
        <img
          className="hero-emblem"
          src="/emblem.png"
          alt="BAO:G emblem"
          width="210"
          height="210"
        />
        <p className="hero-arabic" lang="ur" dir="rtl">{SITE.arabic}</p>
        <h1 className="hero-title">{SITE.name}</h1>
        <p className="hero-sub">{SITE.subtitle}</p>
        <Ornament />
        <p className="hero-badge">{SITE.badge}</p>
        <p className="hero-note">
          <span className="visually-hidden">{SITE.tag}. </span>
          {SITE.text}
        </p>
      </main>

      <footer className="site-footer">
        <div className="container">© {SITE.fullName}</div>
      </footer>
    </div>
  );
}
