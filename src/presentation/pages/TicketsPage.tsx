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
    <section className="grid gap-4">
      <div>
        <h1 className="text-3xl font-extrabold">Tiket Tersedia</h1>
        <p className="text-slate-600">Pilih tipe tiket yang sesuai dan lanjutkan ke pembayaran.</p>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {tickets.map((t) => (
          <article
            key={t.name}
            className={`rounded-2xl border bg-white p-5 shadow-sm ${t.highlight ? 'border-violet-300 ring-1 ring-violet-200' : 'border-slate-200'}`}
          >
            <h3 className="mb-1 text-lg font-extrabold">{t.name}</h3>
            <div className="text-2xl font-extrabold">{t.price}</div>
            <ul className="mt-3 mb-4 list-none space-y-2 text-slate-600">
              {t.perks.map((p) => (
                <li key={p} className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-violet-600" />
                  {p}
                </li>
              ))}
            </ul>
            <div className="flex gap-2">
              <Link to="/checkout" className="btn btn-primary flex-1">Pilih</Link>
              <Link to="/events/esports" className="btn btn-outline flex-1">Detail</Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
