import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { useCart } from '@app/providers/CartProvider';

export default function MainLayout() {
  const [open, setOpen] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);
  const { count } = useCart();
  const [bump, setBump] = useState(false);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCmdOpen((v) => !v);
      }
      if (e.key === 'Escape') setCmdOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    if (count <= 0) return;
    setBump(true);
    const t = setTimeout(() => setBump(false), 350);
    return () => clearTimeout(t);
  }, [count]);

  return (
    <>
      <header className="navbar" role="banner">
        <div className="container navbar-inner" style={{ gap: '1rem' }}>
          <div className="nav-left" style={{ display: 'flex', alignItems: 'center', gap: '.75rem' }}>
            <button
              className="menu-toggle"
              aria-label="Toggle navigation menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            </button>
          <Link to="/" className="brand" aria-label="Event Project home">
            <span className="brand-badge" aria-hidden>
              <img src="/brand.svg" className="brand-mark" alt="" />
            </span>
            <span>Event Project</span>
          </Link>
          </div>

          <nav className="nav-center" aria-label="Primary" style={{ display: 'flex', gap: '.25rem', alignItems: 'center' }}>
            <NavLink to="/" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>Discover</NavLink>
            <NavLink to="/tickets" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>Tickets</NavLink>
            <a href="#highlights" className="nav-link">Highlights</a>
            <a href="#faq" className="nav-link">FAQ</a>
          </nav>

          <div className="nav-right" style={{ display: 'flex', alignItems: 'center', gap: '.6rem' }}>
            <button
              type="button"
              className="cmdk-trigger"
              onClick={() => setCmdOpen(true)}
              aria-haspopup="dialog"
              aria-expanded={cmdOpen}
              aria-controls="cmdk-panel"
              title="Cari cepat (Ctrl+K)"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14Zm6-1 4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
              </svg>
              <span className="muted">Quick Find</span>
              <span className="key">Ctrl K</span>
            </button>
            <Link to="/checkout" className="nav-icon cart" aria-label="Keranjang" title="Keranjang">
              <span className="icon-badge" aria-hidden />
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden focusable="false">
                <path d="M7 9h10l-1 9H8L7 9Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
                <path d="M9 9V8a3 3 0 1 1 6 0v1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="10" cy="19" r="1.5" fill="currentColor"/>
                <circle cx="16" cy="19" r="1.5" fill="currentColor"/>
              </svg>
              <span className={`count-badge${bump ? ' bump' : ''}`} aria-hidden>{count}</span>
              <span className="sr-only">Buka keranjang</span>
            </Link>
            <Link to="/tickets" className="btn btn-primary" style={{ marginLeft: '.25rem' }}>Get Tickets</Link>
          </div>
        </div>

        {/* Mobile drawer */}
        <div className={`mobile-backdrop${open ? ' open' : ''}`} onClick={() => setOpen(false)} />
        <div id="mobile-menu" className={`mobile-panel${open ? ' open' : ''}`}>
          <div className="container" style={{ padding: '1rem' }}>
            <button
              type="button"
              className="cmdk-trigger"
              onClick={() => { setOpen(false); setCmdOpen(true); }}
              aria-haspopup="dialog"
              aria-expanded={cmdOpen}
              aria-controls="cmdk-panel"
              title="Cari cepat (Ctrl+K)"
              style={{ width: '100%' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14Zm6-1 4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
              </svg>
              <span className="muted">Quick Find</span>
              <span className="key">Ctrl K</span>
            </button>
            <div className="stack" style={{ marginTop: '1rem' }}>
              <NavLink to="/" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} onClick={() => setOpen(false)}>Discover</NavLink>
              <NavLink to="/tickets" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} onClick={() => setOpen(false)}>Tickets</NavLink>
              <a href="#highlights" className="nav-link" onClick={() => setOpen(false)}>Highlights</a>
              <a href="#faq" className="nav-link" onClick={() => setOpen(false)}>FAQ</a>
              <Link to="/checkout" className="nav-link" onClick={() => setOpen(false)}>Keranjang</Link>
            </div>
            <div style={{ display: 'flex', gap: '.5rem', marginTop: '1rem' }}>
              <Link to="/tickets" className="btn btn-primary" style={{ flex: 1 }} onClick={() => setOpen(false)}>Get Tickets</Link>
            </div>
          </div>
        </div>

        {/* Command Palette */}
        <div className={`cmdk-backdrop${cmdOpen ? ' open' : ''}`} onClick={() => setCmdOpen(false)} />
        <div id="cmdk-panel" role="dialog" aria-modal="true" aria-label="Quick find" className={`cmdk-panel${cmdOpen ? ' open' : ''}`}>
          <div className="cmdk-search">
            <span aria-hidden style={{ display: 'grid', placeItems: 'center', width: 24, color: 'var(--muted)' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14Zm6-1 4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
            </span>
            <input autoFocus className="input" placeholder="Cari event, kota, atau kategori..." aria-label="Input pencarian" />
            <button className="cmdk-close" aria-label="Tutup" onClick={() => setCmdOpen(false)}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
            </button>
          </div>
          <div className="cmdk-list">
            <button className="cmdk-item">Event dekat Jakarta</button>
            <button className="cmdk-item">Kategori: Music</button>
            <button className="cmdk-item">Kategori: Technology</button>
            <button className="cmdk-item">Tiket VIP</button>
            <button className="cmdk-item">Lihat semua event</button>
          </div>
          <div className="cmdk-hint">Tip: Tekan Esc untuk menutup, Ctrl+K untuk toggle.</div>
        </div>
      </header>

      <main>
        <div className="container" style={{ padding: '1.25rem 0' }}>
          <Outlet />
        </div>
      </main>

      <footer className="site-footer">
        <div className="container">© {new Date().getFullYear()} Event Project — Semua hak dilindungi.</div>
      </footer>
    </>
  );
}
