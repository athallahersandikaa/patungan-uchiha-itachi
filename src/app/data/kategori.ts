// Kategori patungan berdasarkan nominal yang harus dibayar PER ORANG.
// Urutkan dari batas terkecil ke terbesar.
export type Kategori = {
  key: 'hemat' | 'wajar' | 'mahal' | 'sultan';
  label: string;
  min: number; // batas bawah (rupiah per orang)
  desc: string;
  susanoo: string; // tahap Susano'o yang muncul di ilustrasi
};

export const KATEGORI: Kategori[] = [
  { key: 'hemat', label: 'Hemat', min: 0, desc: 'Tenang. Tidak ada yang perlu dikorbankan.', susanoo: 'Non-Aktif' },
  { key: 'wajar', label: 'Wajar', min: 30000, desc: 'Seimbang. Sesuai porsi masing-masing.', susanoo: 'Rusuk' },
  { key: 'mahal', label: 'Mahal', min: 75000, desc: 'Ada harga yang harus dibayar.', susanoo: 'Kerangka' },
  { key: 'sultan', label: 'Sultan', min: 150000, desc: 'Ini bukan lagi sekadar makan malam.', susanoo: 'Sempurna' },
];

export function kategoriOf(perOrang: number): Kategori {
  let hasil = KATEGORI[0];
  for (const k of KATEGORI) {
    if (perOrang >= k.min) hasil = k;
  }
  return hasil;
}
