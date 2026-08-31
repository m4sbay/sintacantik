# Bank Soal Ortodonti — Sintacantik

> **Status:** FINAL — telah diaudit ulang dari dokumen Word sumber dan diverifikasi silang pada butir yang ambigu/kontradiktif.
>
> **Total soal:** 60
>
> File ini adalah **source of truth** untuk implementasi quiz. Codex **tidak boleh** menebak, mengganti, atau menghitung ulang `correct_answer` saat runtime.

## Kontrak Data

- `id` adalah identifier stabil dan tidak boleh bergantung pada posisi array.
- `difficulty` hanya bernilai `mudah`, `sedang`, atau `sulit`.
- `correct_answer` selalu menunjuk label opsi yang benar setelah proses verifikasi.
- `explanation` adalah pembahasan yang ditampilkan setelah sesi disubmit.
- Urutan pilihan jawaban pada file ini harus dipertahankan pada MVP.
- Soal 42 memang hanya memiliki empat opsi; jangan menambahkan opsi E.
- Tanda warna font dari Word **tidak** dibutuhkan lagi oleh aplikasi; kunci final ada pada field `correct_answer`.

## Distribusi Tingkat Kesulitan

- Mudah: **19**
- Sedang: **34**
- Sulit: **7**

## Catatan Verifikasi dan Koreksi Sumber

Dokumen Word awal menggunakan warna merah sebagai penanda jawaban, tetapi penanda tersebut tidak selalu konsisten dengan isi ilmiah soal. Karena file ini akan dipakai sebagai sumber kebenaran aplikasi, semua kunci diaudit ulang. Koreksi yang mengubah atau menormalisasi sumber dicatat di bawah agar tidak dilakukan secara diam-diam.

| Soal | Masalah pada sumber | Resolusi final |
|---:|---|---|
| 7 | Penanda merah pada sumber mengarah ke 'Protrusif maxilla'. | Dikoreksi menjadi C — Prognati maksila. SNA 88° menilai posisi skeletal maksila dan berada di atas nilai normal. |
| 8 | Penanda merah pada sumber mengarah ke ekspansi sagital posterior. | Dikoreksi menjadi E — ekspansi sagital anterior, sesuai arah koreksi anterior crossbite/reverse overjet. |
| 15 | Tidak ada opsi merah. | Ditetapkan A — Anchorage loss; pergeseran molar penjangkar ke mesial adalah kehilangan penjangkaran. |
| 16 | Stem sumber menulis 'I bawah terhadap I-SN' tetapi nilai normal 104° adalah parameter I-SN/U1-SN. | Stem dinormalisasi menjadi I-SN; jawaban dikoreksi menjadi E — inklinasi insisivus atas terhadap dasar kranium. |
| 17 | Penanda merah sumber pada opsi C. | Dikoreksi menjadi B — usia, kooperatif, kebiasaan, dan berat-ringannya maloklusi adalah faktor prognosis umum. |
| 18 | Penanda merah sumber pada penutupan simfisis. | Dikoreksi menjadi C — pertumbuhan head of condyle/ramus berperan pada dimensi vertikal mandibula. |
| 31 | Stem menyebut fase perkembangan tetapi usia pasien 14 tahun. | Kunci A dipertahankan karena jenis yang dideskripsikan adalah diastema fisiologis; pembahasan memberi catatan bahwa persistensi pada usia 14 tahun perlu evaluasi. |
| 36 | Sumber memakai istilah 'prepubertal growth spurt' untuk usia 12 perempuan/14 laki-laki. | Terminologi dinormalisasi menjadi pubertal/adolescent growth spurt; jawaban E dipertahankan. |
| 39 | Penanda merah sumber pada 'Kebiasaan'. | Dikoreksi menjadi B — Usia, berdasarkan konteks determinan pertumbuhan muka dari pilihan yang tersedia. |
| 41 | Ada teks 'Kelainan genetika' tanpa label, lalu hanya empat opsi berlabel; penanda merah berada pada 'Kelainan hormonal'. | Lima opsi direkonstruksi secara editorial; jawaban ditetapkan E — Kelainan endokrin. |
| 42 | Sumber hanya mempunyai empat opsi. | Dipertahankan empat opsi; tidak mengarang opsi kelima. Jawaban A. |
| 47 | Penanda merah sumber pada 'Kelainan hormonal'. | Dikoreksi menjadi C — Kelainan endokrin. |
| 48 | Sumber menulis SNA 82°, SNB 78°, ANB -4° sekaligus 'A di belakang B'; angka tersebut tidak konsisten karena ANB = SNA − SNB. | SNB dinormalisasi menjadi 86° agar konsisten dengan ANB -4° dan titik A di belakang B; jawaban E — Prognati mandibula. |
| 52 | Penanda merah sumber pada 'Fontanel'. | Dikoreksi menjadi E — Sutura; soal ini juga merupakan duplikasi semantik soal 29 yang menunjuk sutura. |
| 57 | Tidak ada opsi merah. | Ditetapkan C — Fisher Screw midline untuk ekspansi transversal pada posterior crossbite. |
| 58 | Tidak ada opsi merah; opsi E berwarna biru dan teksnya rusak ('tonjolan gigi bimaksila B'). | Diverifikasi sebagai E dan dinormalisasi menjadi 'protrusi gigi bimaksila'. |
| 59 | Tidak ada opsi merah; opsi B berwarna biru. | Diverifikasi sebagai B — pertumbuhan maksila berlebih/maksila prognatik karena SNA 86° dengan SNB 80° normal. |

### Prinsip normalisasi teks

- Typo, kapitalisasi, spasi, istilah Indonesia/Inggris, dan notasi derajat yang jelas diperbaiki bila tidak mengubah makna.
- Catatan belajar pribadi seperti referensi PPT, komentar setelah opsi, dan petunjuk yang dapat membocorkan jawaban dihapus dari teks quiz.
- Jika sumber memiliki konflik numerik yang membuat diagnosis mustahil, koreksi dicatat eksplisit pada tabel di atas.
- Tidak ada opsi baru yang dibuat kecuali rekonstruksi Soal 41, karena teks `Kelainan genetika` memang terdapat pada sumber tetapi kehilangan label opsi.

---

## Soal 01

- **id:** `ortho-001`
- **difficulty:** `sedang`
- **topic:** `peranti-fungsional`
- **correct_answer:** `E`

### Pertanyaan

Peranti fungsional adalah peranti yang mengandalkan kekuatan otot-otot di sekitar mulut untuk mengoreksi kasus-kasus maloklusi kelas II divisi 1 dan maloklusi kelas III Angle. Pada maloklusi kelas II divisi 1 Angle, efek dental adalah terjadinya retroklinasi insisivus atas dan proklinasi insisivus bawah. Apakah efek yang terjadi pada maloklusi kelas III dental?

### Pilihan

- **A.** Memberi kesempatan gigi posterior bawah erupsi ke depan dan ke atas
- **B.** Memberi kesempatan gigi posterior bawah untuk erupsi
- **C.** Menahan erupsi gigi anterior bawah
- **D.** Menahan erupsi gigi posterior atas ke depan
- **E.** Proklinasi insisivus atas dan retroklinasi insisivus bawah

### Pembahasan

Pada maloklusi kelas III, efek dentoalveolar peranti fungsional yang diharapkan adalah proklinasi insisivus atas dan retroklinasi insisivus bawah. Efek ini membantu mengurangi reverse overjet melalui kompensasi dental.

---

## Soal 02

- **id:** `ortho-002`
- **difficulty:** `mudah`
- **topic:** `komponen-peranti`
- **correct_answer:** `B`

### Pertanyaan

Pemberian kekuatan memegang peran penting dalam pergerakan gigi secara ortodontik. Kekuatan sangat penting untuk mengawali atau merangsang remodeling tulang maupun untuk membimbing gerakan gigi menuju posisi yang diinginkan. Komponen apakah yang akan menghasilkan suatu kekuatan sehingga gigi dapat bergerak?

### Pilihan

- **A.** Adam's clasp
- **B.** Pegas/elastic
- **C.** Triangle clasp
- **D.** Souten clasp
- **E.** Ball clasp

### Pembahasan

Pegas dan elastik merupakan komponen aktif karena menghasilkan gaya yang diteruskan ke gigi. Klamer seperti Adams, triangle, Souten, dan ball clasp terutama berfungsi sebagai retensi sehingga termasuk komponen pasif.

---

## Soal 03

- **id:** `ortho-003`
- **difficulty:** `sulit`
- **topic:** `diagnosis-dan-rujukan`
- **correct_answer:** `B`

### Pertanyaan

Seorang anak perempuan usia 10 tahun diantar ibunya ke Rumah Sakit Gigi Mulut karena merasa malu dengan gigi geligi anterior di atasnya yang berantakan dan terletak di sebelah belakang gigi geligi anterior di bawah. Wajah dolicofacial, simetris, seimbang, profil cekung. Pemeriksaan intraoral menunujukkan gigi geligi anterior rahang atas palatoversi, gigi gerigi anterior bawah labioversi, lengkung gigi atas kontraksi. Relasi molar kelas III Angle, overjet -3 mm dan overbite -2 mm. analisis sefalometri menunjukkan hubungan rahang prognati dengan sudut ANB -2° (normal: ANB 2° ± 2°). Adi mahasiswa profesi yang memeriksanya memutuskan kasus ini dirujuk ke spesialis ortodonti. Apa alasan Adi dirujuk ke Spesialis Ortodonti?

### Pilihan

- **A.** Profil cekung, perlunya pencabutan gigi dan perlunya penanganan spesialistik.
- **B.** Maloklusi kompleks yang melibatkan tulang, profil cekung, kelainan gigi arah sagital dan vertikal, serta perlu penanganan spesialistik.
- **C.** Ada kelainan otot, perlu pencabutan dan perlu penanganan spesialistik.
- **D.** Maloklusi kompleks meliputi tulang, gigi, kelainan vertikal dan perlu penanganan spesialistik.
- **E.** Ada kelainan gigi, profil cekung dan perlunya penanganan spesialistik.

### Pembahasan

ANB -2°, profil cekung, overjet negatif, dan open bite menunjukkan kelainan yang tidak hanya dental tetapi juga melibatkan hubungan skeletal serta komponen sagital dan vertikal. Kombinasi ini membuat kasus lebih kompleks dan tepat dirujuk untuk penanganan ortodonti spesialistik.

---

## Soal 04

- **id:** `ortho-004`
- **difficulty:** `mudah`
- **topic:** `penjangkaran`
- **correct_answer:** `A`

### Pertanyaan

Pasien perempuan usia 13 tahun sedang menjalani perawatan ortodonti dengan diagnosis maloklusi kelas II divisi 1. Dokter gigi menggerakkan gigi anterior atas ke arah distal dengan memanfaatkan penjangkaran menggunakan karet elastik hanya pada satu rahang. Apakah nama penjangkaran yang digunakan pada kasus tersebut?

### Pilihan

- **A.** Anchorage intramaksiler
- **B.** Anchorage intraoral
- **C.** Anchorage ekstraoral
- **D.** Anchorage stationary
- **E.** Anchorage intermaksiler

### Pembahasan

Anchorage intramaksiler berarti unit penjangkaran dan gigi yang digerakkan berada pada lengkung rahang yang sama. Pada kasus ini, gaya elastik digunakan hanya dalam satu rahang untuk menggerakkan anterior atas ke distal.

---

## Soal 05

- **id:** `ortho-005`
- **difficulty:** `sedang`
- **topic:** `peranti-fungsional`
- **correct_answer:** `D`

### Pertanyaan

Pasien laki-laki usia 10 tahun datang ke praktek dokter gigi bersama orang tuanya dengan keluhan gigi depannya maju. Pada pemeriksaan klinis pasien di diagnosa maloklusi kelas II angle divisi 1. Hasil i analisis sefalometri di diagnosa skeletal kelas II (mandibula retrognasi) dengan profil cembung. Dokter gigi yang merawat memutuskan untuk membuatkan peranti fungsional pada pasien tersebut. Yang terdiri dari bite block rahang atas dan bawah. Kedua bite block tersebut saling mengunci dengan oklusal inclined plane untuk menuntun posisi mandibula ke bawah dan kedepan sehingga merangsang dan mempercepat pertumbuhan mandibula. Apakah peranti fungsional yang dimaksud ?

### Pilihan

- **A.** Aktivator
- **B.** Bionator
- **C.** Frankel
- **D.** Twin Block
- **E.** Inclined bite plane

### Pembahasan

Twin Block terdiri dari dua bite block terpisah pada rahang atas dan bawah yang saling berinteraksi melalui inclined planes. Bidang miring tersebut memandu mandibula ke depan pada pasien yang masih tumbuh dengan mandibula retrognatik.

---

## Soal 06

- **id:** `ortho-006`
- **difficulty:** `mudah`
- **topic:** `perkembangan-dentisi`
- **correct_answer:** `C`

### Pertanyaan

Dari hasil pemeriksaan gigi anak berusia 6 tahun ditemukan gigi permanen telah erupsi, yaitu insisivus sentral permanen, insisivus lateral permanen, dan kaninus permanen yang masing-masing menggantikan insisivus sentral sulung, insisivus lateral sulung, dan kaninus sulung; sedangkan premolar pertama dan premolar kedua masing-masing menggantikan molar pertama sulung dan molar kedua sulung. Dinamakan apakah gigi pengganti gigi sulung tersebut?

### Pilihan

- **A.** Asuccessional teeth
- **B.** Transitional teeth
- **C.** Successional teeth
- **D.** Additional teeth/asuccessional teeth
- **E.** Asuccedaneous teeth

### Pembahasan

Successional teeth adalah gigi permanen yang menggantikan gigi sulung pendahulunya, yaitu insisivus, kaninus, dan premolar. Sebaliknya, molar permanen adalah additional/asuccessional teeth karena tidak menggantikan gigi sulung.

---

## Soal 07

- **id:** `ortho-007`
- **difficulty:** `sedang`
- **topic:** `sefalometri`
- **correct_answer:** `C`

### Pertanyaan

Pasien perempuan berumur 14 tahun datang ke dokter gigi dengan keluhan rahang atasnya lebih maju. Pemeriksaan intraoral menunjukkan relasi molar pertama atas dengan tonjol mesiobukal terletak di interdental gigi premolar pertama dan kedua bawah. Analisis sefalometri menunjukkan SNA 88°, SNB 80°, dan ANB 8°. Apakah bentuk kelainan pada kasus tersebut?

### Pilihan

- **A.** Retrusif mandibula
- **B.** Protrusif maksila
- **C.** Prognati maksila
- **D.** Retrognati maksila
- **E.** Prognati Mandibula

### Pembahasan

SNA 88° berada di atas kisaran normal sekitar 82°±2°, sedangkan SNB 80° masih normal. Ini menunjukkan maksila berada lebih anterior secara skeletal, yaitu prognati maksila; ANB 8° juga mendukung hubungan skeletal kelas II.

---

## Soal 08

- **id:** `ortho-008`
- **difficulty:** `sulit`
- **topic:** `peranti-lepasan`
- **correct_answer:** `E`

### Pertanyaan

Pasien perempuan berumur 11 tahun datang ke dokter gigi dengan keluhan susunan gigi tidak rapi. Pemeriksaan fotometri menunjukkan profil cekung. Pemeriksaan intraoral terdapat overjet -2 mm, overbite 4 mm, dan diskrepansi model kekurangan tempat 3 mm di rahang atas dan rahang bawah. Relasi molar pertama permanen neutroklusi, karies 75 dan 85. Pada pemeriksaan path of closure terdapat kontak prematur gigi anterior yang menyebabkan displacement mandibula. Apakah desain peranti ortodonti lepasan yang tepat untuk kasus tersebut?

### Pilihan

- **A.** Ekspansi transversal posterior
- **B.** Ekspansi sagital posterior
- **C.** Ekspansi seluruh lengkung
- **D.** Ekspansi transversal anterior
- **E.** Ekspansi sagital anterior

### Pembahasan

Kelainan utama berupa anterior crossbite/reverse overjet dengan kebutuhan mendorong segmen anterior maksila ke depan. Karena arah koreksinya anteroposterior pada bagian anterior lengkung, desain yang sesuai adalah ekspansi sagital anterior, bukan ekspansi transversal.

---

## Soal 09

- **id:** `ortho-009`
- **difficulty:** `sedang`
- **topic:** `anterior-crossbite`
- **correct_answer:** `B`

### Pertanyaan

Pasien perempuan berusi 11 tahun datang ke praktek dokter gigi bersama orang tuanya dengan keluhan gigi depan atasnya agak mundur di banding dengan gigi rahang bawah., Hasil analisa fotometri profil si anak lurus, analisa model terdapat gigitan terbalik anterior dengan jarak gigit -3 mm, analisa fungsional menjukkan free wayspace -4 mm. relasi molar klas I Angle yang disertai gigitan terbalik anterior atas. Rencana perawatan menggunakan piranti lepasan. Apakah teknik/cara yang digunakan untuk mengoreksi kasus tersebut?

### Pilihan

- **A.** Distalisasi gigi posterior atas
- **B.** Protraksi gigi anterior atas dan retraksi gigi anterior bawah
- **C.** Protraksi gigi anterior bawah
- **D.** Retraksi gigi anterior atas
- **E.** Protraksi gigi posterior bawah

### Pembahasan

Untuk mengoreksi gigitan terbalik anterior secara dental, insisivus atas perlu diprotraksikan dan insisivus bawah diretraksikan sehingga overjet bergerak dari negatif menuju positif.

---

## Soal 10

- **id:** `ortho-010`
- **difficulty:** `sedang`
- **topic:** `anterior-crossbite`
- **correct_answer:** `E`

### Pertanyaan

Pasien perempuan berusi 9 tahun datang ke praktek dokter gigi bersama ibunya dengan keluhan gigi depan atasnya agak mundur dibanding dengan gigi rahang bawah. Hasil analisa fotometri profil si anak cendrung agak cekung, analisa model terdapat gigitan terbalik anterior dengan jarak gigit -2mm. analisa fungsional menjukkan free wayspace -3mm. relasi molar klas I Angle yang disertai gigitan terbalik anterior atas. Rencana perawatan menggunakan piranti lepasan. Apakah teknik/cara yang digunakan untuk mengoreksi kasus tersebut?

### Pilihan

- **A.** Protraksi gigi posterior bawah
- **B.** Distalisasi gigi posterior atas
- **C.** Protraksi gigi anterior bawah
- **D.** Retraksi gigi anterior atas
- **E.** Protraksi gigi anterior atas dan retraksi gigi anterior bawah

### Pembahasan

Kasus menunjukkan anterior crossbite dengan overjet negatif. Koreksi dental yang sesuai adalah protraksi insisivus atas disertai retraksi insisivus bawah agar hubungan insisivus menjadi normal.

---

## Soal 11

- **id:** `ortho-011`
- **difficulty:** `sedang`
- **topic:** `posterior-crossbite`
- **correct_answer:** `E`

### Pertanyaan

Pasien perempuan usia 12 tahun dengan keluhan gigi depan tidak bisa menutup. Hasil pemeriksaan dan analisa model terdapat gigitan silang posterior Yang disebabkan lengkung oleh rahang atas telalu lebar dibanding dengan rahang bawah.. Apakah relasi yang terjadi pada kasus tersebut?:

### Pilihan

- **A.** Gigitan silang total dalam rahang bawah
- **B.** Gigitan silang fisura dan gigitan total dalam rahang bawah
- **C.** Gigitan fisura dalam rahang bawah
- **D.** Gigitan fisura dalam rahang atas
- **E.** Gigitan silang total luar rahang atas

### Pembahasan

Jika lengkung maksila terlalu lebar dibanding mandibula, gigi posterior atas dapat berada seluruhnya di sebelah bukal gigi bawah sehingga tidak terjadi interdigitasi normal. Keadaan ini sesuai dengan gigitan silang total luar rahang atas atau scissor bite.

---

## Soal 12

- **id:** `ortho-012`
- **difficulty:** `mudah`
- **topic:** `dental-age`
- **correct_answer:** `D`

### Pertanyaan

Seorang dokter gigi dalam melakukan perawatan ortodonti pada psien laki-laki, usia 10 tahun, dalam fase gigi bercampur. Dalam melakukan perawatan faktor usia atau umur sangat mempengaruhi hasil dari perawatan, dari umur dapat dilihat dari pertumbuhan gigi ( Dental Age ). Umur apakah yang dipakai untuk melihat pertumbuhan gigi tersebut?

### Pilihan

- **A.** Umur kronologis
- **B.** Umur skeletal
- **C.** Umur fisiologis
- **D.** Umur Dental
- **E.** Umur biologis

### Pembahasan

Dental age menilai tingkat perkembangan dentisi berdasarkan pembentukan, erupsi, dan pergantian gigi. Umur kronologis adalah umur kalender, sedangkan skeletal age menilai maturasi tulang.

---

## Soal 13

- **id:** `ortho-013`
- **difficulty:** `sedang`
- **topic:** `kebiasaan-buruk`
- **correct_answer:** `D`

### Pertanyaan

Pasien perempuan berumur 9 tahun datang ke RSGM didampingi orang tuanya dengan keluhan susunan gigi tidak teratur serta mempunyai kebiasaan menghisap ibu jari hampir 5 tahun. Pemeriksaan intraoral menunjukkan gigi anterior atas protrusif dan hubungan molar distoklusi. Analisis sefalometri menunjukkan SNA 82°, SNB 76°, ANB 6° dengan hubungan rahang kelas II skeletal. Apakah perawatan yang paling tepat untuk menghilangkan kebiasaan buruk pada kasus di atas?

### Pilihan

- **A.** Oral screen
- **B.** Mouth guard
- **C.** Lip bumper
- **D.** Tongue crib
- **E.** Aktivator

### Pembahasan

Tongue crib dapat digunakan sebagai habit-breaking appliance pada kebiasaan menghisap jari yang persisten. Peranti ini menjadi penghalang/pengingat mekanis sehingga membantu menghentikan kebiasaan yang mempertahankan protrusi anterior dan maloklusi.

---

## Soal 14

- **id:** `ortho-014`
- **difficulty:** `mudah`
- **topic:** `analisis-fungsional`
- **correct_answer:** `C`

### Pertanyaan

Dalam menangani setiap kasus ortodonti, para praktisi harus menyususn rencana perawatan, untuk menetapkan diagnosis, ada prosedur standar yang mutlak untuk dilakukan. Prosedur standar tersebut meliputi anamnesis, pemeriksaan klinis intra dan ekstra oral, analisis fungsional, analisis fotografi, pemeriksaan radiologis, dan analisis model studi, yang dilakukan baik secara langsung maupun tidak langsung pada pasien. Analisa apakah yang digunakan untuk melihat kelainan sendi rahang?

### Pilihan

- **A.** Analisis fotografi
- **B.** Analisis ronsenologis
- **C.** Analisis fungsional
- **D.** Anamnesis
- **E.** Analisis model studi

### Pembahasan

Analisis fungsional menilai fungsi sistem stomatognatik, termasuk pola gerak mandibula, otot, path of closure, dan temporomandibular joint. Karena pertanyaannya mengenai kelainan sendi rahang, analisis fungsional adalah pilihan yang paling tepat.

---

## Soal 15

- **id:** `ortho-015`
- **difficulty:** `sedang`
- **topic:** `penjangkaran`
- **correct_answer:** `A`

### Pertanyaan

Sebuah peranti ortodonti lepasan dibuat untuk pasien dengan kasus maloklusi kelas I tipe 2 dengan overjet 5 mm. Gigi 12 11 21 22 labioversi. Pada gigi anterior dipasang Labial Arch dan Adam klamer pada gigi 16 dan 26. Disebut apakah jika terjadi pergeseran gigi 16 dan 26 ke mesial ?

### Pilihan

- **A.** Anchorage loss
- **B.** Intramaxillary anchorage
- **C.** Intermaxillary anchorage
- **D.** Extraoral anchorage
- **E.** Intraoral anchorage

### Pembahasan

Pergeseran gigi penjangkar, yaitu molar 16 dan 26, ke arah mesial saat seharusnya menjadi unit penahan disebut anchorage loss. Artinya sebagian ruang/pergerakan yang direncanakan hilang karena unit anchorage ikut bergerak.

---

## Soal 16

- **id:** `ortho-016`
- **difficulty:** `sedang`
- **topic:** `sefalometri`
- **correct_answer:** `E`

### Pertanyaan

Dari perhitungan analisis sefalometri seorang pasien perempuan usia 17 tahun didapatkan sudut I-SN 145°. Nilai normal I-SN adalah sekitar 104°. Parameter I-SN tersebut menyimpulkan hubungan inklinasi apa?

### Pilihan

- **A.** Inklinasi insisif bawah terhadap garis FHP
- **B.** Inklinasi sisif atas terhadap bidang mandibula
- **C.** Inklinasi tajam atas terhadap garis FHP
- **D.** Inklinasi insisif bawah terhadap dasar kranii
- **E.** Inklinasi insisif atas terhadap dasar kranii

### Pembahasan

I-SN atau U1-SN adalah sudut antara sumbu panjang insisivus atas dan bidang SN, yaitu referensi dasar kranium anterior. Inklinasi insisivus bawah biasanya dinilai terhadap bidang mandibula dengan IMPA, bukan dengan I-SN.

---

## Soal 17

- **id:** `ortho-017`
- **difficulty:** `sedang`
- **topic:** `prognosis`
- **correct_answer:** `B`

### Pertanyaan

Seorang anak perempuan 10 tahun datang ke poli gigi untuk merapikan gigi. Pada pemeriksaan tampak wajah mesofasial dan simetris, seimbang, serta profil lurus dan tidak ada kebiasaan buruk. Intraoral tidak ditemukan adanya kelainan pada gigi geliginya, hanya dijumpai crowding gigi geligi anterior. Kebutuhan ruang adalah non ekstraksi. Analisa sefalometri menunjukkan sudut ANB 3° (normal 2°±2°). Inkliniasi gigi insisif atas dan bawah normal. Prognosis kasus ini baik. Faktor-faktor apa saja yang perlu dipertimbangkan dalam menentukan prognosis kasus maloklusi di atas?

### Pilihan

- **A.** Usia pasien, kooperatifan pasien, kebiasaan, maloklusi tulang
- **B.** Usia pasien, kooperatif pasien, kebiasaan, berat ringan maloklusi
- **C.** Usia pasien, kooperatifan pasien, kebiasaan, maloklusi gigi
- **D.** Usia pasien, kebiasaan, jenis kelamin, berat ringan maloklusi
- **E.** Usia pasien, kooperatif pasien, jenis kelamin, maloklusi

### Pembahasan

Prognosis ortodonti dipengaruhi oleh usia dan potensi pertumbuhan, kooperatif pasien, kebiasaan yang dapat mempertahankan maloklusi, serta berat-ringannya maloklusi. Pilihan B mencakup keempat faktor prognostik umum tersebut.

---

## Soal 18

- **id:** `ortho-018`
- **difficulty:** `sulit`
- **topic:** `pertumbuhan-mandibula`
- **correct_answer:** `C`

### Pertanyaan

Pada proses post natal, mandibula mengalami perubahan bentuk dan ukuran yang unik. Pertumbuhan tulang disebabkan karena adanya proses displacement dan remodelling dimana polanya ditentukan oleh matriks fungsional yang bekerja. Apa yang mempengaruhi perubahan dimensi tinggi pada mandibula?

### Pilihan

- **A.** Pertumbuhan ramus descenden
- **B.** Pertumbuhan proccessus coronoideus
- **C.** Pertumbuhan head of condyle
- **D.** Penutupan simpasis mandibula
- **E.** Pertumbuha proc. Alveolaris

### Pembahasan

Pertumbuhan kondilus bersama perubahan ramus merupakan komponen penting pertumbuhan postnatal mandibula dan sangat memengaruhi dimensi vertikal. Penutupan simfisis mandibula bukan mekanisme utama peningkatan tinggi mandibula.

---

## Soal 19

- **id:** `ortho-019`
- **difficulty:** `sedang`
- **topic:** `anterior-crossbite`
- **correct_answer:** `A`

### Pertanyaan

Pasien perempuan berusi 11 tahun datang ke praktek dokter gigi bersama orang tuanya dengan keluhan gigi depan atasnya agak mundur di banding dengan gigi rahang bawah., Hasil analisa fotometri profil si anak lurus, analisa model terdapat gigitan terbalik anterior dengan jarak gigit -3 mm, analisa fungsional menunjukkan free wayspace -4 mm. relasi molar klas I Angle yang disertai gigitan terbalik anterior atas. Rencana perawatan menggunakan piranti lepasan sederhana. Apakah teknik/cara yang digunakan untuk mengoreksi kasus tersebut?

### Pilihan

- **A.** Incline Bite Plane
- **B.** Bite Reser Posterior
- **C.** Bite reser anterior
- **D.** Bite plane reser
- **E.** Bite Plane Posterior

### Pembahasan

Inclined bite plane memberi bidang pandu pada saat oklusi sehingga kontak anterior yang terbalik dapat diarahkan melewati hambatan oklusal. Karena itu peranti ini lazim digunakan untuk koreksi anterior crossbite sederhana pada pasien yang masih tumbuh.

---

## Soal 20

- **id:** `ortho-020`
- **difficulty:** `sedang`
- **topic:** `komponen-peranti`
- **correct_answer:** `A`

### Pertanyaan

Pasien perempuan berusia 11 tahun datang ke RSGM bersama orang tuanya dengan keluhan gigi depan anaknya agak maju. Hasil pemeriksaan fungsional tidak ada kelaianan, dan hasil analisa model masih ada beberpa gigi susu yang belum tanggal, jarak gigit 6 mm, terdapat diastema antara gigi 12, 11, 21, dan 22. Relasi molar klas I Angle. Diskrepansi model terdapat selisih ruangan +5 mm. Rencana perawatan menggunakan piranti lepasan. Apakah komponen yang digunakan untuk mengoreksi kelainan pada kasus tersebut?

### Pilihan

- **A.** Labial bow aktif
- **B.** Screw midline
- **C.** Cantilever spring
- **D.** Finger coil spring
- **E.** Labial bow pasif

### Pembahasan

Labial bow aktif dapat diaktivasi untuk menggerakkan insisivus yang protrusif ke arah palatal/lingual dan membantu mengurangi overjet serta menutup ruang anterior. Labial bow pasif hanya berfungsi mempertahankan posisi/retensi.

---

## Soal 21

- **id:** `ortho-021`
- **difficulty:** `sedang`
- **topic:** `ortodonti-interseptif`
- **correct_answer:** `C`

### Pertanyaan

Pasien perempuan berusia 7 tahun datang bersama orang tuanya ke klinik gigi dengan keluhan susunan gigi depan anak tumbuh tidak teratur. Hasil pemeriksaan menunjukkan gigi 12, 11, 21, dan 22 berjejal; hampir semua gigi posterior terdapat karies. Tindakan awal dokter gigi adalah memberikan edukasi kepada pasien dan orang tua, mengawasi pertumbuhan dan perkembangan gigi geligi dan struktur kraniofasial, serta menyampaikan prediksi kemungkinan maloklusi dan prosedur perawatan untuk mencegah perkembangannya. Apakah cara yang digunakan untuk mengantisipasi perkembangan maloklusi tersebut?

### Pilihan

- **A.** Prosedur promotif
- **B.** Prosedur korektif
- **C.** Prosedur interseptif
- **D.** Prosedur rehabilitatif
- **E.** Prosedur preventif

### Pembahasan

Ortodonti interseptif dilakukan ketika maloklusi sudah mulai berkembang, terutama pada masa gigi bercampur, dengan tujuan menghentikan atau mengurangi perkembangannya sebelum menjadi lebih berat.

---

## Soal 22

- **id:** `ortho-022`
- **difficulty:** `sedang`
- **topic:** `komponen-peranti`
- **correct_answer:** `C`

### Pertanyaan

Seorang anak laki-laki berusia 10 tahun datang diantar ibunya ke RSGM dengan keluhan gigi rahang atasnya maju. Pemeriksaan ekstra oral tampak bibir atas hipotonus. Pemeriksaan intra oral tampak relasi molar pertama permanen distoklusi, ada persistensi gigi 74. Dari analisa model diperoleh diskrepansi, di rahang atas kekurangan tempat 7 mm, sedangkan di rahang bawah terdapat kekurangan tempat 3 mm, overbite 6 mm dan overjet 6mm. Perawatan apakah yang dilakukan untuk koreksi gigi -gigi anterior rahang atas?

### Pilihan

- **A.** Busur labial pendek
- **B.** Southern
- **C.** Retraktor Roberts
- **D.** Adams ganda
- **E.** Busur labial dengan U lup terbalik

### Pembahasan

Roberts retractor dirancang untuk retraksi insisivus dan efektif untuk mengurangi overjet yang besar. Pilihan lain pada soal lebih berfungsi sebagai klamer retentif atau bukan komponen utama untuk retraksi anterior.

---

## Soal 23

- **id:** `ortho-023`
- **difficulty:** `mudah`
- **topic:** `sistem-stomatognatik`
- **correct_answer:** `A`

### Pertanyaan

Seoarang pasien laki laki berusia 21 tahun, datang ke RSGM dengan keluahan mulutnya mengalami gangguan susah untuk membuka dan menutup. Hasil pemeriksaan menunjukkan adanya kelainan pada sendi rahang. Suatu sistem yang kompleks dan berpusat pada temporomandibular joint yang menbuat muskulus dan ligamentum saling berhubungan. Apakah nama sistem yang dimakasud pada kasus diatas?

### Pilihan

- **A.** Stomatognathic Syestem
- **B.** Orofacial district
- **C.** Phonasi System
- **D.** Inervasi System
- **E.** Cranio-cervico-mandilular

### Pembahasan

Stomatognathic system adalah sistem fungsional yang mengintegrasikan TMJ, gigi dan oklusi, otot mastikasi, ligamen, serta struktur terkait untuk fungsi seperti membuka-menutup mulut, mengunyah, menelan, dan berbicara.

---

## Soal 24

- **id:** `ortho-024`
- **difficulty:** `mudah`
- **topic:** `malposisi-gigi`
- **correct_answer:** `A`

### Pertanyaan

Pasien Laki-laki berumur 10 tahun dibawa oleh orang tuanya ke praktek dokter gigi dengan keluhan gigi taring atas kiri dan kana belum erupsi serta gigi dengan kondisi gigi taring susu telah dicabut. Hasil pemeriksaaan intra oral terlihat gigi 24 erupsinya lebih ke palatatum seolah olah memberi gambaran akan terjadi gigitan silang. Geligi insisif erupsi pada lengkung yang baik dan relasi molar klas I Angle. Apakah yang terjadi pada gigi dan 24 tersebut?

### Pilihan

- **A.** Palatoversi
- **B.** Transposisi
- **C.** Bukoversi
- **D.** Distoversi
- **E.** Mesioversi

### Pembahasan

Palatoversi berarti gigi berada atau erupsi lebih ke arah palatal dibanding posisi normal dalam lengkung. Deskripsi gigi 24 yang erupsi ke palatum sesuai dengan palatoversi.

---

## Soal 25

- **id:** `ortho-025`
- **difficulty:** `mudah`
- **topic:** `etiologi-dan-kebiasaan`
- **correct_answer:** `B`

### Pertanyaan

Pasien perempuan usia 6 tahun datang bersama ibunya ke puskesmas dengan keluhan suka mengisap jari. Hasil pemeriksaan klinis terlihat protrusif rahang atas dan gigi depan rahang bawah retrusif. Perawatan pendahuluan apa yang paling tepat dilakukan pada kasus tersebbut ?

### Pilihan

- **A.** Pemasangan ekspansi
- **B.** Menghilangkan faktor etiologi
- **C.** Seri ekstraksi
- **D.** Pemasangan peranti fungsional
- **E.** Pemasangan peranti lepasan

### Pembahasan

Langkah pendahuluan yang paling logis pada maloklusi yang berkaitan dengan kebiasaan mengisap jari adalah menghilangkan faktor etiologinya terlebih dahulu. Tanpa menghentikan kebiasaan, gaya abnormal tetap bekerja dan dapat mengurangi keberhasilan koreksi ortodonti.

---

## Soal 26

- **id:** `ortho-026`
- **difficulty:** `mudah`
- **topic:** `perkembangan-dentisi`
- **correct_answer:** `E`

### Pertanyaan

Gigi sulung yang bererupsi pada saat bayi berumur kurang lebih satu bulan. Gigi ini bentuknya normal seperti gigi sulung tetapi kebanyakan akarnya pendek, secara morfologi gigi ini hampir sama dengan gigi sulung lainnya. Dinamakan apakah gigi tersebut ?

### Pilihan

- **A.** Natal tooth : lahir udah ada gigi
- **B.** Early tooth
- **C.** Pra natal tooth
- **D.** Delay Tooth
- **E.** Neonatal Tooth

### Pembahasan

Neonatal tooth adalah gigi yang erupsi dalam 30 hari pertama setelah lahir. Natal tooth berbeda karena sudah tampak di rongga mulut pada saat bayi lahir.

---

## Soal 27

- **id:** `ortho-027`
- **difficulty:** `sedang`
- **topic:** `posterior-crossbite`
- **correct_answer:** `D`

### Pertanyaan

Pasien perempuan usia 12 tahun dengan keluhan gigi depan tidak bisa menutup. Hasil pemeriksaan dan analisa model terdapat gigitan sisalng posterior Yang disebabkan lengkung oleh rahang atas telalu lebar dibanding dengan rahang bawah. Apakah relasi yang terjadi pada kasus tersebut?:

### Pilihan

- **A.** Gigitan silang fisura dan gigitan total dalam rahang bawah
- **B.** Gigitan silang total dalam rahang bawah
- **C.** Gigitan fisura dalam rahang bawah
- **D.** Gigitan silang total luar rahang atas
- **E.** Gigitan fisura dalam rahang atas

### Pembahasan

Lengkung rahang atas yang terlalu lebar dapat membuat gigi posterior atas berada seluruhnya di luar/bukal gigi posterior bawah. Hubungan ini sesuai dengan gigitan silang total luar rahang atas atau scissor bite.

---

## Soal 28

- **id:** `ortho-028`
- **difficulty:** `sedang`
- **topic:** `peranti-fungsional`
- **correct_answer:** `A`

### Pertanyaan

Pasien perempuan berumur 9 tahun datang ke RSGM didampingi orang tuanya dengan keluhan susunan gigi tidak teratur. Pemeriksaan intraoral menunjukkan gigi anterior atas protrusif dan hubungan molar distoklusi. Analisis sefalometri menunjukkan SNA 82°, SNB 76°, ANB 6° dengan hubungan rahang kelas II skeletal. Apakah perawatan yang paling tepat untuk kasus di atas?

### Pilihan

- **A.** Aktivator
- **B.** Lip bumper
- **C.** Tongue crib
- **D.** Mouth guard
- **E.** Oral screen

### Pembahasan

Aktivator adalah peranti fungsional yang dapat digunakan pada pasien yang masih tumbuh dengan hubungan skeletal kelas II untuk memodifikasi posisi/fungsi mandibula dan memanfaatkan potensi pertumbuhan.

---

## Soal 29

- **id:** `ortho-029`
- **difficulty:** `sedang`
- **topic:** `pertumbuhan-kraniofasial`
- **correct_answer:** `D`

### Pertanyaan

Pasien laki-laki berumur 7 tahun dibawa oleh orang tuanya ke praktek dokter gigi dengen keluahan susunan giginya yang tidak teratur dan itu dirasakan semenjak gigi susu sianak telah erupsi sampai pada fase gigi bercampur. Hasil pemeriksaaan didapatkan suatu kesimpulan bahwa terjadi gangguan pertumbuhan pada si anak karena perkembangan kepala, wajah dan rahang tidak seimbang yang disebabkan oleh beberapa bagian dari tengkorak kepala yang lambat tertutup. Apakah nama bagian yang dimaksud ?

### Pilihan

- **A.** Kartilago
- **B.** Oksipital
- **C.** Fontanel
- **D.** Sutura
- **E.** Endokondral

### Pembahasan

Sutura merupakan tempat pertemuan tulang-tulang kraniofasial dan berperan sebagai area pertumbuhan serta adaptasi selama perkembangan kepala dan wajah. Waktu penutupan sutura memengaruhi pola pertumbuhan kraniofasial.

---

## Soal 30

- **id:** `ortho-030`
- **difficulty:** `sedang`
- **topic:** `pegas-ortodonti`
- **correct_answer:** `A`

### Pertanyaan

Seorang anak perempuan usia 10 tahun datang untuk merapikan giginya. Hasil pemeriksaan menunjukkan hubungan rahang ortognati dan maloklusi kelas I dengan crossbite gigi 12. Wajah mesofasial, simetris, seimbang, profil normal. Overjet dan overbite 2 mm. Relasi molar 1 kanan dan kiri netroklusi. Kebutuhan ruangan adalah non ekstraksi (sisi rahang atas kanan kekurangan ruang sebesar 1 mm) Drg berencana melakukan slicing gigi 11 dan 13 untuk mengatasi kekurangan ruang dan membuat desain AOL. Dalam kasus diatas. Jenis pegas apa yang digunakan untuk mendorong gigi 12 ke labial?

### Pilihan

- **A.** Pegas simple.
- **B.** Bumper Pegas terbuka
- **C.** Pegas bumper tertutup
- **D.** Kumparan Pegas C
- **E.** Pegas C lus

### Pembahasan

Pegas simple dapat memberikan gaya terarah pada satu gigi untuk mendorongnya ke labial. Pada crossbite lokal gigi 12 dengan kekurangan ruang ringan yang telah diatasi, gaya sederhana pada gigi tersebut sesuai dengan kebutuhan gerakan.

---

## Soal 31

- **id:** `ortho-031`
- **difficulty:** `sulit`
- **topic:** `diastema`
- **correct_answer:** `A`

### Pertanyaan

Pasien perempuan usia 14 tahun datang ke klinik gigi dengan keluhan ada celah pada gigi atasnya sehingga orang tua pasien mera tidak nyaman melihatnya. Hasil pemeriksaan terdapat diastema pada gigi 13,12,11,21, 22 dan 23. Hasil analisi model memberikan gambaran diastema yang terjadi merupakan bagian dari tahap pertumbuhan dan perkembangan kecuali pada pasien ini yang seharusnya sesuai dengan perkembangan nya seharusnya telah tertutup dengan baik. Diastema apakah yang dimaksud pada kasus di atas ?

### Pilihan

- **A.** Diastema fisiologis
- **B.** Diastema patologis
- **C.** General diastema
- **D.** Multiple diastema
- **E.** Diastema sentralis

### Pembahasan

Diastema fisiologis merupakan celah sementara yang dapat muncul sebagai bagian dari perkembangan dentisi campuran, sering dikaitkan dengan fase 'ugly duckling'. Pada usia 14 tahun celah yang menetap tetap perlu dievaluasi karena seharusnya fase fisiologis umumnya sudah berkurang setelah erupsi kaninus; namun kategori perkembangan yang dideskripsikan soal adalah diastema fisiologis.

---

## Soal 32

- **id:** `ortho-032`
- **difficulty:** `sedang`
- **topic:** `pegas-ortodonti`
- **correct_answer:** `C`

### Pertanyaan

Pasien perempuan berusia 17 tahun datang ke RSGM bersama orang tuanya dengan keluhan gigi depan anaknya agak maju. Hasil pemeriksaan fungsional tidak ada kelaianan, dan hasil analisa model semua gigi permanen telah erupsi sempurna, jarak gigit 5 mm, Diskrepansi model terdapat selisih ruangan +9 mm. Relasi Molar Klas I Angle. Initial plane dengan pencabutan P1 kiri dan kanan, Rencana perawatan menggunakan piranti lepasan. Apakah komponen yang digunakan untuk menggerakkan kanisinus ke distal?

### Pilihan

- **A.** Cantilever spring
- **B.** Screw midline
- **C.** Finger coil spring
- **D.** C-retraktor
- **E.** Labial bow

### Pembahasan

Finger coil spring/palatal finger spring dapat digunakan untuk gerakan mesiodistal satu gigi, termasuk distalisasi kaninus setelah tersedia ruang dari pencabutan premolar. Screw midline digunakan untuk ekspansi, sedangkan labial bow bekerja pada segmen anterior.

---

## Soal 33

- **id:** `ortho-033`
- **difficulty:** `mudah`
- **topic:** `ortodonti-interseptif`
- **correct_answer:** `C`

### Pertanyaan

Pasien usia 8 tahun datang ke dokter gigi bersama ibunya dengan keluhan gigi depan bawah maju dan terlihat nyakil, serta memiliki kebiasaan menopang dagu. Setelah pemeriksaan dan analisis radiografi, dokter menyarankan perawatan ortodonti karena rahang bawah lebih maju dibanding rahang atas. Karena pasien masih muda, pola pertumbuhan rahang masih dapat diarahkan. Dokter merencanakan perawatan ortodonti interseptif. Apakah yang dimaksud dengan perawatan ortodonti interseptif pada kasus di atas?

### Pilihan

- **A.** Mencegah terjadinya maloklusi
- **B.** Mempertahankan oklusi normal
- **C.** Merawat maloklusi yang sedang berkembang
- **D.** Merawat adanya maloklusi
- **E.** Merawat gigi normal

### Pembahasan

Perawatan ortodonti interseptif adalah tindakan untuk merawat maloklusi yang sedang berkembang. Tujuannya menginterupsi proses yang memburuk dan memanfaatkan pertumbuhan sebelum kelainan menjadi lebih kompleks.

---

## Soal 34

- **id:** `ortho-034`
- **difficulty:** `sedang`
- **topic:** `sefalometri`
- **correct_answer:** `D`

### Pertanyaan

Pasien laki-laki berumur 13 tahun datang ke dokter gigi bersama orang tuanya ingin memperbaiki susunan giginya yang maju. Analisis sefalometri diperoleh SNA 82°, SNB 80°, dan ANB 2°. Inklinasi insisivus atas terhadap bidang SN (I-SN) 112° dan inklinasi insisivus bawah terhadap bidang mandibula (IMPA) 100°. Overjet dan overbite normal. Apakah kesimpulan analisis kasus di atas?

### Pilihan

- **A.** Hubungan rahang ortognati dengan bimaxilary dental retrusif
- **B.** Hubungan rahang ortognati dengan gigi insisif atas retrusif
- **C.** Hubungan rahang ortognati dengan gigi insisif atas protrusif
- **D.** Hubungan rahang ortognati dengan bimaxilary dental protrusif
- **E.** Hubungan rahang ortognati dengan gigi insisif bawah protrusif

### Pembahasan

SNA 82°, SNB 80°, dan ANB 2° menunjukkan hubungan rahang ortognati. I-SN 112° dan IMPA 100° sama-sama lebih besar dari nilai normal, sehingga insisivus atas dan bawah proklinasi: bimaxillary dental protrusion.

---

## Soal 35

- **id:** `ortho-035`
- **difficulty:** `sedang`
- **topic:** `sefalometri`
- **correct_answer:** `E`

### Pertanyaan

Pasien perempuan usia 12 tahun, datang ke RSGM untuk dilakukan perawatan orodonti, setelah dilakukan foto rongent sefalogram disimpulkan bahwa pasien tersebut mempunyai sudut kecembungan muka 12 derajat. Apakah nama bidang/garis menentukan sudut tersebut

### Pilihan

- **A.** SNB
- **B.** NaMe
- **C.** ANB
- **D.** SNA
- **E.** NaPog

### Pembahasan

Sudut kecembungan muka pada analisis sefalometri dibentuk dengan referensi Nasion-A point-Pogonion, yang biasa ditulis N-A-Pog/NaPog. Karena itu garis/bidang yang terkait dengan sudut tersebut adalah NaPog.

---

## Soal 36

- **id:** `ortho-036`
- **difficulty:** `sedang`
- **topic:** `growth-spurt`
- **correct_answer:** `E`

### Pertanyaan

Usia pasien dalam perawatan ortodonti berhubungan dengan percepatan pertumbuhan (growth spurt). Setelah percepatan pertumbuhan awal masa kanak-kanak, akan terjadi lagi percepatan pertumbuhan pada masa pubertas/adolescence. Pada usia berapakah rata-rata puncak pubertal growth spurt tersebut?

### Pilihan

- **A.** 25 tahun pada wanita dan 30 tahun pada pria
- **B.** 2 tahun pada wanita dan 4 tahun pada pria
- **C.** 18 tahun pada wanita dan 20 tahun pada pria
- **D.** 8 tahun pada wanita dan 10 tahun pada pria
- **E.** 12 tahun pada wanita dan 14 tahun pada pria

### Pembahasan

Puncak pubertal/adolescent growth spurt rata-rata terjadi lebih awal pada perempuan dibanding laki-laki. Nilai sekitar 12 tahun pada perempuan dan 14 tahun pada laki-laki paling sesuai dengan pilihan yang tersedia, walaupun terdapat variasi individual.

---

## Soal 37

- **id:** `ortho-037`
- **difficulty:** `mudah`
- **topic:** `sefalometri`
- **correct_answer:** `D`

### Pertanyaan

Pasien laki-laki usia13 tahun datang ke RSGM bersama orang tuanya dengan keluhan gigi depannya maju, orang tua si anak ingin dirawat agar susunan giginya serta pofil lebih baik. Berdasarkan foto sefalogram, sebelum dilakukan analisa dokter giginya menghubungkan titik-titik sefalometri menjadi satu garis atau bidang. Apakah nama bidang yang menghubungkan antara titik porion dengan titik orbitale?

### Pilihan

- **A.** Bidang Frankfurt vertical
- **B.** Bidang transversal.
- **C.** Bidang Sagital.
- **D.** Bidang Frankfurt Horizontal
- **E.** Bidang Horizontal

### Pembahasan

Frankfort Horizontal Plane dibentuk oleh titik Porion dan Orbitale. Bidang ini merupakan salah satu bidang referensi dasar yang digunakan pada analisis kraniofasial/sefalometri.

---

## Soal 38

- **id:** `ortho-038`
- **difficulty:** `mudah`
- **topic:** `malposisi-gigi`
- **correct_answer:** `D`

### Pertanyaan

Pasien Laki-laki berumur 10 tahun dibawa oleh orang tuanya ke praktek dokter gigi dengan keluhan gigi taring atas kiri dan kana belum erupsi serta gigi dengan kondisi gigi taring susu telah dicabut. Hasil pemeriksaaan intra oral terlihat gigi 24 erupsinya lebih ke pipi seolah olah memberi gambaran akan terjadi gigitan silang. Geligi insisif erupsi pada lengkung yang baik dan relasi molar klas I Angle. Apakah yang terjadi pada gigi dan 24 tersebut?

### Pilihan

- **A.** Distoversi
- **B.** Transposisi
- **C.** Palatoversi
- **D.** Bukoversi
- **E.** Mesioversi

### Pembahasan

Bukoversi adalah posisi gigi yang bergeser atau erupsi ke arah bukal/pipi. Deskripsi gigi 24 yang erupsi lebih ke arah pipi sesuai dengan bukoversi.

---

## Soal 39

- **id:** `ortho-039`
- **difficulty:** `mudah`
- **topic:** `pertumbuhan-kraniofasial`
- **correct_answer:** `B`

### Pertanyaan

Pasien datang kepraktek dokter gigi dengan keluhan rahang atas dan bawah sakit di sendi rahangnya, hasil pemeriksaan dan riwayat penyakit keluarga ada yang mengalami hal sama, secara visual wajah kelihatan tidak semitetris atau kelihatan tidak lurus. Apakah yang menentukan pola dari pertumbuhan muka pada pasien tersebut?

### Pilihan

- **A.** Pekerjaan
- **B.** Usia
- **C.** Kebiasaan
- **D.** Lingkungan
- **E.** Penyakit

### Pembahasan

Dari pilihan yang tersedia, usia merupakan faktor yang secara langsung berkaitan dengan perubahan pola pertumbuhan muka karena proporsi dan arah pertumbuhan kraniofasial berubah sepanjang maturasi. Kebiasaan dapat memodifikasi fungsi, tetapi bukan penentu dasar tunggal pola pertumbuhan pada konteks pertanyaan ini.

---

## Soal 40

- **id:** `ortho-040`
- **difficulty:** `sedang`
- **topic:** `ekspansi-transversal`
- **correct_answer:** `B`

### Pertanyaan

Pasien perempuan berusia 9 tahun daatang bersama orang tuanya dengan keluhan gigi depan kanan kalau ditutup tidak bisa berkontak dengan sempurna dan terlihat agak miring kalau di kontakkan. Hasil analisa fungsional menunjukkan terdapat lateral mandibular displacement. Hasil analisa model terdapat gigitan fissure dalan pada sisi kanan, relasi molar pada sisi kiri neutroklusi. Apakah komponen yang digunakan untuk mengoreksi kelainan pada kasus tersebut ?

### Pilihan

- **A.** Finger spring
- **B.** Coffin spring
- **C.** Z spring
- **D.** Finger coil spring
- **E.** Cantilever spring

### Pembahasan

Coffin spring merupakan komponen ekspansi yang menghasilkan pelebaran transversal lengkung. Pada crossbite posterior yang berhubungan dengan displacement mandibula lateral, koreksi defisiensi transversal sesuai dengan fungsi Coffin spring.

---

## Soal 41

- **id:** `ortho-041`
- **difficulty:** `sulit`
- **topic:** `gangguan-pertumbuhan`
- **correct_answer:** `E`

### Pertanyaan

Pasien perempuan berusia 11 tahun datang ke RSGM bersama orang tuanya dengan keluhan susunan giginya tidak teratur dan banyak gigi permanen rapuh. Pemeriksaan menunjukkan hipoplasia pada gigi 11, 12, 13, dan 23. Analisis radiografi menunjukkan gangguan pertumbuhan dan perkembangan yang tampak pada osifikasi tulang, waktu penutupan sutura, waktu erupsi gigi, dan waktu resorpsi akar gigi sulung. Apakah kelainan sistemik yang paling sesuai pada pasien tersebut?

### Pilihan

- **A.** Kelainan genetika
- **B.** Kelainan hormonal
- **C.** Kelainan getah bening
- **D.** Kelainan kromosom
- **E.** Kelainan endokrin

### Pembahasan

Gangguan endokrin dapat memengaruhi pertumbuhan dan perkembangan melalui perubahan osifikasi, maturasi/penutupan sutura, waktu erupsi gigi dan resorpsi akar gigi sulung, serta dapat berkaitan dengan kelainan pembentukan enamel seperti hipoplasia. Pola temuan sistemik ini paling konsisten dengan kelainan endokrin.

---

## Soal 42

- **id:** `ortho-042`
- **difficulty:** `sedang`
- **topic:** `food-impaction`
- **correct_answer:** `A`

### Pertanyaan

Seorang perempuan 19 tahun mempunyai gigi bawah belakang kananyang ngilu tiba tiba serta retasa mengganjal. Hasil pemeriksaan ternyata 46 ektsrusi serta gigi 44 dan 46 terdapat diastema. Apa yang harus dilakukan agar tidak terjadi food impaction?

### Pilihan

- **A.** Pembentukan kontak area proximal
- **B.** Pembentukan groove
- **C.** Intrusikan gigi 45
- **D.** Pembentukan fossa sentral

### Pembahasan

Kontak proksimal yang rapat dan bentuk area kontak yang benar membantu mencegah makanan terdorong ke ruang interdental. Pada diastema/open contact, pembentukan kembali kontak area proksimal adalah prinsip utama untuk mencegah food impaction.

---

## Soal 43

- **id:** `ortho-043`
- **difficulty:** `mudah`
- **topic:** `skeletal-age`
- **correct_answer:** `A`

### Pertanyaan

Dokter gigi membuat suatu analisa pertumbuhan dan perkembangan berdasarkan umur dari seorang anak yang akan dirawat giginya, salah satu teknik yang dilakukan adalah dengan cara membuat gambaran radiografi pada daerah yang terdapat banyak tulang-tulang dan discus epiphyseal seperti tulang pergelangan tangan. Umur apakah yang digunakan untuk menentukan cara tersebut?

### Pilihan

- **A.** Umur skeletal
- **B.** Umur biologis
- **C.** Umur dental
- **D.** Umur seksual
- **E.** Umur fisiologis

### Pembahasan

Skeletal age menilai maturasi tulang. Radiograf tangan-pergelangan tangan digunakan karena terdapat banyak pusat osifikasi serta lempeng epifisis yang berubah secara terprediksi selama pertumbuhan.

---

## Soal 44

- **id:** `ortho-044`
- **difficulty:** `sedang`
- **topic:** `diastema`
- **correct_answer:** `C`

### Pertanyaan

Orang tua bersama anak perempuannya yang berusia 8 tahun datang ke praktek dokter gigi dengan keluhan gigi depan atas jarang. Hasil pemeriksaan 11 dan 21 diastema sentral, vrenulum lanialis normal, gambaran radiografi panoramik benih gigi kaninus masih didalam rahang atas,secara keseluruhan tidak kelainan susunan gigi. Menurut analisa dokter yang merawat celah yang terjadi saat ini nantinya bisa menutup dengan sendirinya. Apakah nama celah yang terdapat pada kasus tersebut?

### Pilihan

- **A.** Diastema Centris
- **B.** Diastema Lateralis
- **C.** Diastema Fisiologis
- **D.** Diastema Biologis
- **E.** Diastema Patologis

### Pembahasan

Diastema sentral pada anak sekitar 8 tahun dengan frenulum normal dan kaninus permanen yang belum erupsi sering merupakan bagian dari fase perkembangan dentisi campuran dan dapat menutup spontan saat kaninus erupsi. Ini disebut diastema fisiologis.

---

## Soal 45

- **id:** `ortho-045`
- **difficulty:** `sedang`
- **topic:** `anterior-crossbite`
- **correct_answer:** `A`

### Pertanyaan

Pasien perempuan berusi 11 tahun datang ke praktek dokter gigi bersama orang tuanya dengan keluhan gigi depan atasnya agak mundur di banding dengan gigi rahang bawah., Hasil analisa fotometri profil sianak lurus, analisa model terdapat gigitan terbalik anterior dengan jarak gigit -3 mm, analisa fungsional menjukkan free wayspace -4 mm. relasi molar klas I Angle yang disertai gigitan terbalik anterior atas. Rencana perawatan menggunakan piranti lepasan. Komponen serta teknik apakah yang digunakan untuk mengoreksi kasus tersebut?

### Pilihan

- **A.** Protraksi gigi anterior atas dan retraksi gigi anterior bawah
- **B.** Retraksi gigi anterior atas dengan Labial Bow
- **C.** Protraksi gigi anterior bawah dengan Z Spring
- **D.** Distalisasi gigi posterior atas Coil Spring
- **E.** Protraksi gigi posterior bawah dengan Z Spring

### Pembahasan

Anterior crossbite dengan overjet negatif dikoreksi secara dental dengan memprotraksikan gigi anterior atas dan, bila diperlukan, meretraksikan gigi anterior bawah agar overjet menjadi positif.

---

## Soal 46

- **id:** `ortho-046`
- **difficulty:** `mudah`
- **topic:** `skeletal-age`
- **correct_answer:** `B`

### Pertanyaan

Seorang dokter gigi dalam melakukan perawatan ortodonti pada psien laki-laki, usia 10 tahun, dalam fase gigi bercampur. Dalam melakukan perawatan faktor usia atau umur sangat mempengaruhi hasil dari perawatan, dari umur dapat dilihat pertumbuhan dari tulang ( Skeletal Age ). Umur apakah yang dipakai untuk menlihat pertumbuhan tulang tersebut?

### Pilihan

- **A.** Umur fisiologis
- **B.** Umur skeletal
- **C.** Umur patologis
- **D.** Umur biologis
- **E.** Umur psikologis

### Pembahasan

Skeletal age adalah ukuran maturasi tulang dan digunakan untuk memperkirakan tahap pertumbuhan skeletal. Ini berbeda dari dental age yang menilai perkembangan gigi.

---

## Soal 47

- **id:** `ortho-047`
- **difficulty:** `sedang`
- **topic:** `gangguan-pertumbuhan`
- **correct_answer:** `C`

### Pertanyaan

Pasien perempuan berusia 10 tahun datang ke RSGM bersama orang tuanya dengan keluhan susunan giginya tidak teratur dan banyak gigi permanen rapuh. Pemeriksaan menunjukkan hipoplasia pada gigi 11, 12, 13, dan 23. Analisis radiografi menunjukkan gangguan pertumbuhan dan perkembangan yang tampak pada osifikasi tulang, waktu penutupan sutura, waktu erupsi gigi, dan waktu resorpsi akar gigi sulung. Apakah kelainan sistemik yang paling sesuai pada pasien tersebut?

### Pilihan

- **A.** Kelainan kromosom
- **B.** Kelainan genetika
- **C.** Kelainan endokrin
- **D.** Kelainan hormonal
- **E.** Kelainan getah bening

### Pembahasan

Temuan hipoplasia disertai perubahan osifikasi, waktu penutupan sutura, erupsi gigi, dan resorpsi akar menunjukkan gangguan sistemik terhadap pertumbuhan. Dari pilihan yang tersedia, kelainan endokrin paling sesuai karena hormon endokrin mengatur maturasi tulang dan perkembangan dentofasial.

---

## Soal 48

- **id:** `ortho-048`
- **difficulty:** `sulit`
- **topic:** `sefalometri`
- **correct_answer:** `E`

### Pertanyaan

Pasien perempuan berumur 14 tahun datang ke dokter gigi dengan keluhan hubungan rahangnya tampak tidak normal. Analisis sefalometri menunjukkan SNA 82°, SNB 86°, dan ANB -4°; titik A terletak di belakang titik B. Apakah bentuk kelainan skeletal yang paling sesuai pada kasus tersebut?

### Pilihan

- **A.** Retrusif mandibula
- **B.** Retrognati mandibula
- **C.** Prognati maksila
- **D.** Protrusif maksila
- **E.** Prognati Mandibula

### Pembahasan

Pada data yang telah dikoreksi, SNA 82° masih normal sedangkan SNB 86° meningkat; ANB menjadi -4°. Kombinasi ini menunjukkan mandibula berada lebih anterior secara skeletal, yaitu prognati mandibula dan hubungan kelas III.

---

## Soal 49

- **id:** `ortho-049`
- **difficulty:** `sedang`
- **topic:** `migrasi-gigi`
- **correct_answer:** `E`

### Pertanyaan

Pasien laki-laki usia 20 tahun datang ke praktek dokter gigi dengan keluahan gigi depannya renggang-renggang. Anamnesis keadan ini muncul sekitar dua tahun yang lalu dilakukan pencabutan gigi geraham kiri dan kanan atas. Pemeriksaan klinis menggambarkan gi M2 kiri dan kanan condong atau miring ke arah P2. Apakah penyebab kelainan dari keluhan pasien tersebut?

### Pilihan

- **A.** Adanya pergerakan gigi Fisiologis
- **B.** Adanya pergerakan migrasi gigi ke arah mesial dan distalk
- **C.** Adanya pergerakan gigi patoloigis
- **D.** Adanya pergerakan migrasi gigi ke arah anterior dan posterior
- **E.** Adanya pencabutan gigi 16 dan 26

### Pembahasan

Pencabutan gigi 16 dan 26 meninggalkan ruang yang memungkinkan gigi di sekitarnya bermigrasi atau tipping. Karena keluhan muncul setelah pencabutan dan molar kedua condong ke arah premolar, pencabutan kedua molar pertama tersebut adalah faktor penyebab utama yang dijelaskan dalam kasus.

---

## Soal 50

- **id:** `ortho-050`
- **difficulty:** `mudah`
- **topic:** `malposisi-gigi`
- **correct_answer:** `E`

### Pertanyaan

Pasien Laki-laki berumur 10 tahun dibawa oleh orang tuanya ke praktek dokter gigi dengan keluhan gigi taring atas kiri dan kana belum erupsi serta gigi dengan kondisi gigi taring susu telah dicabut. Hasil pemeriksaaan intra oral terlihat gigi 24 erupsinya lebih ke belakang mendekati gigi P2, seolah olah memberi gambaran akan terjadi rotasi silang. Geligi insisif erupsi pada lengkung yang baik dan relasi molar klas I Angle. Apakah yang terjadi pada gigi dan 24 tersebut?

### Pilihan

- **A.** Palatoversi
- **B.** Bukoversi
- **C.** Mesioversi
- **D.** Transposisi
- **E.** Distoversi

### Pembahasan

Distoversi berarti gigi berada/erupsi lebih ke arah distal dibanding posisi normal. Gigi 24 yang bergerak ke belakang mendekati gigi yang lebih posterior sesuai dengan distoversi.

---

## Soal 51

- **id:** `ortho-051`
- **difficulty:** `sedang`
- **topic:** `sefalometri`
- **correct_answer:** `B`

### Pertanyaan

Pasien perempuan berumur 14 tahun datang ke dokter gigi dengan keluhan hubungan rahangnya tampak tidak normal. Analisis sefalometri menunjukkan SNA 78°, SNB 80°, dan ANB -2°. Apakah bentuk kelainan pada kasus tersebut?

### Pilihan

- **A.** Prognati maksila
- **B.** Retrognati maksila
- **C.** Protrusif maksila
- **D.** Retrusif mandibula
- **E.** Prognati Mandibula

### Pembahasan

SNA 78° lebih rendah dari normal sekitar 82°±2°, sedangkan SNB 80° normal. Jadi komponen skeletal utamanya adalah posisi maksila yang lebih posterior, yaitu retrognati maksila; ANB -2° mendukung kecenderungan hubungan kelas III.

---

## Soal 52

- **id:** `ortho-052`
- **difficulty:** `sedang`
- **topic:** `pertumbuhan-kraniofasial`
- **correct_answer:** `E`

### Pertanyaan

Pasien laki-laki berumur 7 tahun dibawa oleh orang tuanya ke praktek dokter gigi dengen keluahan susunan giginya yang tidak teratur dan itu dirasakan semenjak gigi susu sianak telah erupsi sampai pada fase gigi bercampur. Hasil pemeriksaaan didaptkan suatu kesimpulan bahwa terjadi gangguan pertumbuhan pada si anak karena perkembangan kepala , wajah dan rahang tidak seimbang yang disebabkan oleh beberapa bagian dari tengkorak kepala yang lambat tertutup. Apakah nama bagian yang dimaksud ?

### Pilihan

- **A.** Oksipital
- **B.** Kartilago
- **C.** Endokondral
- **D.** Fontanel
- **E.** Sutura

### Pembahasan

Sutura adalah pertemuan antartulang kranium yang tetap aktif selama pertumbuhan dan memungkinkan perubahan ukuran serta bentuk kompleks kraniofasial. Keterlambatan/variasi penutupan sutura dapat memengaruhi keseimbangan pertumbuhan kepala, wajah, dan rahang.

---

## Soal 53

- **id:** `ortho-053`
- **difficulty:** `mudah`
- **topic:** `malposisi-gigi`
- **correct_answer:** `B`

### Pertanyaan

Pasien Laki-laki berumur 13 tahun dibawa oleh orang tuanya ke praktek dokter gigi dengan keluhan gigi taring atas tumbuhnya tidak sama dengan gigi taring yang di kanan. Hasil pemeriksaaan intra oral terlihat gigi 23 erupsi di sebelah distal premolar pertama (gigi 24 ), dan gigi premolar pertama erupsi di sebelah distal insisivus lateral (gigi 22). Geligi insisif erupsi pada lengkung yang baik dan relasi molar klas I Angle. Apakah yang terjadi pada gigi 23 dan 24 tersebut?

### Pilihan

- **A.** Bukoversi
- **B.** Transposisi
- **C.** Palatoversi
- **D.** Mesioversi
- **E.** Distoversi

### Pembahasan

Transposisi adalah pertukaran posisi dua gigi dalam lengkung. Gigi 23 yang erupsi di distal 24 dan 24 yang berada lebih mesial menunjukkan pertukaran posisi kaninus dan premolar pertama.

---

## Soal 54

- **id:** `ortho-054`
- **difficulty:** `sulit`
- **topic:** `growth-modification`
- **correct_answer:** `D`

### Pertanyaan

Seorang ibu mengantarkan anak perempuannya berusia 11 tahun datang ke praktek dokter gigi. Dengan keluhan gigi depan rahang atas maju serta kalau dikontakkan rahang atas dengan rahang bawah, hampir seluruh gigi depan rahang baeawah tertutup oleh gigi rahang atas.. Pada pemeriksaan klinis terlihat hubungan tonjol gigi Molar pertama permanen rahang atas berada lebih ke mesial dari lekuk bukal gigi molar pertama permanen rahang bawah. Hasil analisis dental dan sefalometri metode Steiner : SNA 86°, SNB = 78°, ANB 8°. Overjet 7.5 mm dan overbite 5 mm. Apakah perawatan yang paling tepat pada kasus di atas?

### Pilihan

- **A.** Perawatan ortodonti ekspansi lateral
- **B.** Perawatan ortodonti dengan pencabutan kedua Premolar Rahang atas
- **C.** Perawatan ortodonti dengan pencabutan kedua Premolar Rahang bawah
- **D.** Perawatan ortodonti modifikasi pertumbuhan
- **E.** Perawatan bedah ortognati

### Pembahasan

Pasien 11 tahun masih memiliki potensi pertumbuhan dan menunjukkan skeletal kelas II yang nyata (SNA 86°, SNB 78°, ANB 8°) disertai overjet besar. Pada fase ini pendekatan yang paling sesuai adalah growth modification; bedah ortognati ditujukan setelah pertumbuhan selesai, sedangkan pencabutan hanya memberi kamuflase dental.

---

## Soal 55

- **id:** `ortho-055`
- **difficulty:** `mudah`
- **topic:** `sefalometri`
- **correct_answer:** `E`

### Pertanyaan

Pasien perempuan usia 11 tahun, datang ke RSGM untuk dilakukan perawatan orodonti, Dari hasil analisa sefalogram disimpulkan maloklusi klas III skeletal. Pada Analisis model studi terdapat gigitan terbalik Anterior. Bidang atau garis apakah yang digunakan untuk melihat hubungan maksila dan mandibula?

### Pilihan

- **A.** SNA
- **B.** SNB
- **C.** Y-Axis
- **D.** NAP
- **E.** ANB

### Pembahasan

ANB adalah selisih sudut SNA dan SNB dan digunakan untuk menilai hubungan sagital maksila terhadap mandibula. Karena pertanyaannya meminta hubungan kedua rahang, ANB adalah parameter yang paling langsung.

---

## Soal 56

- **id:** `ortho-056`
- **difficulty:** `sedang`
- **topic:** `posterior-crossbite`
- **correct_answer:** `C`

### Pertanyaan

Pasien laki-laki berusia 5 tahun datang bersama orang tuanya dengan keluhan gigi belakang anaknya tidak bisa tertutup sempurna disaat digigitkan sehingga mengganggu saat mengunyah makanan. Hasil pemeriksaan semua gigi masih gigi desidui, terdapat gigitan edge to edge pada gigi anterior. Apakah bentuk kelaianan pada kasus tersebut diatas?

### Pilihan

- **A.** Diastema sentralis
- **B.** Mandibula besar
- **C.** Cross bite Posterior
- **D.** Crowded
- **E.** Maksila protrusif dan sempit

### Pembahasan

Keluhan utama adalah gigi posterior tidak dapat berkontak sempurna saat oklusi. Dari pilihan yang tersedia, gambaran tersebut paling sesuai dengan posterior crossbite; pilihan lain tidak menjelaskan gangguan kontak posterior yang dideskripsikan.

---

## Soal 57

- **id:** `ortho-057`
- **difficulty:** `sedang`
- **topic:** `ekspansi-transversal`
- **correct_answer:** `C`

### Pertanyaan

Pasien perempuan berusia 12 tahun datang ke RSGM bersama orang tuanya dengan keluhan gigi depan anaknya agak maju. Hasil pemeriksaan fungsional tidak ada kelaianan, dan hasil analisa model semua gigi permanen telah erupsi sempurna, jarak gigit 4 mm, Diskrepansi model terdapat selisih ruangan +9 mm. Relasi Molar Klas I Angle disertai gigitan silang posterior. Rencana perawatan menggunakan piranti lepasan. Apakah komponen yang digunakan untuk mengoreksi gigitan silang tersebut?

### Pilihan

- **A.** Labial bow
- **B.** C-retraktor
- **C.** Fisher Screw midline
- **D.** Finger coil spring
- **E.** Cantilever spring

### Pembahasan

Fisher screw digunakan untuk ekspansi transversal pada peranti lepasan. Karena kasus menunjukkan posterior crossbite yang memerlukan pelebaran lengkung rahang atas, Fisher screw midline adalah komponen yang sesuai.

---

## Soal 58

- **id:** `ortho-058`
- **difficulty:** `sedang`
- **topic:** `sefalometri`
- **correct_answer:** `E`

### Pertanyaan

Seorang pasien laki-laki berusia 15 tahun datang dengan keluhan ingin memperbaiki gigi-giginya. Analisis sefalometri menunjukkan SNA 82° (normal 82°±2°), SNB 80° (normal 80°±2°), dan ANB 2° (normal 2°±2°). Inklinasi insisivus atas terhadap bidang SN (I-SN) 112° (normal 104°±6°) dan inklinasi insisivus bawah terhadap bidang mandibula (IMPA) 100° (normal 90°±5°). Bagaimana kesimpulan analisis sefalometri kasus tersebut?

### Pilihan

- **A.** Hubungan rahang ortognati dengan gigi insisivus atas protrusif
- **B.** Hubungan rahang ortognati dengan gigi insisivus atas retrusif
- **C.** Hubungan rahang ortognati dengan gigi insisivus bawah protrusif
- **D.** Hubungan rahang ortognati dengan retrusi gigi bimaksila
- **E.** Hubungan rahang ortognati dengan protrusi gigi bimaksila

### Pembahasan

SNA 82°, SNB 80°, dan ANB 2° menunjukkan hubungan rahang ortognati. Namun I-SN 112° dan IMPA 100° meningkat, berarti insisivus atas dan bawah sama-sama proklinasi. Kesimpulannya adalah protrusi dental bimaksila.

---

## Soal 59

- **id:** `ortho-059`
- **difficulty:** `sedang`
- **topic:** `etiologi-maloklusi`
- **correct_answer:** `B`

### Pertanyaan

Pasien perempuan berumur 12 tahun datang ke dokter gigi dengan keluhan rahang atasnya lebih maju. Pemeriksaan intraoral menunjukkan relasi molar pertama atas dengan tonjol mesiobukal terletak di interdental gigi premolar pertama dan kedua bawah. Analisis sefalometri menunjukkan SNA 86° dan SNB 80°. Hasil analisis ruang menurut Nance menunjukkan diskrepansi +2 mm. Apakah faktor etiologi skeletal yang paling tepat untuk kasus di atas?

### Pilihan

- **A.** Pertumbuhan mandibular yang kurang ( mandibular retrognatik)
- **B.** Pertumbuhan maksila yang berlebih (maksila prognatik)
- **C.** Kebiasaan mengisap ibu jari
- **D.** Kebisaan bernafas melalui mulut
- **E.** Pertumbuhan maksila dan mandibula yang berlebih (bimaxillary protrusif)

### Pembahasan

SNA 86° meningkat sedangkan SNB 80° normal. Ini menunjukkan komponen skeletal utama berasal dari pertumbuhan/posisi maksila yang berlebih ke anterior, yaitu maksila prognatik, bukan mandibula retrognatik.

---

## Soal 60

- **id:** `ortho-060`
- **difficulty:** `mudah`
- **topic:** `perkembangan-dentisi`
- **correct_answer:** `D`

### Pertanyaan

Pada saat lahir pada bantalan gusi atas dan bawah terdapat 20 segmen tempat benih gigi sulung (calon gigi yang sedang berkembang sampai siap erupsi). Apakah nama lain dari bantalan gusi tersebut?

### Pilihan

- **A.** Tapal Kuda
- **B.** Jaringan Pendukung gigi
- **C.** Gusi
- **D.** Gum Pad
- **E.** Gingiva

### Pembahasan

Gum pad adalah bantalan/alveolar ridge gingiva pada bayi baru lahir yang berisi segmen tempat benih gigi sulung berkembang sebelum erupsi. Karena itu istilah yang dimaksud adalah gum pad.

---

# Referensi Verifikasi Utama

Referensi berikut digunakan untuk verifikasi silang pada butir yang ambigu, tidak memiliki penanda merah, atau bertentangan dengan konsep ortodonti. Referensi ini **bukan payload quiz** dan tidak perlu ditampilkan di UI.

1. **Anchorage loss** — *Anchorage loss—a multifactorial response*. PubMed PMID **14719740**; DOI **10.1043/0003-3219(2003)073<0730:ALMR>2.0.CO;2**. Mendefinisikan anchorage loss sebagai pergerakan mesial molar pertama permanen maksila selama penutupan ruang.
2. **Interpretasi SNA/SNB** — *Relationship between skeletal Class II and Class III malocclusions with vertical skeletal pattern*. PMCID **PMC6733235**. Referensi ini menggunakan SNA 80–84° sebagai normal; >84° = maxillary prognathism, serta SNB 78–82° sebagai normal; >82° = mandibular prognathism.
3. **U1-SN dan lower incisor–mandibular plane** — *Changes in the Vertical Dimension After Orthodontic Treatment in Response to Different Premolar Extraction Patterns*. PMCID **PMC10174334**. U1-SN didefinisikan sebagai inklinasi insisivus atas terhadap anterior cranial base; lower incisor dinilai terhadap mandibular plane.
4. **Anterior crossbite dan sagittal expansion screw** — *Pediatric Treatment of Anterior-Upper-Single Dental Crossbite Using a Versatile Sagittal Screw System: A Case Series*. PMID **39997618**; PMCID **PMC11858000**; DOI **10.3390/pediatric17010011**.
5. **Pertumbuhan vertikal mandibula** — *Postnatal changes in the growth dynamics of the human face revealed from bone modelling patterns*. PMCID **PMC3972044**. Pertumbuhan vertikal mandibula dikaitkan dengan peningkatan tinggi ramus dan terutama kondilus.
6. **Diastema fisiologis** — *Orthodontic Management of Midline Diastema in Mixed Dentition*. PMCID **PMC4999640**. Diastema midline fisiologis pada mixed dentition umumnya menutup setelah erupsi kaninus permanen.
7. **Food impaction dan proximal contact** — *Food Impaction in Dentistry: Revisited*. PMCID **PMC11619868**. Hubungan proximal contact, embrasure, dan interdental papilla merupakan mekanisme penting dalam pencegahan food impaction.
8. **Interceptive orthodontics** — *Development and validation of a novel screening instrument to prioritize the orthodontic referral of developing malocclusion in children*. PMCID **PMC10040290**. Interceptive orthodontics ditujukan untuk mengoreksi maloklusi yang sedang berkembang atau menyederhanakan perawatan berikutnya.
9. **Growth modification pada skeletal Class II yang masih tumbuh** — *Management of a growing Skeletal Class II Patient: A Case Report*. PMCID **PMC4034635**; serta *Growth modulation therapy in skeletal class II malocclusion*, PMCID **PMC10254890**.
10. **Fisher expansion screw** — Literatur pendidikan kedokteran gigi Indonesia mengenai removable expansion plate dan Fisher screw, termasuk repository Universitas Muhammadiyah Yogyakarta: *Efektifitas Pencarian Ruang Menggunakan Alat Ortodontik Lepasan Ekspansi Lateral dengan Fisher Screw* (2015).
11. **Kelainan endokrin dan pertumbuhan dentofasial** — Materi ortodonti yang konsisten menyebut gangguan endokrin dapat memengaruhi hipoplasia gigi, pematangan/osifikasi tulang, penutupan sutura, resorpsi akar gigi sulung, dan waktu erupsi gigi.
12. **Pola pertumbuhan muka** — Literatur pertumbuhan kraniofasial menjelaskan bahwa pola pertumbuhan muka/kepala berkaitan dengan ras, keluarga, dan umur; dari opsi pada soal 39, `usia` adalah jawaban yang sesuai.

> **Catatan penting:** beberapa soal asli memang memiliki redaksi atau data yang cacat. File final ini tidak sekadar menyalin warna jawaban Word; konflik tersebut telah dinormalisasi dan dicatat pada bagian *Catatan Verifikasi dan Koreksi Sumber*.

# Checklist Integrasi untuk Codex

- [ ] Parse tepat **60 soal**.
- [ ] Pastikan seluruh `id` unik.
- [ ] Pastikan setiap `correct_answer` terdapat pada pilihan soal terkait.
- [ ] Jangan mengubah kunci berdasarkan posisi opsi.
- [ ] Jangan menampilkan `correct_answer` atau `explanation` sebelum submit.
- [ ] Gunakan `difficulty` yang sudah tersedia untuk filter sesi.
- [ ] Pertahankan Soal 42 dengan 4 opsi.
- [ ] Jalankan validasi build-time agar data invalid menyebabkan build gagal.
