import { Component, input } from '@angular/core';

/**
 * Key visual: Mangekyō Sharingan besar berputar dengan api hitam Amaterasu (kiri), gagak (kiri),
 * Susano'o berapi yang muncul bertahap sesuai level 0-3 (tengah-kanan), dan potret Itachi.
 * Semua gambar vektor buatan sendiri.
 */
const lembut = (a: number, b: number, v: number) => {
  const t = Math.min(1, Math.max(0, (v - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

@Component({
  selector: 'app-scene',
  template: `
    <svg
      class="scene"
      [attr.data-level]="level()"
      viewBox="0 0 1000 740"
      role="img"
      aria-label="Ilustrasi Itachi dengan Mangekyō Sharingan, api hitam Amaterasu, dan Susano'o"
    >
      <defs>
        <radialGradient id="mata-api" cx="50%" cy="50%" r="50%">
          <stop offset="0" stop-color="#ff4a3a" stop-opacity=".95" />
          <stop offset=".5" stop-color="#e01a22" stop-opacity=".5" />
          <stop offset="1" stop-color="#e01a22" stop-opacity="0" />
        </radialGradient>
        <radialGradient id="mk-api" cx="50%" cy="50%" r="50%">
          <stop offset="0" stop-color="#f23a2c" />
          <stop offset=".6" stop-color="#d51a1a" />
          <stop offset="1" stop-color="#9a0d12" />
        </radialGradient>
        <linearGradient id="api-grad" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stop-color="#ff5a1f" />
          <stop offset=".55" stop-color="#ffa347" />
          <stop offset="1" stop-color="#fff0b0" />
        </linearGradient>
        <linearGradient id="bilah-api" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stop-color="#ffc27a" />
          <stop offset=".5" stop-color="#fff0b8" />
          <stop offset="1" stop-color="#ffffff" />
        </linearGradient>
        <linearGradient id="susa-isi" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#ffb457" stop-opacity=".92" />
          <stop offset=".5" stop-color="#d9501c" stop-opacity=".88" />
          <stop offset="1" stop-color="#6a1206" stop-opacity=".9" />
        </linearGradient>
        <radialGradient id="susa-gelap" cx="50%" cy="50%" r="50%">
          <stop offset="0" stop-color="#220100" stop-opacity=".8" />
          <stop offset=".65" stop-color="#520904" stop-opacity=".5" />
          <stop offset="1" stop-color="#7b0f16" stop-opacity="0" />
        </radialGradient>
        <linearGradient id="susa-maska" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#fff0c4" />
          <stop offset=".5" stop-color="#ffb556" />
          <stop offset="1" stop-color="#e8631f" />
        </linearGradient>
        <linearGradient id="kulit" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stop-color="#f7e7da" />
          <stop offset=".6" stop-color="#eed5c3" />
          <stop offset="1" stop-color="#dcbca8" />
        </linearGradient>
        <radialGradient id="cermin-api" cx="50%" cy="50%" r="55%">
          <stop offset="0" stop-color="#ff7a5a" />
          <stop offset=".7" stop-color="#e0301f" />
          <stop offset="1" stop-color="#b5180f" />
        </radialGradient>
        <radialGradient id="susa-aura" cx="50%" cy="46%" r="52%">
          <stop offset="0" stop-color="#ffb347" stop-opacity=".5" />
          <stop offset=".6" stop-color="#ff5a1f" stop-opacity=".22" />
          <stop offset="1" stop-color="#ff3b1d" stop-opacity="0" />
        </radialGradient>
        <linearGradient id="logam" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#e3e9f0" />
          <stop offset="1" stop-color="#a5aeba" />
        </linearGradient>
        <linearGradient id="pelat" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#707076" /><stop offset=".2" stop-color="#9c9ca1" />
          <stop offset=".62" stop-color="#8d8d92" /><stop offset="1" stop-color="#76767b" />
        </linearGradient>
        <linearGradient id="susa-zirah" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#ffd98a" />
          <stop offset=".3" stop-color="#f07a30" />
          <stop offset=".7" stop-color="#b02e10" />
          <stop offset="1" stop-color="#4e0f05" />
        </linearGradient>
        <!-- Lapisan zirah berbentuk busur & duri runcing (dipakai berulang) -->
        <path id="lapis" d="M-74 0 C-74 -46 74 -46 74 0 C56 16 -56 16 -74 0Z" />
        <path id="duri" d="M-9 0 C-12 -34 -4 -66 0 -110 C6 -66 13 -34 9 0Z" />

        <!-- Mangekyō Sharingan Itachi (cakram merah berkilau, tiga bilah hitam runcing, cincin tipis) -->
        <symbol id="mk" viewBox="-100 -100 200 200">
          <circle r="97" fill="#0c0c0c" />
          <circle r="94" fill="url(#mk-api)" />
          <circle r="47" fill="none" stroke="#ff9a8a" stroke-opacity=".22" stroke-width="94" pathLength="360" stroke-dasharray="1.2 3.8" />
          <circle r="64" fill="none" stroke="#1a1a1a" stroke-width="1.8" />
          <g fill="#232327" stroke="#5a5a62" stroke-width=".8">
            <path id="bilah" d="M6 -93 C-24 -82 -36 -58 -31 -35 C-29 -26 -20 -19 -10 -17 L12 -17 C2 -36 -4 -64 6 -93Z" />
            <use href="#bilah" transform="rotate(120)" />
            <use href="#bilah" transform="rotate(240)" />
          </g>
          <circle r="22" fill="#232327" />
          <circle r="17" fill="url(#mk-api)" stroke="#0c0c0c" stroke-width="3" />
        </symbol>

        <!-- Lidah api hitam Amaterasu (dasar di titik 0,0, mengarah ke atas) -->
        <path id="api-hitam" class="lidah-hitam-bentuk" d="M-14 0 C-22 -30 -6 -44 -12 -78 C6 -60 16 -52 12 -30 C24 -46 22 -66 30 -86 C38 -52 30 -22 14 0Z" />
        <!-- Lidah api hitam bercabang (lebih rumit) -->
        <path id="api-hitam-b" class="lidah-hitam-bentuk" d="M-20 0 C-34 -26 -14 -40 -22 -72 C-12 -64 -6 -58 -4 -50 C-10 -82 2 -102 6 -128 C22 -96 20 -72 14 -54 C28 -64 36 -76 38 -96 C50 -64 44 -34 22 -14 C30 -24 34 -32 32 -44 C22 -28 14 -14 20 0Z" />
        <radialGradient id="kuning-api" cx="50%" cy="50%" r="50%">
          <stop offset="0" stop-color="#ffe94a" stop-opacity=".9" />
          <stop offset=".5" stop-color="#ffc400" stop-opacity=".45" />
          <stop offset="1" stop-color="#ffb000" stop-opacity="0" />
        </radialGradient>
        <radialGradient id="bola-kuning" cx="50%" cy="50%" r="50%">
          <stop offset="0" stop-color="#fffde6" />
          <stop offset=".45" stop-color="#ffe433" />
          <stop offset="1" stop-color="#ffae00" />
        </radialGradient>
        <linearGradient id="tebas" x1="1" y1="0" x2="0" y2="0">
          <stop offset="0" stop-color="#fff3b0" stop-opacity=".75" />
          <stop offset="1" stop-color="#ffb347" stop-opacity="0" />
        </linearGradient>
        <path id="glif0" d="M-2.5 -5 V5 M-2.5 -4 H2.5 M-2.5 0 H1.5 M2.5 -4 V1" fill="none" />
        <path id="glif1" d="M-3 -5 H3 M0 -5 V5 M-3 5 H3 M-3 0 H3" fill="none" />
        <g id="oni-mini">
          <path class="maska" d="M-19 -17 L0 -24 L19 -17 L15 9 L0 19 L-15 9Z" />
          <path d="M-14 -9 L-4 -6 L-6 0 L-13 -2Z M14 -9 L4 -6 L6 0 L13 -2Z" fill="#ffd21a" stroke="#000" stroke-width="1.6" stroke-linejoin="round" />
          <path class="taring" d="M-8 9 L-5 16 L-2 10 M2 10 L5 16 L8 9" />
          <path class="pita" d="M0 -24 V19" />
        </g>
        <linearGradient id="bendera" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#ff6a3a" /><stop offset=".55" stop-color="#c0221a" /><stop offset="1" stop-color="#6a0a0c" />
        </linearGradient>
        <radialGradient id="bayang-badan" cx="50%" cy="30%" r="70%">
          <stop offset=".35" stop-color="#3c0600" stop-opacity="0" />
          <stop offset="1" stop-color="#3c0600" stop-opacity=".6" />
        </radialGradient>
        <g id="nobori">
          <path d="M148 18 V420" stroke="#3a1006" stroke-width="5" stroke-linecap="round" />
          <path d="M126 44 H200" stroke="#3a1006" stroke-width="4" stroke-linecap="round" />
          <circle cx="148" cy="16" r="5" fill="#ffd27a" stroke="#3a1006" stroke-width="1.6" />
          <g class="kibar">
            <path d="M134 48 H192 V312 L163 290 L134 312Z" fill="url(#bendera)" stroke="#ffe2a0" stroke-width="2.4" stroke-linejoin="round" />
            <path class="pita" d="M139 56 H187 M139 62 H187 M139 300 L163 282 L187 300" />
            <path d="M146 172 C146 148 154 138 163 138 C172 138 180 148 180 172 C172 168 154 168 146 172Z" fill="#e2262d" stroke="#fff3d0" stroke-width="1.4" />
            <path d="M149 178 C156 175 170 175 177 178 C174 189 168 194 163 194 C158 194 152 189 149 178Z" fill="#f4efe2" />
            <path d="M159 194 H167 L166 214 H160Z" fill="#f4efe2" />
            <use class="glif" href="#glif0" transform="translate(163 84) scale(3.2)" />
            <use class="glif" href="#glif1" transform="translate(163 106) scale(3.2)" />
            <use class="glif" href="#glif0" transform="translate(163 128) scale(3)" />
            <use class="glif" href="#glif1" transform="translate(163 238) scale(3.2)" />
            <use class="glif" href="#glif0" transform="translate(163 260) scale(3.2)" />
          </g>
        </g>
        <path id="shide" d="M-3 0 H3 V8 L7 12 L-1 16 L7 20 L-1 24 L3 28 H-3 V20 L-7 16 L1 12 L-7 8Z" fill="#f6f0e0" stroke="#bba884" stroke-width=".8" stroke-linejoin="round" />
        <g id="lonceng">
          <path d="M0 0 V9" stroke="#ffe2a0" stroke-width="1.6" />
          <path d="M-6 17 C-6 9 6 9 6 17 L7.5 22 H-7.5Z" fill="url(#bola-kuning)" stroke="#7e1f06" stroke-width="1.4" stroke-linejoin="round" />
          <path d="M-5 19.5 H5" stroke="#7e1f06" stroke-width="1.2" />
          <circle cx="0" cy="24" r="2" fill="#ffd27a" stroke="#7e1f06" stroke-width="1" />
        </g>
        <!-- Api hitam tiga cabang dan sulur melengkung -->
        <path id="api-hitam-c" class="lidah-hitam-bentuk" d="M-26 0 C-40 -30 -26 -52 -34 -84 C-22 -70 -18 -58 -16 -46 C-24 -86 -10 -108 -6 -140 C0 -112 4 -96 2 -76 C8 -100 22 -112 24 -132 C34 -100 30 -66 18 -44 C26 -56 34 -62 40 -80 C46 -48 36 -18 26 0Z" />
        <path id="api-sulur" class="lidah-hitam-bentuk" d="M0 0 C-14 -30 14 -52 0 -84 C-10 -108 12 -126 4 -158 C20 -128 4 -108 14 -84 C24 -56 4 -34 10 0Z" />
        <radialGradient id="asap-hitam" cx="50%" cy="50%" r="50%">
          <stop offset=".45" stop-color="#000" stop-opacity="0" />
          <stop offset=".78" stop-color="#000" stop-opacity=".55" />
          <stop offset="1" stop-color="#000" stop-opacity="0" />
        </radialGradient>
        <!-- Api hitam bilah sabit (melengkung, untuk pusaran Amaterasu) -->
        <path id="api-sabit" class="lidah-hitam-bentuk" d="M0 0 C26 -30 30 -78 8 -126 C12 -84 2 -44 -16 -14 C-8 -8 -4 -4 0 0Z" />
        <!-- Pola sisik zirah -->
        <pattern id="sisik" width="16" height="12" patternUnits="userSpaceOnUse">
          <path d="M0 12 C0 5 16 5 16 12 M-8 6 C-8 0 8 0 8 6 M8 6 C8 0 24 0 24 6" fill="none" stroke="#ffe2b0" stroke-width="1.1" />
        </pattern>
        <!-- Lidah api Susano'o -->
        <path id="lidah-s" class="api-susa" d="M-12 0 C-20 -24 -2 -34 -6 -62 C8 -48 18 -40 14 -22 C22 -30 24 -44 22 -56 C34 -36 30 -14 14 0Z" />

        <!-- Gagak -->
        <symbol id="gagak" viewBox="0 -12 60 44" overflow="visible">
          <path d="M21 17 L6 11 L7 17 L6 23Z" fill="#0a0a0a" />
          <ellipse cx="30" cy="18" rx="10" ry="5.2" fill="#0a0a0a" />
          <circle cx="41" cy="15" r="3.8" fill="#0a0a0a" />
          <path d="M43.5 13.6 L52 16 L43.8 17.6Z" fill="#0a0a0a" />
          <g class="sayap">
            <path d="M28 15 C24 4 16 -3 4 -8 L9 -1 L2 -1 L9 4 L5 7 C14 8 22 13 27 19Z" fill="#0a0a0a" />
          </g>
        </symbol>

        <!-- Magatama -->
        <path id="magatama" d="M0 -8 C7 -8 10 -2 6 3 C3 7 -3 7 -4 2 C-5 -1 -2 -3 0 -2 C-2 -1 -1 3 2 2 C5 1 4 -5 0 -5Z" />

        <!-- Tulang rusuk (kiri; kanan dicerminkan) -->
        <g id="rusuk">
          <g fill="none" stroke-linecap="round">
            <path d="M388 452 C300 424 212 452 172 548" class="tulang-bayang" />
            <path d="M398 402 C302 362 204 396 148 482" class="tulang-bayang" />
            <path d="M408 352 C316 306 220 334 158 410" class="tulang-bayang" />
            <path d="M418 306 C342 262 256 284 204 346" class="tulang-bayang" />
            <path d="M388 452 C300 424 212 452 172 548" class="tulang" />
            <path d="M398 402 C302 362 204 396 148 482" class="tulang" />
            <path d="M408 352 C316 306 220 334 158 410" class="tulang" />
            <path d="M418 306 C342 262 256 284 204 346" class="tulang" />
          </g>
        </g>

        <!-- Lengan berotot Susano'o (kiri; kanan dicerminkan): otot, pita, pelindung lengan, kepalan bersarung zirah -->
        <g id="lengan">
          <path d="M270 292 C196 334 160 392 166 430" class="lengan-g" />
          <path d="M270 292 C196 334 160 392 166 430" class="lengan" />
          <path d="M262 286 C188 326 152 386 158 426" class="lengan-t" />
          <path class="pita" d="M205 304 C214 326 226 340 240 348 M167 346 C178 364 192 374 209 381 M143 388 C156 402 172 408 195 408" />
          <use href="#duri" class="zirah" transform="translate(180 378) rotate(-78) scale(.42 .8)" />
          <use href="#duri" class="zirah" transform="translate(190 360) rotate(-60) scale(.3 .55)" />
          <path class="zirah" d="M214 300 C236 312 252 326 256 344 L238 352 C232 336 222 324 206 314Z" />
          <circle class="paku" cx="228" cy="320" r="2.4" /><circle class="paku" cx="240" cy="334" r="2.4" />
          <g transform="translate(206 340) rotate(-52)">
            <use href="#lapis" class="zirah" transform="translate(0 0) scale(.5 .7)" />
            <use href="#lapis" class="zirah" transform="translate(0 16) scale(.46 .62)" />
            <use href="#lapis" class="zirah" transform="translate(0 32) scale(.42 .56)" />
          </g>
          <g transform="translate(184 384) rotate(-34)">
            <use href="#lapis" class="zirah" transform="translate(0 0) scale(.48 .62)" />
            <use href="#lapis" class="zirah" transform="translate(0 15) scale(.44 .56)" />
            <use href="#lapis" class="zirah" transform="translate(0 30) scale(.4 .5)" />
          </g>
          <g transform="translate(172 414) rotate(-20)">
            <use href="#lapis" class="zirah" transform="translate(0 0) scale(.42 .56)" />
            <use href="#lapis" class="zirah" transform="translate(0 14) scale(.4 .5)" />
          </g>
          <g transform="translate(166 436) rotate(-14)">
            <path class="zirah" d="M-36 -22 C-30 -44 30 -44 36 -22 L40 20 C40 50 -40 50 -40 20Z" />
            <path class="pita" d="M-20 -30 L-20 38 M0 -34 L0 42 M20 -30 L20 38 M-36 0 C-12 8 12 8 36 0" />
            <use href="#duri" class="zirah" transform="translate(-26 -36) rotate(-18) scale(.2 .28)" />
            <use href="#duri" class="zirah" transform="translate(-9 -42) scale(.2 .3)" />
            <use href="#duri" class="zirah" transform="translate(9 -42) scale(.2 .3)" />
            <use href="#duri" class="zirah" transform="translate(26 -36) rotate(18) scale(.2 .28)" />
          </g>
        </g>
        <!-- Bahu (kiri): lamela bersusun + tutup bahu berduri -->
        <g id="bahu" transform="rotate(-6 240 300)">
          <path class="zirah" d="M118 332 C104 376 112 424 140 456 L198 474 L232 402Z" />
          <path class="pita" d="M130 362 C150 372 190 380 222 396 M126 392 C146 402 176 412 206 430 M134 424 C150 434 172 444 192 458" />
          <use href="#duri" class="zirah" transform="translate(140 458) rotate(150) scale(.35 .5)" />
          <use href="#duri" class="zirah" transform="translate(172 470) rotate(170) scale(.3 .45)" />
          @for (i of lamelar; track i) {
            <path class="zirah" [attr.transform]="'translate(240 ' + (314 + i * 30) + ') scale(' + (1 - i * 0.055) + ' 1)'" d="M-100 0 C-60 -10 60 -10 100 0 L88 34 C50 44 -50 44 -88 34Z" />
            <path class="kilap" [attr.transform]="'translate(240 ' + (314 + i * 30) + ') scale(' + (1 - i * 0.055) + ' 1)'" d="M-92 1 C-60 -7 60 -7 92 1" />
          }
          <path class="pita" d="M150 344 C190 356 290 356 330 344 M158 376 C196 386 284 386 322 376" />
          @for (b of lonceng; track b.x) {
            <g [attr.transform]="'translate(' + b.x + ' ' + b.y + ')'"><use class="kibar" href="#lonceng" [style.animation-delay]="b.d + 's'" /></g>
          }
          <path class="zirah" d="M130 314 C124 232 190 196 240 196 C290 196 356 232 350 314 C300 298 180 298 130 314Z" />
          <path class="plat-gelap" d="M240 196 C290 196 356 232 350 314 C320 304 280 300 240 300Z" />
          <path class="sisik-z" opacity=".32" d="M130 314 C124 232 190 196 240 196 C290 196 356 232 350 314 C300 298 180 298 130 314Z" />
          <path class="kilap" d="M138 296 C136 238 190 204 240 204 C290 204 344 238 342 296 M150 280 C156 244 196 214 240 214" />
          @for (r of paku; track r.x) {
            <use href="#duri" class="zirah" [attr.transform]="'translate(' + r.x + ' ' + r.y + ') rotate(' + r.rot + ') scale(.14 .26)'" />
          }
          @for (r of paku; track r.x) {
            <circle class="paku" [attr.cx]="r.x" [attr.cy]="r.y" r="2.7" />
          }
          <path class="pita" d="M240 202 L240 300 M184 222 C176 250 176 280 182 302 M296 222 C304 250 304 280 298 302 M140 306 C180 292 300 292 340 306" />
          <use href="#duri" class="zirah" transform="translate(240 208) scale(1.1 1.2)" />
          <use href="#duri" class="zirah" transform="translate(176 224) rotate(-38) scale(.8 .95)" />
          <use href="#duri" class="zirah" transform="translate(142 270) rotate(-68) scale(.8 .9)" />
          <use href="#duri" class="zirah" transform="translate(304 224) rotate(30) scale(.7 .8)" />
          <path class="maska" d="M221 216 L240 209 L259 216 L255 242 L240 252 L225 242Z" />
          <path d="M226 224 L237 227 L235 233 L227 231Z M254 224 L243 227 L245 233 L253 231Z" fill="#ffd21a" stroke="#000" stroke-width="1.6" stroke-linejoin="round" />
          <path class="taring" d="M231 242 L234 249 L237 243 M243 243 L246 249 L249 242" />
          <path class="pita" d="M240 209 V252 M231 237 L249 237" />
          <g class="magatama" transform="translate(240 270)">
            <use href="#magatama" transform="rotate(0) translate(0 -13) scale(1.7)" />
            <use href="#magatama" transform="rotate(120) translate(0 -13) scale(1.7)" />
            <use href="#magatama" transform="rotate(240) translate(0 -13) scale(1.7)" />
          </g>
        </g>

        <!-- Cermin Yata: bunga api merah berpusar -->
        <g id="pusar">
          <path class="pita-tebal" d="M0 0 C0 -9 11 -9 11 0 C11 13 -9 15 -15 4 C-24 -11 -9 -28 9 -26 C30 -24 37 -2 28 15" />
        </g>

        <!-- Mata Itachi (kiri; kanan dicerminkan): sipit, tajam, dingin -->
        <clipPath id="klip-mulut"><path d="M376 178 C420 192 480 192 524 178 C512 226 388 226 376 178Z" /></clipPath>
        <clipPath id="klip"><path d="M142 191 C152 184 173 185 184 196 C172 199 153 200 142 191Z" /></clipPath>
        <g id="mata" transform="translate(162 193) scale(1.16) translate(-162 -193)">
          <circle class="nyala-mata" cx="163" cy="193" r="17" fill="url(#mata-api)" />
          <g class="kelopak">
            <path d="M142 191 C152 184 173 185 184 196 C172 199 153 200 142 191Z" fill="#f2e8e2" />
            <g clip-path="url(#klip)">
              <g class="pola-mata"><use href="#mk" x="153.4" y="183" width="19.2" height="19.2" /></g>
              <path d="M140 183 L186 183 L186 189 C170 186 154 186 140 190Z" fill="#000" opacity=".3" />
            </g>
            <path d="M139 191 C150 182 175 183 187 198" fill="none" stroke="#0a0a0a" stroke-width="4.4" stroke-linecap="round" />
            <path d="M148 196 C158 201 172 200 182 197" fill="none" stroke="#8a5a52" stroke-width="1.2" />
          </g>
          <path d="M135 183 C150 174 171 177 189 191 C168 184 152 182 135 187Z" fill="#12141b" />
        </g>
        <g id="garis">
          <path d="M182 200 C175 211 173 224 176 237" fill="none" stroke="#6b4640" stroke-width="1.5" stroke-linecap="round" />
          <path d="M177 199 C171 207 169 216 170 226" fill="none" stroke="#6b4640" stroke-width="1.3" stroke-linecap="round" />
        </g>
        <g id="kerah">
          <path d="M54 420 L74 232 Q96 206 128 226 L186 352Z" fill="#0c0c10" stroke="#1d1d26" stroke-width="2" />
          <path d="M112 224 Q128 220 136 232 L190 352 L170 360Z" fill="#a3121a" />
          <path d="M76 250 L96 380" fill="none" stroke="#24242e" stroke-width="2" />
        </g>
        <!-- Poni panjang: helai luar runcing + helai tipis di tepi ikat kepala; beranimasi angin sepoi-sepoi -->
        <g id="helai">
          <g class="angin-a">
            <path d="M110 128 C98 196 104 272 124 338 C134 302 140 268 142 240 C146 266 154 284 164 298 C160 262 152 226 144 192 L150 140Z" fill="#14171f" />
            <path d="M122 160 C114 210 118 262 126 306 M138 190 C136 214 138 236 142 250" fill="none" stroke="#3a4152" stroke-width="1.8" stroke-linecap="round" />
          </g>
          <g class="angin-e">
            <path d="M154 122 C151 150 152 178 158 206 C157 178 158 150 160 124Z" fill="#0e1117" />
            <path d="M146 140 C140 176 140 214 148 254 C148 214 150 176 152 142Z" fill="#12151c" />
            <path d="M163 132 C162 156 164 180 168 200 C167 180 167 156 168 134Z" fill="#0e1117" />
          </g>
        </g>
        <g id="helai-r">
          <g class="angin-b">
            <path d="M110 128 C98 196 104 272 124 338 C134 302 140 268 142 240 C146 266 154 284 164 298 C160 262 152 226 144 192 L150 140Z" fill="#14171f" />
            <path d="M122 160 C114 210 118 262 126 306 M138 190 C136 214 138 236 142 250" fill="none" stroke="#3a4152" stroke-width="1.8" stroke-linecap="round" />
          </g>
          <g class="angin-f">
            <path d="M154 122 C151 150 152 178 158 206 C157 178 158 150 160 124Z" fill="#0e1117" />
            <path d="M146 140 C140 176 140 214 148 254 C148 214 150 176 152 142Z" fill="#12151c" />
            <path d="M163 132 C162 156 164 180 168 200 C167 180 167 156 168 134Z" fill="#0e1117" />
          </g>
        </g>
      </defs>

      <!-- Matahari hitam Tsukuyomi -->
      <circle cx="330" cy="62" r="30" fill="#0a0a0a" />
      <circle cx="330" cy="62" r="38" fill="none" stroke="#0a0a0a" stroke-width="2" />

      <!-- Gagak terbang (sisi kiri) -->
      @for (g of gagakTerbang; track g.c) {
        <g [attr.transform]="'translate(' + (g.f ? 420 : 0) + ' ' + g.y + ')' + (g.f ? ' scale(-1 1)' : '')">
          <g [class]="'terbang ' + g.c"><use href="#gagak" [attr.width]="g.w" [attr.height]="g.h" /></g>
        </g>
      }

      <!-- SUSANO'O (berapi, muncul bertahap) -->
      <g transform="translate(660 58) translate(-450 0)">
        <g class="susa">
          <ellipse class="s s1" cx="450" cy="300" rx="440" ry="400" fill="url(#susa-gelap)" />
          <ellipse class="s s1" cx="450" cy="330" rx="440" ry="360" fill="url(#susa-aura)" />

          <!-- Level 3: sinar, cincin api + halo mandala berputar di belakang Susano'o -->
          <g class="s s3">
            <g transform="translate(450 165)">
              @for (a of kipasBulu; track a; let i = $index) {
                <use href="#duri" class="bulu-garis" [attr.transform]="'rotate(' + a + ') translate(0 -140) scale(1.5 ' + (1.5 + (i % 2) * 0.5) + ')'" />
              }
            </g>
            <g transform="translate(450 270)">
              @for (i of [0, 1, 2]; track i) {
                <circle class="gelombang" r="230" [style.animation-delay]="-i * 1.4 + 's'" />
              }
            </g>
            <g transform="translate(450 150)">
              <g class="putar-balik" style="animation-duration:90s">
                @for (a of glif; track a; let i = $index) {
                  <use class="glif" [attr.href]="'#glif' + (i % 2)" [attr.transform]="'rotate(' + a + ') translate(0 -246) scale(1.4)'" />
                }
              </g>
              <g class="putar" style="animation-duration:40s"><path class="kilat-cincin" [attr.d]="cincinKilat" /></g>
            </g>
            <g transform="translate(450 400)" opacity=".6">
              @for (t of apiAura2; track t.a; let i = $index) {
                <g [attr.transform]="'rotate(' + t.a + ') translate(0 -' + t.r + ') scale(1.7 ' + t.s + ')'">
                  <use class="goyang" href="#lidah-s" [style.animation-delay]="-i * 0.27 + 's'" />
                </g>
              }
            </g>
            <g transform="translate(450 150)">
              <g class="putar-balik">
                <circle r="228" class="halo" stroke-width="2.2" />
                <circle r="218" class="halo" stroke-width="9" pathLength="360" stroke-dasharray=".8 3.2" opacity=".55" />
                <circle r="204" class="halo" stroke-width="1.4" stroke-dasharray="10 5" />
                @for (a of tomoe8; track a) {
                  <use href="#magatama" class="magatama" [attr.transform]="'rotate(' + a + ') translate(0 -216) scale(3.2)'" />
                }
                @for (a of oniHalo; track a) {
                  <g [attr.transform]="'rotate(' + a + ') translate(0 -205) scale(.78)'"><use href="#oni-mini" /></g>
                }
                @for (a of tomoe8; track a) {
                  <use href="#duri" class="zirah" [attr.transform]="'rotate(' + (a + 22.5) + ') translate(0 -229) scale(.3 .42)'" />
                }
              </g>
              <g class="putar">
                @for (a of sinar; track a) {
                  <path class="sinar" [attr.transform]="'rotate(' + a + ')'" d="M0 0 L-10 -560 L10 -560Z" />
                }
              </g>
            </g>
            <g transform="translate(450 380)">
              @for (t of apiAura; track t.a; let i = $index) {
                <g [attr.transform]="'rotate(' + t.a + ') translate(0 -' + t.r + ') scale(1.5 ' + t.s + ')'">
                  <use class="goyang" href="#lidah-s" [style.animation-delay]="-i * 0.21 + 's'" />
                </g>
              }
            </g>
            <g transform="translate(450 150) scale(1.22)">
              <g class="putar-balik">
                <circle r="158" class="halo" stroke-width="3" />
                <circle r="146" class="halo" stroke-width="12" pathLength="360" stroke-dasharray="1.4 4.6" opacity=".75" />
                <circle r="128" class="halo" stroke-width="2.5" />
                <circle r="112" class="halo" stroke-width="1.6" stroke-dasharray="3 7" />
                @for (a of tomoe; track a) {
                  <use href="#magatama" class="magatama" [attr.transform]="'rotate(' + a + ') translate(0 -137) scale(2.6)'" />
                }
                @for (a of gerigi; track a) {
                  <use href="#duri" class="zirah" [attr.transform]="'rotate(' + a + ') translate(0 -158) scale(.14 .2)'" />
                }
                @for (a of apiHalo; track a; let i = $index) {
                  <g [attr.transform]="'rotate(' + a + ') translate(0 -160) scale(.9 1.15)'">
                    <use class="goyang" href="#lidah-s" [style.animation-delay]="-i * 0.17 + 's'" />
                  </g>
                }
              </g>
            </g>
          </g>

          <!-- Level 3: manik magatama mengorbit kepala -->
          <g class="s s3">
            <g transform="translate(450 150)">
              <g class="putar">
                <circle r="262" fill="none" class="halo" stroke-width="1.4" stroke-dasharray="2 7" opacity=".6" />
                @for (a of manik16; track a) {
                  <use href="#magatama" class="magatama" [attr.transform]="'rotate(' + a + ') translate(0 -262) scale(3.4)'" />
                }
              </g>
            </g>
          </g>

          <!-- Level 3: bendera Uchiha (nobori) di belakang bahu -->
          <g class="s s3">
            <use href="#nobori" transform="translate(-6 0) rotate(-4 148 420)" />
            <use href="#nobori" transform="translate(906 0) scale(-1 1) rotate(-4 148 420)" />
          </g>

          <!-- Level 3: bola api (hitodama) mengorbit -->
          <g class="s s3">
            <g transform="translate(450 230)">
              <g class="putar" style="animation-duration:19s">
                @for (o of bolaApi; track o.a) {
                  <g [attr.transform]="'rotate(' + o.a + ') translate(0 -' + o.r + ')'">
                    <path d="M0 0 C-16 -5 -40 -5 -70 0 C-40 5 -16 5 0 0Z" fill="#ffb347" opacity=".55" />
                    <circle class="bola-kuning" r="7.5" fill="url(#bola-kuning)" />
                  </g>
                }
              </g>
            </g>
          </g>

          <!-- Level 3: sayap bulu api di belakang bahu -->
          <g class="s s3">
            <g id="sayap-api">
              @for (i of tirai; track i) {
                <g [attr.transform]="'translate(' + (118 + i * 30) + ' ' + (360 + (i % 2) * 26) + ') rotate(180) scale(1.2 1.7)'"><use class="goyang" href="#lidah-s" [style.animation-delay]="-i * 0.3 + 's'" /></g>
              }
              <g opacity=".5">
                @for (a of bulu2; track a; let i = $index) {
                  <use href="#duri" class="zirah" [attr.transform]="'translate(250 330) rotate(' + a + ') scale(1.5 ' + (1.5 + i * 0.08) + ')'" />
                }
              </g>
              @for (a of surai; track a; let i = $index) {
                <g [attr.transform]="'translate(250 316) rotate(' + a + ') translate(0 -86) scale(1.5)'">
                  <use class="goyang" href="#lidah-s" [style.animation-delay]="-i * 0.33 + 's'" />
                </g>
              }
              @for (a of bulu; track a; let i = $index) {
                <use href="#duri" class="zirah" [attr.transform]="'translate(250 330) rotate(' + a + ') scale(1.05 ' + (1.0 + i * 0.08) + ')'" />
              }
            </g>
            <use href="#sayap-api" transform="translate(900 0) scale(-1 1)" />
            <g id="kilat-g">
              @for (k of kilat; track k.d) {
                <path class="kilat" [attr.d]="k.d" [style.animation-delay]="k.delay + 's'" />
              }
            </g>
            <use href="#kilat-g" transform="translate(900 0) scale(-1 1)" />
            @for (q of percik; track q.x) {
              <circle class="percik" [attr.cx]="q.x" [attr.cy]="q.y" [attr.r]="q.r" [style.animation-delay]="-q.d + 's'" />
            }
          </g>

          <!-- Level 1: rusuk + pita melilit -->
          <g class="s s1">
            <use href="#rusuk" />
            <use href="#rusuk" transform="translate(900 0) scale(-1 1)" />
            <path class="pita" d="M236 440 C300 392 372 470 450 420 C528 370 600 450 664 410 M214 500 C290 452 370 528 450 478 C530 428 610 508 686 466 M260 372 C330 330 390 396 450 360 C510 324 570 392 640 352" />
          </g>

          <!-- Level 3 (badan): massa tubuh, bahu, lengan berotot -->
          <g class="s s3">
            <path class="badan" d="M110 450 C110 330 200 250 330 230 L570 230 C700 250 790 330 790 450 L800 700 L100 700Z" />
            <path class="sisik-z" opacity=".22" d="M110 450 C110 330 200 250 330 230 L570 230 C700 250 790 330 790 450 L800 700 L100 700Z" />
            <path fill="url(#bayang-badan)" d="M110 450 C110 330 200 250 330 230 L570 230 C700 250 790 330 790 450 L800 700 L100 700Z" />
            <path class="pita" d="M126 480 C170 458 220 478 262 458 M112 540 C170 518 230 544 276 518 M638 458 C680 478 730 458 774 480 M624 518 C670 544 730 518 788 540 M300 322 C330 292 380 292 400 312 M500 312 C520 292 570 292 600 322" />
            @for (i of rantai; track i) {
              <path class="zirah" [attr.transform]="'translate(450 ' + (262 + i * 36) + ') scale(' + (1.02 - i * 0.07) + ' 1)'" d="M-150 0 L0 62 L150 0 L150 22 L0 86 L-150 22Z" />
            }
            <path class="pita" d="M450 262 L450 480 M380 296 L450 340 L520 296" />
            <g id="pusar-dada">
              <path class="pita-tebal" opacity=".55" d="M338 296 C300 350 296 430 336 488" />
              <path class="pita" d="M356 304 C324 352 322 420 352 470 M320 292 C276 352 270 440 316 504" />
              <path class="pita" d="M300 330 C284 372 286 420 306 456" />
            </g>
            <use href="#pusar-dada" transform="translate(900 0) scale(-1 1)" />
            <g id="urat-g">
              <path class="urat" d="M300 270 C270 300 262 340 280 380 C292 408 288 440 270 470" />
              <path class="urat" style="animation-delay:-.7s" d="M330 262 C312 300 316 346 340 380 C350 400 348 430 336 456" />
              <path class="urat" style="animation-delay:-1.4s" d="M360 292 C346 330 350 370 368 410" />
              @for (i of rantai; track i) {
                <use href="#magatama" class="magatama" [attr.transform]="'translate(' + (322 - i * 6) + ' ' + (294 + i * 34) + ') rotate(-20) scale(1.7)'" />
              }
            </g>
            <use href="#urat-g" transform="translate(900 0) scale(-1 1)" />
            <path class="tali-dasar" d="M160 290 C300 410 600 410 740 290" />
            <path class="tali-garis" d="M160 290 C300 410 600 410 740 290" />
            @for (q of shide; track q.x) {
              <g [attr.transform]="'translate(' + q.x + ' ' + q.y + ')'"><use class="kibar" href="#shide" [style.animation-delay]="q.d + 's'" /></g>
            }
            @for (m of manik; track m) {
              <use href="#magatama" class="magatama" [attr.transform]="m" />
            }
            <use href="#lengan" />
            <use href="#lengan" transform="translate(900 0) scale(-1 1)" />
            <use href="#bahu" />
            <use href="#bahu" transform="translate(900 0) scale(-1 1)" />
          </g>

          <!-- Level 2: kepala tengu Susano'o: tudung berpusar, tanduk melengkung, hidung panjang, seringai bergigi -->
          <g class="s s2">
            <g transform="translate(450 120)">
              @for (a of tajuk; track a) {
                <use href="#duri" class="zirah" [attr.transform]="'rotate(' + a + ') translate(0 -104) scale(.8 ' + (0.66 - 0.00006 * a * a) + ')'" />
              }
            </g>
            <g transform="translate(450 120)">
              @for (a of tajukDalam; track a) {
                <use href="#duri" class="zirah" [attr.transform]="'rotate(' + a + ') translate(0 -96) scale(.55 .42)'" />
              }
            </g>
            <path class="zirah" d="M334 70 C350 -14 550 -14 566 70 C528 22 372 22 334 70Z" />
            <path class="pita" d="M350 52 C380 8 520 8 550 52" />
            <g transform="translate(450 120)">
              @for (a of tajukLuar; track a) {
                <use href="#duri" class="zirah" [attr.transform]="'rotate(' + a + ') translate(0 -118) scale(.9 ' + (0.52 - 0.00003 * a * a) + ')'" />
              }
            </g>
            <g id="kepala-sisi">
              <path class="zirah kibar" opacity=".9" d="M352 170 C326 240 330 330 310 420 C350 346 354 250 376 176Z" />
              <path class="zirah kibar" style="animation-delay:-.9s" opacity=".9" d="M338 150 C298 230 290 330 262 410 C312 340 330 240 356 156Z" />
              <path class="zirah kibar" style="animation-delay:-1.7s" opacity=".85" d="M324 130 C270 210 250 300 214 372 C276 318 312 226 344 136Z" />
              <path class="zirah" opacity=".85" d="M372 112 C330 142 300 202 310 292 C330 242 352 202 384 172Z" />
              <path class="zirah" opacity=".85" d="M360 92 C300 112 262 182 270 264 C294 216 322 172 366 142Z" />
              <path class="pita" d="M356 120 C324 160 308 210 312 262 M346 104 C300 130 276 186 278 236" />
              <path class="zirah" d="M336 118 C298 108 262 78 252 34 C282 58 312 70 344 76Z" />
              <path class="pita" d="M334 108 C300 98 272 76 262 50" />
              <path class="zirah" d="M332 146 C290 144 250 122 238 84 C268 104 300 114 338 118Z" />
              <path class="pita" d="M330 138 C296 134 264 114 250 94" />
              <path class="zirah" d="M330 124 L276 132 L266 182 L328 176Z" />
              <path class="zirah" d="M326 156 L268 176 L260 226 L322 212Z" />
              <path class="zirah" d="M322 188 L266 214 L266 258 L324 240Z" />
              <path class="pita" d="M300 138 L292 176 M296 188 L288 218 M300 220 L296 248" />
              <path class="zirah" d="M384 66 C330 48 286 8 298 -32 C324 -2 356 14 404 32Z" />
              <path class="zirah" d="M368 86 C316 84 266 58 250 18 C286 44 330 60 378 62Z" />
              <path class="pita" d="M380 58 C346 44 322 24 312 -4 M366 78 C326 74 292 58 270 36" />
              <use href="#duri" class="zirah" transform="translate(352 42) rotate(-62) scale(.4 .72)" />
              <use href="#duri" class="zirah" transform="translate(330 22) rotate(-44) scale(.34 .6)" />
              <use href="#duri" class="zirah" transform="translate(312 2) rotate(-26) scale(.28 .48)" />
              <g transform="translate(352 196) rotate(-96) scale(.95)"><use href="#lidah-s" class="goyang" /></g>
              <g transform="translate(346 216) rotate(-112) scale(.85)"><use href="#lidah-s" class="goyang" style="animation-delay:-.4s" /></g>
              <g transform="translate(340 234) rotate(-128) scale(.75)"><use href="#lidah-s" class="goyang" style="animation-delay:-.8s" /></g>
              <path class="zirah" d="M450 6 C384 6 326 40 304 100 C296 128 306 152 336 168 L392 156 L450 138Z" />
              <path class="zirah" d="M330 150 C290 178 284 226 316 262 C330 236 348 222 378 212Z" />
              <path class="pita-tebal" d="M450 24 C398 24 348 52 328 102 M450 46 C410 46 372 72 356 110" />
              <path class="pita" d="M450 66 C422 68 396 88 386 114 M312 120 C300 150 312 172 338 184 M316 176 C300 210 308 240 330 258" />
              <path class="zirah" d="M374 148 L330 178 L338 228 L394 252 L432 240Z" />
              <path class="pita" d="M366 172 L352 214 M352 182 L346 214" />
              @for (r of pakuHelm; track r.x) {
                <circle class="paku" [attr.cx]="r.x" [attr.cy]="r.y" r="2.3" />
              }
              <use href="#magatama" class="magatama" transform="translate(360 198) rotate(-30) scale(1.8)" />
              <use href="#magatama" class="magatama" transform="translate(350 220) rotate(-50) scale(1.5)" />
              <use href="#duri" class="zirah" transform="translate(338 196) rotate(-100) scale(.22 .38)" />
              <use href="#duri" class="zirah" transform="translate(334 224) rotate(-116) scale(.22 .36)" />
              <use href="#duri" class="zirah" transform="translate(346 246) rotate(-134) scale(.2 .32)" />
              <path class="pita-tebal" opacity=".8" d="M386 206 C352 218 322 212 296 234 M392 190 C352 194 324 184 298 198" />
              <path class="sisik-z" opacity=".3" d="M450 6 C384 6 326 40 304 100 C296 128 306 152 336 168 L392 156 L450 138Z" />
              <path class="kilap" d="M312 112 C322 52 380 16 450 14 M322 132 C332 84 384 46 450 44" />
              <path class="maska" d="M450 80 L402 94 L374 124 L378 178 L402 216 L432 244 L450 252Z" />
              <path class="pita" d="M388 104 L400 124 M376 150 L394 156 M386 190 L402 190" />
              <path class="taring" d="M392 240 C382 254 386 270 400 274 C398 260 402 250 410 242Z" />
              <path class="alis" d="M364 126 L446 150 L446 130 L372 98Z" />
              <clipPath id="klip-susa"><path d="M378 150 C396 146 426 156 448 174 C424 184 396 180 378 150Z" /></clipPath>
              <circle class="nyala-kuning" cx="418" cy="166" r="22" fill="url(#kuning-api)" />
              <path class="rongga-mata" d="M378 150 C396 146 426 156 448 174 C424 184 396 180 378 150Z" />
              <g clip-path="url(#klip-susa)"><circle class="bola-kuning" cx="419" cy="166" r="11" fill="url(#bola-kuning)" /></g>
            </g>
            <use href="#kepala-sisi" transform="translate(900 0) scale(-1 1)" />
            <path class="zirah" d="M440 8 L450 -40 L460 8Z" />
            <path class="mulut" d="M374 208 C416 230 484 230 526 208 C518 256 382 256 374 208Z" />
            @for (g of gigi; track g.x) {
              <rect class="taring" [attr.x]="g.x" [attr.y]="g.y" width="11.6" height="21" rx="1.8" />
            }
            <path class="taring" d="M380 208 L390 244 L404 214Z" />
            <path class="taring" d="M520 208 L510 244 L496 214Z" />
            <path class="pita" d="M374 208 C362 200 356 188 358 176 M526 208 C538 200 544 188 542 176" />
            <circle class="nyala-kuning" cx="450" cy="64" r="26" fill="url(#kuning-api)" />
            <path d="M450 32 L471 62 L450 96 L429 62Z" fill="url(#bola-kuning)" stroke="#0a0200" stroke-width="3.2" stroke-linejoin="round" />
            <path class="pita" d="M450 32 L450 96 M429 62 L471 62" opacity=".5" />
            <path class="plat" d="M450 92 L432 156 C428 196 440 226 450 252Z" />
            <path class="plat-terang" d="M450 92 L468 156 C472 196 460 226 450 252Z" />
            <path class="pita" d="M450 98 L450 246 M438 226 C443 232 447 234 450 234 M462 226 C457 232 453 234 450 234" />
          </g>

          <!-- Level 3 (senjata): Cermin Yata, Pedang Totsuka, labu sake -->
          <g class="s s3">
            @for (a of sudutCermin; track a; let i = $index) {
              <g [attr.transform]="'translate(150 440) rotate(' + a + ') translate(0 -90) scale(1.45)'">
                <use class="goyang" href="#lidah-s" [style.animation-delay]="-i * 0.3 + 's'" />
              </g>
            }
            <g transform="translate(28 0)">
            @for (a of gerigi; track a) {
              <use href="#duri" class="zirah" [attr.transform]="'translate(150 440) rotate(' + a + ') translate(0 -102) scale(.2 .34)'" />
            }
            <circle cx="150" cy="440" r="112" fill="none" class="pita" stroke-dasharray="2 6" />
            <circle cx="150" cy="440" r="104" class="cermin" />
            <circle cx="150" cy="440" r="60" fill="none" class="pita" />
            <g transform="translate(150 440)">
              <g class="putar-balik">
                <circle r="78" fill="none" class="pita" stroke-dasharray="3 5" />
                @for (a of tomoe8; track a) {
                  <use href="#duri" class="zirah" [attr.transform]="'rotate(' + a + ') translate(0 -78) scale(.14 .24)'" />
                }
              </g>
            </g>
            @for (a of tomoe8; track a; let i = $index) {
              <g [attr.transform]="'translate(150 440) rotate(' + (a + 22) + ') translate(0 -112) scale(.55)'">
                <use class="goyang" href="#lidah-s" [style.animation-delay]="-i * 0.3 + 's'" />
              </g>
            }
            <clipPath id="klip-cermin"><circle cx="150" cy="440" r="104" /></clipPath>
            <g clip-path="url(#klip-cermin)">
              <g transform="translate(150 440) rotate(45)">
                <g class="kilau-g">
                  <rect x="-12" y="-130" width="24" height="260" fill="#fff" opacity=".34" />
                  <rect x="18" y="-130" width="8" height="260" fill="#fff" opacity=".2" />
                </g>
              </g>
            </g>
            @for (a of tomoe; track a) {
              <use href="#magatama" class="magatama" [attr.transform]="'translate(150 440) rotate(' + (a + 30) + ') translate(0 -84) scale(2.1)'" />
            }
            <circle cx="150" cy="440" r="92" fill="none" class="pita" />
            <g class="magatama" transform="translate(150 440)">
              <use href="#magatama" transform="rotate(0) translate(0 -74) scale(1.4)" />
              <use href="#magatama" transform="rotate(60) translate(0 -74) scale(1.4)" />
              <use href="#magatama" transform="rotate(120) translate(0 -74) scale(1.4)" />
              <use href="#magatama" transform="rotate(180) translate(0 -74) scale(1.4)" />
              <use href="#magatama" transform="rotate(240) translate(0 -74) scale(1.4)" />
              <use href="#magatama" transform="rotate(300) translate(0 -74) scale(1.4)" />
            </g>
            <use href="#pusar" transform="translate(150 440) scale(1.8)" />
            <use href="#pusar" transform="translate(104 388) rotate(200) scale(.75)" />
            <use href="#pusar" transform="translate(196 488) rotate(20) scale(.75)" />
            </g>

            <g transform="translate(-36 0)">
            <path class="bulan-tebas" d="M742 -60 C606 60 598 370 742 480 C676 340 674 110 742 -60Z" />
            <path class="pedang-glow" d="M742 -20 L754 18 L748 40 L764 72 L756 104 L768 156 L758 196 L770 246 L760 296 L770 346 L756 386 L762 426 L722 426 L728 386 L716 346 L726 296 L714 246 L726 196 L716 156 L728 104 L720 72 L736 40 L730 18Z" />
            @for (q of percikPedang; track q.y) {
              <circle class="percik" [attr.cx]="q.x" [attr.cy]="q.y" [attr.r]="q.r" [style.animation-delay]="-q.d + 's'" />
            }
            <g transform="translate(742 0) scale(1.45 1) translate(-742 0)">
            <g transform="translate(724 168) rotate(-72) scale(.9)"><use class="goyang" href="#lidah-s" /></g>
            <g transform="translate(760 252) rotate(72) scale(.9)"><use class="goyang" href="#lidah-s" style="animation-delay:-.3s" /></g>
            <g transform="translate(722 330) rotate(-72) scale(.8)"><use class="goyang" href="#lidah-s" style="animation-delay:-.6s" /></g>
            <g transform="translate(762 96) rotate(66) scale(.8)"><use class="goyang" href="#lidah-s" style="animation-delay:-.9s" /></g>
            <path class="pedang" d="M742 -20 L754 18 L748 40 L764 72 L756 104 L768 156 L758 196 L770 246 L760 296 L770 346 L756 386 L762 426 L722 426 L728 386 L716 346 L726 296 L714 246 L726 196 L716 156 L728 104 L720 72 L736 40 L730 18Z" />
            <path d="M742 8 L750 52 L744 122 L752 202 L744 282 L752 362 L742 400 L734 362 L740 282 L734 202 L742 122 L736 52Z" fill="#fff" opacity=".92" />
            <path class="pita" opacity=".55" d="M742 -8 L742 412 M728 120 L736 140 M756 200 L748 220 M728 300 L736 320 M756 372 L748 392" />
            <use href="#magatama" style="fill:#d4501a" transform="translate(742 96) scale(1.5)" />
            <use href="#magatama" style="fill:#d4501a" transform="translate(742 166) rotate(120) scale(1.5)" />
            <use href="#magatama" style="fill:#d4501a" transform="translate(742 236) rotate(240) scale(1.5)" />
            <use href="#magatama" style="fill:#d4501a" transform="translate(742 306) scale(1.5)" />
            <use href="#magatama" style="fill:#d4501a" transform="translate(742 366) rotate(120) scale(1.4)" />
            <g transform="translate(742 -14) scale(1.1)"><use class="goyang" href="#lidah-s" /></g>
            <g transform="translate(726 44) rotate(-62) scale(.75)"><use class="goyang" href="#lidah-s" style="animation-delay:-.2s" /></g>
            <g transform="translate(758 44) rotate(62) scale(.75)"><use class="goyang" href="#lidah-s" style="animation-delay:-.5s" /></g>
            <g transform="translate(722 224) rotate(-84) scale(.85)"><use class="goyang" href="#lidah-s" style="animation-delay:-.7s" /></g>
            <g transform="translate(764 330) rotate(84) scale(.85)"><use class="goyang" href="#lidah-s" style="animation-delay:-1s" /></g>
            </g>
            <path class="ular-api" d="M742 4 C796 40 796 84 742 116 S688 188 742 220 S796 292 742 324 S688 396 742 428" />
            <path class="ular-api" style="animation-delay:-.7s" d="M742 4 C688 40 688 84 742 116 S796 188 742 220 S688 292 742 324 S796 396 742 428" />
            @for (t of apiPedang; track t.y; let i = $index) {
              <g [attr.transform]="'translate(' + (742 + t.s * 40) + ' ' + t.y + ') rotate(' + (t.s * 74) + ') scale(' + (0.85 - i * 0.012) + ')'">
                <use class="goyang" href="#lidah-s" [style.animation-delay]="-i * 0.23 + 's'" />
              </g>
            }
            @for (k of kilatPedang; track k.d) {
              <path class="kilat" [attr.d]="k.d" [style.animation-delay]="k.delay + 's'" />
            }
            @for (i of [0, 1, 2, 3]; track i) {
              <ellipse class="cincin-p" cx="742" cy="430" rx="50" ry="9" [style.animation-delay]="-i * 0.9 + 's'" />
            }
            <g transform="translate(742 -10)"><use class="goyang" href="#lidah-s" transform="scale(1.6)" style="animation-delay:-.1s" /></g>
            <g transform="translate(742 -4) rotate(-26)"><use class="goyang" href="#lidah-s" transform="scale(1.1)" style="animation-delay:-.6s" /></g>
            <g transform="translate(742 -4) rotate(26)"><use class="goyang" href="#lidah-s" transform="scale(1.1)" style="animation-delay:-.9s" /></g>
            <use href="#lapis" class="zirah" transform="translate(742 440) scale(.85 .6)" />
            <use href="#duri" class="zirah" transform="translate(704 438) rotate(-90) scale(.25 .3)" />
            <use href="#duri" class="zirah" transform="translate(780 438) rotate(90) scale(.25 .3)" />
            <ellipse cx="742" cy="436" rx="31" ry="22" class="plat" />
            <path class="pita" d="M722 428 C732 434 752 434 762 428 M720 440 C732 446 752 446 764 440" />
            <path class="plat" d="M732 452 C722 462 722 476 734 484 C718 494 706 510 712 528 C720 558 764 560 772 528 C778 510 766 494 750 484 C762 476 762 462 752 452Z" />
            <path class="pita" d="M730 488 C738 494 746 494 754 488 M722 516 C732 526 752 526 762 516" />
            </g>
          </g>
        </g>
      </g>

      <!-- Bulu gagak berjatuhan -->
      <g>
        @for (f of buluJatuh; track f.x) {
          <g [attr.transform]="'translate(' + f.x + ' ' + f.y + ')'">
            <g class="jatuh" [style.animation-duration]="f.d + 's'" [style.animation-delay]="-f.t + 's'">
              <path [attr.transform]="'rotate(' + f.r + ') scale(' + f.s + ')'" d="M0 0 C-4 -9 -3 -20 2 -30 C6 -20 6 -9 0 0Z" fill="#0a0a0c" stroke="#ff4a3a" stroke-width=".7" />
              <path [attr.transform]="'rotate(' + f.r + ') scale(' + f.s + ')'" d="M0 0 L2 -29" stroke="#ff4a3a" stroke-width=".5" fill="none" />
            </g>
          </g>
        }
      </g>

      <!-- POTRET ITACHI -->
      <g transform="translate(500 262) scale(0.8)">
        <!-- rambut belakang -->
        <path d="M112 160 C102 92 150 54 200 54 C250 54 298 92 288 160 L284 250 L116 250Z" fill="#14171f" />
        <path d="M150 88 C170 70 230 70 250 88 M142 112 C152 100 166 92 180 88 M260 114 C252 102 238 94 224 90" fill="none" stroke="#3a4152" stroke-width="2" stroke-linecap="round" />

        <g class="angin-d"><path d="M114 228 C100 260 104 296 122 328 C124 298 128 270 136 248Z" fill="#14171f" /><path d="M123 250 C116 274 118 298 124 316" fill="none" stroke="#3a4152" stroke-width="1.6" stroke-linecap="round" /></g>
        <g transform="translate(400 0) scale(-1 1)"><g class="angin-g"><path d="M114 228 C100 260 104 296 122 328 C124 298 128 270 136 248Z" fill="#14171f" /><path d="M123 250 C116 274 118 298 124 316" fill="none" stroke="#3a4152" stroke-width="1.6" stroke-linecap="round" /></g></g>

        <!-- kerah belakang: menutup celah di belakang leher (bagian dalam kerah berwarna merah tua) -->
        <path d="M60 436 L74 232 Q96 204 128 222 L200 258 L272 222 Q304 204 326 232 L340 436Z" fill="#09090d" stroke="#1d1d26" stroke-width="2" stroke-linejoin="round" />
        <path d="M118 224 L200 262 L282 224 L286 330 L254 372 L146 372 L114 330Z" fill="#5c0b12" />
        <path d="M130 226 L200 266 L270 226" fill="none" stroke="#8c1620" stroke-width="3" stroke-linejoin="round" />

        <!-- jubah -->
        <path d="M6 500 L18 430 C30 392 90 366 150 352 L250 352 C310 366 370 392 382 430 L394 500Z" fill="#0c0c10" />
        <use href="#awan" x="14" y="404" width="112" height="75" />
        <use href="#awan" x="274" y="410" width="112" height="75" transform="translate(660 0) scale(-1 1)" />

        <!-- leher, kaus jaring, kalung -->
        <path d="M172 256 L228 256 L236 366 Q200 386 164 366Z" fill="#e0c3ae" />
        <path d="M170 322 Q200 344 230 322 L236 366 Q200 386 164 366Z" fill="#c7a58f" opacity=".7" />
        <path d="M166 352 L234 352 L200 412Z" fill="#3f424b" />
        <path d="M180 352 L200 394 M192 352 L206 380 M208 352 L194 380 M220 352 L202 392 M174 366 L226 366" fill="none" stroke="#23252b" stroke-width=".9" />
        <circle cx="188" cy="334" r="4" fill="none" stroke="#3a3a3a" stroke-width="1.6" />
        <circle cx="206" cy="344" r="4" fill="none" stroke="#3a3a3a" stroke-width="1.6" />

        <!-- kerah tinggi -->
        <use href="#kerah" />
        <use href="#kerah" transform="translate(400 0) scale(-1 1)" />

        <!-- wajah: oval proporsional (lebar 128, tinggi terlihat ±150), rahang tegas, dagu agak runcing -->
        <path d="M136 150 L136 198 C137 226 150 250 168 270 C180 285 191 295 200 298 C209 295 220 285 232 270 C250 250 263 226 264 198 L264 150Z" fill="url(#kulit)" />
        <path d="M264 150 L264 198 C263 226 250 250 232 270 C220 285 209 295 200 298 C228 268 248 228 250 172Z" fill="#c9a58f" opacity=".5" />
        <path d="M146 222 C156 238 167 252 180 263 M254 222 C244 238 233 252 220 263" fill="none" stroke="#c2987f" stroke-width="2.2" stroke-linecap="round" opacity=".34" />
        <path d="M196 212 C194 228 192 238 189 246" fill="none" stroke="#c2987f" stroke-width="2.4" stroke-linecap="round" opacity=".28" />
        <path d="M204 212 C206 228 208 238 211 246" fill="none" stroke="#fff6ee" stroke-width="2.4" stroke-linecap="round" opacity=".26" />
        <path d="M176 280 C188 289 212 289 224 280" fill="none" stroke="#c9a38c" stroke-width="1.5" opacity=".65" />
        <use href="#garis" />
        <use href="#garis" transform="translate(400 0) scale(-1 1)" />

        <!-- hidung ramping & mulut datar (dingin, tidak tersenyum) -->
        <path d="M205 198 C206 211 206 223 204 233 M195 235 C198 239 203 239 206 235" fill="none" stroke="#b08b78" stroke-width="1.7" stroke-linecap="round" />
        <path d="M196 233 C198 235 199 236 200 237" fill="none" stroke="#8d6a5a" stroke-width="1.4" stroke-linecap="round" />
        <path d="M187 265.2 C193 263.4 207 263.4 213 265.2" fill="none" stroke="#7d4443" stroke-width="2" stroke-linecap="round" />
        <path d="M194 271 C198 272.5 202 272.5 206 271" fill="none" stroke="#c9a38c" stroke-width="1.4" stroke-linecap="round" />

        <!-- mata Sharingan -->
        <use href="#mata" />
        <use href="#mata" transform="translate(400 0) scale(-1 1)" />

        <!-- ikat kepala Konoha: kain gelap + pelat abu-abu polos, coretan horizontal melintasi tengah simbol -->
        <path d="M108 134 Q200 118 292 134 L293 176 Q200 188 107 176Z" fill="#141925" />
        <path d="M108 138 Q200 122 292 138" fill="none" stroke="#2b3347" stroke-width="1.6" />
        <path d="M107 173 Q200 185 293 173" fill="none" stroke="#080a10" stroke-width="3" />
        <path d="M150 129 Q200 122 250 129 L250 171 Q200 178 150 171Z" fill="url(#pelat)" stroke="#232329" stroke-width="1.8" stroke-linejoin="round" />
        <path d="M150 129 Q200 122 250 129 L250 139 Q200 132 150 139Z" fill="#000" opacity=".3" />
        <path d="M153.5 135 L153.5 166 M246.5 135 L246.5 166" fill="none" stroke="#d3d3d7" stroke-width="1.3" opacity=".5" />
        <path d="M150 150.6 Q200 148.4 250 150.6" fill="none" stroke="#1c1c20" stroke-width="2.1" stroke-linecap="round" />
        <g transform="translate(200 150.6)">
          <path d="M3 -10.6 C8 -13.6 14 -14.8 19 -14.6 C15.4 -11.8 12.4 -8.2 10.6 -4.6Z" fill="#1f1f24" />
          <path d="M0 1 C-2.5 1 -2.8 -2.8 0 -3.2 C4 -3.6 5.4 1.6 3.4 5 C1 8.6 -5 8.4 -7.4 4.6 C-10 0.4 -8.2 -6.4 -3.4 -8.8 C1.4 -11 7.4 -9 10.6 -4.6" fill="none" stroke="#1f1f24" stroke-width="2" stroke-linecap="round" />
          <path d="M-18.4 10.6 L-9 -1.2 M-18.4 10.6 L-3.2 10.6" fill="none" stroke="#1f1f24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </g>
        <rect x="146.8" y="160.5" width="3.4" height="4.4" fill="#d8d8dc" stroke="#1d1d22" stroke-width=".6" />
        <rect x="249.8" y="160.5" width="3.4" height="4.4" fill="#d8d8dc" stroke="#1d1d22" stroke-width=".6" />

        <!-- poni tengah: dua puncak runcing di atas pelat -->
        <g class="angin-c"><path d="M158 132 C161 118 168 107 174 98 C183 108 192 116 200 121 L200 136Z" fill="#0e1117" stroke="#262e3f" stroke-width=".8" stroke-linejoin="round" /></g>
        <g transform="translate(400 0) scale(-1 1)"><g class="angin-p"><path d="M158 132 C161 118 168 107 174 98 C183 108 192 116 200 121 L200 136Z" fill="#0e1117" stroke="#262e3f" stroke-width=".8" stroke-linejoin="round" /></g></g>

        <!-- poni panjang di depan ikat kepala (helai beranimasi angin) -->
        <use href="#helai" />
        <use href="#helai-r" transform="translate(400 0) scale(-1 1)" />
      </g>
    </svg>
  `,
})
export class Scene {
  level = input(0);
  protected readonly apiLuar = Array.from({ length: 16 }, (_, i) => i * 22.5);
  protected readonly apiDalam = Array.from({ length: 12 }, (_, i) => i * 30 + 15);
  protected readonly sudutCermin = [-70, -45, -20, 5, 30, 55];
  protected readonly apiAura = Array.from({ length: 15 }, (_, i) => {
    const a = -105 + i * 15, w = lembut(50, 110, Math.abs(a));
    return { a, r: 300 - 70 * w, s: 1.9 - 0.8 * w };
  });
  protected readonly apiHalo = Array.from({ length: 18 }, (_, i) => i * 20);
  protected readonly tomoe = [0, 60, 120, 180, 240, 300];
  protected readonly manik16 = Array.from({ length: 16 }, (_, i) => i * 22.5);
  protected readonly bulu2 = [-100, -84, -68, -52, -36, -20];
  protected readonly pakuHelm = Array.from({ length: 8 }, (_, i) => {
    const t = ((i + 0.5) / 8) * (Math.PI / 2);
    return { x: Math.round(450 - 124 * Math.sin(t)), y: Math.round(22 + 112 * (1 - Math.cos(t)) * 0.9) };
  });
  protected readonly buluJatuh = Array.from({ length: 16 }, (_, i) => ({
    x: 40 + ((i * 131) % 920), y: -20 + ((i * 53) % 90), r: -50 + ((i * 37) % 100), s: 0.7 + (i % 4) * 0.18,
    d: 7 + ((i * 3) % 6), t: (i * 1.3) % 9,
  }));
  protected readonly oniHalo = [45, 90, 135, 225, 270, 315];
  protected readonly glif = Array.from({ length: 40 }, (_, i) => i * 9);
  protected readonly cincinKilat = (() => {
    let d = '';
    for (let i = 0; i <= 96; i++) {
      const a = (i / 96) * Math.PI * 2, r = 278 + (i % 2 ? 7 : -7) * (1 + ((i * 7) % 3) * 0.4);
      d += (i ? 'L' : 'M') + Math.round(Math.cos(a) * r) + ' ' + Math.round(Math.sin(a) * r);
    }
    return d + 'Z';
  })();
  protected readonly bolaApi = Array.from({ length: 7 }, (_, i) => ({ a: i * (360 / 7), r: 292 + (i % 2) * 42 }));
  protected readonly lonceng = [176, 208, 240, 272, 304].map((x, i) => ({ x, y: 500 + (i % 2) * 6, d: -(i * 0.45) }));
  protected readonly kipasBulu = Array.from({ length: 21 }, (_, i) => -100 + i * 10);
  protected readonly tirai = [0, 1, 2, 3, 4, 5];
  protected readonly shide = [0.08, 0.2, 0.34, 0.5, 0.66, 0.8, 0.92].map((t, i) => {
    const u = 1 - t;
    return {
      x: Math.round(u * u * u * 160 + 3 * u * u * t * 300 + 3 * u * t * t * 600 + t * t * t * 740),
      y: Math.round(u * u * u * 290 + 3 * u * u * t * 410 + 3 * u * t * t * 410 + t * t * t * 290) + 2,
      d: -(i * 0.5),
    };
  });
  protected readonly tomoe8 = Array.from({ length: 8 }, (_, i) => i * 45);
  protected readonly surai = [-118, -96, -74, -52, -30];
  protected readonly apiSabit = Array.from({ length: 14 }, (_, i) => i * (360 / 14) + 6);
  protected readonly apiHalus = Array.from({ length: 36 }, (_, i) => i * 10);
  protected readonly tajukDalam = Array.from({ length: 9 }, (_, i) => -60 + i * 15);
  protected readonly bulu = [-105, -92, -79, -66, -53, -40, -27, -14];
  protected readonly apiTerluar = Array.from({ length: 10 }, (_, i) => i * 36);
  protected readonly apiTengah = Array.from({ length: 20 }, (_, i) => i * 18 + 9);
  protected readonly percik = Array.from({ length: 22 }, (_, i) => ({
    x: 150 + ((i * 97) % 600), y: 110 + ((i * 173) % 430), r: 1.4 + (i % 3) * 0.9, d: (i * 0.37) % 3.2,
  }));
  protected readonly percikMerah = Array.from({ length: 18 }, (_, i) => {
    const a = (i * 137.5 * Math.PI) / 180, r = 120 + ((i * 53) % 110);
    return { x: Math.round(Math.cos(a) * r), y: Math.round(Math.sin(a) * r), r: 1.4 + (i % 3) * 0.8, d: (i * 0.41) % 3.2 };
  });
  protected readonly gagakTerbang = [
    { y: 70, w: 54, h: 40, c: 't1', f: false }, { y: 150, w: 38, h: 28, c: 't2', f: false },
    { y: 40, w: 30, h: 22, c: 't3', f: false }, { y: 600, w: 44, h: 32, c: 't4', f: false },
    { y: 110, w: 26, h: 19, c: 't5', f: true }, { y: 210, w: 34, h: 25, c: 't6', f: false },
    { y: 262, w: 22, h: 16, c: 't7', f: true }, { y: 330, w: 28, h: 20, c: 't8', f: false },
    { y: 470, w: 36, h: 26, c: 't9', f: true }, { y: 540, w: 24, h: 18, c: 't10', f: false },
    { y: 20, w: 40, h: 30, c: 't11', f: true },
  ];
  protected readonly sinar = Array.from({ length: 30 }, (_, i) => i * 12);
  protected readonly gigi = Array.from({ length: 9 }, (_, i) => {
    const x = 391 + i * 13;
    return { x, y: 211 + 10 * Math.sin((Math.PI * (x + 5.8 - 374)) / 152) };
  });
  protected readonly tajuk = Array.from({ length: 11 }, (_, i) => -75 + i * 15);
  protected readonly lamelar = [5, 4, 3, 2, 1, 0];
  protected readonly paku = Array.from({ length: 11 }, (_, i) => {
    const f = ((196 + i * 14.8) * Math.PI) / 180;
    return { x: Math.round(240 + 96 * Math.cos(f)), y: Math.round(312 + 100 * Math.sin(f)), rot: Math.round((f * 180) / Math.PI + 90) };
  });
  protected readonly apiCabang = Array.from({ length: 12 }, (_, i) => i * 30 + 15);
  protected readonly apiSulur = Array.from({ length: 16 }, (_, i) => i * 22.5 + 11);
  protected readonly apiAura2 = Array.from({ length: 18 }, (_, i) => {
    const a = -112 + i * 13.2, w = lembut(50, 112, Math.abs(a));
    return { a, r: 345 - 80 * w, s: 2.2 - 1.0 * w };
  });
  protected readonly apiPedang = Array.from({ length: 14 }, (_, i) => ({ y: 30 + i * 28, s: i % 2 ? 1 : -1 }));
  protected readonly kilatPedang = Array.from({ length: 7 }, (_, k) => {
    const y = 40 + k * 55, sg = k % 2 ? 1 : -1;
    let d = `M742 ${y}`;
    for (let i = 1; i <= 5; i++) d += `L${742 + sg * i * 15} ${y + (i % 2 ? -1 : 1) * (8 + ((k + i) % 3) * 4) - i * 3}`;
    return { d, delay: -(k * 0.43).toFixed(2) };
  });
  protected readonly percikPedang = Array.from({ length: 16 }, (_, i) => ({
    x: 650 + ((i * 53) % 150), y: 10 + ((i * 97) % 430), r: 1.5 + (i % 3) * 0.9, d: (i * 0.29) % 3.2,
  }));
  protected readonly kilat = Array.from({ length: 8 }, (_, k) => {
    const a = ((190 + k * 13 + (k % 2) * 5) * Math.PI) / 180;
    const r1 = 200 + ((k * 37) % 90);
    let d = `M${Math.round(250 + Math.cos(a) * 70)} ${Math.round(300 + Math.sin(a) * 70)}`;
    for (let i = 1; i <= 7; i++) {
      const rr = 70 + ((r1 - 70) * i) / 7;
      const o = i === 7 ? 0 : (i % 2 ? 1 : -1) * (10 + ((k + i) % 3) * 5);
      d += `L${Math.round(250 + Math.cos(a) * rr - Math.sin(a) * o)} ${Math.round(300 + Math.sin(a) * rr + Math.cos(a) * o)}`;
    }
    return { d, delay: -(k * 0.55).toFixed(2) };
  });
  protected readonly tajukLuar = [-84, -62, -40, -18, 18, 40, 62, 84];
  protected readonly manik = Array.from({ length: 15 }, (_, i) => {
    const t = i / 14;
    return `translate(${300 + t * 300} ${290 + 56 * Math.sin(Math.PI * t)}) rotate(${(0.5 - t) * 80}) scale(2.5)`;
  });
  protected readonly rantai = [0, 1, 2, 3, 4, 5];
  protected readonly gerigi = Array.from({ length: 24 }, (_, i) => i * 15);
}
