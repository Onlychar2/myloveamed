(() => {
  'use strict';

  /* =========================================================
     FONDO: partículas rojas ascendiendo (embers) + niebla en canvas
  ========================================================== */
  const emberField = document.getElementById('ember-field');
  function spawnEmbers(count){
    for(let i=0;i<count;i++){
      const e = document.createElement('span');
      e.className = 'ember';
      const left = Math.random()*100;
      const size = 2 + Math.random()*3;
      const duration = 6 + Math.random()*8;
      const delay = Math.random()*8;
      const drift = (Math.random()*60 - 30) + 'px';
      e.style.left = left + '%';
      e.style.width = size + 'px';
      e.style.height = size + 'px';
      e.style.animationDuration = duration + 's';
      e.style.animationDelay = delay + 's';
      e.style.setProperty('--drift', drift);
      emberField.appendChild(e);
    }
  }
  spawnEmbers(28);

  const canvas = document.getElementById('fog-canvas');
  const ctx = canvas.getContext('2d');
  let fogParticles = [];
  function resizeCanvas(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  function initFog(){
    resizeCanvas();
    const count = Math.round((canvas.width * canvas.height) / 90000);
    fogParticles = Array.from({length: Math.max(10, count)}, () => ({
      x: Math.random()*canvas.width,
      y: Math.random()*canvas.height,
      r: 60 + Math.random()*120,
      speed: 0.06 + Math.random()*0.12,
      alpha: 0.02 + Math.random()*0.03
    }));
  }
  function drawFog(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    fogParticles.forEach(p => {
      p.x += p.speed;
      if(p.x - p.r > canvas.width) p.x = -p.r;
      const grad = ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.r);
      grad.addColorStop(0, `rgba(120,15,30,${p.alpha})`);
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fill();
    });
    requestAnimationFrame(drawFog);
  }
  initFog();
  drawFog();
  window.addEventListener('resize', initFog);

  /* =========================================================
     CORAZÓN: romper y revelar
  ========================================================== */
  const heartSvg = document.getElementById('heart-svg');
  const heartWrap = document.getElementById('heart-wrap');
  const introScreen = document.getElementById('intro-screen');
  const shardsHost = document.getElementById('heart-shards');
  const mainContent = document.getElementById('main-content');
  let broken = false;

  function makeShards(n){
    for(let i=0;i<n;i++){
      const s = document.createElement('span');
      s.className = 'shard';
      const angle = Math.random()*Math.PI*2;
      const dist = 90 + Math.random()*160;
      const tx = Math.cos(angle)*dist;
      const ty = Math.sin(angle)*dist - 20;
      const rot = (Math.random()*720 - 360) + 'deg';
      s.style.setProperty('--tx', tx + 'px');
      s.style.setProperty('--ty', ty + 'px');
      s.style.setProperty('--rot', rot);
      s.style.animationDelay = (Math.random()*120) + 'ms';
      s.style.width = (8 + Math.random()*14) + 'px';
      s.style.height = s.style.width;
      shardsHost.appendChild(s);
      requestAnimationFrame(() => s.classList.add('go'));
    }
  }

  function breakHeart(){
    if(broken) return;
    broken = true;

    heartSvg.classList.add('stopped');
    heartWrap.classList.add('fading');

    // breve pulso final antes de romper
    heartSvg.style.transition = 'transform 180ms ease-out';
    heartSvg.style.transform = 'scale(1.12)';

    setTimeout(() => {
      heartSvg.classList.add('breaking');
      heartSvg.style.transition = 'opacity 260ms ease-out, transform 260ms ease-out';
      heartSvg.style.opacity = '0';
      heartSvg.style.transform = 'scale(0.85)';
      makeShards(26);
    }, 190);

    setTimeout(() => {
      introScreen.classList.add('hidden');
      revealMain();
    }, 1050);
  }

  heartSvg.addEventListener('click', breakHeart);
  heartSvg.addEventListener('touchend', (e) => { e.preventDefault(); breakHeart(); }, { passive:false });

  function revealMain(){
    mainContent.hidden = false;
    document.body.style.overflowY = 'auto';
    animatePolaroids();
  }

  /* =========================================================
     COLLAGE: entrada escalonada con direcciones distintas
  ========================================================== */
  function animatePolaroids(){
  const cards = Array.from(document.querySelectorAll('.polaroid'));

  cards.forEach((card, i) => {
    card.style.opacity = '1';
    card.style.transform = '';
    card.style.transition = 'opacity 700ms ease, transform 700ms ease';

    setTimeout(() => {
      card.style.transform = 'translateY(0)';
    }, i * 100);
  });
}

  /* =========================================================
     BOTÓN FINAL: "Siempre tú"
  ========================================================== */
  const alwaysBtn = document.getElementById('always-btn');
  const finaleParticles = document.getElementById('finale-particles');

  alwaysBtn.addEventListener('click', () => {
    const rect = finaleParticles.getBoundingClientRect();
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    for(let i=0;i<24;i++){
      const h = document.createElement('span');
      h.className = 'burst-heart';
      h.textContent = '♡';
      const angle = Math.random()*Math.PI*2;
      const dist = 80 + Math.random()*220;
      h.style.left = cx + 'px';
      h.style.top = cy + 'px';
      h.style.setProperty('--bx', (Math.cos(angle)*dist) + 'px');
      h.style.setProperty('--by', (Math.sin(angle)*dist - 60) + 'px');
      h.style.setProperty('--brot', (Math.random()*140 - 70) + 'deg');
      h.style.animationDelay = (Math.random()*250) + 'ms';
      h.style.fontSize = (0.8 + Math.random()*1.4) + 'rem';
      finaleParticles.appendChild(h);
      setTimeout(() => h.remove(), 2200);
    }
    alwaysBtn.textContent = '';
    const label = document.createElement('span');
    label.innerHTML = 'Siempre tú <span class="heart-mark">♡</span>';
    alwaysBtn.appendChild(label);
  });

  /* =========================================================
     MÚSICA: se activa solo tras interacción del usuario
  ========================================================== */
  const musicBtn = document.getElementById('music-toggle');
  const music = document.getElementById('bg-music');
  let musicOn = false;

  musicBtn.addEventListener('click', () => {
    musicOn = !musicOn;
    musicBtn.setAttribute('aria-pressed', String(musicOn));
    if(musicOn){
      music.volume = 0.6;
      music.play().catch(() => {
        // Si no hay archivo de música todavía, no pasa nada: se ignora el error.
        musicOn = false;
        musicBtn.setAttribute('aria-pressed', 'false');
      });
    } else {
      music.pause();
    }
  });

})();
