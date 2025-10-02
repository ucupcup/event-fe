import { useParams, Link } from 'react-router-dom';
import { getEventById, formatIDR } from '@shared/data/events';
import { useCart } from '@app/providers/CartProvider';
import { useState } from 'react';

export default function EventDetailsPage() {
  const { id } = useParams();
  const event = id ? getEventById(id) : undefined;
  const { add } = useCart();
  const [selected, setSelected] = useState(event?.ticketTypes[0]?.id ?? '');
  const [qty, setQty] = useState(1);

  if (!event) {
    return (
      <section className="stack">
        <h1>Event Tidak Ditemukan</h1>
        <p className="muted">Periksa kembali tautan atau pilih event lain.</p>
        <Link to="/" className="btn btn-primary">Kembali ke Beranda</Link>
      </section>
    );
  }

  const onAdd = () => {
    if (!selected) return;
    add(event.id, selected, qty);
  };

  return (
    <section className="stack">
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ position: 'relative', aspectRatio: '16 / 6', background: '#0b1220' }}>
          {event.image && <img src={event.image} alt={event.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />}
        </div>
        <div style={{ padding: '1rem' }}>
          <span className="chip" style={{ marginBottom: '.5rem' }}>{event.category}</span>
          <h1 style={{ margin: '.25rem 0' }}>{event.title}</h1>
          <p className="muted">{event.date} • {event.location}</p>
        </div>
      </div>

      <div className="grid cols-2">
        <div className="card stack" style={{ gap: '.75rem' }}>
          <h3 className="card-header">Deskripsi</h3>
          <p className="muted">Nikmati pengalaman event dengan vibes game futuristik yang imersif. Detail seputar lineup, rundown, dan fasilitas akan diperbarui secara berkala.</p>
          <p className="muted">Silakan pilih tipe tiket di samping untuk melanjutkan pembelian.</p>
        </div>

        <div className="card stack" style={{ gap: '.75rem' }}>
          <h3 className="card-header">Pilih Tiket</h3>
          <div className="stack" style={{ gap: '.5rem' }}>
            {event.ticketTypes.map((t) => (
              <label key={t.id} className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem' }}>
                  <input type="radio" name="tt" checked={selected === t.id} onChange={() => setSelected(t.id)} />
                  <div style={{ fontWeight: 800 }}>{t.name}</div>
                </div>
                <div style={{ fontWeight: 800 }}>{formatIDR(t.price)}</div>
              </label>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
            <button className="btn btn-outline btn-sm" onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
            <span style={{ minWidth: 24, textAlign: 'center' }}>{qty}</span>
            <button className="btn btn-outline btn-sm" onClick={() => setQty(qty + 1)}>+</button>
          </div>
          <div style={{ display: 'flex', gap: '.5rem' }}>
            <button className="btn btn-primary" onClick={onAdd}>Tambahkan ke Keranjang</button>
            <Link to="/checkout" className="btn btn-outline">Lihat Keranjang</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

