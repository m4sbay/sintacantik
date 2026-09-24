# sintacantik

Personal study/quiz web app berbasis Next.js untuk latihan soal ortodonti.

## Scripts

```bash
npm run dev
npm run lint
npm run typecheck
npm test
npm run build
npm run start
```

## Deployment

Project ini kompatibel dengan Vercel dan tidak membutuhkan backend, database, atau environment variable untuk MVP. Bank soal dibundle sebagai static TypeScript data yang digenerate dari `soal.md` lewat:

```bash
npm run generate:questions
```

## Modul soal dan sumber TRY OUT

- Sumber Ortho: `soal.md`; sumber TRY OUT: `bank-soal/tryout/*.md`. Jangan edit hasil generate secara manual.
- Registry sumber dan urutan modul: `bank-soal/tryout/manifest.json`. Nama modul diambil dari heading `# Modul …` di Markdown.
- `npm run generate:questions` menghasilkan `src/data/questions.ts` (Ortho), `src/data/tryout-questions.ts` (TRY OUT beserta metadata), dan laporan `docs/tryout-integration.md`. Proses ini otomatis berjalan sebelum `npm run dev` dan saat build. Setelah mengedit Markdown saat dev sudah berjalan, jalankan perintah generate lagi.
- `src/data/question-modules.ts` menggabungkan metadata Ortho dan TRY OUT; `src/data/question-bank.ts` menggabungkan seluruh soal untuk konfigurasi, kuis, dan hasil. Parsing tidak dijalankan di browser.
- ID soal TRY OUT memakai `tryout-<moduleId>-<nomor 3 digit>`. Pertahankan ID modul dan nomor soal agar sesi tersimpan tetap stabil.
- Sesi memakai semua soal dari modul terpilih dengan pengacakan existing. ID pilihan berulang tidak menduplikasi soal. Sesi Ortho lama tetap kompatibel.

### Menambahkan modul atau soal

1. Buat sumber Markdown mengikuti format file verified: judul modul, `> Total soal: N`, lalu `## Soal N`, `**Pertanyaan:**`, `**Pilihan Jawaban:**` dengan daftar `- A. …`, dan `**Jawaban Benar:**` dengan label serta teks persis dari opsi. `**Pembahasan:**` opsional.
2. Untuk modul baru, tambahkan `{ "id": "id-modul", "file": "modul-id-modul-verified.md" }` ke manifest. Metadata, UI, jumlah soal, dan filtering otomatis mengikuti hasil generate.
3. Untuk menambah soal, tambahkan nomor berikutnya dan perbarui Total soal. Jangan menomori ulang soal lama.
4. Jalankan `npm run generate:questions`, `npm test`, `npm run lint`, `npm run typecheck`, dan `npm run build`.

Generator menolak soal hilang, format tak dikenal, ID/nomor duplikat, dan kunci yang tidak cocok persis dengan salah satu opsi. Isi akademik tidak diperbaiki otomatis. Label opsi asli disimpan sebagai `sourceLabel`; ID A–E internal mengikuti posisi agar label duplikat di sumber tidak merusak penilaian. Ketidakkonsistenan sumber dicatat di laporan.

### Gambar soal

Gunakan field `**Gambar:**` atau `**Gambar/Radiograf:**` dengan placeholder `[PLACEHOLDER GAMBAR — …]` seperti sumber yang ada. Generator mendeteksi field ini dan menentukan path `public/questions/<moduleId>/question-<nomor 2 digit>.webp`.

Letakkan gambar asli pada path yang dicatat di `docs/tryout-integration.md`, kemudian muat ulang halaman. Gambar langsung digunakan di kuis dan pembahasan; tidak perlu mengubah komponen atau menghapus penanda sumber. Gambar yang belum ada/gagal dimuat menampilkan fallback. Saat mempublikasikan versi berikutnya, sertakan file gambar dalam build.

Sumber TRY OUT saat ini tidak menyertakan tingkat kesulitan maupun pembahasan. Keduanya opsional; UI menampilkan status belum diklasifikasi/belum tersedia, tanpa mengarang konten.

### Pembahasan soal

Pembahasan tetap berada di properti `Question.explanation?: string`, bukan database terpisah. Di halaman hasil, filter awal **Semua** menampilkan pembahasan untuk jawaban benar, salah, dan kosong. Komponen `QuestionExplanation` menampilkan paragraf pendek atau daftar poin sederhana (`-`, `*`, atau `•`), dengan fallback untuk nilai undefined, string kosong, atau whitespace. Konten diperlakukan sebagai teks, bukan HTML.

Untuk soal TRY OUT, tambahkan field berikut setelah jawaban benar dan sebelum pemisah `---` pada file Markdown sumber:

```markdown
**Pembahasan:**
Isi pembahasan asli yang menjelaskan alasan kunci jawaban.

Paragraf singkat berikutnya bila diperlukan.
```

Untuk Modul Ortho, isi bagian `### Pembahasan` di `soal.md`. Bagian ini boleh kosong/belum tersedia. Jalankan `npm run generate:questions` setelah mengedit sumber. Jangan edit file TypeScript hasil generate. Pembahasan baru otomatis tampil untuk soal terkait pada halaman hasil, tanpa mengubah kunci, opsi, atau perhitungan nilai.
