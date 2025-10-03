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
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/85 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/70">
        <div className="container flex items-center justify-between gap-4 py-3">
          <div className="flex items-center gap-3">
            <button
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 md:hidden dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
              aria-label="Toggle navigation menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            </button>
            <Link to="/" className="flex items-center gap-2 font-extrabold text-slate-900 dark:text-white" aria-label="Event Project home">
              <span className="grid h-10 w-10 place-items-center rounded-xl border border-violet-300 bg-gradient-to-br from-violet-600 to-violet-500 text-white shadow-[0_10px_30px_rgba(124,58,237,.25)] dark:border-violet-700">
                <img src="/brand.svg" className="h-6 w-6" alt="" />
              </span>
              <span>Event Project</span>
            </Link>
          </div>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
            <NavLink to="/" className={({ isActive }) => `px-3 py-2 rounded-xl font-semibold ${isActive ? 'bg-violet-50 text-slate-900 ring-1 ring-violet-300 dark:bg-violet-900/30 dark:text-white dark:ring-violet-800' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white'}`}>Discover</NavLink>
            <NavLink to="/tickets" className={({ isActive }) => `px-3 py-2 rounded-xl font-semibold ${isActive ? 'bg-violet-50 text-slate-900 ring-1 ring-violet-300 dark:bg-violet-900/30 dark:text-white dark:ring-violet-800' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white'}`}>Tickets</NavLink>
            <a href="#highlights" className="px-3 py-2 rounded-xl font-semibold text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white">Highlights</a>
            <a href="#faq" className="px-3 py-2 rounded-xl font-semibold text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white">FAQ</a>
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              className="hidden items-center gap-2 rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 md:inline-flex dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
              onClick={() => setCmdOpen(true)}
              aria-haspopup="dialog"
              aria-expanded={cmdOpen}
              aria-controls="cmdk-panel"
              title="Cari cepat (Ctrl+K)"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14Zm6-1 4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
              </svg>
              <span className="text-slate-500">Quick Find</span>
              <span className="rounded-md bg-slate-100 px-1.5 py-0.5 text-[10px] font-semibold text-slate-600">Ctrl K</span>
            </button>
            <Link to="/checkout" className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl text-slate-800 hover:text-violet-600 dark:text-slate-100" aria-label="Keranjang" title="Keranjang">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden focusable="false">
                <path d="M7 9h10l-1 9H8L7 9Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
                <path d="M9 9V8a3 3 0 1 1 6 0v1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="10" cy="19" r="1.5" fill="currentColor"/>
                <circle cx="16" cy="19" r="1.5" fill="currentColor"/>
              </svg>
              <span className={`absolute -right-1 -top-1 grid min-w-[18px] place-items-center rounded-full bg-violet-600 px-1.5 text-[10px] font-extrabold text-white ring-2 ring-white ${bump ? 'animate-bump' : ''}`} aria-hidden>{count}</span>
              <span className="sr-only">Buka keranjang</span>
            </Link>
            <Link to="/tickets" className="btn btn-primary ml-1">Get Tickets</Link>
          </div>
        </div>

        {/* Mobile drawer */}
        {open && <div className="fixed inset-0 z-10 bg-black/25 md:hidden" onClick={() => setOpen(false)} />}
        <div id="mobile-menu" className={`fixed inset-y-0 left-0 z-20 w-80 transform border-r border-slate-200 bg-white p-4 transition-transform md:hidden dark:border-slate-800 dark:bg-slate-900 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="grid gap-4">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
              onClick={() => { setOpen(false); setCmdOpen(true); }}
              aria-haspopup="dialog"
              aria-expanded={cmdOpen}
              aria-controls="cmdk-panel"
              title="Cari cepat (Ctrl+K)"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14Zm6-1 4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
              </svg>
              <span className="text-slate-500">Quick Find</span>
              <span className="rounded-md bg-slate-100 px-1.5 py-0.5 text-[10px] font-semibold text-slate-600">Ctrl K</span>
            </button>
            <div className="grid gap-2">
              <NavLink to="/" className={({ isActive }) => `px-3 py-2 rounded-xl font-semibold ${isActive ? 'bg-violet-50 text-slate-900 ring-1 ring-violet-300' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`} onClick={() => setOpen(false)}>Discover</NavLink>
              <NavLink to="/tickets" className={({ isActive }) => `px-3 py-2 rounded-xl font-semibold ${isActive ? 'bg-violet-50 text-slate-900 ring-1 ring-violet-300' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`} onClick={() => setOpen(false)}>Tickets</NavLink>
              <a href="#highlights" className="px-3 py-2 rounded-xl font-semibold text-slate-600 hover:bg-slate-100 hover:text-slate-900" onClick={() => setOpen(false)}>Highlights</a>
              <a href="#faq" className="px-3 py-2 rounded-xl font-semibold text-slate-600 hover:bg-slate-100 hover:text-slate-900" onClick={() => setOpen(false)}>FAQ</a>
              <Link to="/checkout" className="px-3 py-2 rounded-xl font-semibold text-slate-600 hover:bg-slate-100 hover:text-slate-900" onClick={() => setOpen(false)}>Keranjang</Link>
            </div>
            <div className="flex gap-2">
              <Link to="/tickets" className="btn btn-primary flex-1" onClick={() => setOpen(false)}>Get Tickets</Link>
            </div>
          </div>
        </div>

        {/* Command Palette */}
        {cmdOpen && <div className="fixed inset-0 z-30 bg-black/30" onClick={() => setCmdOpen(false)} />}
        <div id="cmdk-panel" role="dialog" aria-modal="true" aria-label="Quick find" className={`fixed left-1/2 top-20 z-40 w-full max-w-xl -translate-x-1/2 rounded-2xl border border-slate-200 bg-white p-3 shadow-xl transition-opacity dark:border-slate-800 dark:bg-slate-900 ${cmdOpen ? 'opacity-100' : 'pointer-events-none opacity-0'}`}>
          <div className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-2 dark:border-slate-700 dark:bg-slate-800">
            <span aria-hidden className="grid h-10 w-6 place-items-center text-slate-400">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14Zm6-1 4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
            </span>
            <input autoFocus className="input border-0 shadow-none focus:ring-0" placeholder="Cari event, kota, atau kategori..." aria-label="Input pencarian" />
            <button className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700" aria-label="Tutup" onClick={() => setCmdOpen(false)}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
            </button>
          </div>
          <div className="mt-2 grid gap-2">
            <button className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-left text-sm hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700">Event dekat Jakarta</button>
            <button className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-left text-sm hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700">Kategori: Music</button>
            <button className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-left text-sm hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700">Kategori: Technology</button>
            <button className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-left text-sm hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700">Tiket VIP</button>
            <button className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-left text-sm hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700">Lihat semua event</button>
          </div>
          <div className="mt-2 text-center text-xs text-slate-500 dark:text-slate-400">Tip: Tekan Esc untuk menutup, Ctrl+K untuk toggle.</div>
        </div>
      </header>

      <main>
        <div className="container py-5">
          <Outlet />
        </div>
      </main>

      <footer className="border-t border-slate-200 py-6 text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400">
        <div className="container">© {new Date().getFullYear()} Event Project — Semua hak dilindungi.</div>
      </footer>
    </>
  );
}
