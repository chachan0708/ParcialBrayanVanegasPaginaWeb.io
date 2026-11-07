/* ============ Portafolio Brayan Vanegas — FESNA ============
   Menú móvil, filtro de carreras y enlaces a actividades multimedia. ============ */
(function(){
  /* ---- Menú lateral móvil ---- */
  const toggle = document.getElementById('mobileMenuToggle');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebarOverlay');

  if(toggle && sidebar && overlay){
    toggle.addEventListener('click', function(){
      const open = sidebar.classList.contains('open');
      sidebar.classList.toggle('open');
      overlay.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(!open));
      toggle.setAttribute('aria-label', open ? 'Abrir menú' : 'Cerrar menú');
    });
    overlay.addEventListener('click', function(){
      sidebar.classList.remove('open');
      overlay.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Abrir menú');
    });
    document.addEventListener('keydown', function(evt){
      if(evt.key === 'Escape' && sidebar.classList.contains('open')){
        sidebar.classList.remove('open');
        overlay.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Abrir menú');
        toggle.focus();
      }
    });
  }

  /* ---- Filtro de carreras ---- */
  const filtros = document.querySelectorAll('.filtro');
  const cards = document.querySelectorAll('.carrera-card');

  filtros.forEach(function(btn){
    btn.addEventListener('click', function(){
      filtros.forEach(b=>{b.classList.remove('activo');b.setAttribute('aria-pressed','false');});
      btn.classList.add('activo');btn.setAttribute('aria-pressed','true');
      const valor = btn.getAttribute('data-filtro');
      cards.forEach(function(card){
        const mostrar = valor === 'todos' || card.getAttribute('data-area') === valor;
        card.style.display = mostrar ? '' : 'none';
      });
    });
  });
  /* ---- Recordar la última actividad visitada ---- */
  const KEY_ACTIVIDAD = 'fesna-ultima-actividad';

  // Asignar un id único a cada tarjeta de programa
  document.querySelectorAll('.carrera-card').forEach(function(card, i){
    if(!card.id) card.id = 'card-' + (card.getAttribute('data-area') || 'area') + '-' + (i + 1);
  });

  // Al entrar a una actividad, guardar de cuál tarjeta de programa salió
  document.querySelectorAll('.actividades-lista a').forEach(function(enlace){
    enlace.addEventListener('click', function(){
      const card = enlace.closest('.carrera-card');
      if(card && card.id) sessionStorage.setItem(KEY_ACTIVIDAD, card.id);
    });
  });

  // Al volver al portafolio desde una actividad, regresar a esa misma tarjeta
  if(sessionStorage.getItem(KEY_ACTIVIDAD) && window.location.hash === '#actividades'){
    const destino = document.getElementById(sessionStorage.getItem(KEY_ACTIVIDAD));
    if(destino){
      setTimeout(function(){
        destino.scrollIntoView({ behavior: 'smooth', block: 'start' });
        destino.classList.add('destello');
        setTimeout(function(){ destino.classList.remove('destello'); }, 2500);
        sessionStorage.removeItem(KEY_ACTIVIDAD);
      }, 250);
    }
  }
})();