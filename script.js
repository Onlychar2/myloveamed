(() => {
  'use strict';

  /* =========================================================
     ELEMENTOS
  ========================================================== */

  const emberField = document.getElementById('ember-field');
  const canvas = document.getElementById('fog-canvas');

  const heartSvg = document.getElementById('heart-svg');
  const heartWrap = document.getElementById('heart-wrap');
  const introScreen = document.getElementById('intro-screen');
  const shardsHost = document.getElementById('heart-shards');

  const mainContent = document.getElementById('main-content');

  const musicBtn = document.getElementById('music-toggle');
  const music = document.getElementById('bg-music');

  const alwaysBtn = document.getElementById('always-btn');
  const finaleParticles = document.getElementById('finale-particles');

  let broken = false;
  let musicPlaying = false;


  /* =========================================================
     PARTÍCULAS ROJAS
  ========================================================== */

  function spawnEmbers(count) {
    if (!emberField) return;

    for (let i = 0; i < count; i++) {

      const ember = document.createElement('span');
      ember.className = 'ember';

      const size = 2 + Math.random() * 3;
      const duration = 6 + Math.random() * 8;
      const delay = Math.random() * 8;
      const left = Math.random() * 100;
      const drift = (Math.random() * 60 - 30) + 'px';

      ember.style.left = left + '%';
      ember.style.width = size + 'px';
      ember.style.height = size + 'px';
      ember.style.animationDuration = duration + 's';
      ember.style.animationDelay = delay + 's';
      ember.style.setProperty('--drift', drift);

      emberField.appendChild(ember);
    }
  }

  spawnEmbers(28);


  /* =========================================================
     NIEBLA
  ========================================================== */

  if (canvas) {

    const ctx = canvas.getContext('2d');
    let fogParticles = [];

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function initFog() {

      resizeCanvas();

      const count = Math.round(
        (canvas.width * canvas.height) / 90000
      );

      fogParticles = [];

      for (let i = 0; i < Math.max(10, count); i++) {

        fogParticles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: 60 + Math.random() * 120,
          speed: 0.06 + Math.random() * 0.12,
          alpha: 0.02 + Math.random() * 0.03
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

        if (p.x - p.r > canvas.width) {
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

        ctx.fillStyle = gradient;

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

      requestAnimationFrame(drawFog);
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

    const promise = music.play();

    if (promise !== undefined) {

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
            'No se pudo reproducir la música:',
            error
          );

          musicPlaying = false;

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

    for (let i = 0; i < amount; i++) {

      const shard =
        document.createElement('span');

      shard.className = 'shard';


      /*
        Cada pedazo sale desde el centro
        hacia una dirección diferente.
      */

      const angle =
        Math.random() * Math.PI * 2;

      const distance =
        100 + Math.random() * 230;

      const tx =
        Math.cos(angle) * distance;

      const ty =
        Math.sin(angle) * distance - 30;


      const rotation =
        Math.random() * 900 - 450;


      const size =
        6 + Math.random() * 16;


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


      /*
        Diferentes velocidades
        para que no parezca que todos
        salen al mismo tiempo.
      */

      shard.style.animationDuration =
        (650 + Math.random() * 500) + 'ms';


      shard.style.animationDelay =
        Math.random() * 100 + 'ms';


      shardsHost.appendChild(shard);


      requestAnimationFrame(() => {

        shard.classList.add('go');

      });
    }
  }


  /* =========================================================
     ANIMACIÓN DE ENTRADA DEL CONTENIDO
  ========================================================== */

  function animateMainContent() {

    if (!mainContent) return;


    /*
      Todos los elementos que queremos
      animar al aparecer.
    */

    const revealElements = [
      ...document.querySelectorAll(
        '#reveal .title-serif'
      ),

      ...document.querySelectorAll(
        '#reveal .date-mark'
      ),

      ...document.querySelectorAll(
        '#reveal .body-text'
      ),

      ...document.querySelectorAll(
        '#reveal .scroll-cue'
      )
    ];


    /*
      Primero los dejamos invisibles.
    */

    revealElements.forEach(element => {

      element.style.opacity = '0';

      element.style.transform =
        'translateY(30px)';

    });


    /*
      Animación escalonada.
    */

    revealElements.forEach(
      (element, index) => {

        setTimeout(() => {

          element.animate(
            [
              {
                opacity: 0,
                transform:
                  'translateY(30px)'
              },

              {
                opacity: 1,
                transform:
                  'translateY(0)'
              }
            ],
            {
              duration: 850,
              easing:
                'cubic-bezier(.22,.61,.36,1)',
              fill: 'forwards'
            }
          );

        }, 350 + index * 250);

      }
    );
  }


  /* =========================================================
     FOTOS
  ========================================================== */

  function prepareImages() {

    const images =
      document.querySelectorAll(
        '#polaroid-field img'
      );


    images.forEach(img => {

      /*
        Desactivamos lazy loading para que
        las fotos estén disponibles cuando
        aparezca el collage.
      */

      img.loading = 'eager';


      img.addEventListener(
        'error',
        () => {

          console.error(
            '❌ No se pudo cargar:',
            img.src
          );

        }
      );

    });
  }


  function animatePhotos() {

    const cards =
      document.querySelectorAll(
        '#polaroid-field .polaroid'
      );


    /*
      Inicialmente invisibles y ligeramente
      alejadas.
    */

    cards.forEach(card => {

      card.style.opacity = '0';

      card.style.visibility =
        'hidden';

    });


    /*
      Aparecen una por una.
    */

    cards.forEach(
      (card, index) => {

        setTimeout(() => {

          card.style.visibility =
            'visible';


          card.animate(
            [
              {
                opacity: 0,
                transform:
                  'translateY(45px) scale(.88) rotate(0deg)'
              },

              {
                opacity: 1,
                transform:
                  'translateY(0) scale(1)'
              }
            ],
            {
              duration: 800,
              easing:
                'cubic-bezier(.22,.61,.36,1)',
              fill: 'forwards'
            }
          );


        }, 1200 + index * 170);

      }
    );
  }


  /* =========================================================
     REVELAR LA PÁGINA
  ========================================================== */

  function revealMain() {

    if (!mainContent) return;


    /*
      Mostrar contenido.
    */

    mainContent.hidden = false;
    mainContent.removeAttribute('hidden');

    document.body.style.overflowY =
      'auto';


    /*
      Preparar imágenes.
    */

    prepareImages();


    /*
      Animar primero los textos.
    */

    setTimeout(() => {

      animateMainContent();

    }, 100);


    /*
      Después empiezan a aparecer
      las fotos.
    */

    setTimeout(() => {

      animatePhotos();

    }, 500);

  }


  /* =========================================================
     ROMPER CORAZÓN
  ========================================================== */

  function breakHeart() {

    if (broken) return;

    broken = true;


    /*
      Música inmediatamente.
    */

    playMusic();


    /* -----------------------------------------
       1. PULSO DEL CORAZÓN
    ----------------------------------------- */

    if (heartSvg) {

      heartSvg.classList.add(
        'stopped'
      );


      heartSvg.style.transition =
        'transform 180ms cubic-bezier(.2,.8,.2,1)';


      heartSvg.style.transform =
        'scale(1.18)';

    }


    /* -----------------------------------------
       2. CORAZÓN SE ROMPE
    ----------------------------------------- */

    setTimeout(() => {

      /*
        Crear MUCHOS pedazos antes
        de desaparecer.
      */

      makeShards(40);


      if (heartSvg) {

        heartSvg.style.transition =
          'opacity 450ms ease-out, transform 450ms ease-out';


        heartSvg.style.opacity =
          '0';


        heartSvg.style.transform =
          'scale(.65) rotate(-4deg)';

      }


      if (heartWrap) {

        heartWrap.classList.add(
          'fading'
        );

      }

    }, 180);


    /* -----------------------------------------
       3. PEDAZOS VUELAN
    ----------------------------------------- */

    setTimeout(() => {

      if (heartWrap) {

        heartWrap.style.opacity =
          '0';

      }

    }, 600);


    /* -----------------------------------------
       4. CAMBIO A LA PÁGINA
    ----------------------------------------- */

    setTimeout(() => {

      if (introScreen) {

        introScreen.classList.add(
          'hidden'
        );

      }


      revealMain();

    }, 950);

  }


  /* =========================================================
     CLICK DEL CORAZÓN
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
     BOTÓN "SIEMPRE TÚ"
  ========================================================== */

  if (
    alwaysBtn &&
    finaleParticles
  ) {

    alwaysBtn.addEventListener(
      'click',
      () => {

        const rect =
          finaleParticles.getBoundingClientRect();


        const centerX =
          rect.width / 2;

        const centerY =
          rect.height / 2;


        for (let i = 0; i < 24; i++) {

          const heart =
            document.createElement('span');

          heart.className =
            'burst-heart';

          heart.textContent =
            '♡';


          const angle =
            Math.random() *
            Math.PI * 2;

          const distance =
            80 +
            Math.random() * 220;


          heart.style.left =
            centerX + 'px';

          heart.style.top =
            centerY + 'px';


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
            0.8 +
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
    '❤️ Anniversary website ready'
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
