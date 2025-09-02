
# Proyek Magang : Front-End Aplikasi Pengambilan Obat Puskesmas Sukabumi (PT. Microdata Indonesia)

Nama : Nurroni
NIM  : 120140016

Repository ini merupakan Repository untuk front-end dari Aplikasi Pengambilan Obat Puskesmas Sukabumi. Dimana proyek ini merupakan Proyek Magang saya dengan PT. Microdata Indonesia.




## Cara menjalankan project ini

Di asumsikan telah menginstall node.js
lalu, install bun package manager : https://bun.com/docs/installation
Setelah itu,

Clone the project

```bash
  git clone https://github.com/rYuuXHikaRi/Puskesmas-Sukabumi-MobApp.git
```

Go to the project directory

```bash
  cd Puskesmas-Sukabumi-MobApp
```

Install dependencies

```bash
  bun install
```

Jalankan project

direkomendasikan melakukan pre-build dahulu :
```bash
   bun expo prebuild
```
Lalu, jalankan project :
```bash
  bun run android
```



## Folder Structure

- index.js -> Register App
- App.js -> App wrapper
- component/middleware/tools/useIcons.js -> Tools untuk menggunakan Icon, menggabungkan penggunaan Icon dari package maupun local 
- component/middleware/tools/fontNormalize.js -> Tools untuk menyesuaikan font sesuai dengan layar
- component/middleware/context/authContext.js -> Context untuk melakukan auth-deauth, serta validasi token
- component/tabs.js -> Tab Navigator untuk screen utama pada aplikasi ini
- component/stock_screen.js -> component untuk daftar obat
- component/profile_screen.js -> component untuk profil pengguna
- component/login_screen.js -> component untuk login aplikasi
- component/home_screen.js -> component untuk halaman utama aplikasi
- component/history_screen.js -> component untuk riwayat pemeriksaan pasien
- component/screenComponents/homeScreen/medicinePicker_screen.js -> component untuk melakukan pemilihan obat yang akan diberikan pasien
- component/screenComponents/homeScreen/newPatientSubmission_screen.js -> componen untuk menambahkan data pasien yang akan melakukan pemeriksaan
- component/screenComponents/historyScreen/detailPatient_screen.js -> componen untuk menampilkan data riwayat pemeriksaan pasien