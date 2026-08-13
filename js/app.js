const CONFIG={whatsapp:'573001234567',email:'info@fpmenajeria.com'};
const $=s=>document.querySelector(s), $$=s=>document.querySelectorAll(s);
const toast=$('#toast');
function showToast(msg){if(!toast)return;toast.textContent=msg;toast.classList.add('show');clearTimeout(window.__toast);window.__toast=setTimeout(()=>toast.classList.remove('show'),3200)}
function wa(message){window.open(`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(message)}`,'_blank','noopener');}
$$('[data-whatsapp="true"]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();wa('Hola, quiero solicitar un envío con FP Mensajería.');}));
const phoneLinks=$$('[data-phone-link]'); phoneLinks.forEach(a=>{a.href=`https://wa.me/${CONFIG.whatsapp}`;a.target='_blank';a.rel='noopener'});

// ==============================
// DEMO: RASTREO DE ENVÍOS
// ==============================
const trackingStages=[
  {icon:'📦',title:'En bodega de recepción',text:'Tu envío fue recibido y está siendo procesado.'},
  {icon:'🏢',title:'En centro de distribución',text:'Tu paquete está siendo clasificado para continuar su ruta.'},
  {icon:'🚚',title:'En camino hacia tu ciudad',text:'El envío salió del centro de distribución y continúa hacia su destino.'},
  {icon:'🛵',title:'En camino hacia ti',text:'El mensajero ya lleva tu envío hacia la dirección de entrega.'},
  {icon:'🔔',title:'Entrega programada',text:'Tu envío está listo para ser entregado en breve.'},
  {icon:'✅',title:'Entregado',text:'El envío fue entregado correctamente. ¡Gracias por confiar en FP!'}
];
function randomGuide(){
  const year=new Date().getFullYear();
  const number=Math.floor(100000+Math.random()*900000);
  return `FP-${year}-${number}`;
}
function openModal(id){
  const modal=document.getElementById(id); if(!modal)return;
  modal.classList.add('is-open');modal.setAttribute('aria-hidden','false');
  document.body.classList.add('modal-open');
  setTimeout(()=>modal.querySelector('.demo-close')?.focus(),30);
}
function closeModal(id){
  const modal=document.getElementById(id); if(!modal)return;
  modal.classList.remove('is-open');modal.setAttribute('aria-hidden','true');
  if(!document.querySelector('.demo-modal.is-open'))document.body.classList.remove('modal-open');
}
$$('[data-close-modal]').forEach(el=>el.addEventListener('click',()=>closeModal(el.dataset.closeModal)));
document.addEventListener('keydown',e=>{if(e.key==='Escape')document.querySelectorAll('.demo-modal.is-open').forEach(m=>closeModal(m.id));});
function renderTrackingResult(code,index){
  const stage=trackingStages[index];
  $('#modalTrackingCode').textContent=code;
  $('#trackingStatusIcon').textContent=stage.icon;
  $('#trackingStatusTitle').textContent=stage.title;
  $('#trackingStatusText').textContent=stage.text;
  const timeline=$('#trackingTimeline');
  timeline.innerHTML=trackingStages.map((item,i)=>`<div class="timeline-item ${i<index?'done':''} ${i===index?'current':''}"><span class="timeline-dot">${i<index?'✓':i===index?item.icon:'•'}</span><div><strong>${item.title}</strong><small>${i<index?'Completado':i===index?'Estado actual':'Pendiente'}</small></div></div>`).join('');
  openModal('trackingModal');
}
const trackingInput=$('#trackingCode');
if(trackingInput)trackingInput.value=randomGuide();
$('#trackingForm')?.addEventListener('submit',e=>{
  e.preventDefault();
  const code=trackingInput.value.trim().toUpperCase()||randomGuide();
  trackingInput.value=code;
  const index=Math.floor(Math.random()*trackingStages.length);
  renderTrackingResult(code,index);
});

// ==============================
// DEMO: ALTA DE NEGOCIOS DELIVERY
// ==============================
$('#deliveryGuideBtn')?.addEventListener('click',()=>openModal('deliveryModal'));
$('#deliveryRegisterBtn')?.addEventListener('click',()=>{
  closeModal('deliveryModal');
  wa('Hola, quiero registrar mi negocio en el servicio de delivery de FP Mensajería.');
  showToast('Abriendo WhatsApp para iniciar el registro…');
});

$('#contactForm')?.addEventListener('submit',e=>{e.preventDefault();const f=new FormData(e.currentTarget);const msg=`Hola, soy ${f.get('name')}. Mi teléfono es ${f.get('phone')}. Necesito: ${f.get('message')}`;wa(msg);showToast('Abriendo WhatsApp para enviar la solicitud…');e.currentTarget.reset();});
const toggle=$('.menu-toggle'),nav=$('.nav');toggle?.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',open)});$$('.nav a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
const top=$('#toTop');window.addEventListener('scroll',()=>{if(top)top.style.display=scrollY>600?'grid':'none'});top?.addEventListener('click',()=>scrollTo({top:0,behavior:'smooth'}));
if($('#year'))$('#year').textContent=new Date().getFullYear();
const obs=new IntersectionObserver(entries=>entries.forEach(x=>{if(x.isIntersecting)x.target.classList.add('visible')}),{threshold:.12});$$('.reveal').forEach(el=>obs.observe(el));
const counters=$$('[data-counter]');let counted=false;const counterObs=new IntersectionObserver(entries=>{if(!entries.some(e=>e.isIntersecting)||counted)return;counted=true;counters.forEach(el=>{const target=Number(el.dataset.counter),prefix=el.dataset.prefix||'',suffix=el.dataset.suffix||'';let n=0;const step=Math.max(1,Math.ceil(target/55));const timer=setInterval(()=>{n=Math.min(target,n+step);el.textContent=prefix+n.toLocaleString('es-CO')+suffix;if(n>=target)clearInterval(timer)},22)})},{threshold:.4});if($('.stats'))counterObs.observe($('.stats'));
