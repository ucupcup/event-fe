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
      <section className="grid place-items-center">
        <div className="max-w-xl rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
          <h1 className="text-2xl font-extrabold">Event Tidak Ditemukan</h1>
          <p className="mt-1 text-slate-600">Periksa kembali tautan atau pilih event lain.</p>
          <div className="mt-4">
            <Link to="/" className="btn btn-primary">Kembali ke Beranda</Link>
          </div>
        </div>
      </section>
    );
  }

  const onAdd = () => {
    if (!selected) return;
    add(event.id, selected, qty);
  };

  return (
    <section className="grid gap-4">
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="relative aspect-[16/6] bg-slate-900">
          {event.image && <img src={event.image} alt={event.title} className="h-full w-full object-cover" />}
        </div>
        <div className="p-4">
          <span className="mb-2 inline-flex w-max rounded-full bg-violet-100 px-2 py-0.5 text-xs font-bold text-violet-700">{event.category}</span>
          <h1 className="my-1 text-3xl font-extrabold">{event.title}</h1>
          <p className="text-slate-600">{event.date} — {event.location}</p>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-lg font-extrabold">Deskripsi</h3>
          <p className="text-slate-600">Nikmati pengalaman event dengan vibes game futuristik yang imersif. Detail seputar lineup, rundown, dan fasilitas akan diperbarui secara berkala.</p>
          <p className="text-slate-600">Silakan pilih tipe tiket di samping untuk melanjutkan pembelian.</p>
        </div>

        <div className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-lg font-extrabold">Pilih Tiket</h3>
          <div className="grid gap-2">
            {event.ticketTypes.map((t) => (
              <label key={t.id} className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-3">
                <div className="flex items-center gap-3">
                  <input type="radio" name="tt" checked={selected === t.id} onChange={() => setSelected(t.id)} className="text-violet-600" />
                  <div className="font-extrabold">{t.name}</div>
                </div>
                <div className="font-extrabold">{formatIDR(t.price)}</div>
              </label>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button className="btn btn-outline btn-sm" onClick={() => setQty(Math.max(1, qty - 1))}>-</button>
            <span className="min-w-[24px] text-center">{qty}</span>
            <button className="btn btn-outline btn-sm" onClick={() => setQty(qty + 1)}>+</button>
          </div>
          <div className="flex gap-2">
            <button className="btn btn-primary" onClick={onAdd}>Tambahkan ke Keranjang</button>
            <Link to="/checkout" className="btn btn-outline">Lihat Keranjang</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

