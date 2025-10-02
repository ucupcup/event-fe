import { useNavigate } from 'react-router-dom';
import { useCart } from '@app/providers/CartProvider';
import { getEventById, formatIDR } from '@shared/data/events';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { list, setQty, toggle, remove, clear } = useCart();
  const handleBack = () => {
    // Try to go back; if no history, go to tickets
    if (window.history.length > 1) navigate(-1);
    else navigate('/tickets');
  };
  const items = list.map((it) => {
    const ev = getEventById(it.eventId)!;
    const tt = ev.ticketTypes.find((t) => t.id === it.ticketTypeId)!;
    const price = tt.price * it.quantity;
    return { it, ev, tt, price };
  });

  const subtotal = items.filter((x) => x.it.selected).reduce((s, x) => s + x.price, 0);
  const fees = subtotal > 0 ? 10000 : 0;
  const total = subtotal + fees;

  return (
    <section className="stack">
      <div>
        <h1>Checkout</h1>
        <p className="muted">Lengkapi detailmu dan selesaikan pembayaran dengan aman.</p>
      </div>

      <div className="grid cols-2">
        <div className="card stack" style={{ gap: '1rem' }}>
          <h3 className="card-header">Keranjang</h3>
          {items.length === 0 ? (
            <p className="muted">Keranjangmu kosong. Yuk, pilih event favorit di halaman utama.</p>
          ) : (
            items.map(({ it, ev, tt, price }) => (
              <div key={it.key} className="card" style={{ display: 'grid', gap: '.5rem' }}>
                <div style={{ display: 'flex', gap: '.75rem', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', gap: '.75rem', alignItems: 'center' }}>
                    <input type="checkbox" checked={it.selected} onChange={(e) => toggle(it.key, e.currentTarget.checked)} />
                    <div>
                      <div style={{ fontWeight: 800 }}>{ev.title}</div>
                      <div className="muted">{tt.name} • {formatIDR(tt.price)}</div>
                    </div>
                  </div>
                  <button className="btn btn-outline btn-sm" onClick={() => remove(it.key)}>Hapus</button>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div className="muted">{ev.date} • {ev.location}</div>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '.5rem' }}>
                    <button className="btn btn-outline btn-sm" onClick={() => setQty(it.key, Math.max(1, it.quantity - 1))}>−</button>
                    <span style={{ minWidth: 24, textAlign: 'center' }}>{it.quantity}</span>
                    <button className="btn btn-outline btn-sm" onClick={() => setQty(it.key, it.quantity + 1)}>+</button>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', fontWeight: 800 }}>{formatIDR(price)}</div>
              </div>
            ))
          )}
          {items.length > 0 && (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className="btn btn-outline btn-sm" onClick={() => clear()}>Kosongkan Keranjang</button>
              <button className="btn btn-outline btn-sm" onClick={handleBack}>Kembali</button>
            </div>
          )}
        </div>

        <aside className="card stack" style={{ gap: '.75rem' }}>
          <h3 className="card-header">Ringkasan</h3>
          <div style={{ display: 'grid', gap: '.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span className="muted">Subtotal</span>
              <span>{formatIDR(subtotal)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span className="muted">Biaya Layanan</span>
              <span>{formatIDR(fees)}</span>
            </div>
            <hr style={{ border: 0, borderTop: '1px solid var(--border)' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800 }}>
              <span>Total</span>
              <span>{formatIDR(total)}</span>
            </div>
          </div>

          <form className="stack" style={{ gap: '1rem', marginTop: '.5rem' }} onSubmit={(e) => e.preventDefault()}>
            <div className="field">
              <label htmlFor="name">Nama Lengkap</label>
              <input id="name" className="input" placeholder="Nama sesuai KTP" />
            </div>
            <div className="field">
              <label htmlFor="email">Email</label>
              <input id="email" type="email" className="input" placeholder="email@domain.com" />
            </div>
            <div className="field">
              <label htmlFor="card">Metode Pembayaran</label>
              <input id="card" className="input" placeholder="Kartu / E-Wallet / Virtual Account" />
            </div>
            <button className="btn btn-primary" disabled={subtotal <= 0}>Bayar Sekarang</button>
          </form>
        </aside>
      </div>
    </section>
  );
}
