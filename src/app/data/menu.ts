// Data contoh (fiktif): makan besar bareng 4 orang. Jumlah porsinya banyak, sehingga tagihan per orang
// di atas Rp150.000 dan Susano'o langsung tampil Sempurna saat web dibuka.
export type Item = {
  id: number;
  name: string;
  price: number; // harga per porsi, dalam rupiah
  qty: number; // jumlah porsi
};

export const ITEMS: Item[] = [
  { id: 1, name: 'Nasi goreng spesial', price: 28000, qty: 8 },
  { id: 2, name: 'Mie ayam bakso', price: 22000, qty: 6 },
  { id: 3, name: 'Ayam bakar madu', price: 35000, qty: 8 },
  { id: 4, name: 'Es teh manis', price: 6000, qty: 12 },
  { id: 5, name: 'Kentang goreng', price: 18000, qty: 6 },
];

export const JUMLAH_ORANG = 4;
export const PAJAK_PERSEN = 10; // pajak dan biaya layanan
