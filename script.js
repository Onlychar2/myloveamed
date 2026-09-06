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

      ember.style.animationDuration =
        duration + 's';

      ember.style.animationDelay =
        delay + 's';

      ember.style.setProperty(
        '--drift',
        drift
      );

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

      canvas.width =
        window.innerWidth;

      canvas.height =
        window.innerHeight;
    }


    function initFog() {

      resizeCanvas();

      const count = Math.round(
        (canvas.width * canvas.height) /
        90000
      );

      fogParticles = [];

      for (let i = 0; i < Math.max(10, count); i++) {

        fogParticles.push({

          x: Math.random() *
            canvas.width,

          y: Math.random() *
            canvas.height,

          r: 60 +
            Math.random() * 120,

          speed: 0.06 +
            Math.random() * 0.12,

          alpha: 0.02 +
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
     CREAR FRAGMENTOS DEL CORAZÓN
  ========================================================== */

  function makeShards(amount) {

    if (!shardsHost) return;


    for (let i = 0; i < amount; i++) {

      const shard =
        document.createElement('span');

      shard.className = 'shard';


      const angle =
        Math.random() *
        Math.PI * 2;


      const distance =
        90 +
        Math.random() * 160;


      const tx =
        Math.cos(angle) *
        distance;


      const ty =
        Math.sin(angle) *
        distance -
        20;


      const rotation =
        Math.random() *
        720 -
        360;


      const size =
        8 +
        Math.random() * 14;


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


      shard.style.animationDelay =
        Math.random() * 120 +
        'ms';


      shardsHost.appendChild(shard);


      requestAnimationFrame(() => {

        shard.classList.add('go');

      });
    }
  }


  /* =========================================================
     MÚSICA
  ========================================================== */

  function playMusic() {

    if (!music) {
      console.error(
        '❌ No existe #bg-music'
      );

      return;
    }


    console.log(
      '🎵 Intentando reproducir:',
      music.src
    );


    music.volume = 0.6;


    const playPromise =
      music.play();


    if (playPromise !== undefined) {

      playPromise
        .then(() => {

          musicPlaying = true;

          console.log(
            '🎵 Música reproduciéndose correctamente'
          );


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

          musicPlaying = false;

          console.error(
            '❌ No se pudo reproducir la música:',
            error
          );


          if (musicBtn) {

            musicBtn.setAttribute(
              'aria-pressed',
              'false'
            );
          }

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


  /* =========================================================
     BOTÓN DE MÚSICA
  ========================================================== */

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
     PREPARAR IMÁGENES
  ========================================================== */

  function prepareImages() {

    const images =
      document.querySelectorAll(
        '#polaroid-field img'
      );


    console.log(
      '📸 Imágenes encontradas:',
      images.length
    );


    images.forEach((img, index) => {

      /*
        Quitamos lazy loading para asegurarnos
        de que el navegador las cargue.
      */

      img.loading = 'eager';


      /*
        Si ya está cargada.
      */

      if (img.complete) {

        console.log(
          `📸 Foto ${index + 1}: OK`,
          img.src
        );

      } else {

        img.addEventListener(
          'load',
          () => {

            console.log(
              `📸 Foto ${index + 1}: cargada`,
              img.src
            );

          }
        );


        img.addEventListener(
          'error',
          () => {

            console.error(
              `❌ Foto ${index + 1} NO CARGÓ:`,
              img.src
            );

          }
        );
      }
    });
  }


  /* =========================================================
     MOSTRAR LAS FOTOS
  ========================================================== */

  function showPhotos() {

    const cards =
      document.querySelectorAll(
        '#polaroid-field .polaroid'
      );


    console.log(
      '❤️ Mostrando',
      cards.length,
      'polaroids'
    );


    cards.forEach((card, index) => {

      /*
        Limpiamos cualquier estilo inline
        anterior que pudiera ocultarlas.
      */

      card.style.opacity = '1';

      card.style.visibility =
        'visible';


      /*
        NO ponemos transform.
        Así dejamos que .p1, .p2, etc.
        sean controlados por tu CSS.
      */

      card.style.transform = '';


      /*
        Animación sencilla de aparición.
      */

      card.animate(
        [
          {
            opacity: 0,
            transform: 'scale(0.92)'
          },

          {
            opacity: 1,
            transform: 'scale(1)'
          }
        ],
        {
          duration: 650,

          delay:
            index * 100,

          easing:
            'cubic-bezier(.22,.61,.36,1)',

          fill: 'both'
        }
      );
    });
  }


  /* =========================================================
     REVELAR CONTENIDO
  ========================================================== */

  function revealMain() {

    if (!mainContent) {

      console.error(
        '❌ No existe #main-content'
      );

      return;
    }


    /*
      Quitamos completamente hidden.
    */

    mainContent.hidden = false;

    mainContent.removeAttribute(
      'hidden'
    );


    document.body.style.overflowY =
      'auto';


    /*
      Preparamos las fotos.
    */

    prepareImages();


    /*
      Esperamos un poquito para que
      el navegador pinte el contenido.
    */

    setTimeout(() => {

      showPhotos();

    }, 100);
  }


  /* =========================================================
     ROMPER CORAZÓN
  ========================================================== */

  function breakHeart() {

    if (broken) return;

    broken = true;


    console.log(
      '💔 Corazón tocado'
    );


    /*
      MUY IMPORTANTE:
      Intentamos iniciar la música exactamente
      durante la interacción del usuario.
    */

    playMusic();


    /* -----------------------------------------
       Animación del corazón
    ----------------------------------------- */

    if (heartSvg) {

      heartSvg.classList.add(
        'stopped'
      );


      heartSvg.style.transition =
        'transform 180ms ease-out';


      heartSvg.style.transform =
        'scale(1.12)';
    }


    if (heartWrap) {

      heartWrap.classList.add(
        'fading'
      );
    }


    /* -----------------------------------------
       Romper corazón
    ----------------------------------------- */

    setTimeout(() => {

      if (heartSvg) {

        heartSvg.classList.add(
          'breaking'
        );


        heartSvg.style.transition =
          'opacity 260ms ease-out, transform 260ms ease-out';


        heartSvg.style.opacity =
          '0';


        heartSvg.style.transform =
          'scale(0.85)';
      }


      makeShards(26);

    }, 190);


    /* -----------------------------------------
       Revelar página
    ----------------------------------------- */

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


        for (
          let i = 0;
          i < 24;
          i++
        ) {

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


        /*
          Mantener el texto del botón.
        */

        alwaysBtn.innerHTML =
          'Siempre tú <span class="heart-mark">♡</span>';

      }
    );
  }


  /* =========================================================
     DEBUG
  ========================================================== */

  console.log(
    '================================='
  );

  console.log(
    '❤️ WEBSITE DE ANIVERSARIO CARGADO'
  );

  console.log(
    '================================='
  );

  console.log(
    'Corazón:',
    heartSvg
      ? '✅'
      : '❌'
  );

  console.log(
    'Pantalla intro:',
    introScreen
      ? '✅'
      : '❌'
  );

  console.log(
    'Contenido:',
    mainContent
      ? '✅'
      : '❌'
  );

  console.log(
    'Música:',
    music
      ? '✅ ' + music.src
      : '❌'
  );

  console.log(
    'Fotos:',
    document.querySelectorAll(
      '#polaroid-field img'
    ).length
  );

})();
