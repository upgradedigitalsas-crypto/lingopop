// Funcionalidad exclusiva de la app nativa. En la PWA web no se solicitan permisos.
import { Capacitor } from '@capacitor/core';
import { Haptics, ImpactStyle, NotificationType } from '@capacitor/haptics';
import { Share } from '@capacitor/share';
import { LocalNotifications } from '@capacitor/local-notifications';

const isNative = Capacitor.isNativePlatform();
const languageName = () => ({ pt: 'portugués', en: 'inglés', fr: 'francés' })[document.querySelector('.lang-btn.selected')?.dataset?.lang] || 'un nuevo idioma';

async function haptic(event){
  if(!isNative) return;
  const el = event.target.closest('button, #flip-card');
  if(!el) return;
  try {
    if (el.dataset.answer !== undefined) await Haptics.impact({style: ImpactStyle.Medium});
    else if (el.id === 'review-known') await Haptics.notification({type: NotificationType.Success});
    else if (el.classList.contains('lang-btn') || el.classList.contains('tab')) await Haptics.selectionChanged();
  } catch { /* haptics are a nonessential enhancement */ }
}

async function enableReminder(){
  if(!isNative) return;
  if(!window.confirm('¿Quieres un recordatorio diario de LingoPop a las 20:00, según la hora de tu teléfono? Puedes desactivarlo desde los ajustes del sistema.'))return;
  try {
    const permission=await LocalNotifications.requestPermissions();
    if(permission.display !== 'granted'){
      window.alert('No se concedió el permiso. Puedes habilitar las notificaciones en Ajustes del teléfono.');return;
    }
    await LocalNotifications.cancel({notifications:[{id:3001}]});
    await LocalNotifications.schedule({notifications:[{
      id:3001,
      title:'🌟 ¡Tu lección de LingoPop te espera!',
      body:'Dedica 20 minutos a practicar un nuevo idioma. ¡Tú puedes!',
      schedule:{on:{hour:20,minute:0},repeats:true},
      extra:{source:'daily-learning-reminder'}
    }]});
    await Haptics.notification({type:NotificationType.Success}).catch(()=>{});
    window.alert('✅ Recordatorio programado para las 20:00.');
  } catch (e) {console.warn('Error programando recordatorio',e);window.alert('No se pudo activar el recordatorio en este teléfono.');}
}

async function shareApp(){
  const options={
    title:'LingoPop · Aprende jugando',
    text:'Aprende portugués, inglés y francés con LingoPop: tres retos de 30 días.',
    url:'https://lingopop-academia.vercel.app'
  };
  try {
    if (isNative)await Share.share(options);
    else if(navigator.share)await navigator.share(options);
    else if(navigator.clipboard){await navigator.clipboard.writeText(options.url);window.alert('Enlace copiado.');}
  } catch(err){if(err?.message&&!/cancel/i.test(err.message))console.warn(err);}
}

function init(){
  // Native build opens directly in full-screen app mode; the PWA install button is repurposed.
  const action=document.getElementById('install-btn');
  if(isNative&&action){
    action.innerHTML='⏰ <span>Recordatorio</span>';
    action.setAttribute('aria-label','Activar recordatorio diario a las 20:00');
    action.addEventListener('click',event=>{
      event.preventDefault();event.stopImmediatePropagation();enableReminder();
    },true);
  }
  const footer=document.querySelector('.page-footer');
  if(footer){
    const share=document.createElement('button');
    share.type='button';share.className='text-link native-share';
    share.textContent=' Compartir LingoPop ↗';
    share.addEventListener('click',shareApp);
    footer.appendChild(share);
  }
  document.addEventListener('click',haptic,true);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
