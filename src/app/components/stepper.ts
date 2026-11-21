import { Component, model, input } from '@angular/core';

@Component({
  selector: 'app-stepper',
  template: `
    <div class="stepper" role="group" aria-label="Jumlah">
      <button type="button" aria-label="Kurangi" (click)="change(-1)" [disabled]="value() <= min()">
        &minus;
      </button>
      <span aria-live="polite">{{ value() }}</span>
      <button type="button" aria-label="Tambah" (click)="change(1)" [disabled]="value() >= max()">
        +
      </button>
    </div>
  `,
})
export class Stepper {
  value = model(1);
  min = input(0);
  max = input(99);

  change(step: number) {
    this.value.update(v => Math.min(this.max(), Math.max(this.min(), v + step)));
  }
}
