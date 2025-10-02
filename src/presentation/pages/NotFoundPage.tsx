import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <section className="stack" style={{ alignItems: 'center', textAlign: 'center' }}>
      <div className="card" style={{ padding: '2rem 1.5rem', maxWidth: 560 }}>
        <h1>404 • Halaman Tidak Ditemukan</h1>
        <p className="muted">Halaman yang kamu cari tidak tersedia atau telah dipindahkan.</p>
        <div style={{ marginTop: '1rem' }}>
          <Link to="/" className="btn btn-primary">Kembali ke Beranda</Link>
        </div>
      </div>
    </section>
  );
}
