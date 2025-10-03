import { Link } from 'react-router-dom';
import { events as ALL_EVENTS, getEventById, cheapestPrice, type EventItem } from '@shared/data/events';

export default function HomePage() {
  return (
    <>
      <section className="rounded-3xl border border-slate-200 bg-gradient-to-br from-violet-50 to-sky-50 p-6 shadow-sm dark:border-slate-800 dark:from-slate-800 dark:to-slate-900 md:p-10">
        <div className="grid gap-4">
          <span className="kbd w-max">Limited seats — Early bird on sale</span>
          <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">Discover, Feel, and Celebrate Live Moments</h1>
          <p className="max-w-2xl text-slate-600 dark:text-slate-300">
            Event terbaik tahun ini hadir dengan lineup spektakuler, pengalaman imersif, dan proses pembelian tiket yang cepat. Jangan lewatkan — amankan tempatmu sekarang!
          </p>
          <div className="mt-2 flex flex-wrap gap-3">
            <Link to="/tickets" className="btn btn-primary">Beli Tiket Sekarang</Link>
            <Link to="/tickets" className="btn btn-outline">Lihat Tipe Tiket</Link>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="grid gap-5 md:grid-cols-3">
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h3 className="mb-1 text-lg font-extrabold">Lineup Kelas Dunia</h3>
            <p className="text-slate-600 dark:text-slate-300">Artis pilihan, panggung memukau, dan audio premium untuk pengalaman maksimal.</p>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h3 className="mb-1 text-lg font-extrabold">Pembelian Super Cepat</h3>
            <p className="text-slate-600 dark:text-slate-300">Tanpa ribet — pilih tiket, isi data, dan selesaikan pembayaran dengan cepat.</p>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h3 className="mb-1 text-lg font-extrabold">Benefit Eksklusif</h3>
            <p className="text-slate-600 dark:text-slate-300">Early access, merchandise spesial, dan lounge khusus untuk pemegang VIP.</p>
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
  const PATTERN = ['3x1','3x1','2x2','2x2','2x2','2x1','2x1','2x1'] as const;
  const items = others.map((ev, i) => ({ ev, type: PATTERN[i % PATTERN.length] }));
  return (
    <section id="highlights" className="pb-10">
      <div className="mb-4 grid gap-1">
        <h2 className="text-2xl font-extrabold">Event Terpopuler</h2>
        <p className="text-slate-600 dark:text-slate-400">Sorotan Event — Pengalaman Live Terbaik.</p>
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="bento-grid">
            {items.map(({ ev, type }) => (
              <TileByType key={`${ev.id}-${type}`} e={ev} type={type} />
            ))}
          </div>
        </div>
        <aside className="grid gap-3">
          {hero && (
            <div className="rounded-3xl border border-violet-300 bg-violet-700 p-4 text-white shadow-xl dark:border-violet-800">
              <div className="text-sm font-black uppercase tracking-wide text-violet-200">Upcoming Event</div>
              <div className="relative mt-3 overflow-hidden rounded-2xl">
                {hero.image && <img src={hero.image} alt={hero.title} className="h-[240px] w-full object-cover" />}
                <div className="absolute bottom-3 left-3 rounded-full bg-slate-900/80 px-3 py-1 text-xs font-extrabold text-white">Soon</div>
              </div>
              <div className="mt-3 font-extrabold">{hero.title}</div>
              <div className="text-sm text-violet-200">{hero.date} — {hero.location}</div>
              <div className="mt-3 flex gap-2">
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
  if (type === '2x3') return <BentoTall e={e} />;
  if (type === '3x1') return <BentoWide e={e} />;
  if (type === '2x2') return <BentoSquare e={e} />;
  return <BentoSmall e={e} />;
}

function BentoSmall({ e }: { e: EventItem }) {
  return (
    <InteractiveTile className="bento-tile span-2x1" data-cat={e.category.toLowerCase()}>
      <div className="tile-image">{e.image && <img src={e.image} alt={e.title} />}</div>
      <div className="tile-overlay" />
      <div className="holo-grid" /><div className="glare" />
      <div className="tile-content p-2">
        <div className="text-xs text-slate-200">{e.date} — {e.location}</div>
        <div className="text-sm font-extrabold">{e.title}</div>
      </div>
      <TileCta id={e.id} title={e.title} compact />
    </InteractiveTile>
  );
}

function BentoWide({ e }: { e: EventItem }) {
  return (
    <InteractiveTile className="bento-tile span-3x1" data-cat={e.category.toLowerCase()}>
      <div className="tile-image">{e.image && <img src={e.image} alt={e.title} />}</div>
      <div className="tile-overlay" />
      <div className="holo-grid" /><div className="scanline" /><div className="glare" />
      <div className="tile-content p-3">
        <div className="text-xs text-slate-200">{e.date} — {e.location}</div>
        <h3 className="text-lg font-extrabold">{e.title}</h3>
      </div>
      <TileCta id={e.id} title={e.title} />
    </InteractiveTile>
  );
}

function BentoSquare({ e }: { e: EventItem }) {
  return (
    <InteractiveTile className="bento-tile span-2x2" data-cat={e.category.toLowerCase()}>
      <div className="tile-image">{e.image && <img src={e.image} alt={e.title} />}</div>
      <div className="tile-overlay" />
      <div className="holo-grid" /><div className="glare" />
      <div className="tile-content">
        <span className="chip mb-1">{e.category}</span>
        <h3 className="text-xl font-extrabold">{e.title}</h3>
        <div className="text-sm text-slate-200">{e.date} — {e.location}</div>
      </div>
      <TileCta id={e.id} title={e.title} />
    </InteractiveTile>
  );
}

function BentoTall({ e }: { e: EventItem }) {
  return (
    <InteractiveTile className="bento-tile span-2x3" data-cat={e.category.toLowerCase()}>
      <div className="tile-image">{e.image && <img src={e.image} alt={e.title} />}</div>
      <div className="tile-overlay" />
      <div className="holo-grid" /><div className="glare" />
      <div className="tile-content">
        <span className="chip mb-1">{e.category}</span>
        <h3 className="text-2xl font-extrabold">{e.title}</h3>
        <div className="text-sm text-slate-200">{e.date} — {e.location}</div>
      </div>
      <TileCta id={e.id} title={e.title} />
    </InteractiveTile>
  );
}

function InteractiveTile(
  { className, children, ...props }: { className?: string; children: React.ReactNode } & React.HTMLAttributes<HTMLElement>,
) {
  const setPos = (el: HTMLElement, e: React.MouseEvent) => {
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty('--mx', String(x));
    el.style.setProperty('--my', String(y));
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

function TileCta({ id, compact }: { id: string; title: string; compact?: boolean }) {
  const ev = getEventById(id)!;
  const { label } = cheapestPrice(ev);
  return (
    <div className="tile-cta">
      {!compact && (
        <div className="grid">
          <span className="text-[10px] font-semibold text-slate-500">Mulai dari</span>
          <span className="text-sm font-extrabold">{label}</span>
        </div>
      )}
      <div className="flex gap-2">
        <Link to={`/events/${id}`} className="btn btn-outline btn-sm">Detail</Link>
        <Link to="/tickets" className="btn btn-primary btn-sm">Beli</Link>
      </div>
    </div>
  );
}
