import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';
import { useState } from 'react';
import { useCart } from '@app/providers/CartProvider';
import { events as ALL_EVENTS, getEventById, cheapestPrice, type EventItem } from '@shared/data/events';

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="container hero-inner">
          <kbd>Limited seats - Early bird on sale</kbd>
          <h1 className="hero-title">Discover, Feel, and Celebrate Live Moments</h1>
          <p className="hero-sub">
            Event terbaik tahun ini hadir dengan lineup spektakuler, pengalaman imersif, dan proses pembelian tiket yang cepat. Jangan lewatkan - amankan tempatmu sekarang!
          </p>
          <div className="cta-row">
            <Link to="/tickets" className="btn btn-primary">Beli Tiket Sekarang</Link>
            <Link to="/tickets" className="btn btn-outline">Lihat Tipe Tiket</Link>
          </div>
        </div>
      </section>

      <section className="container" style={{ padding: '2rem 0' }}>
        <div className="grid cols-3">
          <article className="card">
            <h3 className="card-header">Lineup Kelas Dunia</h3>
            <p>Artis pilihan, panggung memukau, dan audio premium untuk pengalaman maksimal.</p>
          </article>
          <article className="card">
            <h3 className="card-header">Pembelian Super Cepat</h3>
            <p>Tanpa ribet - pilih tiket, isi data, dan selesaikan pembayaran dengan cepat.</p>
          </article>
          <article className="card">
            <h3 className="card-header">Benefit Eksklusif</h3>
            <p>Early access, merchandise spesial, dan lounge khusus untuk pemegang VIP.</p>
          </article>
        </div>
      </section>

      <BentoEventsSection />
    </>
  );
}

function BentoEventsSection() {
  const hero = ALL_EVENTS[0];
  const others = ALL_EVENTS.slice(1);
  // Pola rapi per baris 6 kolom: (3x1+3x1), (2x2+2x2+2x2), (2x1+2x1+2x1)
  const PATTERN = ['3x1','3x1','2x2','2x2','2x2','2x1','2x1','2x1'] as const;
  const items = others.map((ev, i) => ({ ev, type: PATTERN[i % PATTERN.length] }));
  return (
    <section id="highlights" className="container" style={{ padding: '1rem 0 3rem' }}>
      <div className="stack" style={{ marginBottom: '1rem' }}>
        <h2>Event Terpopuler</h2>
        <p className="muted">Sorotan Event - Pengalaman Live Terbaik.</p>
      </div>
      <div className="bento-wrap">
        <div className="bento-left">
          <div className="bento-grid">
            {items.map(({ ev, type }) => (
              <TileByType key={`${ev.id}-${type}`} e={ev} type={type} />
            ))}
          </div>
        </div>
        <aside className="bento-right">
          {hero && (
            <div className="upcoming">
              <div className="head">Upcoming Event</div>
              <div className="img">
                {hero.image && <img src={hero.image} alt={hero.title} />}
                <div className="time-pill">Soon</div>
              </div>
              <div className="loc">{hero.title}</div>
              <div className="meta">{hero.date} - {hero.location}</div>
              <div className="avatars" style={{ marginTop: '.6rem' }}>
                {Array.from({ length: 5 }).map((_, i) => (<span key={i} className="av" />))}
              </div>
              <div className="meta" style={{ marginTop: '.25rem' }}>35 joins, 4 rejects, 108 pendings</div>
              <div style={{ display: 'flex', gap: '.5rem', marginTop: '.6rem' }}>
                <Link to={`/events/${hero.id}`} className="btn btn-primary btn-sm">Detail</Link>
                <Link to="/tickets" className="btn btn-outline btn-sm">Beli Tiket</Link>
              </div>
            </div>
          )}
        </aside>
      </div>
    </section>
  );
}

function TileByType({ e, type }: { e: EventItem; type: '2x3'|'3x1'|'2x2'|'2x1' }) {
  if (type === '2x3') {
    return (
      <InteractiveTile className="tile span-2x3 tile-tall" data-cat={e.category.toLowerCase()}>
        <div className="tile-image">{e.image && <img src={e.image} alt={e.title} />}</div>
        <div className="tile-overlay" />
        <div className="holo-grid" /><div className="glare" />
        <div className="tile-content">
          <span className="chip">{e.category}</span>
          <div>
            <h3>{e.title}</h3>
            <div className="meta">{e.date} - {e.location}</div>
          </div>
        </div>
        <TileCta id={e.id} title={e.title} />
      </InteractiveTile>
    );
  }
  if (type === '3x1') return <BentoWide e={e} />;
  if (type === '2x2') return <BentoSquare e={e} />;
  return <BentoSmall e={e} />;
}

function BentoSmall({ e }: { e: EventItem }) {
  return (
    <InteractiveTile className="tile span-2x1" data-cat={e.category.toLowerCase()}>
      <div className="tile-image">{e.image && <img src={e.image} alt={e.title} />}</div>
      <div className="tile-overlay" />
      <div className="holo-grid" /><div className="glare" />
      <div className="tile-content" style={{ padding: '.8rem' }}>
        <div className="meta" style={{ fontWeight: 800 }}>{e.title}</div>
        <div className="meta">{e.date} - {e.location}</div>
        <span className="chip" style={{ height: 22, fontSize: 11, width: 'fit-content', marginTop: '.25rem' }}>{e.category}</span>
      </div>
      <TileCta id={e.id} title={e.title} />
    </InteractiveTile>
  );
}

function BentoWide({ e }: { e: EventItem }) {
  return (
    <InteractiveTile className="tile span-3x1" data-cat={e.category.toLowerCase()}>
      <div className="tile-image">{e.image && <img src={e.image} alt={e.title} />}</div>
      <div className="tile-overlay" />
      <div className="holo-grid" /><div className="scanline" /><div className="glare" />
      <div className="tile-content" style={{ padding: '.9rem 1rem' }}>
        <div>
          <div className="meta" style={{ marginBottom: 2 }}>{e.date} - {e.location}</div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 900, letterSpacing: '-.02em' }}>{e.title}</h3>
        </div>
      </div>
      <TileCta id={e.id} title={e.title} />
    </InteractiveTile>
  );
}

function BentoSquare({ e }: { e: EventItem }) {
  return (
    <InteractiveTile className="tile span-2x2" data-cat={e.category.toLowerCase()}>
      <div className="tile-image">{e.image && <img src={e.image} alt={e.title} />}</div>
      <div className="tile-overlay" />
      <div className="holo-grid" /><div className="glare" />
      <div className="tile-content">
        <span className="chip">{e.category}</span>
        <h3>{e.title}</h3>
        <div className="meta">{e.date} - {e.location}</div>
      </div>
      <TileCta id={e.id} title={e.title} />
    </InteractiveTile>
  );
}

function InteractiveTile({ className, children, ...props }: { className?: string; children: ReactNode } & React.HTMLAttributes<HTMLElement>) {
  const setPos = (el: HTMLElement, e: React.MouseEvent) => {
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty('--mx', x.toString());
    el.style.setProperty('--my', y.toString());
  };
  return (
    <article
      {...props}
      className={className}
      onMouseMove={(e) => setPos(e.currentTarget as HTMLElement, e)}
      onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.removeProperty('--mx'); el.style.removeProperty('--my'); }}
    >
      {children}
    </article>
  );
}

function TileCta({ id, title, withDetail }: { id: string; title: string; withDetail?: boolean }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);
  const ev = getEventById(id)!;
  const { label } = cheapestPrice(ev);
  const onBuy = () => {
    const tt = ev.ticketTypes[0];
    add(ev.id, tt.id, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };
  return (
    <div className="tile-cta">
      <div className="price-wrap">
        <span className="label">Mulai dari</span>
        <span className="price">{label}</span>
      </div>
      <div style={{ display: 'flex', gap: '.4rem' }}>
        <button onClick={onBuy} className="btn btn-primary btn-sm" aria-label={`Beli tiket ${title}`}>
          {added ? 'Ditambahkan' : 'Beli'}
        </button>
        {withDetail && (
          <Link to={`/events/${id}`} className="btn btn-outline btn-sm" aria-label={`Detail ${title}`}>Detail</Link>
        )}
      </div>
    </div>
  );
}
