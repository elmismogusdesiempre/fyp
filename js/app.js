const CONFIG={whatsapp:'573001234567',email:'info@fpmenajeria.com'};
const $=s=>document.querySelector(s), $$=s=>document.querySelectorAll(s);
const toast=$('#toast');
function showToast(msg){if(!toast)return;toast.textContent=msg;toast.classList.add('show');clearTimeout(window.__toast);window.__toast=setTimeout(()=>toast.classList.remove('show'),3200)}
function wa(message){window.open(`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(message)}`,'_blank','noopener');}
$$('[data-whatsapp="true"]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();wa('Hola, quiero solicitar un envío con FP Mensajería.');}));
const phoneLinks=$$('[data-phone-link]'); phoneLinks.forEach(a=>{a.href=`https://wa.me/${CONFIG.whatsapp}`;a.target='_blank';a.rel='noopener'});

/* =========================================================
   DEMO TRACKING
   ========================================================= */
const trackingStates=[
  {key:'received',title:'En bodega de recepción',detail:'Tu envío fue recibido y está siendo procesado.',emoji:'📦'},
  {key:'route-pickup',title:'En camino hacia el punto de recogida',detail:'Un mensajero se dirige a recoger el envío.',emoji:'🛵'},
  {key:'sorting',title:'En centro de distribución',detail:'Tu paquete está siendo clasificado para continuar su ruta.',emoji:'🏢'},
  {key:'toward-you',title:'En camino hacia ti',detail:'Tu envío ya está en ruta hacia el destino.',emoji:'🚚'},
  {key:'delivered',title:'Entregado',detail:'El envío fue entregado correctamente.',emoji:'✅'}
];

function makeDemoCode(){
  const n=Math.floor(100000+Math.random()*900000);
  return `FP-2026-${n}`;
}
function setDemoCode(){
  const input=$('#trackingCode');
  if(input && !input.value.trim()) input.value=makeDemoCode();
}
function openModal(id){
  const modal=document.getElementById(id); if(!modal)return;
  modal.classList.add('open'); modal.setAttribute('aria-hidden','false'); document.body.classList.add('modal-open');
  const close=modal.querySelector('.demo-close'); close?.focus();
}
function closeModal(id){
  const modal=document.getElementById(id); if(!modal)return;
  modal.classList.remove('open'); modal.setAttribute('aria-hidden','true');
  if(!document.querySelector('.demo-modal.open')) document.body.classList.remove('modal-open');
}
function renderTrackingDemo(code){
  const index=Math.floor(Math.random()*trackingStates.length);
  const current=trackingStates[index];
  $('#modalTrackingCode').textContent=code;
  $('#modalTrackingStatus').innerHTML=`<b>${current.emoji} ${current.title}</b><span>${current.detail}</span>`;
  const timeline=$('#trackingTimeline');
  timeline.innerHTML=trackingStates.map((s,i)=>{
    const cls=i<index?'done':(i===index?'current':'');
    return `<div class="track-step ${cls}"><div class="track-dot">${i<index?'✓':i===index?'●':i+1}</div><div><strong>${s.title}</strong><small>${i===index?s.detail:i<index?'Etapa completada':'Pendiente'}</small></div></div>`;
  }).join('');
  openModal('trackingModal');
}

$('#trackingForm')?.addEventListener('submit',e=>{
  e.preventDefault();
  const input=$('#trackingCode');
  const code=(input?.value.trim().toUpperCase())||makeDemoCode();
  if(input) input.value=code;
  renderTrackingDemo(code);
});
setDemoCode();

/* =========================================================
   DEMO DELIVERY ONBOARDING
   ========================================================= */
$('#deliveryJoinBtn')?.addEventListener('click',e=>{e.preventDefault();openModal('deliveryModal');});
$('#deliveryDemoContinue')?.addEventListener('click',()=>{
  closeModal('deliveryModal');
  wa('Hola, quiero registrar mi negocio para comenzar a usar el delivery de FP Mensajería.');
  showToast('Abriendo WhatsApp para iniciar el registro…');
});
$$('[data-close-modal]').forEach(el=>el.addEventListener('click',()=>closeModal(el.dataset.closeModal)));
document.addEventListener('keydown',e=>{if(e.key==='Escape'){document.querySelectorAll('.demo-modal.open').forEach(m=>closeModal(m.id));}});

$('#contactForm')?.addEventListener('submit',e=>{e.preventDefault();const f=new FormData(e.currentTarget);const msg=`Hola, soy ${f.get('name')}. Mi teléfono es ${f.get('phone')}. Necesito: ${f.get('message')}`;wa(msg);showToast('Abriendo WhatsApp para enviar la solicitud…');e.currentTarget.reset();});
const toggle=$('.menu-toggle'),nav=$('.nav');toggle?.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',open)});$$('.nav a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
const top=$('#toTop');window.addEventListener('scroll',()=>{if(top)top.style.display=scrollY>600?'grid':'none'});top?.addEventListener('click',()=>scrollTo({top:0,behavior:'smooth'}));
if($('#year'))$('#year').textContent=new Date().getFullYear();
const obs=new IntersectionObserver(entries=>entries.forEach(x=>{if(x.isIntersecting)x.target.classList.add('visible')}),{threshold:.12});$$('.reveal').forEach(el=>obs.observe(el));
const counters=$$('[data-counter]');let counted=false;const counterObs=new IntersectionObserver(entries=>{if(!entries.some(e=>e.isIntersecting)||counted)return;counted=true;counters.forEach(el=>{const target=Number(el.dataset.counter),prefix=el.dataset.prefix||'',suffix=el.dataset.suffix||'';let n=0;const step=Math.max(1,Math.ceil(target/55));const timer=setInterval(()=>{n=Math.min(target,n+step);el.textContent=prefix+n.toLocaleString('es-CO')+suffix;if(n>=target)clearInterval(timer)},22)})},{threshold:.4});if($('.stats')) counterObs.observe($('.stats'));
