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
})();