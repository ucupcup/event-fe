import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <section className="grid place-items-center text-center">
      <div className="w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-extrabold">404 — Halaman Tidak Ditemukan</h1>
        <p className="mt-1 text-slate-600">Halaman yang kamu cari tidak tersedia atau telah dipindahkan.</p>
        <div className="mt-4">
          <Link to="/" className="btn btn-primary">Kembali ke Beranda</Link>
        </div>
      </div>
    </section>
  );
}

