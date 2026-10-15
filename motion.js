/* Scroll-linked editorial motion: one passive listener, one frame per scroll. */
(()=>{const reduce=matchMedia('(prefers-reduced-motion: reduce)');const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];const clamp=(v,a=0,b=1)=>Math.min(b,Math.max(a,v));

/* Scroll-driven word opacity reveal for the brand promise. */
const wordReveal=$('[data-scroll-reveal="words"]');
let revealWords=[];
if(wordReveal){
  const text=wordReveal.textContent.trim();
  wordReveal.textContent='';
  text.split(/(\s+)/).forEach(part=>{
    if(!part.trim()){wordReveal.append(document.createTextNode(part));return;}
    const span=document.createElement('span');
    span.className='scroll-word';
    span.textContent=part;
    span.style.setProperty('--word-alpha',reduce.matches?'1':'.2');
    wordReveal.append(span);
    revealWords.push(span);
  });
}

function updateWordReveal(h){
  if(!wordReveal||reduce.matches)return;
  const r=wordReveal.getBoundingClientRect();
  const raw=clamp((h*.82-r.top)/(h*.48));
  const n=Math.max(1,revealWords.length-1);
  revealWords.forEach((word,i)=>{
    const local=clamp((raw-(i/n)*.72)*3.6);
    const alpha=.18+local*.82;
    word.style.setProperty('--word-alpha',alpha.toFixed(3));
  });
}

$$('h2.reveal').forEach(h=>{if(reduce.matches)return;let n=0;const walk=node=>{[...node.childNodes].forEach(child=>{if(child.nodeType===3){const fragment=document.createDocumentFragment();child.textContent.split(/(\s+)/).forEach(word=>{if(!word.trim()){fragment.append(document.createTextNode(word));return}const wrap=document.createElement('span'),inner=document.createElement('span');wrap.className='word-unit';inner.textContent=word;inner.style.setProperty('--word-delay',`${Math.min(n++*65,400)}ms`);wrap.append(inner);fragment.append(wrap)});child.replaceWith(fragment)}else if(child.nodeType===1&&child.tagName!=='BR')walk(child)})};walk(h)});
$$('.button').forEach(a=>{const text=a.textContent.trim();const span=document.createElement('span');span.className='button-label';span.dataset.label=text;span.textContent=text;a.replaceChildren(span)});$$('#mobile-menu nav a').forEach((a,i)=>a.style.setProperty('--menu-index',i));
const slides=$$('.hero-photo'),slideButtons=$$('[data-slide]');let slide=0,paused=reduce.matches,timer=null;const pause=$('#hero-pause');function showSlide(i){slide=i;slides.forEach((el,j)=>el.classList.toggle('active',j===i));slideButtons.forEach((el,j)=>{el.classList.toggle('selected',j===i);el.setAttribute('aria-pressed',j===i?'true':'false')})}function manageTimer(){clearInterval(timer);pause.textContent=paused?'PLAY':'PAUSE';pause.setAttribute('aria-label',paused?'Play photograph slideshow':'Pause photograph slideshow');if(!paused&&!document.hidden)timer=setInterval(()=>showSlide((slide+1)%slides.length),7500)}slideButtons.forEach(el=>el.onclick=()=>{showSlide(Number(el.dataset.slide));manageTimer()});pause.onclick=()=>{paused=!paused;manageTimer()};document.addEventListener('visibilitychange',manageTimer);manageTimer();
const chapters=$$('.service-chapter'),jumps=$$('.service-jumps a'),serviceImage=$('#service-image');let currentChapter=-1,serviceTimer;const chapterPositions=['center 35%','center 45%','center 60%','center 36%'];function setChapter(i){if(i===currentChapter)return;currentChapter=i;chapters.forEach((el,j)=>el.classList.toggle('active',i===j));jumps.forEach((a,j)=>{a.classList.toggle('active',i===j);if(i===j)a.setAttribute('aria-current','step');else a.removeAttribute('aria-current')});clearTimeout(serviceTimer);const swap=()=>{serviceImage.src='assets/'+chapters[i].dataset.photo;serviceImage.alt=chapters[i].querySelector('h3').textContent+' wedding inspiration';serviceImage.style.objectPosition=chapterPositions[i]||'center';serviceImage.style.opacity='1';if(!reduce.matches)serviceImage.animate([{clipPath:'inset(0 0 100% 0)',transform:'scale(1.11)'},{clipPath:'inset(0)',transform:'scale(1.04)'}],{duration:750,easing:'cubic-bezier(.2,.7,.2,1)'})};if(reduce.matches)swap();else{serviceImage.style.opacity='.15';serviceTimer=setTimeout(swap,180)}$('#service-index').textContent=String(i+1).padStart(2,'0')+' / 04'}setChapter(0);jumps.forEach((a,i)=>a.addEventListener('click',e=>{e.preventDefault();setChapter(i);chapters[i]?.scrollIntoView({behavior:reduce.matches?'instant':'smooth',block:'center'})}));
const active=new Set();const watch=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)active.add(e.target);else active.delete(e.target)}),{rootMargin:'150px'});const targets=$$('.hero-shell,.intro,.type-rail,.services,.signature,.rental-section,.testimonials,.story,.inquiry');targets.forEach(el=>watch.observe(el));const hero=$('.hero'),heroCopy=$('.hero-copy'),intro=$('.intro-image'),inset=$('.intro-inset'),rail=$('.type-rail'),rentals=$$('.rental-piece'),collage=$$('.story-collage figure');let scheduled=false;
function frame(){scheduled=false;const y=scrollY,h=innerHeight,mobile=innerWidth<=800;$('#header').classList.toggle('scrolled',y>45);$('.reading-progress').style.transform=`scaleX(${clamp(y/Math.max(1,document.documentElement.scrollHeight-h))})`;updateWordReveal(h);active.forEach(el=>{const r=el.getBoundingClientRect(),p=clamp((h-r.top)/(h+r.height));if(el.matches('.services')&&!mobile){let index=0;chapters.forEach((c,i)=>{if(c.getBoundingClientRect().top<h*.58)index=i});setChapter(index)}if(reduce.matches)return;
if(el.matches('.hero-shell')){const p=clamp(y/(h*.9));hero.style.setProperty('--hero-inset',`${p*(mobile?2.5:6)}%`);hero.style.setProperty('--hero-y',`${y*.12}px`);heroCopy.style.setProperty('--copy-y',`${-y*.14}px`);heroCopy.style.setProperty('--copy-opacity',1-p*.55);hero.style.setProperty('--curve-scale',1-p*.55)}
if(el.matches('.intro')){intro.style.setProperty('--intro-y',`${(p-.5)*(mobile?-25:-80)}px`);intro.style.setProperty('--intro-rotate',`${(p-.5)*-5}deg`);inset.style.setProperty('--inset-y',`${(p-.5)*95}px`)}
if(el.matches('.type-rail')){rail.style.setProperty('--rail',`${-p*190}px`);rail.style.setProperty('--rail-back',`${p*180}px`)}
if(el.matches('.signature')){el.style.setProperty('--signature-y',`${-9+p*7}%`);el.style.setProperty('--thread',clamp(p*1.7))}
if(el.matches('.rental-section'))rentals.forEach((a,i)=>{a.style.setProperty('--rental-y',`${(p-.5)*(i===1?-130:85)}px`);a.style.setProperty('--photo-y',`${(p-.5)*-20}px`)});
if(el.matches('.testimonials'))el.style.setProperty('--quote-y',`${(p-.5)*-25}px`);
if(el.matches('.story')){collage.forEach((f,i)=>{f.style.setProperty('--collage-y',`${(p-.5)*(i===1?-55:85)*(mobile?.5:1)}px`);f.style.setProperty('--collage-r',`${(p-.5)*(i===0?-7:i===2?8:0)}deg`)});el.style.setProperty('--memory-x',`${(p-.5)*-60}px`)}
if(el.matches('.inquiry')){el.style.setProperty('--inquiry-y',`${(p-.5)*-100}px`);el.style.setProperty('--underline',clamp((p-.2)*2))}})}
function schedule(){if(!scheduled){requestAnimationFrame(frame);scheduled=true}}addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule);watch.takeRecords();requestAnimationFrame(frame);setTimeout(schedule,300);document.fonts?.ready.then(schedule);reduce.addEventListener('change',()=>location.reload());
if(matchMedia('(pointer:fine)').matches&&!reduce.matches){$$('.button').forEach(el=>{el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect();el.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.07}px,${(e.clientY-r.top-r.height/2)*.12}px)`});el.addEventListener('pointerleave',()=>el.style.transform='')})}
const carousel=$('.photo-carousel'),carouselToggle=$('#carousel-toggle');
if(carousel&&carouselToggle){
  carouselToggle.addEventListener('click',()=>{
    const paused=carousel.classList.toggle('paused');
    carouselToggle.textContent=paused?'PLAY':'PAUSE';
    carouselToggle.setAttribute('aria-pressed',paused?'true':'false');
  });
}
const gallery=$('.rental-gallery');let drag=null,moved=false;gallery.addEventListener('pointerdown',e=>{if(e.pointerType==='mouse'&&gallery.scrollWidth>gallery.clientWidth){drag={x:e.clientX,left:gallery.scrollLeft};moved=false}});gallery.addEventListener('pointermove',e=>{if(!drag)return;const dx=e.clientX-drag.x;if(Math.abs(dx)>6)moved=true;if(moved){e.preventDefault();gallery.scrollLeft=drag.left-dx}});addEventListener('pointerup',()=>{drag=null});gallery.addEventListener('click',e=>{if(moved){e.preventDefault();moved=false}},true);gallery.addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();gallery.scrollBy({left:(e.key==='ArrowRight'?1:-1)*gallery.clientWidth*.8,behavior:reduce.matches?'instant':'smooth'})}});
})();
