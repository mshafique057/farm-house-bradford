import { useState } from 'react';

// ---------------------------------------------------------------
// Yahan se text / menu badal sakte hain.
// ---------------------------------------------------------------
const SITE = {
  name: 'Farm House',
  subtitle: 'Bradford · Restaurant',
  fullName: 'Farm House Bradford Restaurant',
  tag: 'Under construction',
  headline: 'Our website is coming soon.',
  text: 'Farm House Bradford Restaurant is getting its website ready. Please check back soon.',
};

const NAV_ITEMS = [
  'Home',
  'About Us',
  'Menu',
  'Gallery',
  'Booking',
  'Franchise',
  'Contact Us',
];

function Wheat({ size = 42 }) {
  return (
    <svg
      width={size * 0.72}
      height={size}
      viewBox="0 0 40 80"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M20 78V18" stroke="#4F6B3A" strokeWidth="3" fill="none" />
      <g fill="#C9962F">
        <ellipse cx="20" cy="12" rx="5" ry="10" />
        <ellipse cx="11" cy="28" rx="5" ry="10" transform="rotate(-35 11 28)" />
        <ellipse cx="29" cy="28" rx="5" ry="10" transform="rotate(35 29 28)" />
        <ellipse cx="11" cy="46" rx="5" ry="10" transform="rotate(-35 11 46)" />
        <ellipse cx="29" cy="46" rx="5" ry="10" transform="rotate(35 29 46)" />
      </g>
    </svg>
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
            <Wheat />
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

      <main className="container hero">
        <div className="hero-text">
          <span className="tag">{SITE.tag}</span>
          <h1>{SITE.headline}</h1>
          <p>{SITE.text}</p>
        </div>

        <div className="sign" role="img" aria-label="Coming soon sign">
          <div className="sign-top">{SITE.fullName.replace(' Restaurant', '').toUpperCase()}</div>
          <div className="sign-main">Coming Soon</div>
          <div className="sign-rule" />
        </div>
      </main>

      <footer className="site-footer">
        <div className="container">© {SITE.fullName}</div>
      </footer>
    </div>
  );
}
