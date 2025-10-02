<p align="center">
  <img src="/brand.svg" alt="Event Project" width="96" height="96" />
  <h1 align="center">Event Project - Modern Ticketing Frontend</h1>
  <p align="center">UI futuristik untuk pembelian tiket yang cepat, jelas, dan nyaman di perangkat mobile.</p>
  <p align="center">
    <a href="#fitur-utama">Fitur</a> •
    <a href="#demo-cepat">Demo</a> •
    <a href="#teknologi">Teknologi</a> •
    <a href="#struktur-proyek">Struktur</a> •
    <a href="#rute-halaman">Rute</a> •
    <a href="#pengembangan">Pengembangan</a>
  </p>
</p>

---

## Fitur Utama

- Bento grid futuristik: hero/tall/wide/square/small, glow neon, glare, dan tilt ringan
- CTA jelas: bar "Mulai dari" + tombol "Beli" selalu terlihat di setiap kartu
- Detail Event: pilih tipe tiket (radio), jumlah (+/−), lalu tambahkan ke keranjang
- Keranjang & Checkout: pilih item yang akan dibayar, atur qty, hapus/clear, total dinamis
- Navbar responsif: logo kustom, drawer mobile, ikon keranjang dengan badge jumlah
- Aksesibilitas: focus-visible dan dukungan prefers-reduced-motion

## Demo Cepat

```bash
cd frontend
npm install
npm run dev
```

Build & preview produksi:

```bash
npm run build
npm run preview
```

## Teknologi

- React 19 • TypeScript 5 • Vite 7
- React Router 7
- CSS murni (komponen + utilitas khusus)

## Struktur Proyek

```
frontend/
├─ public/
│  ├─ brand.svg           # ikon/brand
│  └─ favicon.svg         # favicon
├─ src/
│  ├─ app/                # router, providers (CartProvider, AppProviders)
│  ├─ presentation/       # pages & layouts (Home, Tickets, Checkout, EventDetails, MainLayout)
│  ├─ shared/data/        # events.ts (dummy data + helper harga IDR)
│  └─ index.css           # tema global, bento, navbar, responsif
└─ README.md
```

## Rute Halaman

- `/`  - Home (hero + bento + highlight)
- `/tickets`  - Daftar/seleksi tiket
- `/events/:id`  - Detail event (tipe tiket + qty + add to cart)
- `/checkout`  - Keranjang + pembayaran

## Pengembangan

- Skrip NPM:
  - `dev`  - Vite dev server
  - `build`  - tsc + vite build
  - `preview`  - preview hasil build
  - `lint`  - lint (opsional)

- Penyesuaian cepat:
  - Warna brand: ubah variabel di `src/index.css` (`--brand`, `--brand-500`, dst.)
  - Data event: `src/shared/data/events.ts` (judul, lokasi, kategori, tipe tiket/harga)

## Catatan Desain

- Panel kanan "Upcoming Event" berisi highlight event terbesar + avatar participant
- Pada layar kecil, elemen sekunder disederhanakan agar fokus ke CTA dan konten utama

---

Selamat berkarya dan semoga lancar menjual tiket event Anda!

