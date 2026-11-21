import { Component, input, output } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Item } from '../data/menu';
import { Stepper } from '../components/stepper';

@Component({
  selector: 'app-item-row',
  imports: [Stepper, CurrencyPipe],
  template: `
    @let subtotal = item().price * item().qty;

    <div class="item-row">
      <div class="item-info">
        <div class="item-name">{{ item().name }}</div>
        <div class="item-price">
          {{ item().price | currency: 'IDR' : 'symbol-narrow' : '1.0-0' }} / porsi
        </div>
      </div>

      <app-stepper [value]="item().qty" (valueChange)="qtyChange.emit($event)" [min]="1" />

      <div class="item-subtotal">
        {{ subtotal | currency: 'IDR' : 'symbol-narrow' : '1.0-0' }}
      </div>

      <button
        type="button"
        class="link-hapus"
        [attr.aria-label]="'Hapus ' + item().name"
        (click)="remove.emit(item().id)"
      >
        hapus
      </button>
    </div>
  `,
})
export class ItemRow {
  item = input.required<Item>();
  qtyChange = output<number>();
  remove = output<number>();
}
