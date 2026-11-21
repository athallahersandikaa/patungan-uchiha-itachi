import { Component } from '@angular/core';

/**
 * Sharingan Mangekyō besar + api hitam Amaterasu berlapis.
 * Dipasang menempel di sisi kiri hero (seperti gagak Shisui), bukan di dalam scene,
 * sehingga selalu berada di belakang gagak dan tidak tertutup Susano'o di layar lebar.
 * Bentuk-bentuk dasar (#mk, #api-hitam, dst.) didefinisikan di scene.ts.
 */
@Component({
  selector: 'app-amaterasu',
  template: `
    <svg class="amaterasu-hero" viewBox="-400 -400 800 800" aria-hidden="true" focusable="false">
      <!-- Mangekyō Sharingan besar (kiri) + api hitam Amaterasu berlapis, berputar -->
        <g class="amaterasu">
          <circle r="330" fill="url(#asap-hitam)" />
          <g class="putar-balik">
            @for (a of apiCabang; track a; let i = $index) {
              <g [attr.transform]="'rotate(' + a + ') translate(0 -160) scale(1.5)'">
                <use class="lidah-hitam" href="#api-hitam-c" [style.animation-delay]="-i * 0.37 + 's'" />
              </g>
            }
          </g>
          <g class="putar">
            @for (a of apiTerluar; track a; let i = $index) {
              <g [attr.transform]="'rotate(' + a + ') translate(0 -158) scale(1.45)'">
                <use class="lidah-hitam" href="#api-hitam-b" [style.animation-delay]="-i * 0.31 + 's'" />
              </g>
            }
          </g>
          <g class="putar-balik">
            @for (a of apiTengah; track a; let i = $index) {
              <g [attr.transform]="'rotate(' + a + ') translate(0 -148) scale(1.05)'">
                <use class="lidah-hitam" href="#api-hitam-b" [style.animation-delay]="-i * 0.19 + 's'" />
              </g>
            }
          </g>
          <g class="putar-balik">
            @for (a of apiSabit; track a; let i = $index) {
              <g [attr.transform]="'rotate(' + a + ') translate(0 -150) scale(1.15)'">
                <use class="lidah-hitam" href="#api-sabit" [style.animation-delay]="-i * 0.27 + 's'" />
              </g>
            }
          </g>
          <g class="putar">
            @for (a of apiLuar; track a; let i = $index) {
              <g [attr.transform]="'rotate(' + a + ') translate(0 -152) scale(1.2)'">
                <use class="lidah-hitam" href="#api-hitam" [style.animation-delay]="-i * 0.23 + 's'" />
              </g>
            }
          </g>
          <g class="putar-balik">
            @for (a of apiDalam; track a; let i = $index) {
              <g [attr.transform]="'rotate(' + a + ') translate(0 -140) scale(.85)'">
                <use class="lidah-hitam" href="#api-hitam" [style.animation-delay]="-i * 0.17 + 's'" />
              </g>
            }
          </g>
          <g class="putar-balik">
            @for (a of apiSulur; track a; let i = $index) {
              <g [attr.transform]="'rotate(' + a + ') translate(0 -128) scale(1.15)'">
                <use class="lidah-hitam" href="#api-sulur" [style.animation-delay]="-i * 0.21 + 's'" />
              </g>
            }
          </g>
          <g class="putar">
            @for (a of apiHalus; track a; let i = $index) {
              <g [attr.transform]="'rotate(' + a + ') translate(0 -134) scale(.5)'">
                <use class="lidah-hitam" href="#api-hitam" [style.animation-delay]="-i * 0.11 + 's'" />
              </g>
            }
          </g>
          <g class="putar-balik"><circle r="212" fill="none" stroke="#ff3b30" stroke-width="1.4" stroke-dasharray="14 6 2 6" opacity=".5" /></g>
          <g class="putar"><circle r="190" fill="none" stroke="#ff3b30" stroke-width="2" stroke-dasharray="3 9" opacity=".6" /></g>
          @for (q of percikMerah; track q.x) {
            <circle class="percik percik-merah" [attr.cx]="q.x" [attr.cy]="q.y" [attr.r]="q.r" [style.animation-delay]="-q.d + 's'" />
          }
        </g>
        <g class="sharingan-nyala">
          <g class="putar">
            <use href="#mk" x="-172" y="-172" width="344" height="344" />
          </g>
        </g>
      <!-- Gagak-gagak kecil mengorbit di sekitar Sharingan -->
      <g class="orbit-g">
        @for (o of orbit; track $index) {
          <g [class]="o.rev ? 'putar-balik' : 'putar'" [style.animation-duration]="o.d + 's'" [style.animation-delay]="o.delay + 's'">
            <g [attr.transform]="'rotate(' + o.a0 + ') translate(0 -' + o.r + ')' + (o.rev ? ' scale(-1 1)' : '')">
              <use href="#gagak" [attr.x]="-o.w / 2" [attr.y]="-o.w * 0.37" [attr.width]="o.w" [attr.height]="o.w * 0.73" />
            </g>
          </g>
        }
      </g>
    </svg>
  `,
})
export class Amaterasu {
  protected readonly apiLuar = Array.from({ length: 16 }, (_, i) => i * 22.5);
  protected readonly apiDalam = Array.from({ length: 12 }, (_, i) => i * 30 + 15);
  protected readonly apiSabit = Array.from({ length: 14 }, (_, i) => i * (360 / 14) + 6);
  protected readonly apiHalus = Array.from({ length: 36 }, (_, i) => i * 10);
  protected readonly apiTerluar = Array.from({ length: 10 }, (_, i) => i * 36);
  protected readonly apiTengah = Array.from({ length: 20 }, (_, i) => i * 18 + 9);
  protected readonly apiCabang = Array.from({ length: 12 }, (_, i) => i * 30 + 15);
  protected readonly apiSulur = Array.from({ length: 16 }, (_, i) => i * 22.5 + 11);
  protected readonly percikMerah = Array.from({ length: 18 }, (_, i) => {
    const a = (i * 137.5 * Math.PI) / 180, r = 120 + ((i * 53) % 110);
    return { x: Math.round(Math.cos(a) * r), y: Math.round(Math.sin(a) * r), r: 1.4 + (i % 3) * 0.8, d: (i * 0.41) % 3.2 };
  });
  // gagak kecil: radius, durasi putar, tunda, arah, ukuran, sudut awal
  protected readonly orbit = Array.from({ length: 22 }, (_, i) => ({
    r: 290 + ((i * 47) % 130),
    d: 16 + ((i * 7) % 26),
    delay: -((i * 1.9) % 30),
    rev: i % 3 === 0,
    w: 32 + ((i * 5) % 26),
    a0: (i * 137) % 360,
  }));
}
