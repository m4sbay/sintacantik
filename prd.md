# PRODUCT REQUIREMENTS DOCUMENT — SINTACANTIK

## 1. Product Overview

**Product Name:** Sintacantik  
**Platform:** Web Application  
**Primary Framework:** Next.js  
**Deployment Target:** Vercel  
**Primary Purpose:** Sistem belajar dan latihan soal pilihan ganda berbasis bank soal pribadi.

Sintacantik adalah website latihan soal yang memungkinkan pengguna mengambil sejumlah soal secara acak dari bank soal, mengatur tingkat kesulitan, menentukan timer, memberikan nama sesi latihan, mengerjakan soal secara bebas tanpa urutan yang dipaksakan, menandai soal yang masih diragukan, kemudian mendapatkan hasil lengkap setelah seluruh sesi selesai.

Bank soal awal berjumlah sekitar **60 soal pilihan ganda** dan nantinya diberikan melalui file:

`soal.md`

File tersebut akan menjadi **source of truth** untuk soal, pilihan jawaban, dan jawaban benar.

Pada sumber soal sebelumnya, jawaban benar ditandai dengan teks berwarna merah pada dokumen Word. Ketika dipindahkan ke `soal.md`, informasi jawaban benar harus dibuat eksplisit agar tidak bergantung pada warna atau format visual.

---

# 2. Product Goals

Website harus:

1. Membantu pengguna melakukan latihan soal secara cepat.
2. Mengacak soal sehingga latihan tidak selalu memiliki urutan sama.
3. Memungkinkan pengguna memilih jumlah soal.
4. Memungkinkan pengguna memilih tingkat kesulitan.
5. Menyediakan timer yang dapat dikonfigurasi.
6. Memungkinkan pemberian nama pada setiap sesi latihan.
7. Memberikan navigasi bebas antarsoal.
8. Menunjukkan status setiap soal.
9. Memungkinkan soal ditandai sebagai "ragu".
10. Memberikan hasil setelah sesi selesai.
11. Menjelaskan setiap jawaban yang salah.
12. Menunjukkan jawaban yang benar.
13. Ringan dan cepat.
14. Mendukung dark mode.
15. Responsive.
16. Memiliki UI profesional tetapi tetap sederhana.
17. Mudah dikembangkan jika jumlah soal bertambah di masa depan.

---

# 3. Non-Goals untuk Versi Pertama

Versi awal tidak memerlukan:

- autentikasi/login
- akun pengguna
- leaderboard
- multiplayer
- pembayaran
- admin dashboard kompleks
- database eksternal
- backend khusus
- cloud synchronization
- AI-generated questions
- social sharing
- gamification kompleks

Arsitektur tetap dibuat cukup modular sehingga fitur tersebut dapat ditambahkan jika diperlukan.

---

# 4. Target User

Untuk MVP, Sintacantik merupakan **personal study tool**.

User utama hanya membutuhkan:

- membuka website
- membuat sesi latihan
- memilih konfigurasi
- mengerjakan soal
- melihat hasil
- mempelajari kesalahan

Tidak diperlukan onboarding panjang.

---

# 5. Primary User Flow

Alur utama:

**Landing / Setup Session**

↓

User mengisi:

- Session Name
- Number of Questions
- Difficulty
- Timer

↓

Klik:

**Mulai Latihan**

↓

Sistem:

1. mengambil soal dari bank soal
2. memfilter berdasarkan difficulty
3. memilih soal secara random
4. mengacak urutan soal
5. membuat session state
6. memulai timer

↓

**Quiz Interface**

User:

- membaca soal
- memilih jawaban
- berpindah ke soal lain
- menandai soal ragu
- melihat timer
- melihat status seluruh nomor

↓

Semua soal terjawab

↓

Tombol utama berubah menjadi:

**Submit Jawaban**

↓

User submit

↓

**Result Page**

Menampilkan:

- score
- jumlah benar
- jumlah salah
- persentase
- waktu pengerjaan
- nama sesi
- daftar soal salah
- jawaban user
- jawaban benar
- penjelasan

---

# 6. Page Architecture

MVP memiliki tiga tampilan utama:

```text
/
└── Session Setup

/quiz
└── Quiz Session

/result
└── Quiz Result
```

Tidak perlu membuat route berbasis nomor soal seperti:

```text
/quiz/1
/quiz/2
```

Navigasi soal cukup dilakukan melalui state pada satu halaman quiz.

Tujuannya:

- navigasi lebih cepat
- tidak reload
- state lebih mudah dipertahankan
- timer tidak terganggu
- UX lebih responsif

---

# 7. Session Setup Page

## Objective

Memungkinkan user mengatur parameter latihan sebelum memulai.

---

## 7.1 Session Name

Input:

**Nama Sesi**

Contoh:

```text
Latihan Malam
Simulasi Bab 1
Persiapan Ujian Senin
Latihan 30 Soal
```

Properties:

- optional
- jika kosong sistem membuat default

Default:

```text
Latihan Soal
```

Nama sesi ditampilkan kembali pada:

- quiz header
- result page

---

# 8. Number of Questions

User dapat memilih berapa soal yang ingin dikerjakan.

Contoh options:

```text
10
20
30
40
50
Semua
```

Namun jumlah maksimum harus menyesuaikan jumlah soal tersedia setelah filtering difficulty.

Misalnya:

```text
Difficulty: Hard
Available questions: 14
```

maka user tidak boleh memilih 20.

UI harus memberikan feedback yang jelas.

Contoh:

```text
14 soal tersedia untuk level ini.
```

---

# 9. Difficulty System

Difficulty tidak boleh ditentukan secara random.

Setelah `soal.md` diberikan, seluruh soal harus dianalisis terlebih dahulu.

Gunakan tiga level:

```text
Easy
Medium
Hard
```

atau label Bahasa Indonesia:

```text
Mudah
Sedang
Sulit
```

Gunakan Bahasa Indonesia pada UI.

---

# 10. Difficulty Classification Criteria

Saat membaca `soal.md`, lakukan analisis berdasarkan beberapa faktor.

### MUDAH

Biasanya:

- factual recall
- definisi langsung
- jawaban terlihat jelas
- tidak membutuhkan reasoning panjang
- hanya membutuhkan satu konsep

---

### SEDANG

Biasanya membutuhkan:

- pemahaman konsep
- membandingkan pilihan
- interpretasi
- penerapan konsep sederhana
- elimination reasoning

---

### SULIT

Biasanya membutuhkan:

- beberapa konsep sekaligus
- analisis situasi
- opsi jawaban sangat mirip
- reasoning multi-step
- detail spesifik
- jebakan konseptual
- pemahaman mendalam

---

## Important

Difficulty harus disimpan dalam data soal.

Contoh:

```ts
difficulty: "easy"
```

Jangan menghitung difficulty setiap kali website dijalankan.

Difficulty adalah bagian dari static question data.

---

# 11. Difficulty Selection

Pada halaman setup tersedia:

```text
Semua Tingkat
Mudah
Sedang
Sulit
```

Default:

```text
Semua Tingkat
```

Jika user memilih Semua Tingkat, sistem dapat mengambil soal dari semua level.

---

# 12. Timer Configuration

User dapat memilih timer sebelum memulai.

Options yang direkomendasikan:

```text
Tanpa Timer
10 Menit
15 Menit
30 Menit
45 Menit
60 Menit
Custom
```

Jika memilih custom, user dapat memasukkan durasi dalam menit.

---

# 13. Timer Behaviour

Saat quiz dimulai:

```text
MM:SS
```

ditampilkan dengan jelas pada quiz header.

Contoh:

```text
24:38
```

Ketika waktu tinggal:

```text
< 5 menit
```

timer dapat mendapatkan visual warning.

Gunakan warna semantic warning.

Jangan menggunakan animasi berlebihan.

---

## Timer Expired

Jika timer mencapai:

```text
00:00
```

sistem otomatis:

1. mengunci jawaban
2. submit session
3. membuka halaman hasil

Unanswered questions dianggap:

```text
Incorrect / Unanswered
```

tetapi sebaiknya dibedakan pada result statistics.

---

# 14. Question Randomization

Saat session dimulai:

1. filter soal berdasarkan difficulty
2. shuffle question pool
3. ambil sesuai jumlah soal yang dipilih
4. shuffle order

Gunakan algoritma unbiased shuffle seperti:

```text
Fisher-Yates shuffle
```

Jangan menggunakan sorting berbasis:

```ts
Math.random() - 0.5
```

sebagai mekanisme utama jika implementasi shuffle yang lebih benar mudah dilakukan.

---

# 15. Option Randomization

Default MVP:

**jangan mengacak posisi pilihan jawaban.**

Alasan:

- sumber soal mungkin menggunakan pola tertentu
- mempermudah validasi data
- menghindari kesalahan mapping answer key

Sistem dapat dibuat extensible sehingga option shuffle dapat ditambahkan di masa depan.

---

# 16. Quiz Layout

Desktop layout direkomendasikan:

```text
┌─────────────────────────────────────────────────────────┐
│ Session Name                         Timer  24:38        │
├───────────────────┬─────────────────────────────────────┤
│                   │                                     │
│ Question Numbers  │ Question                            │
│                   │                                     │
│ 01 02 03 04 05    │ Pilihan A                           │
│ 06 07 08 09 10    │ Pilihan B                           │
│ ...               │ Pilihan C                           │
│                   │ Pilihan D                           │
│                   │                                     │
│ Progress          │                                     │
│ 17 / 30 answered  │                                     │
│                   │                                     │
│                   │ [Ragu]                  [Next]       │
└───────────────────┴─────────────────────────────────────┘
```

Sidebar dapat sticky.

Question content merupakan fokus visual utama.

---

# 17. Mobile Layout

Pada mobile:

```text
Header
Session Name
Timer

Question Number Grid

Question

Answer Options

Flag / Ragu

Previous / Next
```

Question navigator dapat menggunakan:

- collapsible panel
- horizontal/compact grid
- drawer

Namun user harus tetap dapat membuka nomor soal tanpa banyak interaction.

---

# 18. Question Navigator

Seluruh nomor soal harus terlihat atau dapat diakses dengan cepat.

Contoh:

```text
01 02 03 04 05
06 07 08 09 10
11 12 13 14 15
```

Setiap nomor memiliki state visual.

---

# 19. Question Status

Minimal terdapat empat state:

### Unanswered

Neutral.

Contoh:

```text
gray
```

---

### Current

Nomor soal yang sedang dibuka.

Gunakan primary color.

---

### Answered

Soal sudah memiliki jawaban.

Gunakan success-neutral / filled state yang jelas.

Tidak perlu menggunakan hijau terlalu kuat karena hijau dapat diasosiasikan sebagai jawaban benar sebelum submit.

Lebih baik memakai warna primary/subtle.

---

### Doubt / Ragu

User menandai soal ragu.

Gunakan semantic:

```text
orange / amber
```

State ragu harus tetap terlihat walaupun soal sudah dijawab.

Priority state:

```text
Current > Doubt > Answered > Unanswered
```

atau gunakan kombinasi indicator.

Contoh:

```text
background = answered
small orange dot = doubt
```

Jika lebih accessible.

---

# 20. Mark as Doubt

Terdapat control:

```text
Tandai Ragu
```

User dapat toggle.

Possible UI:

```text
Flag icon + Ragu
```

Ketika aktif:

```text
Flagged
```

Nomor soal juga berubah menjadi orange/amber.

State ragu tidak memengaruhi nilai.

---

# 21. Answer Selection

Pilihan jawaban berbentuk selectable card/radio.

Contoh:

```text
○ A. ....
○ B. ....
○ C. ....
○ D. ....
```

Seluruh container pilihan harus clickable.

Target touch minimum:

```text
44×44px
```

Keyboard navigation harus didukung.

---

# 22. Navigation Controls

Pada bagian bawah soal:

```text
Previous
Next
```

Behaviour:

### Previous

Membuka soal sebelumnya.

Disabled pada soal pertama.

---

### Next

Membuka soal berikutnya.

Namun tombol Next **tidak otomatis berubah menjadi Submit hanya karena user berada pada soal terakhir.**

Requirement utama:

> Submit bukan berdasarkan posisi soal, tetapi berdasarkan completion state.

---

# 23. Submit Button Logic

Selama masih terdapat soal belum dijawab:

```text
Next
```

atau normal navigation tetap tersedia.

Ketika seluruh soal sudah memiliki jawaban:

Primary completion action berubah menjadi:

```text
Submit Jawaban
```

Tombol submit harus tersedia secara jelas.

Tidak harus menunggu user berada di soal terakhir.

Contoh:

```text
29/30 answered
→ Continue

30/30 answered
→ Submit Jawaban
```

---

# 24. Submit Confirmation

Saat user memilih:

```text
Submit Jawaban
```

tampilkan confirmation dialog.

Contoh:

```text
Submit jawaban?

Kamu sudah menjawab 30 dari 30 soal.
Jawaban tidak dapat diubah setelah dikirim.

[Batal]
[Submit Jawaban]
```

Jika masih ada soal unanswered akibat timer/off-flow condition, tampilkan jumlahnya.

---

# 25. Session State

Session minimal menyimpan:

```ts
sessionName
questions
answers
flaggedQuestions
currentQuestionIndex
startedAt
timeLimit
remainingTime
completedAt
```

---

# 26. State Persistence

MVP sebaiknya menggunakan:

```text
sessionStorage
```

atau local persistence sederhana.

Tujuannya:

jika browser mengalami accidental refresh selama quiz, session tidak langsung hilang.

Suggested strategy:

```text
sessionStorage
```

karena quiz merupakan temporary session.

Jangan membutuhkan backend/database untuk MVP.

---

# 27. Refresh Behaviour

Jika user refresh saat quiz:

sistem memulihkan:

- session
- soal
- jawaban
- soal ragu
- current question
- timer

Timer harus menggunakan timestamp.

Jangan hanya melakukan:

```ts
setInterval(counter - 1)
```

sebagai source of truth.

Gunakan:

```ts
startedAt
expiresAt
```

kemudian hitung:

```text
remaining = expiresAt - Date.now()
```

Ini mencegah timer tidak akurat setelah tab inactive atau refresh.

---

# 28. Result Page

Setelah submit, tampilkan summary.

Example:

```text
Latihan Malam

24 / 30 Benar

80%

Benar       24
Salah        5
Kosong       1
Waktu      18:42
```

---

# 29. Score Calculation

Gunakan:

```text
scorePercentage =
(correctAnswers / totalQuestions) × 100
```

Round secara reasonable.

Contoh:

```text
86.7%
```

atau:

```text
87%
```

Prefer integer untuk tampilan utama.

Detail dapat tetap menyimpan nilai decimal.

---

# 30. Performance Classification

Optional visual feedback:

```text
90–100  Sangat Baik
80–89   Baik
70–79   Cukup
<70     Perlu Dipelajari Lagi
```

Ini hanya visual feedback.

Tidak memengaruhi scoring.

---

# 31. Incorrect Answer Review

Requirement penting:

**khusus jawaban yang salah harus diberikan penjelasan.**

Untuk setiap salah:

```text
Soal 7

[Question]

Jawaban kamu:
B. ...

Jawaban benar:
D. ...

Penjelasan:
...
```

Jika unanswered:

```text
Jawaban kamu:
Tidak dijawab
```

---

# 32. Explanation Data

Setiap soal nantinya idealnya memiliki:

```ts
explanation: string
```

Jika `soal.md` hanya berisi:

- question
- options
- correct answer

maka explanation harus dibuat sebagai tahap preprocessing/content enrichment.

Penjelasan harus:

- singkat
- jelas
- edukatif
- menjelaskan mengapa jawaban benar
- bila relevan menjelaskan mengapa pilihan user salah

Jangan hanya menulis:

```text
Jawaban yang benar adalah C.
```

Harus ada reasoning.

---

# 33. Result Review Scope

Default result page fokus pada:

```text
Jawaban Salah
```

Tetapi sediakan filter:

```text
Semua
Salah
Benar
Kosong
```

Default:

```text
Salah
```

Supaya user langsung fokus belajar dari kesalahan.

---

# 34. Restart Session

Result page memiliki dua CTA.

Primary:

```text
Latihan Lagi
```

Secondary:

```text
Kembali ke Beranda
```

"Latihan Lagi" dapat mempertahankan konfigurasi sebelumnya:

- jumlah soal
- difficulty
- timer

tetapi melakukan reshuffle soal.

---

# 35. Question Data Architecture

Setelah `soal.md` diterima, convert menjadi structured data.

Recommended directory:

```text
src/
  data/
    questions/
      questions.ts
```

atau:

```text
src/
  content/
    questions.ts
```

Jika ingin lebih scalable:

```text
content/
  questions/
    question-001.ts
    question-002.ts
```

Namun untuk sekitar 60 soal, satu structured data file masih reasonable.

Priority:

**simplicity > unnecessary abstraction.**

---

# 36. Question Data Model

Recommended TypeScript type:

```ts
type QuestionDifficulty = "easy" | "medium" | "hard";

type QuestionOption = {
  id: "A" | "B" | "C" | "D" | "E";
  text: string;
};

type Question = {
  id: string;
  question: string;
  options: QuestionOption[];
  correctAnswer: QuestionOption["id"];
  difficulty: QuestionDifficulty;
  explanation: string;
  tags?: string[];
};
```

Example:

```ts
{
  id: "q001",
  question: "...",
  options: [
    { id: "A", text: "..." },
    { id: "B", text: "..." },
    { id: "C", text: "..." },
    { id: "D", text: "..." }
  ],
  correctAnswer: "C",
  difficulty: "medium",
  explanation: "...",
  tags: []
}
```

---

# 37. Stable Question IDs

Question ID tidak boleh bergantung sepenuhnya pada array index.

Gunakan:

```text
q001
q002
q003
...
```

Alasannya:

jika urutan data berubah, session/reference tidak rusak.

---

# 38. `soal.md` Parsing Stage

Sebelum implementasi question database final:

Codex harus membaca `soal.md`.

Lakukan:

1. identify seluruh soal
2. identify pilihan jawaban
3. identify correct answer
4. validate question numbering
5. identify duplicate questions
6. identify incomplete options
7. classify difficulty
8. generate explanation
9. convert menjadi structured TypeScript data

Jangan mengubah isi/fakta soal tanpa alasan.

---

# 39. Data Validation

Buat utility validation pada development.

Check:

```text
question.id unique
question not empty
minimum 2 options
option IDs unique
correctAnswer exists in options
difficulty valid
explanation not empty
```

Jika invalid, development harus fail loudly.

Tujuannya agar kesalahan data tidak diam-diam muncul di production.

---

# 40. Technology Stack

Required:

```text
Next.js
TypeScript
React
Vercel
```

Recommended:

```text
Next.js App Router
Tailwind CSS
```

Icon:

```text
Lucide React
```

---

# 41. Avoid Unnecessary Dependencies

Jangan menambahkan library jika fitur dapat dibuat sederhana dengan platform/browser/React.

Avoid:

- large state management library
- Redux
- complex database
- animation framework jika tidak dibutuhkan
- full component framework jika hanya membutuhkan komponen sederhana

State quiz dapat ditangani melalui:

```text
React state
Context
custom hook
```

---

# 42. Suggested Project Structure

```text
src/
├── app/
│   ├── page.tsx
│   ├── quiz/
│   │   └── page.tsx
│   ├── result/
│   │   └── page.tsx
│   └── layout.tsx
│
├── components/
│   ├── quiz/
│   │   ├── QuestionCard.tsx
│   │   ├── QuestionNavigator.tsx
│   │   ├── QuizHeader.tsx
│   │   ├── QuizTimer.tsx
│   │   ├── AnswerOption.tsx
│   │   └── QuizControls.tsx
│   │
│   ├── result/
│   │   ├── ResultSummary.tsx
│   │   ├── ResultReview.tsx
│   │   └── AnswerReviewCard.tsx
│   │
│   └── ui/
│
├── data/
│   └── questions.ts
│
├── hooks/
│   ├── useQuizSession.ts
│   └── useQuizTimer.ts
│
├── lib/
│   ├── quiz.ts
│   ├── shuffle.ts
│   └── storage.ts
│
└── types/
    └── quiz.ts
```

Jangan mengikuti struktur ini secara dogmatis jika ada implementasi Next.js yang lebih sederhana.

---

# 43. Design Direction

Design character:

```text
professional
clean
focused
calm
modern
study-oriented
minimal
```

Hindari tampilan seperti:

- dashboard enterprise
- game anak-anak
- terlalu banyak gradient
- neon
- glassmorphism berlebihan
- terlalu banyak shadow
- overly decorative UI

Content soal adalah fokus utama.

---

# 44. Design System

Gunakan semantic design tokens.

Contoh:

```text
background
surface
surface-muted
text-primary
text-secondary
border
primary
warning
success
danger
```

Dark mode harus menggunakan token yang sama dengan value berbeda.

Jangan membuat warna manual berbeda pada setiap komponen.

---

# 45. Typography

Gunakan satu keluarga font yang sangat readable.

Recommended:

```text
Geist
```

atau font modern sans-serif yang tersedia dengan optimal pada Next.js.

---

# 46. Typography Scale

Gunakan modular scale yang konsisten dan mendekati **golden ratio**, tetapi jangan memaksakan rasio 1.618 jika menyebabkan ukuran ekstrem.

Prinsip utama:

```text
clear hierarchy
consistent rhythm
comfortable reading
```

Suggested desktop scale:

```text
Body Small   14px
Body         16px
H4           18px
H3           24px
H2           32px
H1           48px
```

Untuk halaman quiz, heading soal tidak perlu sebesar landing page.

Question:

```text
20–24px
```

untuk desktop.

Mobile dapat menggunakan scale lebih kecil.

---

# 47. Line Height

Body:

```text
1.5–1.7
```

Question:

```text
1.4–1.55
```

UI label:

```text
1.2–1.4
```

Prioritaskan readability.

---

# 48. Spacing System

Gunakan base:

```text
4px
```

Common:

```text
4
8
12
16
24
32
48
64
```

Jangan menggunakan spacing arbitrary tanpa alasan.

---

# 49. Border Radius

Requirement:

**rounded seragam dan medium.**

Gunakan satu radius utama.

Contoh:

```text
10px
```

atau Tailwind equivalent:

```text
rounded-lg
```

Gunakan secara konsisten untuk:

- cards
- buttons
- answer options
- inputs
- dialog
- navigator

Badge kecil boleh sedikit berbeda hanya jika diperlukan.

Hindari campuran:

```text
rounded-sm
rounded-xl
rounded-3xl
pill
```

tanpa alasan.

---

# 50. Borders

Gunakan border halus sebagai struktur utama.

Prefer:

```text
1px border
```

daripada shadow besar.

Shadow hanya untuk:

- dialog
- floating element
- sticky hierarchy jika benar-benar diperlukan

---

# 51. Color Semantics

Required semantic states:

```text
Primary
Neutral
Warning
Success
Error
```

Ragu:

```text
Warning / Amber
```

Incorrect result:

```text
Error
```

Correct result:

```text
Success
```

---

# 52. Dark Mode

Required.

Support:

```text
Light
Dark
System
```

Jika MVP ingin lebih sederhana, minimal:

```text
Light
Dark
```

Theme toggle ditempatkan secara subtle pada header.

Gunakan persistence dengan:

```text
localStorage
```

dan preferensi system sebagai initial value.

Avoid flash of wrong theme.

---

# 53. Accessibility

Target:

```text
WCAG 2.1 AA
```

Minimal requirements:

- semantic HTML
- accessible radio buttons
- keyboard navigation
- visible focus ring
- sufficient contrast
- buttons memiliki accessible names
- timer tidak hanya mengandalkan warna
- warning tidak hanya dikomunikasikan dengan warna
- dialog focus trap
- screen-reader-friendly labels

---

# 54. Keyboard Support

User harus dapat:

```text
Tab
Shift + Tab
Enter
Space
```

untuk mengoperasikan pilihan dan tombol.

Optional shortcut future:

```text
1 → A
2 → B
3 → C
4 → D
```

Tidak wajib untuk MVP.

---

# 55. Responsive Behaviour

Breakpoints tidak perlu kompleks.

Gunakan pendekatan:

```text
mobile-first
```

Desktop:

```text
navigator sidebar + main content
```

Tablet:

```text
compact sidebar atau navigator top
```

Mobile:

```text
single column
```

---

# 56. Maximum Content Width

Jangan membuat soal melebar sepanjang layar desktop.

Question reading area:

```text
~720–820px
```

agar readable.

Page shell dapat lebih lebar untuk menampung navigator.

---

# 57. UX Requirements

Jangan:

- reset scroll secara aneh
- melakukan page reload saat next
- kehilangan jawaban saat berpindah soal
- membuat seluruh halaman berubah tinggi secara agresif
- menyembunyikan timer
- memaksa soal diselesaikan berurutan

User harus bebas pindah:

```text
1 → 17 → 4 → 30
```

tanpa kehilangan state.

---

# 58. Progress Indicator

Tampilkan:

```text
17 dari 30 terjawab
```

Optional:

progress bar.

Progress dihitung berdasarkan:

```text
answeredQuestions / totalQuestions
```

Flagged tidak dihitung sebagai answered jika belum memiliki answer.

---

# 59. Question Transition

Gunakan transition sangat subtle atau tanpa animasi.

Jika menggunakan animasi:

```text
100–200ms
```

Hindari slide besar yang membuat navigasi terasa lambat.

---

# 60. Performance Targets

Website harus sangat ringan.

Target:

```text
LCP < 2.5s
CLS < 0.1
INP < 200ms
```

Question navigation harus terasa instant.

---

# 61. Rendering Strategy

Karena bank soal static:

prefer static/client architecture.

Tidak perlu API request setiap membuka soal.

Question bank dapat dibundle/static import.

Quiz interaction dilakukan client-side.

---

# 62. Security / Answer Exposure

Karena ini personal study application tanpa competitive exam environment, correct answers boleh berada dalam client bundle.

Tidak perlu membangun backend hanya untuk menyembunyikan answer key.

Jika aplikasi suatu hari digunakan sebagai formal examination platform, architecture perlu ditinjau ulang.

---

# 63. Session Result Storage

MVP tidak wajib menyimpan histori.

Namun data model sebaiknya memungkinkan future feature:

```ts
type QuizResult = {
  id: string;
  sessionName: string;
  score: number;
  totalQuestions: number;
  correct: number;
  incorrect: number;
  unanswered: number;
  startedAt: string;
  completedAt: string;
  durationSeconds: number;
};
```

---

# 64. Future Feature Compatibility

Architecture sebaiknya memungkinkan penambahan:

- session history
- weakest topic analytics
- retry wrong questions
- bookmarks
- topic filtering
- search question
- custom question bank
- multiple question sets
- import markdown
- user account
- progress analytics

Tetapi jangan implementasikan sekarang jika tidak diperlukan.

---

# 65. Empty/Error States

Jika filter menghasilkan:

```text
0 soal
```

jangan menjalankan session.

Tampilkan:

```text
Tidak ada soal tersedia untuk filter ini.
Silakan pilih tingkat kesulitan lain.
```

---

# 66. Data Error State

Jika question database invalid:

development harus fail loudly.

Production sebaiknya menampilkan fallback error page daripada quiz rusak secara diam-diam.

---

# 67. Timer Disabled State

Jika:

```text
Tanpa Timer
```

Quiz header jangan menampilkan:

```text
00:00
```

Tampilkan:

```text
Tanpa batas waktu
```

atau cukup sembunyikan countdown dan gunakan clock icon dengan label.

---

# 68. Result Review Card

Recommended structure:

```text
┌───────────────────────────────┐
│ Soal 12            SALAH      │
│                               │
│ Question text...              │
│                               │
│ Jawaban kamu                  │
│ B. ...                        │
│                               │
│ Jawaban benar                 │
│ D. ...                        │
│                               │
│ Penjelasan                    │
│ Lorem ipsum...                │
└───────────────────────────────┘
```

---

# 69. Correct Answer Review

Jika user membuka filter:

```text
Benar
```

tidak perlu explanation sepanjang soal salah.

Dapat menampilkan:

```text
Jawaban kamu: C
Jawaban benar: C
```

Explanation tetap boleh tersedia jika sudah menjadi bagian question database.

---

# 70. User Feedback

Answer selection harus langsung memberikan visual selected state.

Namun jangan menunjukkan:

```text
correct / incorrect
```

sebelum quiz disubmit.

Tujuan menjaga simulasi latihan.

---

# 71. No Accidental Spoilers

Sebelum submit:

jangan expose:

- correct answer highlight
- explanation
- score
- correctness state

---

# 72. Setup Form Validation

Sebelum mulai:

Required:

```text
question count
difficulty
timer mode
```

Session name optional.

Button:

```text
Mulai Latihan
```

disabled hanya ketika configuration invalid.

---

# 73. Landing Page Information Architecture

Recommended:

```text
Logo / Sintacantik

Heading
Latihan soal lebih fokus, satu sesi dalam satu waktu.

Description

Session Configuration Card
├── Nama sesi
├── Jumlah soal
├── Tingkat kesulitan
├── Timer
└── Mulai Latihan

Theme Toggle
```

Landing page jangan terlalu banyak marketing content.

Ini adalah utility app.

---

# 74. Branding

Brand name:

```text
sintacantik
```

Recommended visual treatment:

lowercase:

```text
sintacantik
```

atau title case:

```text
Sintacantik
```

Pilih satu dan konsisten.

Rekomendasi:

```text
sintacantik
```

untuk wordmark/brand, dan:

```text
Sintacantik
```

ketika berada dalam kalimat.

---

# 75. Metadata

Basic metadata:

```text
Title:
Sintacantik — Latihan Soal

Description:
Platform latihan soal pribadi untuk belajar, menguji pemahaman, dan mengevaluasi jawaban.
```

---

# 76. Vercel Deployment

Project harus:

- kompatibel dengan Vercel
- tidak membutuhkan server custom
- environment variables seminimal mungkin
- build berhasil melalui standard Next.js build

Expected:

```bash
npm run build
```

harus pass sebelum dianggap selesai.

---

# 77. Code Quality

Requirements:

```text
TypeScript strict
ESLint clean
No obvious duplicate logic
Reusable UI primitives
Clear naming
Minimal prop drilling
```

Hindari premature abstraction.

Gunakan abstraction jika:

- digunakan berulang
- memiliki responsibility jelas
- meningkatkan readability

---

# 78. Component Responsibilities

### QuestionNavigator

Responsible for:

- list number
- current status
- answered state
- flagged state
- navigate

Tidak menyimpan answer logic.

---

### QuestionCard

Responsible for:

- question content
- answer options
- selected answer

---

### QuizTimer

Responsible for:

- countdown rendering
- expiration callback

---

### QuizControls

Responsible for:

- previous
- next
- flag
- submit

---

### ResultSummary

Responsible for:

- score
- correct count
- incorrect count
- unanswered
- duration

---

### AnswerReviewCard

Responsible for:

- question
- selected answer
- correct answer
- explanation

---

# 79. Quiz Business Logic

Pisahkan logic dari presentational UI.

Recommended utilities:

```text
createQuizSession()
calculateQuizResult()
shuffleQuestions()
filterQuestionsByDifficulty()
isQuizComplete()
```

Ini mempermudah testing dan maintenance.

---

# 80. Testing

Minimal unit tests untuk logic kritikal:

```text
shuffle preserves all questions
question selection obeys requested count
difficulty filter
score calculation
unanswered calculation
quiz completion
timer expiry
```

UI testing tidak perlu excessive untuk MVP.

---

# 81. Edge Cases

Handle:

### Case 1

User memilih 30 soal tetapi difficulty hanya memiliki 20.

Action:

disable invalid count atau automatically adjust dengan feedback.

---

### Case 2

User refresh.

Action:

restore session.

---

### Case 3

Timer expires saat user berada pada soal tertentu.

Action:

auto-submit.

---

### Case 4

User menutup tab.

Tidak wajib recovery lintas browser session.

---

### Case 5

Question memiliki 5 pilihan.

Architecture harus mendukung:

```text
A–E
```

meskipun kebanyakan hanya A–D.

---

### Case 6

Text soal panjang.

Layout tidak boleh overflow.

---

### Case 7

Pilihan jawaban panjang.

Selectable option tetap responsive.

---

# 82. Quiz Completion

A quiz dianggap complete jika:

```ts
answeredCount === totalQuestions
```

Flagged questions tetap dianggap complete jika sudah memiliki jawaban.

---

# 83. Submit Availability

Submission rules:

```text
Manual submit:
allowed ketika seluruh soal terjawab.

Automatic submit:
allowed ketika timer expired.
```

Jika nantinya ingin memungkinkan submit walaupun belum selesai, feature ini dapat ditambahkan kemudian.

Untuk MVP:

manual submit hanya ketika complete.

---

# 84. Result Integrity

Saat submit:

freeze session answer state.

Result tidak boleh berubah walaupun user kembali menggunakan browser navigation.

Jika session telah selesai dan user membuka `/quiz`, redirect atau minta membuat session baru.

---

# 85. Recommended UI Copy

Setup:

```text
Buat Sesi Latihan

Atur sesi belajarmu sebelum mulai.

Nama Sesi
Jumlah Soal
Tingkat Kesulitan
Waktu

Mulai Latihan
```

Quiz:

```text
Soal 7 dari 30

Tandai Ragu

Sebelumnya
Selanjutnya

17 dari 30 terjawab
```

Completion:

```text
Semua soal sudah terjawab.

Submit Jawaban
```

Result:

```text
Hasil Latihan

24 dari 30 jawaban benar

Lihat Pembahasan
```

---

# 86. Recommended UI Density

Gunakan density medium.

Jangan terlalu compact karena aktivitas utama adalah membaca.

Question options harus memiliki vertical spacing cukup.

Desktop recommended:

```text
option padding:
14–18px
```

Touch/mobile:

minimum:

```text
44px
```

interactive height.

---

# 87. Iconography

Gunakan icon secara fungsional.

Examples:

```text
Clock
Flag
ChevronLeft
ChevronRight
Check
X
Moon
Sun
```

Tidak perlu icon pada setiap label.

---

# 88. Accessibility Color Rule

Semua status harus memiliki indicator selain warna.

Contoh ragu:

```text
orange + flag icon
```

Correct:

```text
green + check icon
```

Incorrect:

```text
red + X icon
```

---

# 89. Recommended Initial Scope

## Phase 1 — Question Processing

Setelah `soal.md` tersedia:

- parse seluruh soal
- verify answer key
- classify difficulty
- create explanations
- generate structured question data
- validate 60 questions

---

## Phase 2 — Foundation

- Next.js project
- TypeScript
- Tailwind
- typography
- color tokens
- dark mode
- page shell

---

## Phase 3 — Setup

- session name
- question count
- difficulty
- timer
- validation

---

## Phase 4 — Quiz Engine

- random selection
- session state
- answer state
- question navigation
- doubt flag
- progress
- timer
- persistence

---

## Phase 5 — Results

- score calculation
- summary
- wrong answers
- correct answers
- explanation

---

## Phase 6 — Polish

- responsive
- accessibility
- keyboard support
- transitions
- empty states
- performance
- build validation

---

# 90. Definition of Done

Project dianggap selesai ketika:

### Setup

- user dapat memberi nama sesi
- user dapat menentukan jumlah soal
- user dapat memilih difficulty
- user dapat memilih timer
- user dapat memulai latihan

### Quiz

- soal random sesuai configuration
- seluruh nomor dapat dinavigasi bebas
- jawaban tersimpan
- user dapat menandai ragu
- status nomor jelas
- timer berjalan akurat
- reload tidak langsung menghancurkan session
- user dapat submit ketika semua soal selesai

### Result

- correct count akurat
- incorrect count akurat
- unanswered count akurat
- score akurat
- incorrect answers ditampilkan
- correct answer ditampilkan
- explanation tersedia

### Quality

- responsive
- dark mode
- accessible
- clean design
- consistent radius
- consistent typography
- no unnecessary dependencies
- build passes
- fast navigation
- Vercel compatible

---

# 91. Important Implementation Rules for Codex

Codex harus mengikuti aturan berikut:

1. Jangan mulai membuat data soal sebelum membaca `soal.md`.

2. Jangan mengarang jawaban benar.

3. Jawaban benar harus berasal dari source soal yang diberikan.

4. Difficulty harus dianalisis berdasarkan isi soal.

5. Explanation harus sesuai dengan jawaban benar.

6. Jangan melakukan large architecture tanpa kebutuhan nyata.

7. Prioritaskan simple, reusable, maintainable components.

8. Quiz state harus dipisahkan dari visual components.

9. Tidak perlu backend untuk MVP.

10. Tidak perlu database eksternal untuk 60 soal static.

11. Question navigation harus instant.

12. Tidak boleh kehilangan state saat berpindah soal.

13. Jangan menunjukkan jawaban benar sebelum submit.

14. Manual submit hanya tersedia setelah seluruh soal dijawab.

15. Submit bukan bergantung pada user berada pada soal terakhir.

16. Flag/ragu tidak memengaruhi correctness.

17. Gunakan one-medium-radius design system secara konsisten.

18. Dark mode bukan afterthought; seluruh semantic token harus mendukung light/dark sejak awal.

19. Gunakan semantic colors dan hindari hardcoded UI colors tersebar di komponen.

20. Pastikan project dapat di-deploy langsung ke Vercel.

---

# 92. Expected Input File

Codex nantinya akan menerima:

```text
soal.md
```

Sebelum coding question database, lakukan audit isi file dan buat laporan singkat:

```text
Total soal ditemukan:
Total jawaban lengkap:
Total soal bermasalah:
Distribusi difficulty:
- Mudah:
- Sedang:
- Sulit:

Potensi duplicate:
Potensi data tidak lengkap:
```

Jika terdapat ambiguity pada jawaban benar, **jangan menebak**.

Tandai soal tersebut untuk diperiksa.

---

# 93. Recommended `soal.md` Format

Jika memungkinkan, normalisasi file menjadi:

```md
## 1. Pertanyaan...

A. Jawaban A
B. Jawaban B
C. Jawaban C
D. Jawaban D

Jawaban: C
```

Optional:

```md
Pembahasan:
...
```

Jika pembahasan belum tersedia, Codex dapat membantu membuatnya setelah answer key divalidasi.

---

# 94. Final Product Principle

Sintacantik harus terasa seperti:

> sebuah study tool personal yang cepat, tenang, jelas, dan menyenangkan digunakan berkali-kali.

Bukan seperti:

- LMS kompleks
- dashboard admin
- aplikasi ujian birokratis
- game trivia
- landing page marketing

Prioritas desain:

```text
Read question
→ Understand options
→ Answer
→ Navigate
→ Review mistakes
```

Semua keputusan UI dan engineering harus mendukung alur tersebut.