import React, { useState, useEffect } from 'react';
import {
  Utensils,
  Settings,
  CheckCircle2,
  Plus,
  Trash2,
  Eye,
  Lock,
  Unlock,
  Menu as MenuIcon,
  X
} from 'lucide-react';

const COLOR_THEMES = {
  gold: {
    id: 'gold',
    name: 'Dark & Gold',
    bgPrimary: 'bg-stone-950',
    bgCard: 'bg-stone-900',
    textPrimary: 'text-stone-100',
    textSecondary: 'text-stone-400',
    accentBg: 'bg-amber-500',
    accentText: 'text-amber-400',
    buttonText: 'text-stone-950'
  },
  emerald: {
    id: 'emerald',
    name: 'Emerald & Cream',
    bgPrimary: 'bg-emerald-950',
    bgCard: 'bg-emerald-900',
    textPrimary: 'text-emerald-50',
    textSecondary: 'text-emerald-200/70',
    accentBg: 'bg-amber-400',
    accentText: 'text-amber-300',
    buttonText: 'text-emerald-950'
  },
  light: {
    id: 'light',
    name: 'Clean Light & Black',
    bgPrimary: 'bg-stone-50',
    bgCard: 'bg-white',
    textPrimary: 'text-stone-900',
    textSecondary: 'text-stone-500',
    accentBg: 'bg-stone-900',
    accentText: 'text-stone-900',
    buttonText: 'text-white'
  }
};

const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About Us' },
  { id: 'menu', label: 'Menu' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'booking', label: 'Booking' },
  { id: 'franchise', label: 'Franchise' },
  { id: 'contact', label: 'Contact Us' }
];

const INITIAL_SITE_DATA = {
  brandName: 'Farm House Bradford Restaurant',
  theme: 'gold',
  globalComingSoon: true,
  comingSoonTitle: 'Coming Soon',
  comingSoonText: 'Our website is currently under construction.',
  phone: '+44 1274 000000',
  email: 'info@farmhousebradford.co.uk',
  address: 'Bradford, United Kingdom',
  aboutText: 'Welcome to our official website. Edit this text anytime from the Admin panel.',
  pageStatus: {
    home: 'coming_soon',
    about: 'coming_soon',
    menu: 'coming_soon',
    gallery: 'coming_soon',
    booking: 'coming_soon',
    franchise: 'coming_soon',
    contact: 'coming_soon'
  },
  menuItems: [
    { id: 'm1', name: 'Special Dish 1', category: 'Main', price: '£14.95' },
    { id: 'm2', name: 'Special Dish 2', category: 'Starter', price: '£8.95' }
  ]
};

export default function App() {
  const [siteData, setSiteData] = useState(() => {
    try {
      const saved = localStorage.getItem('farm_house_bradford_cms_v1');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // ignore
    }
    return INITIAL_SITE_DATA;
  });

  const [activePage, setActivePage] = useState('home');
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Simple backend records for forms when pages go live
  const [bookings, setBookings] = useState([]);
  const [franchiseLeads, setFranchiseLeads] = useState([]);
  const [messages, setMessages] = useState([]);

  const [bookingForm, setBookingForm] = useState({ name: '', phone: '', date: '', guests: '2 Guests' });
  const [franchiseForm, setFranchiseForm] = useState({ name: '', phone: '', city: '' });
  const [contactForm, setContactForm] = useState({ name: '', message: '' });
  const [newMenuItem, setNewMenuItem] = useState({ name: '', price: '' });

  useEffect(() => {
    try {
      localStorage.setItem('farm_house_bradford_cms_v1', JSON.stringify(siteData));
    } catch (e) {
      // ignore
    }
  }, [siteData]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const theme = COLOR_THEMES[siteData.theme] || COLOR_THEMES.gold;
  const isLight = siteData.theme === 'light';
  const borderClass = isLight ? 'border-stone-200' : 'border-stone-800';

  const isCurrentPageComingSoon =
    siteData.globalComingSoon || siteData.pageStatus[activePage] === 'coming_soon';

  const currentNavLabel = NAV_ITEMS.find((i) => i.id === activePage)?.label || 'Home';

  const toggleAllPages = (makeComingSoon) => {
    const nextStatus = {};
    NAV_ITEMS.forEach((item) => {
      nextStatus[item.id] = makeComingSoon ? 'coming_soon' : 'live';
    });
    setSiteData((prev) => ({
      ...prev,
      globalComingSoon: makeComingSoon,
      pageStatus: nextStatus
    }));
    showToast(makeComingSoon ? 'Coming Soon mode active' : 'Full Website mode active');
  };

  const toggleSinglePage = (id) => {
    setSiteData((prev) => {
      const next = prev.pageStatus[id] === 'coming_soon' ? 'live' : 'coming_soon';
      const updated = { ...prev.pageStatus, [id]: next };
      const allCS = Object.values(updated).every((v) => v === 'coming_soon');
      return { ...prev, globalComingSoon: allCS, pageStatus: updated };
    });
  };

  const handleAddDish = (e) => {
    e.preventDefault();
    if (!newMenuItem.name.trim() || !newMenuItem.price.trim()) return;
    setSiteData((prev) => ({
      ...prev,
      menuItems: [...prev.menuItems, { id: 'm_' + Date.now(), name: newMenuItem.name, price: newMenuItem.price }]
    }));
    setNewMenuItem({ name: '', price: '' });
    showToast('Item added');
  };

  const handleDeleteDish = (id) => {
    setSiteData((prev) => ({
      ...prev,
      menuItems: prev.menuItems.filter((item) => item.id !== id)
    }));
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!bookingForm.name.trim()) return;
    setBookings((prev) => [{ id: Date.now(), ...bookingForm }, ...prev]);
    setBookingForm({ name: '', phone: '', date: '', guests: '2 Guests' });
    showToast('Booking saved');
  };

  const handleFranchiseSubmit = (e) => {
    e.preventDefault();
    if (!franchiseForm.name.trim()) return;
    setFranchiseLeads((prev) => [{ id: Date.now(), ...franchiseForm }, ...prev]);
    setFranchiseForm({ name: '', phone: '', city: '' });
    showToast('Application saved');
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!contactForm.name.trim()) return;
    setMessages((prev) => [{ id: Date.now(), ...contactForm }, ...prev]);
    setContactForm({ name: '', message: '' });
    showToast('Message saved');
  };

  return (
    <div className={`min-h-screen ${theme.bgPrimary} ${theme.textPrimary} font-sans flex flex-col`}>
      {toastMessage && (
        <div className="fixed bottom-4 right-4 z-50 bg-stone-900 text-white px-4 py-2.5 rounded-lg shadow-lg text-xs flex items-center gap-2 border border-stone-700">
          <CheckCircle2 className="w-4 h-4 text-amber-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Clean Simple Header with Screenshot Menu */}
      <header className={`border-b ${borderClass}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => {
              setActivePage('home');
              setIsAdminOpen(false);
            }}
            className="font-bold tracking-wider text-base sm:text-lg uppercase flex items-center gap-2"
          >
            <Utensils className={`w-4 h-4 ${theme.accentText}`} />
            <span>{siteData.brandName}</span>
          </button>

          {/* Exact Menu: Home | About Us | Menu | Gallery | Booking | Franchise | Contact Us */}
          <nav aria-label="Main Menu" className="hidden md:flex items-center gap-1 lg:gap-2">
            {NAV_ITEMS.map((item, idx) => {
              const isActive = activePage === item.id && !isAdminOpen;
              return (
                <React.Fragment key={item.id}>
                  <button
                    type="button"
                    onClick={() => {
                      setActivePage(item.id);
                      setIsAdminOpen(false);
                    }}
                    className={`px-2.5 py-1.5 rounded-md text-xs lg:text-sm font-medium transition ${
                      isActive
                        ? `${theme.accentBg} ${theme.buttonText}`
                        : `${theme.textSecondary} hover:opacity-100`
                    }`}
                  >
                    {item.label}
                  </button>
                  {idx < NAV_ITEMS.length - 1 && (
                    <span className="opacity-30 text-xs select-none">|</span>
                  )}
                </React.Fragment>
              );
            })}
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg border border-current/20"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className={`md:hidden border-t ${borderClass} px-4 py-3 space-y-1`}>
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setActivePage(item.id);
                  setIsAdminOpen(false);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                  activePage === item.id && !isAdminOpen
                    ? `${theme.accentBg} ${theme.buttonText}`
                    : theme.textSecondary
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* Main Content Area */}
      {isAdminOpen ? (
        /* SIMPLE ADMIN PANEL (WP-Admin Style) */
        <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-8">
          <div className={`${theme.bgCard} border ${borderClass} rounded-xl p-6 space-y-6`}>
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-current/10 pb-4">
              <div>
                <h1 className="text-lg font-bold">Simple Admin Panel (Backend)</h1>
                <p className={`text-xs ${theme.textSecondary}`}>
                  Yahan se naam, color aur Coming Soon / Live mode badlein.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsAdminOpen(false)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 ${theme.accentBg} ${theme.buttonText}`}
              >
                <Eye className="w-3.5 h-3.5" /> Back to Website
              </button>
            </div>

            {/* 1. Mode Switch */}
            <div className="p-4 rounded-lg border border-current/10 flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="text-sm font-semibold">Website Mode</div>
                <div className={`text-xs ${theme.textSecondary}`}>
                  Abhi Coming Soon rakhna hai ya poori site dikhani hai?
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => toggleAllPages(true)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${
                    siteData.globalComingSoon
                      ? `${theme.accentBg} ${theme.buttonText} border-transparent`
                      : 'border-current/20 opacity-70'
                  }`}
                >
                  Coming Soon Mode
                </button>
                <button
                  type="button"
                  onClick={() => toggleAllPages(false)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${
                    !siteData.globalComingSoon
                      ? `${theme.accentBg} ${theme.buttonText} border-transparent`
                      : 'border-current/20 opacity-70'
                  }`}
                >
                  Full Live Site
                </button>
              </div>
            </div>

            {/* 2. Basic Settings */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={`block text-xs ${theme.textSecondary} mb-1`}>Site / Brand Name</label>
                <input
                  type="text"
                  value={siteData.brandName}
                  onChange={(e) => setSiteData({ ...siteData, brandName: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-transparent border border-current/20 text-sm"
                />
              </div>
              <div>
                <label className={`block text-xs ${theme.textSecondary} mb-1`}>Color Theme</label>
                <select
                  value={siteData.theme}
                  onChange={(e) => setSiteData({ ...siteData, theme: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-stone-900 text-white border border-stone-700 text-sm"
                >
                  {Object.values(COLOR_THEMES).map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className={`block text-xs ${theme.textSecondary} mb-1`}>Coming Soon Heading</label>
                <input
                  type="text"
                  value={siteData.comingSoonTitle}
                  onChange={(e) => setSiteData({ ...siteData, comingSoonTitle: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-transparent border border-current/20 text-sm"
                />
              </div>
              <div>
                <label className={`block text-xs ${theme.textSecondary} mb-1`}>Coming Soon Subtitle</label>
                <input
                  type="text"
                  value={siteData.comingSoonText}
                  onChange={(e) => setSiteData({ ...siteData, comingSoonText: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-transparent border border-current/20 text-sm"
                />
              </div>
            </div>

            {/* 3. Individual Page Toggle */}
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider mb-2 opacity-75">
                Individual Pages (Click to Toggle Coming Soon / Live)
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {NAV_ITEMS.map((item) => {
                  const isCS = siteData.globalComingSoon || siteData.pageStatus[item.id] === 'coming_soon';
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => toggleSinglePage(item.id)}
                      className="p-2.5 rounded-lg border border-current/15 text-left flex items-center justify-between text-xs"
                    >
                      <span className="font-medium">{item.label}</span>
                      {isCS ? (
                        <Lock className="w-3.5 h-3.5 opacity-60" />
                      ) : (
                        <Unlock className="w-3.5 h-3.5 text-emerald-400" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4. Simple Menu Manager */}
            <div className="pt-2 border-t border-current/10">
              <div className="text-xs font-semibold uppercase tracking-wider mb-2 opacity-75">
                Menu Items (For Menu Page)
              </div>
              <form onSubmit={handleAddDish} className="flex gap-2 mb-3">
                <input
                  type="text"
                  placeholder="Item Name"
                  value={newMenuItem.name}
                  onChange={(e) => setNewMenuItem({ ...newMenuItem, name: e.target.value })}
                  className="flex-1 px-3 py-1.5 rounded-lg bg-transparent border border-current/20 text-xs"
                />
                <input
                  type="text"
                  placeholder="Price (e.g. £12.95)"
                  value={newMenuItem.price}
                  onChange={(e) => setNewMenuItem({ ...newMenuItem, price: e.target.value })}
                  className="w-36 px-3 py-1.5 rounded-lg bg-transparent border border-current/20 text-xs"
                />
                <button
                  type="submit"
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 ${theme.accentBg} ${theme.buttonText}`}
                >
                  <Plus className="w-3.5 h-3.5" /> Add
                </button>
              </form>
              <div className="space-y-1.5">
                {siteData.menuItems.map((m) => (
                  <div
                    key={m.id}
                    className="px-3 py-2 rounded-lg border border-current/10 flex items-center justify-between text-xs"
                  >
                    <span>
                      {m.name} — <strong>{m.price}</strong>
                    </span>
                    <button
                      type="button"
                      onClick={() => handleDeleteDish(m.id)}
                      className="text-rose-400 hover:text-rose-300"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      ) : isCurrentPageComingSoon ? (
        /* ULTRA-SIMPLE COMING SOON SCREEN */
        <main className="flex-1 flex flex-col items-center justify-center px-4 text-center py-20">
          <p className={`text-xs uppercase tracking-widest ${theme.accentText} font-semibold mb-3`}>
            {currentNavLabel}
          </p>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight">
            {siteData.comingSoonTitle}
          </h1>
          <p className={`mt-3 text-sm sm:text-base ${theme.textSecondary} max-w-md`}>
            {siteData.comingSoonText}
          </p>
        </main>
      ) : (
        /* CLEAN & SIMPLE LIVE PAGES (For When Site Is Completed Later) */
        <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-16">
          {activePage === 'home' && (
            <div className="text-center space-y-4 py-10">
              <h1 className="text-3xl sm:text-5xl font-bold">{siteData.brandName}</h1>
              <p className={`text-sm sm:text-base ${theme.textSecondary} max-w-lg mx-auto`}>
                {siteData.aboutText}
              </p>
              <div className="pt-4 flex justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setActivePage('menu')}
                  className={`px-5 py-2.5 rounded-lg text-xs font-semibold ${theme.accentBg} ${theme.buttonText}`}
                >
                  View Menu
                </button>
                <button
                  type="button"
                  onClick={() => setActivePage('booking')}
                  className="px-5 py-2.5 rounded-lg text-xs font-semibold border border-current/20"
                >
                  Book a Table
                </button>
              </div>
            </div>
          )}

          {activePage === 'about' && (
            <div className="space-y-3">
              <h1 className="text-2xl font-bold">About Us</h1>
              <p className={`text-sm ${theme.textSecondary} leading-relaxed`}>{siteData.aboutText}</p>
            </div>
          )}

          {activePage === 'menu' && (
            <div className="space-y-4">
              <h1 className="text-2xl font-bold">Menu</h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {siteData.menuItems.map((item) => (
                  <div
                    key={item.id}
                    className={`p-4 rounded-xl ${theme.bgCard} border ${borderClass} flex items-center justify-between`}
                  >
                    <span className="font-medium text-sm">{item.name}</span>
                    <span className={`font-bold text-sm ${theme.accentText}`}>{item.price}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activePage === 'gallery' && (
            <div className="space-y-4">
              <h1 className="text-2xl font-bold">Gallery</h1>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[1, 2, 3].map((slot) => (
                  <div
                    key={slot}
                    className={`h-40 rounded-xl ${theme.bgCard} border ${borderClass} flex items-center justify-center text-xs ${theme.textSecondary}`}
                  >
                    Gallery Slot {slot}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activePage === 'booking' && (
            <div className="max-w-md mx-auto space-y-4">
              <h1 className="text-2xl font-bold">Booking</h1>
              <form onSubmit={handleBookingSubmit} className="space-y-3">
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  value={bookingForm.name}
                  onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-transparent border border-current/20 text-sm"
                />
                <input
                  type="text"
                  placeholder="Phone Number"
                  value={bookingForm.phone}
                  onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-transparent border border-current/20 text-sm"
                />
                <button
                  type="submit"
                  className={`w-full py-2.5 rounded-lg text-xs font-semibold ${theme.accentBg} ${theme.buttonText}`}
                >
                  Submit Booking ({bookings.length})
                </button>
              </form>
            </div>
          )}

          {activePage === 'franchise' && (
            <div className="max-w-md mx-auto space-y-4">
              <h1 className="text-2xl font-bold">Franchise</h1>
              <form onSubmit={handleFranchiseSubmit} className="space-y-3">
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  value={franchiseForm.name}
                  onChange={(e) => setFranchiseForm({ ...franchiseForm, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-transparent border border-current/20 text-sm"
                />
                <input
                  type="text"
                  placeholder="City"
                  value={franchiseForm.city}
                  onChange={(e) => setFranchiseForm({ ...franchiseForm, city: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-transparent border border-current/20 text-sm"
                />
                <button
                  type="submit"
                  className={`w-full py-2.5 rounded-lg text-xs font-semibold ${theme.accentBg} ${theme.buttonText}`}
                >
                  Submit Inquiry ({franchiseLeads.length})
                </button>
              </form>
            </div>
          )}

          {activePage === 'contact' && (
            <div className="max-w-md mx-auto space-y-4">
              <h1 className="text-2xl font-bold">Contact Us</h1>
              <p className={`text-xs ${theme.textSecondary}`}>
                {siteData.phone} • {siteData.email} • {siteData.address}
              </p>
              <form onSubmit={handleContactSubmit} className="space-y-3">
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-transparent border border-current/20 text-sm"
                />
                <textarea
                  rows={3}
                  placeholder="Message"
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-transparent border border-current/20 text-sm"
                />
                <button
                  type="submit"
                  className={`w-full py-2.5 rounded-lg text-xs font-semibold ${theme.accentBg} ${theme.buttonText}`}
                >
                  Send Message ({messages.length})
                </button>
              </form>
            </div>
          )}
        </main>
      )}

      {/* Minimal Footer with Small Discrete Admin Link */}
      <footer className={`border-t ${borderClass} py-4 px-4 sm:px-6 text-xs ${theme.textSecondary}`}>
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span>© {siteData.brandName}</span>
          <button
            type="button"
            onClick={() => setIsAdminOpen(!isAdminOpen)}
            className="inline-flex items-center gap-1 opacity-60 hover:opacity-100 transition"
          >
            <Settings className="w-3.5 h-3.5" />
            <span>{isAdminOpen ? 'Close Admin' : 'Admin'}</span>
          </button>
        </div>
      </footer>
    </div>
  );
}