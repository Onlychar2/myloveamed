(() => {
  'use strict';

  /* =========================================================
     ANIMACIONES EXTRA
     Las creamos desde JavaScript para no depender
     de cambios en style.css
  ========================================================== */

  const animationStyle = document.createElement('style');

  animationStyle.textContent = `

    /* ===============================
       APARICIÓN GENERAL
    =============================== */

    @keyframes anniversaryTitleIn {
      0% {
        opacity: 0;
        transform: translateY(70px) scale(.92);
        filter: blur(8px);
      }

      60% {
        opacity: 1;
        transform: translateY(-8px) scale(1.02);
        filter: blur(0);
      }

      100% {
        opacity: 1;
        transform: translateY(0) scale(1);
        filter: blur(0);
      }
    }


    @keyframes anniversaryDateIn {
      0% {
        opacity: 0;
        transform: translateY(-35px);
        letter-spacing: 12px;
      }

      100% {
        opacity: 1;
        transform: translateY(0);
        letter-spacing: normal;
      }
    }


    @keyframes anniversaryTextIn {
      0% {
        opacity: 0;
        transform: translateY(35px);
        filter: blur(5px);
      }

      100% {
        opacity: 1;
        transform: translateY(0);
        filter: blur(0);
      }
    }


    @keyframes anniversaryPhotoLeft {

      0% {
        opacity: 0;
        transform:
          translateX(-180px)
          translateY(50px)
          rotate(-25deg)
          scale(.65);
        filter: blur(8px);
      }

      65% {
        opacity: 1;
        transform:
          translateX(12px)
          translateY(-8px)
          rotate(3deg)
          scale(1.04);
        filter: blur(0);
      }

      100% {
        opacity: 1;
        transform:
          translateX(0)
          translateY(0)
          rotate(0deg)
          scale(1);
        filter: blur(0);
      }
    }


    @keyframes anniversaryPhotoRight {

      0% {
        opacity: 0;
        transform:
          translateX(180px)
          translateY(50px)
          rotate(25deg)
          scale(.65);
        filter: blur(8px);
      }

      65% {
        opacity: 1;
        transform:
          translateX(-12px)
          translateY(-8px)
          rotate(-3deg)
          scale(1.04);
        filter: blur(0);
      }

      100% {
        opacity: 1;
        transform:
          translateX(0)
          translateY(0)
          rotate(0deg)
          scale(1);
        filter: blur(0);
      }
    }


    @keyframes anniversaryPhotoTop {

      0% {
        opacity: 0;
        transform:
          translateY(-180px)
          rotate(18deg)
          scale(.6);
        filter: blur(8px);
      }

      65% {
        opacity: 1;
        transform:
          translateY(10px)
          rotate(-4deg)
          scale(1.04);
        filter: blur(0);
      }

      100% {
        opacity: 1;
        transform:
          translateY(0)
          rotate(0deg)
          scale(1);
        filter: blur(0);
      }
    }


    @keyframes anniversaryPhotoBottom {

      0% {
        opacity: 0;
        transform:
          translateY(180px)
          rotate(-18deg)
          scale(.6);
        filter: blur(8px);
      }

      65% {
        opacity: 1;
        transform:
          translateY(-10px)
          rotate(4deg)
          scale(1.04);
        filter: blur(0);
      }

      100% {
        opacity: 1;
        transform:
          translateY(0)
          rotate(0deg)
          scale(1);
        filter: blur(0);
      }
    }


    @keyframes anniversaryPhotoZoom {

      0% {
        opacity: 0;
        transform:
          scale(.25)
          rotate(30deg);
        filter: blur(10px);
      }

      60% {
        opacity: 1;
        transform:
          scale(1.08)
          rotate(-5deg);
        filter: blur(0);
      }

      100% {
        opacity: 1;
        transform:
          scale(1)
          rotate(0);
      }
    }


    @keyframes anniversaryPhotoSpin {

      0% {
        opacity: 0;
        transform:
          scale(.4)
          rotate(180deg);
        filter: blur(10px);
      }

      70% {
        opacity: 1;
        transform:
          scale(1.06)
          rotate(-8deg);
        filter: blur(0);
      }

      100% {
        opacity: 1;
        transform:
          scale(1)
          rotate(0);
      }
    }


    /* ===============================
       POLAROID
    =============================== */

    .anniversary-photo-animation {
      opacity: 0 !important;
      visibility: hidden !important;
    }


    .anniversary-photo-visible {
      visibility: visible !important;
      opacity: 1 !important;
    }


    /* ===============================
       REVEAL
    =============================== */

    .anniversary-reveal-title {
      animation:
        anniversaryTitleIn
        1100ms
        cubic-bezier(.16,1,.3,1)
        forwards !important;
    }


    .anniversary-reveal-date {
      animation:
        anniversaryDateIn
        850ms
        cubic-bezier(.16,1,.3,1)
        forwards !important;
    }


    .anniversary-reveal-text {
      animation:
        anniversaryTextIn
        850ms
        cubic-bezier(.16,1,.3,1)
        forwards !important;
    }

  `;

  document.head.appendChild(animationStyle);


  /* =========================================================
     ELEMENTOS
  ========================================================== */

  const emberField =
    document.getElementById('ember-field');

  const canvas =
    document.getElementById('fog-canvas');

  const heartSvg =
    document.getElementById('heart-svg');

  const heartWrap =
    document.getElementById('heart-wrap');

  const introScreen =
    document.getElementById('intro-screen');

  const shardsHost =
    document.getElementById('heart-shards');

  const mainContent =
    document.getElementById('main-content');

  const musicBtn =
    document.getElementById('music-toggle');

  const music =
    document.getElementById('bg-music');

  const alwaysBtn =
    document.getElementById('always-btn');

  const finaleParticles =
    document.getElementById('finale-particles');


  let broken = false;
  let musicPlaying = false;


  /* =========================================================
     EMBERS
  ========================================================== */

  function spawnEmbers(count) {

    if (!emberField) return;

    for (let i = 0; i < count; i++) {

      const ember =
        document.createElement('span');

      ember.className = 'ember';

      const size =
        2 + Math.random() * 3;

      const duration =
        6 + Math.random() * 8;

      const delay =
        Math.random() * 8;

      const left =
        Math.random() * 100;

      const drift =
        (Math.random() * 60 - 30) +
        'px';

      ember.style.left =
        left + '%';

      ember.style.width =
        size + 'px';

      ember.style.height =
        size + 'px';

      ember.style.animationDuration =
        duration + 's';

      ember.style.animationDelay =
        delay + 's';

      ember.style.setProperty(
        '--drift',
        drift
      );

      emberField.appendChild(
        ember
      );
    }
  }

  spawnEmbers(28);


  /* =========================================================
     FOG
  ========================================================== */

  if (canvas) {

    const ctx =
      canvas.getContext('2d');

    let fogParticles = [];


    function resizeCanvas() {

      canvas.width =
        window.innerWidth;

      canvas.height =
        window.innerHeight;
    }


    function initFog() {

      resizeCanvas();

      const count =
        Math.round(
          (canvas.width *
            canvas.height) /
          90000
        );

      fogParticles = [];

      for (
        let i = 0;
        i < Math.max(10, count);
        i++
      ) {

        fogParticles.push({

          x:
            Math.random() *
            canvas.width,

          y:
            Math.random() *
            canvas.height,

          r:
            60 +
            Math.random() * 120,

          speed:
            0.06 +
            Math.random() * 0.12,

          alpha:
            0.02 +
            Math.random() * 0.03

        });

      }
    }


    function drawFog() {

      ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
      );


      fogParticles.forEach(p => {

        p.x += p.speed;


        if (
          p.x - p.r >
          canvas.width
        ) {

          p.x = -p.r;

        }


        const gradient =
          ctx.createRadialGradient(
            p.x,
            p.y,
            0,
            p.x,
            p.y,
            p.r
          );


        gradient.addColorStop(
          0,
          `rgba(120,15,30,${p.alpha})`
        );


        gradient.addColorStop(
          1,
          'rgba(0,0,0,0)'
        );


        ctx.fillStyle =
          gradient;


        ctx.beginPath();

        ctx.arc(
          p.x,
          p.y,
          p.r,
          0,
          Math.PI * 2
        );

        ctx.fill();

      });


      requestAnimationFrame(
        drawFog
      );
    }


    initFog();

    drawFog();

    window.addEventListener(
      'resize',
      initFog
    );
  }


  /* =========================================================
     MÚSICA
  ========================================================== */

  function playMusic() {

    if (!music) return;

    music.volume = 0.6;

    const promise =
      music.play();


    if (
      promise !== undefined
    ) {

      promise
        .then(() => {

          musicPlaying = true;

          if (musicBtn) {

            musicBtn.setAttribute(
              'aria-pressed',
              'true'
            );

            musicBtn.setAttribute(
              'aria-label',
              'Pausar música'
            );
          }

        })
        .catch(error => {

          console.warn(
            'No se pudo reproducir:',
            error
          );

        });
    }
  }


  function pauseMusic() {

    if (!music) return;

    music.pause();

    musicPlaying = false;

    if (musicBtn) {

      musicBtn.setAttribute(
        'aria-pressed',
        'false'
      );

      musicBtn.setAttribute(
        'aria-label',
        'Reproducir música'
      );
    }
  }


  if (musicBtn) {

    musicBtn.addEventListener(
      'click',
      () => {

        if (musicPlaying) {
          pauseMusic();
        } else {
          playMusic();
        }

      }
    );
  }


  /* =========================================================
     PEDAZOS DEL CORAZÓN
  ========================================================== */

  function makeShards(amount) {

    if (!shardsHost) return;


    for (
      let i = 0;
      i < amount;
      i++
    ) {

      const shard =
        document.createElement(
          'span'
        );

      shard.className =
        'shard';


      const angle =
        Math.random() *
        Math.PI * 2;


      const distance =
        100 +
        Math.random() * 250;


      const tx =
        Math.cos(angle) *
        distance;


      const ty =
        Math.sin(angle) *
        distance -
        30;


      const rotation =
        Math.random() *
        1000 -
        500;


      const size =
        6 +
        Math.random() * 16;


      shard.style.setProperty(
        '--tx',
        tx + 'px'
      );


      shard.style.setProperty(
        '--ty',
        ty + 'px'
      );


      shard.style.setProperty(
        '--rot',
        rotation + 'deg'
      );


      shard.style.width =
        size + 'px';

      shard.style.height =
        size + 'px';


      shard.style.animationDuration =
        700 +
        Math.random() * 700 +
        'ms';


      shard.style.animationDelay =
        Math.random() * 80 +
        'ms';


      shardsHost.appendChild(
        shard
      );


      requestAnimationFrame(() => {

        shard.classList.add(
          'go'
        );

      });

    }
  }


  /* =========================================================
     ANIMACIÓN DE TEXTOS
  ========================================================== */

  function animateTexts() {

    const title =
      document.querySelector(
        '#reveal .title-serif'
      );

    const date =
      document.querySelector(
        '#reveal .date-mark'
      );

    const texts =
      document.querySelectorAll(
        '#reveal .body-text'
      );

    const scroll =
      document.querySelector(
        '#reveal .scroll-cue'
      );


    if (title) {

      title.style.opacity = '0';

      title.style.transform =
        'translateY(70px)';

      setTimeout(() => {

        title.classList.add(
          'anniversary-reveal-title'
        );

      }, 250);
    }


    if (date) {

      date.style.opacity = '0';

      setTimeout(() => {

        date.classList.add(
          'anniversary-reveal-date'
        );

      }, 800);
    }


    texts.forEach(
      (text, index) => {

        text.style.opacity = '0';

        setTimeout(() => {

          text.classList.add(
            'anniversary-reveal-text'
          );

        }, 1250 + index * 450);

      }
    );


    if (scroll) {

      scroll.style.opacity = '0';

      setTimeout(() => {

        scroll.animate(
          [
            {
              opacity: 0,
              transform:
                'translateY(15px)'
            },

            {
              opacity: 1,
              transform:
                'translateY(0)'
            }
          ],
          {
            duration: 900,
            fill: 'forwards'
          }
        );

      }, 2200);
    }
  }


  /* =========================================================
     ANIMACIÓN DE LAS FOTOS
  ========================================================== */

  function animatePhotos() {

    const cards =
      Array.from(
        document.querySelectorAll(
          '#polaroid-field .polaroid'
        )
      );


    /*
      Diferentes direcciones.
    */

    const animations = [
      'anniversaryPhotoLeft',
      'anniversaryPhotoRight',
      'anniversaryPhotoTop',
      'anniversaryPhotoBottom',
      'anniversaryPhotoZoom',
      'anniversaryPhotoSpin',
      'anniversaryPhotoLeft',
      'anniversaryPhotoRight',
      'anniversaryPhotoBottom',
      'anniversaryPhotoZoom'
    ];


    cards.forEach(
      (card, index) => {

        /*
          Ocultar inicialmente.
        */

        card.classList.add(
          'anniversary-photo-animation'
        );


        /*
          Cada foto entra después
          de la anterior.
        */

        setTimeout(() => {

          card.classList.remove(
            'anniversary-photo-animation'
          );


          card.classList.add(
            'anniversary-photo-visible'
          );


          card.style.animation =
            `${animations[index % animations.length]}
             1000ms
             cubic-bezier(.16,1,.3,1)
             forwards`;


          /*
            Mantener visible después.
          */

          card.style.opacity =
            '1';

          card.style.visibility =
            'visible';

        }, 2200 + index * 300);

      }
    );
  }


  /* =========================================================
     PREPARAR IMÁGENES
  ========================================================== */

  function prepareImages() {

    const images =
      document.querySelectorAll(
        '#polaroid-field img'
      );


    images.forEach(img => {

      img.loading =
        'eager';

      img.addEventListener(
        'error',
        () => {

          console.error(
            '❌ Imagen no encontrada:',
            img.src
          );

        }
      );

    });
  }


  /* =========================================================
     REVELAR CONTENIDO
  ========================================================== */

  function revealMain() {

    if (!mainContent) return;


    mainContent.hidden =
      false;

    mainContent.removeAttribute(
      'hidden'
    );


    document.body.style.overflowY =
      'auto';


    prepareImages();


    /*
      Textos.
    */

    animateTexts();


    /*
      Fotos.
    */

    animatePhotos();

  }


  /* =========================================================
     ROMPER CORAZÓN
  ========================================================== */

  function breakHeart() {

    if (broken) return;

    broken = true;


    /*
      Música.
    */

    playMusic();


    /*
      PULSO
    */

    if (heartSvg) {

      heartSvg.classList.add(
        'stopped'
      );


      heartSvg.style.transition =
        'transform 160ms cubic-bezier(.2,.9,.2,1)';


      heartSvg.style.transform =
        'scale(1.25)';

    }


    /*
      EXPLOSIÓN
    */

    setTimeout(() => {

      makeShards(50);


      if (heartSvg) {

        heartSvg.style.transition =
          'opacity 500ms ease, transform 500ms cubic-bezier(.2,.8,.2,1)';


        heartSvg.style.opacity =
          '0';


        heartSvg.style.transform =
          'scale(.45) rotate(-8deg)';

      }


      if (heartWrap) {

        heartWrap.style.transition =
          'opacity 600ms ease';

      }

    }, 170);


    /*
      DESAPARECER PANTALLA
    */

    setTimeout(() => {

      if (heartWrap) {

        heartWrap.style.opacity =
          '0';

      }

    }, 600);


    /*
      REVELAR
    */

    setTimeout(() => {

      if (introScreen) {

        introScreen.classList.add(
          'hidden'
        );

      }


      revealMain();

    }, 1050);

  }


  /* =========================================================
     CLICK CORAZÓN
  ========================================================== */

  if (heartSvg) {

    heartSvg.addEventListener(
      'click',
      breakHeart
    );


    heartSvg.addEventListener(
      'touchend',
      event => {

        event.preventDefault();

        breakHeart();

      },
      {
        passive: false
      }
    );
  }

/* =========================================================
   CONTADOR DE NUESTRO TIEMPO JUNTOS
========================================================= */

const relationshipStart = new Date(
  '2025-09-06T00:00:00'
);

let counterStarted = false;

function updateLoveCounter() {

  const now = new Date();

  let difference =
    now.getTime() -
    relationshipStart.getTime();

  if (difference < 0) {
    difference = 0;
  }

  const totalSeconds =
    Math.floor(difference / 1000);

  const days =
    Math.floor(
      totalSeconds / 86400
    );

  const hours =
    Math.floor(
      (totalSeconds % 86400) / 3600
    );

  const minutes =
    Math.floor(
      (totalSeconds % 3600) / 60
    );

  const seconds =
    totalSeconds % 60;


  const daysElement =
    document.getElementById(
      'counter-days'
    );

  const hoursElement =
    document.getElementById(
      'counter-hours'
    );

  const minutesElement =
    document.getElementById(
      'counter-minutes'
    );

  const secondsElement =
    document.getElementById(
      'counter-seconds'
    );


  if (daysElement)
    daysElement.textContent = days;

  if (hoursElement)
    hoursElement.textContent =
      String(hours).padStart(2, '0');

  if (minutesElement)
    minutesElement.textContent =
      String(minutes).padStart(2, '0');

  if (secondsElement)
    secondsElement.textContent =
      String(seconds).padStart(2, '0');
}


function showLoveCounter() {

  const counter =
    document.getElementById(
      'love-counter'
    );

  if (!counter) return;


  counter.style.display =
    'block';

  counter.style.opacity =
    '0';

  counter.style.transform =
    'translateY(30px) scale(.95)';


  counter.animate(
    [
      {
        opacity: 0,
        transform:
          'translateY(30px) scale(.95)'
      },

      {
        opacity: 1,
        transform:
          'translateY(0) scale(1)'
      }
    ],
    {
      duration: 1000,
      easing:
        'cubic-bezier(.16,1,.3,1)',
      fill: 'forwards'
    }
  );


  updateLoveCounter();


  if (!counterStarted) {

    counterStarted = true;

    setInterval(
      updateLoveCounter,
      1000
    );

  }
}
   
  /* =========================================================
     BOTÓN SIEMPRE TÚ
  ========================================================== */

  if (
    alwaysBtn &&
    finaleParticles
  ) {

    alwaysBtn.addEventListener(
      'click',
      () => {

         setTimeout(() => {
  showLoveCounter();
}, 500);

        const rect =
          finaleParticles.getBoundingClientRect();


        const cx =
          rect.width / 2;

        const cy =
          rect.height / 2;


        for (
          let i = 0;
          i < 24;
          i++
        ) {

          const heart =
            document.createElement(
              'span'
            );

          heart.className =
            'burst-heart';

          heart.textContent =
            '♡';


          const angle =
            Math.random() *
            Math.PI * 2;


          const distance =
            80 +
            Math.random() *
            220;


          heart.style.left =
            cx + 'px';

          heart.style.top =
            cy + 'px';


          heart.style.setProperty(
            '--bx',
            Math.cos(angle) *
              distance +
              'px'
          );


          heart.style.setProperty(
            '--by',
            Math.sin(angle) *
              distance -
              60 +
              'px'
          );


          heart.style.setProperty(
            '--brot',
            Math.random() *
              140 -
              70 +
              'deg'
          );


          heart.style.animationDelay =
            Math.random() *
              250 +
            'ms';


          heart.style.fontSize =
            .8 +
            Math.random() *
              1.4 +
            'rem';


          finaleParticles.appendChild(
            heart
          );


          setTimeout(() => {

            heart.remove();

          }, 2200);

        }


        alwaysBtn.innerHTML =
          'Siempre tú <span class="heart-mark">♡</span>';

      }
    );
  }


  /* =========================================================
     DEBUG
  ========================================================== */

  console.log(
    '❤️ Anniversary website iniciado'
  );

  console.log(
    '📸 Fotos:',
    document.querySelectorAll(
      '#polaroid-field img'
    ).length
  );

  console.log(
    '🎵 Música:',
    music
      ? music.src
      : 'NO ENCONTRADA'
  );

})();

