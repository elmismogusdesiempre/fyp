/* FP MENSAJERÍA — DEMO INTERACTIONS v5 */
(() => {
  'use strict';

  const CONFIG = { whatsapp: '573001234567' };
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  const trackingStages = [
    { icon: '📦', title: 'En bodega de recepción', text: 'Tu envío fue recibido y está siendo procesado.' },
    { icon: '🏢', title: 'En centro de distribución', text: 'Tu paquete está siendo clasificado para continuar su ruta.' },
    { icon: '🚚', title: 'En camino hacia tu ciudad', text: 'El envío salió del centro de distribución y continúa hacia su destino.' },
    { icon: '🛵', title: 'En camino hacia ti', text: 'El mensajero ya lleva tu envío hacia la dirección de entrega.' },
    { icon: '🔔', title: 'Entrega programada', text: 'Tu envío está listo para ser entregado en breve.' },
    { icon: '✅', title: 'Entregado', text: 'El envío fue entregado correctamente. ¡Gracias por confiar en FP!' }
  ];

  function randomGuide() {
    const year = new Date().getFullYear();
    const number = Math.floor(100000 + Math.random() * 900000);
    return `FP-${year}-${number}`;
  }

  function openModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    const close = $('.demo-close', modal);
    if (close) setTimeout(() => close.focus(), 30);
  }

  function closeModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    if (!$('.demo-modal.is-open')) document.body.classList.remove('modal-open');
  }

  function renderTracking(code, stageIndex) {
    const stage = trackingStages[stageIndex];
    $('#modalTrackingCode').textContent = code;
    $('#trackingStatusIcon').textContent = stage.icon;
    $('#trackingStatusTitle').textContent = stage.title;
    $('#trackingStatusText').textContent = stage.text;

    const timeline = $('#trackingTimeline');
    timeline.innerHTML = trackingStages.map((item, i) => {
      const done = i < stageIndex;
      const current = i === stageIndex;
      return `<div class="timeline-item ${done ? 'done' : ''} ${current ? 'current' : ''}">
        <span class="timeline-dot">${done ? '✓' : current ? item.icon : '•'}</span>
        <div><strong>${item.title}</strong><small>${done ? 'Completado' : current ? 'Estado actual' : 'Pendiente'}</small></div>
      </div>`;
    }).join('');

    openModal('trackingModal');
  }

  function whatsapp(message) {
    window.open(`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
  }

  function init() {
    // 1. Generate a fresh DEMO guide every time the page loads.
    const trackingInput = $('#trackingCode');
    if (trackingInput) trackingInput.value = randomGuide();

    // 2. Tracking form -> random simulated status -> popup.
    $('#trackingForm')?.addEventListener('submit', (event) => {
      event.preventDefault();
      const input = $('#trackingCode');
      const code = (input?.value || '').trim().toUpperCase() || randomGuide();
      if (input) input.value = code;
      const stageIndex = Math.floor(Math.random() * trackingStages.length);
      renderTracking(code, stageIndex);
    });

    // 3. Delivery CTA -> popup with emoji-only visual instructions.
    $('#deliveryGuideBtn')?.addEventListener('click', () => openModal('deliveryModal'));

    // 4. Registration button -> WhatsApp demo handoff.
    $('#deliveryRegisterBtn')?.addEventListener('click', () => {
      closeModal('deliveryModal');
      whatsapp('Hola, quiero registrar mi negocio en el servicio de delivery de FP Mensajería.');
    });

    // 5. All modal close buttons + backdrop.
    $$('[data-close-modal]').forEach((element) => {
      element.addEventListener('click', () => closeModal(element.dataset.closeModal));
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') $$('.demo-modal.is-open').forEach((modal) => closeModal(modal.id));
    });

    // Existing WhatsApp CTAs.
    $$('[data-whatsapp="true"]').forEach((element) => {
      element.addEventListener('click', (event) => {
        event.preventDefault();
        whatsapp('Hola, quiero solicitar un envío con FP Mensajería.');
      });
    });
    $$('[data-phone-link]').forEach((element) => {
      element.href = `https://wa.me/${CONFIG.whatsapp}`;
      element.target = '_blank';
      element.rel = 'noopener';
    });

    // Contact form.
    $('#contactForm')?.addEventListener('submit', (event) => {
      event.preventDefault();
      const form = new FormData(event.currentTarget);
      whatsapp(`Hola, soy ${form.get('name')}. Mi teléfono es ${form.get('phone')}. Necesito: ${form.get('message')}`);
      event.currentTarget.reset();
    });

    // Mobile navigation.
    const toggle = $('.menu-toggle');
    const nav = $('.nav');
    toggle?.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });
    $$('.nav a').forEach((a) => a.addEventListener('click', () => nav.classList.remove('open')));

    // Back-to-top.
    const top = $('#toTop');
    window.addEventListener('scroll', () => { if (top) top.style.display = window.scrollY > 600 ? 'grid' : 'none'; });
    top?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    if ($('#year')) $('#year').textContent = new Date().getFullYear();

    // Reveal animations — fail-safe: content remains visible.
    document.body.classList.add('js-ready');
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      }), { threshold: 0.12 });
      $$('.reveal').forEach((el) => observer.observe(el));
    } else {
      $$('.reveal').forEach((el) => el.classList.add('visible'));
    }

    // Counters.
    const counters = $$('[data-counter]');
    let counted = false;
    const runCounters = () => {
      if (counted) return;
      counted = true;
      counters.forEach((el) => {
        const target = Number(el.dataset.counter || 0);
        const prefix = el.dataset.prefix || '';
        const suffix = el.dataset.suffix || '';
        let n = 0;
        const step = Math.max(1, Math.ceil(target / 55));
        const timer = setInterval(() => {
          n = Math.min(target, n + step);
          el.textContent = prefix + n.toLocaleString('es-CO') + suffix;
          if (n >= target) clearInterval(timer);
        }, 22);
      });
    };
    if ('IntersectionObserver' in window && $('.stats')) {
      const counterObserver = new IntersectionObserver((entries) => {
        if (entries.some((entry) => entry.isIntersecting)) runCounters();
      }, { threshold: 0.4 });
      counterObserver.observe($('.stats'));
    } else runCounters();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
