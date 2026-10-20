# Aliyah Salsabila Putri — Portfolio

Portfolio web app dengan frontend React/Vite dan backend Express. Data profil disimpan satu kali di `shared/portfolioData.json`, dipakai oleh frontend sebagai fallback dan backend Express sebagai sumber API.

## Struktur

- `client/` — aplikasi React, komponen, styling, dan aset publik.
- `server/` — Express API lokal, penyimpanan pesan lokal, dan notifikasi email.
- `api/` — Vercel serverless functions.
- `shared/portfolioData.json` — data profil, edukasi, keahlian, sertifikat, proyek, dan pengalaman.

## Menjalankan lokal

Jalankan `npm run install:all`, lalu `npm run dev` dari direktori proyek. Frontend tersedia di `http://localhost:5173` dan API Express di `http://localhost:5000`.

Salin `server/.env.example` menjadi `server/.env`, lalu isi `EMAIL_USER`, `EMAIL_PASS`, dan opsional `EMAIL_RECEIVER` untuk notifikasi email. Isi `ADMIN_PASSWORD` di file yang sama untuk membuka inbox. Endpoint inbox memerlukan password tersebut dan mengembalikan data pesan hanya setelah autentikasi.

Build frontend dapat dibuat dengan `npm run build`.

## API Express lokal

| Method | Endpoint | Akses |
|---|---|---|
| GET | `/api/health` | Publik |
| GET | `/api/portfolio` | Publik |
| GET | `/api/projects/:id` | Publik |
| POST | `/api/contact` | Publik |
| GET | `/api/messages` | Admin (`Authorization: Bearer <ADMIN_PASSWORD>`) |
| PATCH | `/api/messages/:id/read` | Admin |
| DELETE | `/api/messages/:id` | Admin |

Pesan lokal disimpan di `server/data/messages.json`. File ini diabaikan Git karena berisi data pribadi pengirim.

## Deployment Vercel

Vercel menggunakan serverless functions di `api/` untuk data portofolio, detail proyek, dan formulir kontak. Atur `EMAIL_USER`, `EMAIL_PASS`, dan opsional `EMAIL_RECEIVER` di environment variables Vercel. Form kontak di Vercel mengirim notifikasi email; penyimpanan inbox berbasis file hanya tersedia pada backend Express lokal dan tidak digunakan sebagai penyimpanan persisten di Vercel.
