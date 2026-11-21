import { Component, DestroyRef, ElementRef, afterNextRender, inject } from '@angular/core';

/**
 * Gagak Shisui bertengger di garis merah.
 * Badan menghadap depan (gambar statis berbulu halus); kepala dimodelkan 3D sederhana
 * (cincin-cincin tengkorak + paruh), diputar (yaw) lalu diproyeksikan tiap frame,
 * sehingga gerak geleng kanan-kiri dan noleh ke samping sepenuhnya mulus.
 * Di posisi menyamping, Sharingan Shisui menyala (kilatan, iris berputar).
 */

type Cincin = { z: number; wx: number; wy: number; yc: number };

// Tengkorak gagak: mahkota datar, dahi landai, rahang bersudut (superelips, bukan bola)
const TENGKORAK: Cincin[] = [
  { z: -19, wx: 7, wy: 9, yc: -1.5 },
  { z: -13, wx: 13, wy: 14, yc: -2.5 },
  { z: -6, wx: 16.5, wy: 15.5, yc: -2 },
  { z: 2, wx: 16, wy: 13.5, yc: 0 },
  { z: 8, wx: 13, wy: 10.5, yc: 3 },
  { z: 12, wx: 10.5, wy: 8.5, yc: 5 },
];
// Paruh tebal, lengkung ke bawah di ujung
const PARUH: Cincin[] = [
  { z: 9, wx: 10, wy: 8.6, yc: 5 },
  { z: 16, wx: 8.4, wy: 7.6, yc: 6.2 },
  { z: 24, wx: 6.4, wy: 6.2, yc: 8.2 },
  { z: 31, wx: 3.9, wy: 4.2, yc: 10.8 },
  { z: 37, wx: 1.1, wy: 1.5, yc: 14 },
];

const sup = (c: number, p: number) => Math.sign(c) * Math.abs(c) ** p;
const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
const smooth = (a: number, b: number, v: number) => {
  const t = clamp((v - a) / (b - a), 0, 1);
  return t * t * (3 - 2 * t);
};
const f1 = (n: number) => n.toFixed(1);

// Cangkang cembung (monotone chain) dari titik-titik proyeksi
function cangkang(pts: number[][]): number[][] {
  const p = pts.slice().sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  const cross = (o: number[], a: number[], b: number[]) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
  const bawah: number[][] = [];
  for (const q of p) {
    while (bawah.length >= 2 && cross(bawah[bawah.length - 2], bawah[bawah.length - 1], q) <= 0) bawah.pop();
    bawah.push(q);
  }
  const atas: number[][] = [];
  for (let i = p.length - 1; i >= 0; i--) {
    const q = p[i];
    while (atas.length >= 2 && cross(atas[atas.length - 2], atas[atas.length - 1], q) <= 0) atas.pop();
    atas.push(q);
  }
  atas.pop();
  bawah.pop();
  return bawah.concat(atas);
}
const jalur = (pts: number[][]) => 'M' + pts.map((q) => f1(q[0]) + ' ' + f1(q[1])).join('L') + 'Z';

// Pseudo-acak deterministik (supaya bentuk selalu sama)
function acak(seed: number) {
  let s = seed;
  return () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646;
}

// Garis waktu gerak kepala ala gagak asli: [detik, yaw (derajat), miring/roll (derajat)].
// Gerak "geleng" sangat cepat (±0.1 dtk), lalu diam menatap; kepala dimiringkan (cock) saat menatap.
// 0 = depan, + = ke kanan layar, 90 = samping.
const KUNCI: [number, number, number][] = [
  [0, 0, 0], [0.85, 0, 0],
  [0.95, 38, 4], [1.5, 38, 4], [1.6, -30, -6], [2.0, -30, -6],
  [2.08, 16, 0], [2.35, 16, 0], [2.43, -42, -4], [2.9, -42, -4],
  [3.0, 0, 12], [3.9, 0, 12], [4.0, 0, -10], [4.5, 0, -10],
  [4.6, 28, 0], [4.9, 28, 0], [5.0, -24, 0], [5.3, -24, 0], [5.4, 0, 0], [6.55, 0, 0],
  [6.65, 50, 3], [6.9, 50, 3], [7.0, 0, 0], [8.0, 0, 0],
  [9.4, 90, 0], [12.3, 90, 0], [13.6, 0, 0], [14, 0, 0],
];
const SIKLUS = 14;
function gerakPada(t: number): { yaw: number; miring: number; tahan: boolean } {
  for (let i = 0; i < KUNCI.length - 1; i++) {
    const [t0, y0, r0] = KUNCI[i];
    const [t1, y1, r1] = KUNCI[i + 1];
    if (t >= t0 && t <= t1) {
      const e = smooth(t0, t1, t);
      return { yaw: y0 + (y1 - y0) * e, miring: r0 + (r1 - r0) * e, tahan: y0 === y1 && r0 === r1 && t1 - t0 > 0.2 };
    }
  }
  return { yaw: 0, miring: 0, tahan: true };
}

// ---------- gambar statis badan ----------
function buatDada(): string {
  const r = acak(11);
  let d = '';
  for (let y = 76; y < 152; y += 6.5) {
    const hw = 37 * Math.sqrt(Math.max(0, 1 - ((y - 114) / 52) ** 2));
    const geser = (Math.round(y / 6.5) % 2) * 3.5;
    for (let x = -hw + 4; x < hw - 4; x += 7) {
      const xo = x + geser + (r() - 0.5) * 1.4;
      d += `M${f1(80 + xo)} ${f1(y)}q3 4.6 6 0`;
    }
  }
  return d;
}
function buatSayap(): { panjang: string; sisik: string } {
  let panjang = '';
  for (let k = 0; k < 8; k++) {
    panjang += `M${f1(47 + k * 1.1)} ${f1(86 + k * 2.6)}C${f1(40 - k * 0.8)} 108 ${f1(37 - k * 0.4)} 132 ${f1(41 + k * 2.4)} ${f1(158 + (k % 2) * 2)}`;
  }
  let sisik = '';
  for (let row = 0; row < 5; row++) {
    for (let c = 0; c < 3; c++) {
      sisik += `M${f1(36 + c * 6.2 + row * 1.2)} ${f1(94 + row * 11.5)}q3 4.4 6 0`;
    }
  }
  return { panjang, sisik };
}
function buatLeher(): { bentuk: string; bulu: string } {
  const bentuk = 'M62 46 C60 62 50 76 38 96 L122 96 C110 76 100 62 98 46Z';
  let bulu = '';
  for (let i = 0; i < 9; i++) {
    const t = i / 8;
    const y = 54 + t * 40;
    const xk = 61 - t * 21 - 1.5 * Math.sin(t * 3);
    bulu += `M${f1(xk)} ${f1(y)}l${f1(-3.6 - t * 3)} ${f1(5 + t * 1.5)}M${f1(160 - xk)} ${f1(y)}l${f1(3.6 + t * 3)} ${f1(5 + t * 1.5)}`;
  }
  return { bentuk, bulu };
}

@Component({
  selector: 'app-gagak',
  template: `
    <svg class="gagak-shisui" viewBox="0 0 160 172" role="img" aria-label="Gagak Shisui bertengger">
      <defs>
        <linearGradient id="g-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stop-color="#0a0a0e" />
          <stop offset=".55" stop-color="#16161d" />
          <stop offset="1" stop-color="#0b0b0f" />
        </linearGradient>
      </defs>
      <g data-p="badan"><g class="g-badan">
        <!-- ekor menyembul di bawah perut -->
        <path d="M66 156 L62 171 L72 160 L80 172 L88 160 L98 171 L94 156Z" fill="#0a0a0e" stroke="#3a2a31" stroke-width="1" stroke-linejoin="round" />
        <!-- kaki: bulu paha + tarsus bersisik + jari mencengkeram garis -->
        <g stroke="#1d1d25" stroke-width="3.2" stroke-linecap="round" fill="none">
          <path d="M63 150 L61 164 M61 164 L52 169 M61 164 L61 170 M61 164 L70 169" />
          <path d="M97 150 L99 164 M99 164 L90 169 M99 164 L99 170 M99 164 L108 169" />
        </g>
        <g stroke="#3b3c49" stroke-width=".8" fill="none" stroke-linecap="round">
          <path d="M62.4 154 l2 0 M62 158 l2.2 0 M61.6 162 l2.4 0 M97.6 154 l-2 0 M98 158 l-2.2 0 M98.4 162 l-2.4 0" />
        </g>
        <!-- badan -->
        <path d="M80 62 C50 62 36 92 36 124 C36 146 54 160 80 160 C106 160 124 146 124 124 C124 92 110 62 80 62Z" fill="url(#g-grad)" stroke="#3a2a31" stroke-width="1.5" />
        <path [attr.d]="dada" fill="none" stroke="#2b2c38" stroke-width="1" stroke-linecap="round" />
        <!-- sayap terlipat berlapis (bulu primer panjang + penutup bersisik) -->
        <g id="sayap-g">
          <path d="M47 82 C25 104 23 138 40 158 L54 164 C62 148 61 124 57 102Z" fill="#101016" stroke="#3a2a31" stroke-width="1.2" />
          <path [attr.d]="sayap.panjang" fill="none" stroke="#2f303c" stroke-width="1.1" stroke-linecap="round" />
          <path [attr.d]="sayap.sisik" fill="none" stroke="#343542" stroke-width="1" stroke-linecap="round" />
          <path d="M40 158 L38 168 L45 160 L50 170 L54 163" fill="#0d0d12" stroke="#3a2a31" stroke-width="1" stroke-linejoin="round" />
        </g>
        <use href="#sayap-g" transform="translate(160 0) scale(-1 1)" />
        <!-- bulu paha berjumbai -->
        <path d="M54 140 l3 7 l3 -5 l3 8 l3 -6 l3 7 l3 -4 M89 140 l3 7 l3 -5 l3 8 l3 -6 l3 7 l3 -4" fill="none" stroke="#2f303c" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
        <!-- cahaya tepi merah (bulan merah) -->
        <path d="M110 90 C122 108 121 136 108 155" fill="none" stroke="#c4161d" stroke-width="1.6" stroke-linecap="round" opacity=".7" />
        <path d="M107 160 C112 158 116 154 119 148" fill="none" stroke="#c4161d" stroke-width="1.2" stroke-linecap="round" opacity=".5" />
        <!-- leher berbulu runcing -->
        <path [attr.d]="leher.bentuk" fill="#0c0c11" stroke="#3a2a31" stroke-width="1.2" stroke-linejoin="round" />
        <path [attr.d]="leher.bulu" fill="none" stroke="#3a3b49" stroke-width="1.1" stroke-linecap="round" />
        <path d="M66 62 l2 7 M72 64 l1 8 M80 65 l0 8 M88 64 l-1 8 M94 62 l-2 7 M60 74 l3 6 M100 74 l-3 6" fill="none" stroke="#2b2c38" stroke-width="1" stroke-linecap="round" />
        <path d="M101 52 C106 62 108 74 106 86" fill="none" stroke="#c4161d" stroke-width="1.4" stroke-linecap="round" opacity=".55" />
      </g></g>

      <!-- kepala: bentuk digambar ulang tiap frame dari model 3D -->
      <g data-p="kepala" transform="translate(80 50) scale(1.38)">
        <path data-p="tengkorak" fill="#0a0a0e" stroke="#33343f" stroke-width="1.3" stroke-linejoin="round" />
        <path data-p="bulu" fill="none" stroke="#2d2e3a" stroke-width=".9" stroke-linecap="round" />
        <path data-p="mahkota" fill="none" stroke="#44455a" stroke-width="1.2" stroke-linecap="round" opacity=".7" />
        <g data-p="mataA" opacity="0">
          <circle r="7.6" fill="#8e8e98" fill-opacity=".5" stroke="#c9c9d2" stroke-opacity=".65" stroke-width=".9" />
          <g class="mb">
            <circle class="gb" r="11" fill="url(#mata-api)" opacity=".4" />
            <g class="sb"><use href="#sharingan-biasa" x="-5.4" y="-5.4" width="10.8" height="10.8" /></g>
          </g>
          <g class="ms" opacity="0">
            <circle class="gl" r="16" fill="url(#mata-api)" />
            <g class="sp"><use href="#mk-shisui" x="-6.4" y="-6.4" width="12.8" height="12.8" /></g>
          </g>
        </g>
        <g data-p="mataB" opacity="0">
          <circle r="7.6" fill="#8e8e98" fill-opacity=".5" stroke="#c9c9d2" stroke-opacity=".65" stroke-width=".9" />
          <g class="mb">
            <circle class="gb" r="11" fill="url(#mata-api)" opacity=".4" />
            <g class="sb"><use href="#sharingan-biasa" x="-5.4" y="-5.4" width="10.8" height="10.8" /></g>
          </g>
          <g class="ms" opacity="0">
            <circle class="gl" r="16" fill="url(#mata-api)" />
            <g class="sp"><use href="#mk-shisui" x="-6.4" y="-6.4" width="12.8" height="12.8" /></g>
          </g>
        </g>
        <path data-p="paruh" fill="#12121a" stroke="#34353f" stroke-width="1.2" stroke-linejoin="round" />
        <path data-p="culmen" fill="none" stroke="#4a4b5c" stroke-width="1.1" stroke-linecap="round" opacity=".8" />
        <path data-p="rambut" fill="none" stroke="#2c2d39" stroke-width="1" stroke-linecap="round" />
        <path data-p="gape" fill="none" stroke="#e0242c" stroke-width="1.4" stroke-linecap="round" opacity="0" />
      </g>
    </svg>
  `,
})
export class Gagak {
  protected readonly dada = buatDada();
  protected readonly sayap = buatSayap();
  protected readonly leher = buatLeher();

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => this.mulai());
  }

  private mulai() {
    const el = this.host.nativeElement;
    const q = (n: string) => el.querySelector(`[data-p="${n}"]`) as SVGElement;
    const kepala = q('kepala');
    const badan = q('badan');
    const tengkorak = q('tengkorak');
    const bulu = q('bulu');
    const mahkota = q('mahkota');
    const paruh = q('paruh');
    const culmen = q('culmen');
    const rambut = q('rambut');
    const gape = q('gape');
    const mata = [q('mataA'), q('mataB')].map((g) => ({
      g,
      mb: g.querySelector('.mb') as SVGElement,
      sb: g.querySelector('.sb') as SVGElement,
      ms: g.querySelector('.ms') as SVGElement,
      gl: g.querySelector('.gl') as SVGElement,
      sp: g.querySelector('.sp') as SVGElement,
    }));

    // goresan bulu di permukaan kepala (arah rebah ke belakang)
    const r = acak(5);
    const goresan = Array.from({ length: 34 }, () => {
      const cin = TENGKORAK[1 + Math.floor(r() * 4)];
      const fi = r() * Math.PI * 2;
      const nx = Math.cos(fi);
      const ny = Math.sin(fi);
      return {
        p0: [cin.wx * sup(nx, 0.8) * 0.96, cin.yc + cin.wy * sup(ny, 0.8) * 0.96, cin.z],
        p1: [cin.wx * sup(nx, 0.8) * 0.9, cin.yc + cin.wy * sup(ny, 0.8) * 0.9, cin.z - 3.4],
        n: [nx, ny * 0.9, 0.15],
      };
    });
    const posisiMata = [
      { x: 13.2, y: -1.2, z: 3.4, n: [0.94, 0, 0.34] },
      { x: -13.2, y: -1.2, z: 3.4, n: [-0.94, 0, 0.34] },
    ];

    const gambar = (tm: number, diam: boolean) => {
      const gk = diam ? { yaw: 0, miring: 0, tahan: true } : gerakPada(tm);
      // getar halus saat menatap (gagak tak pernah benar-benar diam)
      const getar = gk.tahan && !diam ? 0.9 * Math.sin(tm * 29) + 0.5 * Math.sin(tm * 47 + 1) : 0;
      const yaw = gk.yaw + getar * (Math.abs(gk.yaw) > 80 ? 0.15 : 1);
      const miring = gk.miring + getar * 0.6;
      const th = (yaw * Math.PI) / 180;
      const c = Math.cos(th);
      const s = Math.sin(th);
      const proyek = (x: number, y: number, z: number): number[] => {
        const X = x * c + z * s;
        const Z = -x * s + z * c;
        const k = 1 + Z * 0.007;
        return [X * k, y * k, Z];
      };
      const sampelCincin = (daftar: Cincin[]) => {
        const pts: number[][] = [];
        for (const cin of daftar) {
          for (let j = 0; j < 16; j++) {
            const fi = (j / 16) * Math.PI * 2;
            pts.push(proyek(cin.wx * sup(Math.cos(fi), 0.8), cin.yc + cin.wy * sup(Math.sin(fi), 0.8), cin.z));
          }
        }
        return pts;
      };

      // kepala sedikit mengikuti putaran leher + napas
      const bob = 0.5 * Math.sin(tm * 2.1);
      const maju = 1.6 * smooth(4, 12, Math.abs(gk.miring));
      kepala.setAttribute('transform', `translate(${f1(80 + 4 * Math.sin(th))} ${f1(50 + bob + maju)}) rotate(${f1(2.4 * Math.sin(th) + miring)}) scale(1.38)`);
      // mengibas bulu (ruffle) sesaat
      const kibas = Math.max(0, 1 - Math.abs(tm - 6.2) / 0.35);
      badan.setAttribute('transform', `translate(${f1(1.3 * kibas * Math.sin(tm * 80))} 0)`);

      tengkorak.setAttribute('d', jalur(cangkang(sampelCincin(TENGKORAK))));
      paruh.setAttribute('d', jalur(cangkang(sampelCincin(PARUH))));

      // goresan bulu yang menghadap kita
      let dBulu = '';
      for (const g of goresan) {
        const zv = -g.n[0] * s + g.n[2] * c;
        if (zv > 0.14) {
          const a = proyek(g.p0[0], g.p0[1], g.p0[2]);
          const b = proyek(g.p1[0], g.p1[1], g.p1[2]);
          dBulu += `M${f1(a[0])} ${f1(a[1])}L${f1(b[0])} ${f1(b[1])}`;
        }
      }
      bulu.setAttribute('d', dBulu);

      // garis kilau mahkota (dari tengkuk ke dahi)
      const mk = [-17, -10, -3, 4, 9].map((z, i) => {
        const cin = TENGKORAK[Math.min(i + 0, TENGKORAK.length - 1)];
        return proyek(0, cin.yc - cin.wy * 0.97, z);
      });
      mahkota.setAttribute('d', 'M' + mk.map((p) => f1(p[0]) + ' ' + f1(p[1])).join('L'));

      // punggung paruh + garis mulut (merah menyala saat menyamping)
      const cul = PARUH.map((cin) => proyek(0, cin.yc - cin.wy * 0.96, cin.z));
      culmen.setAttribute('d', 'M' + cul.map((p) => f1(p[0]) + ' ' + f1(p[1])).join('L'));

      const sudutSamping = smooth(55, 88, Math.abs(yaw));
      const nyala = sudutSamping * (0.82 + 0.18 * Math.sin(tm * 7));
      let dGape = '';
      let dRambut = '';
      for (const sg of [-1, 1]) {
        const tampak = -sg * s;
        if (tampak > 0.05) {
          const gp = PARUH.map((cin) => proyek(sg * cin.wx * 0.98, cin.yc + cin.wy * 0.15, cin.z));
          dGape += 'M' + gp.map((p) => f1(p[0]) + ' ' + f1(p[1])).join('L');
        }
        if (tampak > -0.35) {
          for (const [dx, dz] of [[0, 0], [1.4, 2.4], [2.6, 4.4]]) {
            const a = proyek(sg * (7 + dx * 0.5), 2.4 + dx, 8 + dz);
            const b = proyek(sg * (9.6 + dx * 0.5), 6.4 + dx, 15 + dz);
            dRambut += `M${f1(a[0])} ${f1(a[1])}L${f1(b[0])} ${f1(b[1])}`;
          }
        }
      }
      gape.setAttribute('d', dGape);
      gape.setAttribute('opacity', f1(nyala).toString());
      rambut.setAttribute('d', dRambut);

      // mata: foreshortening, kedip, Sharingan Shisui menyala saat menyamping
      const kedip = [0.55, 3.45, 5.7, 7.5, 12.8].reduce((m, t0) => Math.min(m, 1 - 0.9 * Math.max(0, 1 - Math.abs(tm - t0 - 0.07) / 0.07)), 1);
      const kilat = Math.max(0, 1 - Math.abs(tm - 9.5) / 0.55);
      const putar = 360 * smooth(9.0, 10.8, tm);
      const putarBiasa = 540 * smooth(8.3, 9.4, tm);
      mata.forEach((m, i) => {
        const pm = posisiMata[i];
        const pr = proyek(pm.x, pm.y, pm.z);
        const zv = -pm.n[0] * s + pm.n[2] * c;
        const tampak = clamp(zv * 3, 0, 1);
        const lebar = 0.45 + 0.55 * clamp(zv / 0.95, 0, 1);
        m.g.setAttribute('transform', `translate(${f1(pr[0])} ${f1(pr[1])}) scale(${lebar.toFixed(2)} ${kedip.toFixed(2)})`);
        m.g.setAttribute('opacity', tampak.toFixed(2));
        const gi = diam ? 0 : nyala;
        m.ms.setAttribute('opacity', gi.toFixed(2));
        m.mb.setAttribute('opacity', (1 - clamp(gi * 1.4, 0, 1)).toFixed(2));
        m.gl.setAttribute('transform', `scale(${(1 + 0.25 * Math.sin(tm * 7) + 1.1 * kilat).toFixed(2)})`);
        m.sp.setAttribute('transform', `rotate(${f1(putar)})`);
        m.sb.setAttribute('transform', `rotate(${f1(-putarBiasa)})`);
      });
    };

    const kurangGerak = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (kurangGerak) {
      gambar(0, true);
      return;
    }
    const t0 = performance.now();
    let rafId = 0;
    const loop = (now: number) => {
      gambar(((now - t0) / 1000) % SIKLUS, false);
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);
    this.destroyRef.onDestroy(() => cancelAnimationFrame(rafId));
  }
}
