# Little Archive — Birthday Website

Website ucapan ulang tahun interaktif bertema **cream scrapbook**, dibuat dengan React + Vite. Bisa dipublikasikan di Vercel sebagai proyek statis.

## Isi 8 bagian
1. Date/time + countdown (opsional)
2. Kotak kado animasi
3. Jembatan ke cerita/kenangan
4. Surat animasi
5. Galeri foto dengan lightbox
6. Satu video
7. Birthday wishes interaktif
8. Penutup Happy Birthday

## Cara mengedit konten
Edit `src/data.js`:
- `recipient`: nama panggilan penerima
- `sender`: nama/panggilan pengirim
- `birthdayDate`: tanggal yang tampil di hero
- `birthdayISO`: isi misalnya `2026-11-14T00:00:00` untuk menampilkan countdown
- `intro`, `letter`, `wishes`, `memories`, `photos`: teks, kenangan, dan foto
- `songFile`: file musik yang kamu tambahkan ke `public/`
- `videoFile`: file video MP4 yang kamu tambahkan ke `public/`

Foto contoh menggunakan URL Unsplash. Ganti dengan foto pribadi agar terasa personal dan unik. Untuk aset lokal, taruh file di `public/` dan gunakan path seperti `/foto-1.jpg`.

## Menjalankan lokal
Butuh Node.js versi 18 atau lebih baru.

```bash
npm install
npm run dev
```

Build untuk produksi:

```bash
npm run build
npm run preview
```

## Deploy ke Vercel
1. Ekstrak ZIP ini.
2. Push isi folder ke repository GitHub.
3. Di Vercel pilih **Add New → Project**, lalu import repository.
4. Framework akan terdeteksi sebagai Vite. Build command: `npm run build`, output directory: `dist`.
5. Klik **Deploy**.

Tidak memerlukan environment variable atau backend.

## Catatan musik dan video
Browser tidak mengizinkan autoplay musik sebelum ada interaksi pengguna. Tombol `our song` menyalakan musik setelah diklik. Letakkan file musik yang kamu punya hak untuk gunakan di `public/music.mp3`, atau ganti `songFile` di `src/data.js`.

Untuk video, letakkan file di `public/video-kita.mp4` dan isi `videoFile: "/video-kita.mp4"`. Tanpa file video, bagian video menampilkan poster dengan petunjuk penggantian.
