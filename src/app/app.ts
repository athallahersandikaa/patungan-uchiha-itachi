import { Component, computed, signal } from '@angular/core';
import { ItemRow } from './components/item-row';
import { Stepper } from './components/stepper';
import { Scene } from './components/scene';
import { Gagak } from './components/gagak';
import { Amaterasu } from './components/amaterasu';
import { ITEMS, JUMLAH_ORANG, PAJAK_PERSEN } from './data/menu';
import { KATEGORI, kategoriOf } from './data/kategori';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [ItemRow, Stepper, Scene, Gagak, Amaterasu, CurrencyPipe, DatePipe, FormsModule],
  templateUrl: './app.html',
})
export class App {
  protected readonly tanggal = new Date(2026, 10, 20);
  protected readonly kategoriList = KATEGORI;

  protected readonly items = signal(ITEMS);
  protected readonly jumlahOrang = signal(JUMLAH_ORANG);
  protected readonly pajakPersen = signal<number | null>(PAJAK_PERSEN);

  protected readonly subtotal = computed(() =>
    this.items().reduce((sum, i) => sum + i.price * i.qty, 0),
  );
  protected readonly pajak = computed(() => (this.subtotal() * (this.pajakPersen() ?? 0)) / 100);
  protected readonly total = computed(() => this.subtotal() + this.pajak());
  // dibulatkan ke atas supaya total patungan tidak pernah kurang
  protected readonly perOrang = computed(() => Math.ceil(this.total() / this.jumlahOrang()));
  protected readonly kategori = computed(() => kategoriOf(this.perOrang()));
  // tahap Susano'o di ilustrasi: 0 (non-aktif) sampai 3 (sempurna), mengikuti kategori
  protected readonly susanooLevel = computed(() =>
    this.subtotal() > 0 ? KATEGORI.findIndex((k) => k.key === this.kategori().key) : 0,
  );

  protected readonly newName = signal('');
  protected readonly newPrice = signal<number | null>(null);

  protected setQty(id: number, qty: number) {
    this.items.update((list) => list.map((i) => (i.id === id ? { ...i, qty } : i)));
  }

  protected remove(id: number) {
    this.items.update((list) => list.filter((i) => i.id !== id));
  }

  protected add() {
    const name = this.newName().trim();
    const price = this.newPrice();
    if (!name || !price || price <= 0) return;
    const id = Math.max(0, ...this.items().map((i) => i.id)) + 1;

    this.items.update((list) => [...list, { id, name, price, qty: 1 }]);

    this.newName.set('');
    this.newPrice.set(null);
  }
}
