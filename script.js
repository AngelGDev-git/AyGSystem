(function(){
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  const toggle = document.querySelector('.nav__toggle');
  const menu = document.getElementById('navmenu');
  if (toggle && menu){
    toggle.addEventListener('click', () => {
      const open = menu.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', ()=>{
      menu.classList.remove('is-open');
      toggle.setAttribute('aria-expanded','false');
    }));
  }

  window.AG = window.AG || {};
  window.AG.sendLead = function(ev){
    ev.preventDefault();
    const f = ev.target;
    const data = new FormData(f);
    const name = (data.get('name')||'').toString().trim();
    const biz  = (data.get('biz')||'').toString().trim();
    const need = (data.get('need')||'').toString().trim();
    const msg  = (data.get('msg')||'').toString().trim();
    const text = [
      'Hola, quiero información de A&G System.',
      name ? `Nombre: ${name}` : null,
      biz ? `Negocio: ${biz}` : null,
      need ? `Interés: ${need}` : null,
      msg ? `Mensaje: ${msg}` : null
    ].filter(Boolean).join('
');

    window.open(`https://wa.me/18493441014?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
    return false;
  };

  const canvas = document.getElementById('stars');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w,h,stars;
  function resize(){
    w = canvas.width = canvas.offsetWidth * (window.devicePixelRatio||1);
    h = canvas.height = canvas.offsetHeight * (window.devicePixelRatio||1);
    stars = Array.from({length:120}, ()=>({
      x: Math.random()*w,
      y: Math.random()*h,
      z: Math.random()*1.2 + 0.2,
      r: Math.random()*1.6 + 0.4
    }));
  }
  function tick(){
    ctx.clearRect(0,0,w,h);
    ctx.fillStyle = 'rgba(210,235,255,0.9)';
    for (const s of stars){
      s.x += 0.18 * s.z;
      s.y += 0.06 * s.z;
      if (s.x > w+20) s.x = -20;
      if (s.y > h+20) s.y = -20;
      ctx.globalAlpha = 0.35 + 0.55*Math.random();
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI*2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    requestAnimationFrame(tick);
  }
  window.addEventListener('resize', resize);
  resize();
  tick();
})();
