import { useNavigate } from 'react-router-dom';
import { useCart } from '@app/providers/CartProvider';
import { getEventById, formatIDR } from '@shared/data/events';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { list, setQty, toggle, remove, clear } = useCart();
  const handleBack = () => {
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
    <section className="grid gap-4">
      <div>
        <h1 className="text-3xl font-extrabold">Checkout</h1>
        <p className="text-slate-600">Lengkapi detailmu dan selesaikan pembayaran dengan aman.</p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-lg font-extrabold">Keranjang</h3>
          {items.length === 0 ? (
            <p className="text-slate-600">Keranjangmu kosong. Yuk, pilih event favorit di halaman utama.</p>
          ) : (
            items.map(({ it, ev, tt, price }) => (
              <div key={it.key} className="grid gap-2 rounded-xl border border-slate-200 bg-white p-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <input type="checkbox" checked={it.selected} onChange={(e) => toggle(it.key, e.currentTarget.checked)} />
                    <div>
                      <div className="font-extrabold">{ev.title}</div>
                      <div className="text-sm text-slate-600">{tt.name} — {formatIDR(tt.price)}</div>
                    </div>
                  </div>
                  <button className="btn btn-outline btn-sm" onClick={() => remove(it.key)}>Hapus</button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-slate-600">{ev.date} — {ev.location}</div>
                  <div className="inline-flex items-center gap-2">
                    <button className="btn btn-outline btn-sm" onClick={() => setQty(it.key, Math.max(1, it.quantity - 1))}>-</button>
                    <span className="min-w-[24px] text-center">{it.quantity}</span>
                    <button className="btn btn-outline btn-sm" onClick={() => setQty(it.key, it.quantity + 1)}>+</button>
                  </div>
                </div>
                <div className="flex justify-end font-extrabold">{formatIDR(price)}</div>
              </div>
            ))
          )}
          {items.length > 0 && (
            <div className="flex justify-between">
              <button className="btn btn-outline btn-sm" onClick={() => clear()}>Kosongkan Keranjang</button>
              <button className="btn btn-outline btn-sm" onClick={handleBack}>Kembali</button>
            </div>
          )}
        </div>

        <aside className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-lg font-extrabold">Ringkasan</h3>
          <div className="grid gap-2">
            <div className="flex justify-between">
              <span className="text-slate-600">Subtotal</span>
              <span>{formatIDR(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Biaya Layanan</span>
              <span>{formatIDR(fees)}</span>
            </div>
            <hr className="border-slate-200" />
            <div className="flex justify-between font-extrabold">
              <span>Total</span>
              <span>{formatIDR(total)}</span>
            </div>
          </div>

          <form className="mt-2 grid gap-4" onSubmit={(e) => e.preventDefault()}>
            <div className="field">
              <label htmlFor="name" className="text-sm font-semibold">Nama Lengkap</label>
              <input id="name" className="input" placeholder="Nama sesuai KTP" />
            </div>
            <div className="field">
              <label htmlFor="email" className="text-sm font-semibold">Email</label>
              <input id="email" type="email" className="input" placeholder="email@domain.com" />
            </div>
            <div className="field">
              <label htmlFor="card" className="text-sm font-semibold">Metode Pembayaran</label>
              <input id="card" className="input" placeholder="Kartu / E-Wallet / Virtual Account" />
            </div>
            <button className="btn btn-primary" disabled={subtotal <= 0}>Bayar Sekarang</button>
          </form>
        </aside>
      </div>
    </section>
  );
}

