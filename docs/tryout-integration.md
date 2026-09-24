# Laporan integrasi TRY OUT

Dihasilkan oleh `npm run generate:questions`. Sumber akademik tetap file Markdown asli.

| Modul | Soal |
| --- | ---: |
| Bedah Mulut | 30 |
| Konservasi | 30 |
| Oral Medicine | 30 |
| Periodontologi | 30 |
| Orthodonti | 30 |
| Paedodonti | 30 |
| Etik Kedokteran Gigi | 25 |
| Ilmu Kesehatan Gigi Masyarakat | 30 |
| Prosthodonti | 30 |
| Radiologi Dental | 30 |
| Dental Material | 30 |
| Biomedik & Biologi Oral | 30 |

Total TRY OUT: **355 soal**. Ditambah 60 soal Modul Ortho existing: **415 soal**.

## Gambar

Path relatif terhadap root project; URL publik menghilangkan awalan `public`. Tidak ada gambar pengganti buatan.

| Modul | Nomor sumber | Path file | Status |
| --- | ---: | --- | --- |
| Konservasi | 21 | `public/questions/konservasi/question-21.png` | Tersedia |
| Radiologi Dental | 19 | `public/questions/radiologi-dental/question-19.png` | Tersedia |

## Catatan data

- Konservasi: Soal 2: duplicate source option labels (A, B, C, C, D); original labels preserved, unique internal IDs assigned by position. Key remains B. Previously treated.
- Metadata tingkat kesulitan tidak tersedia di sumber TRY OUT dan tidak diasumsikan.
- Pembahasan yang tidak tersedia ditampilkan sebagai ‘Pembahasan belum tersedia’ tanpa menambah konten akademik.
- Huruf opsi asli (termasuk huruf kecil) dipertahankan untuk tampilan. ID internal A–E mengikuti posisi opsi; kunci dipetakan melalui pasangan label dan teks sumber yang harus cocok persis.
- Seluruh heading soal, jumlah yang dinyatakan sumber, nomor berurutan, teks, opsi, pasangan kunci, ID unik, dan placeholder gambar divalidasi; data ambigu menghentikan generator.
