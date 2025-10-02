import { Link } from 'react-router-dom';

const tickets = [
  {
    name: 'General Admission',
    price: 'Rp 250.000',
    perks: ['Area reguler', 'Merch digital', 'Gate reguler'],
    highlight: false,
  },
  {
    name: 'VIP',
    price: 'Rp 600.000',
    perks: ['Area depan panggung', 'Merch eksklusif', 'Gate prioritas'],
    highlight: true,
  },
  {
    name: 'VVIP',
    price: 'Rp 1.200.000',
    perks: ['Lounge eksklusif', 'Meet & greet', 'Gate khusus'],
    highlight: false,
  },
];

export default function TicketsPage() {
  return (
    <section className="stack">
      <div>
        <h1>Tiket Tersedia</h1>
        <p className="muted">Pilih tipe tiket yang sesuai dan lanjutkan ke pembayaran.</p>
      </div>

      <div className="grid cols-3">
        {tickets.map((t) => (
          <article key={t.name} className="card" style={{ borderColor: t.highlight ? 'color-mix(in oklab, var(--brand) 35%, var(--border))' : undefined }}>
            <h3 className="card-header">{t.name}</h3>
            <div className="card-price">{t.price}</div>
            <ul style={{ padding: 0, margin: '0.75rem 0 1rem', listStyle: 'none', color: 'var(--muted)' }}>
              {t.perks.map((p) => (
                <li key={p} style={{ display: 'flex', alignItems: 'center', gap: '.5rem', marginBottom: '.4rem' }}>
                  <span style={{ width: 8, height: 8, background: 'var(--brand)', borderRadius: 999 }} />
                  {p}
                </li>
              ))}
            </ul>
            <div style={{ display: 'flex', gap: '.5rem' }}>
              <Link to="/checkout" className="btn btn-primary" style={{ flex: 1 }}>Pilih</Link>
              <Link to="/events/esports" className="btn btn-outline" style={{ flex: 1 }}>Detail</Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
