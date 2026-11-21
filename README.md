# Patungan — Itachi (Angular)

Aplikasi patungan (split bill) bertema **Uchiha Itachi**: poster key visual di atas, nota kertas di bawah.

## Ilustrasi (semua vektor SVG buatan sendiri, ada di `src/app/components/scene.ts`)
- Potret Itachi (ikat kepala bergores, garis wajah khas, mata Sharingan, jubah Akatsuki dengan kerah belakang utuh tanpa celah)
- Mangekyo Sharingan besar yang berputar + lambang kecil berputar di samping judul
- Susanoo yang muncul bertahap mengikuti kategori tagihan:
  Hemat = tertidur · Wajar = rusuk · Mahal = kerangka + kepala bertanduk dan berjambul duri · Sultan = Susano'o Sempurna:
  bahu berlapis zirah, kepalan bersarung baja, cincin api + halo mandala berputar, cermin Yata bergerigi, pedang Totsuka
- Data contoh di `src/app/data/menu.ts` memakai menu dan harga semula, tetapi jumlah porsinya diperbanyak (subtotal Rp816.000,
  sekitar Rp224.400 per orang untuk 4 orang). Karena di atas Rp150.000, Susano'o langsung tampil Sempurna saat web dibuka

## Pembaruan v7
- Wajah Itachi dipendekkan dan dilebarkan agar proporsional; leher dirapikan.
- Mata membuka saat halaman dimuat, berkedip berkala, lalu Sharingan menyala (cahaya merah + iris berputar). Iris memakai pola Mangekyō Itachi (tiga bilah melengkung).
- Kepala Susano'o dibentuk ulang ala referensi: tengu bertanduk, alis tajam, hidung panjang, seringai bergigi.
- Susano'o ditambah sinar berputar, pusaran dada, dan gerigi halo.
- Panel pesanan diganti tema gelap Akatsuki/Susano'o: meter tahap Susano'o, kartu skala dengan ikon Mangekyō, kartu hasil yang menyala di level Sultan.

## Pembaruan v8
- Skala kategori memakai ikon tahap Susano'o: non-aktif, rusuk, kerangka, sempurna.
- Mata Susano'o: bola kuning menyala dengan rongga hitam tebal dan efek cahaya berdenyut.
- Susano'o ditambah sayap bulu api, tomoe di bahu dan cermin Yata, jambul dalam, api di pipi, dan percik bara.
- Sharingan + api Amaterasu digeser ke kiri dan dibuat berlapis (5 lapisan api, cincin putus-putus, percik).
- Gagak terbang diperbanyak menjadi 11 (sebagian terbang ke arah sebaliknya).
- Gagak Shisui bertengger di garis merah di kiri: menghadap depan, geleng kanan-kiri, lalu menoleh ke samping dengan Sharingan Shisui menyala (siklus 14 detik).

## Pembaruan v9
- Gagak Shisui dibuat ulang sebagai komponen `app-gagak` (`src/app/components/gagak.ts`): kepala dimodelkan 3D (tengkorak datar, paruh melengkung) lalu diproyeksikan tiap frame, jadi geleng kanan-kiri dan noleh ke samping benar-benar mulus. Badan berbulu halus dengan sayap terlipat, bulu paha, dan ekor. Sharingan Shisui menyala saat menyamping.
- Sharingan besar + api Amaterasu digeser lebih ke kiri; api kini 7 lapisan (termasuk bilah sabit dan api halus di tepi cakram).
- Susano'o: pola sisik zirah, bahu bawah, surai api di bahu, pita api dari helm, kumis, vambrace berlapis, cincin mandala luar, dan pedang dengan lebih banyak api.

## Pembaruan v10
- Gagak Shisui: mata awalnya Sharingan biasa (tiga tomoe), lalu berputar dan berubah menjadi Mangekyō Sharingan Shisui yang menyala saat kepala menoleh ke samping.
- Gerak gagak dibuat seperti gagak asli: geleng sangat cepat kanan-kiri, diam menatap dengan getar halus, kepala dimiringkan (cock), lirikan cepat, bulu mengibas sesaat, dan kedip acak. Gerak menoleh ke samping tetap mulus.
- Sharingan besar + api Amaterasu digeser benar-benar ke kiri dan dikecilkan; api kini 9 lapisan (tambah api tiga cabang, sulur melengkung, dan kabut hitam).
- Susano'o: bahu enam lapis dengan paku, sirip & taji di kepala, deret tanduk luar, permata dahi kuning menyala, aura api kedua, dan kilat yang berkedip di sekitar bahu.

## Pembaruan v11
- Sharingan besar + api Amaterasu digeser lebih ke kiri dan diperbesar; api aura Susano'o di sisi kiri dipendekkan supaya tidak menutupi pusaran.
- Pedang Totsuka dengan efek penuh: cahaya berdenyut, api melilit di sepanjang bilah, kilat, cincin energi naik, percik bara, bulan tebasan, rune tomoe, dan api di ujung.
- Susano'o: urat energi mengalir di dada, tomoe di zirah dada, cincin dalam berputar + kilau sapuan di cermin Yata, cabang tanduk, dan taring bawah.

## Pembaruan v12
- Sharingan besar + api Amaterasu dipindah menjadi komponen `app-amaterasu` yang menempel di kiri hero (seperti gagak), di belakang gagak Shisui dan sedikit lebih besar. Di layar lebar, area kosong di kiri scene kini terisi; tidak lagi tertutup Susano'o.
- 22 gagak kecil mengorbit di sekitar Sharingan (arah dan kecepatan berbeda-beda).
- Susano'o: manik magatama mengorbit kepala, mahkota bulan sabit, duri di tepi tutup bahu, api di tepi cermin Yata, dan pita kain berkibar dari helm.
- Ikon skala tahap digambar ulang (96x96) sesuai tahapan Susano'o: siluet padam, rusuk, kerangka bertanduk, dan sosok sempurna berzirah dengan halo, api, dan mata kuning.

## Pembaruan v13
- Sharingan besar + api Amaterasu kini ditempatkan otomatis di ruang kosong di kiri Susano'o (pusat = setengah lebar ruang itu, jari-jari api = setengahnya juga): tidak terpotong tepi kiri dan tidak tertutup Susano'o di lebar layar berapa pun.
- Logo di samping "Patungan" diganti lambang Uchiha (kipas merah + mangkuk putih + gagang) bersiluet Itachi: ikat kepala, kerah tinggi, jubah Akatsuki, mata merah menyala, gagak berputar, Itachi bersila di mangkuk putih, percik bara, dan cahaya berdenyut.
- Ikon skala tahap Susano'o digambar ulang lebih rumit (non-aktif berbentuk siluet putus-putus, rusuk, kerangka bertanduk, sempurna lengkap dengan halo, sayap api, cermin Yata, dan pedang).
- Susano'o: topeng oni di tiap tutup bahu, paku di helm dan tomoe di pelindung pipi, lapisan sayap api kedua, dan bulu gagak yang berjatuhan.

## Pembaruan v14
- Ikat kepala Itachi digambar ulang mengikuti referensi: pelat abu-abu polos dengan outline gelap, simbol Konoha (spiral + daun + segitiga) dengan coretan horizontal melintasi pusat spiral, keling di sudut, kain gelap di bawahnya, dua puncak poni di atas pelat, serta helai tipis panjang di tepi pelat.
- Efek angin sepoi-sepoi pada rambut: helai samping, helai tipis, puncak poni, dan ujung rambut belakang berayun pelan (kiri-kanan searah, kecepatan berbeda-beda). Kelas CSS `angin-*` di `src/styles.css`.
- Logo Uchiha di samping judul: siluet Itachi digambar lebih khas (kerah tinggi Akatsuki berlapis merah, poni dua puncak, ikat kepala berlambang daun, rambut panjang berayun angin, garis air mata, mata merah menyala).
- Susano'o: kilap (highlight) pada zirah, topeng oni mini pada halo yang berputar, cincin glif berputar, cincin kilat, dan gelombang kejut yang memancar.

## Pembaruan v15
- Logo Uchiha dirancang ulang dan diperbesar (menyembul di atas bar judul): bulan darah bertekstur kawah, potret Itachi (ikat kepala berlambang daun dengan coretan, poni dua puncak, rambut panjang berayun angin, garis air mata, mata Mangekyō berputar dan menyala, kerah tinggi Akatsuki berlapis merah, kalung, awan Akatsuki), bayangan halo + tulang rusuk Susano'o, api hitam Amaterasu di kaki bulan, gagak berputar di dua arah, dan Mangekyō Sharingan berputar di mangkuk putih.
- Susano'o: bendera Uchiha (nobori) berkibar di belakang bahu, ular api yang melilit pedang Totsuka, bola api (hitodama) yang mengorbit, dan bayangan gradasi di badan untuk kedalaman.

## Pembaruan v16
- Logo Uchiha: kepala Itachi dibentuk ulang agar proporsional dengan wajahnya (oval ramping, rahang tegas, dagu runcing, mata dan garis air mata disesuaikan). Mangekyō di mangkuk putih diganti Itachi duduk bersila (ekor rambut tertiup angin, kerah tinggi, pedang di punggung) di depan bulan darah, dengan desa Konoha, pohon pinus, dan gagak.
- Susano'o: lonceng emas berayun di bawah bahu, tali shimenawa dengan kertas shide, tirai api, kipas bulu garis di belakang, siku berduri dan manset lengan atas.

## Deploy dengan Git + Netlify
1. Dorong proyek ke GitHub (`git init`, `git add .`, `git commit`, `git remote add origin ...`, `git push`).
2. Di Netlify: Add new project → Import an existing project → GitHub → pilih repositori.
3. Pengaturan build dibaca otomatis dari `netlify.toml` (perintah `npm run build`, folder publish `dist/patungan/browser`, Node 22).
4. Setiap `git push` berikutnya otomatis membangun dan menayangkan ulang situs.

## Keamanan: file .env
- Proyek ini tidak memakai `.env` dan tidak menyimpan kunci rahasia apa pun di kode.
- Jika kelak menambah `.env`, `.gitignore` sudah memblokir `.env` dan `.env.*` (kecuali `.env.example`, yang boleh dibagikan sebagai contoh tanpa isi rahasia).
- Di hosting (Netlify), isi variabel lewat pengaturan Environment variables, bukan lewat file di repositori.
