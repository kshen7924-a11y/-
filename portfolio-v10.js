import {initMotion} from './motion-v10.js?v=10.2';

const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const viewer=document.querySelector('#art-viewer');
const viewerImage=document.querySelector('#viewer-image');
const viewerVideo=document.querySelector('#viewer-video');
const stage=document.querySelector('.viewer-stage');
let motion=null,routeCleanup=[],navigating=false,queuedNavigation=null,activeFilter='all',activePoster='all';
let gallery=[],galleryIndex=0,previousFocus=null,toastTimer;
const isReduced=()=>reduced.matches||localStorage.getItem('sk-motion')==='off';
const on=(node,event,fn,options)=>{node.addEventListener(event,fn,options);routeCleanup.push(()=>node.removeEventListener(event,fn,options));};

function showToast(text){const el=document.querySelector('.global-toast');el.textContent=text;el.classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('visible'),2400);}
function closeMenu(restore=false){const toggle=document.querySelector('[data-menu-toggle]');if(!toggle)return;document.body.classList.remove('menu-open');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','打开导航菜单');document.querySelector('.mobile-menu')?.setAttribute('aria-hidden','true');if(restore)toggle.focus({preventScroll:true});}
function toggleMenu(){const toggle=document.querySelector('[data-menu-toggle]');const open=toggle.getAttribute('aria-expanded')!=='true';document.body.classList.toggle('menu-open',open);toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'关闭导航菜单':'打开导航菜单');document.querySelector('.mobile-menu')?.setAttribute('aria-hidden',String(!open));if(open)document.querySelector('.mobile-menu a')?.focus({preventScroll:true});}

function applyFilter(filter,poster='all',updateURL=false){const grid=document.querySelector('[data-work-grid]');if(!grid)return;activeFilter=filter;activePoster=poster;grid.dataset.motionFilter=filter+':'+poster;document.querySelectorAll('[data-filter]').forEach(b=>{const yes=b.dataset.filter===filter;b.classList.toggle('active',yes);b.setAttribute('aria-pressed',String(yes));});document.querySelector('.poster-filters').hidden=filter!=='poster';document.querySelectorAll('[data-poster-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.posterFilter===poster)));let count=0,pending=0;grid.querySelectorAll('[data-work-card]').forEach(card=>{const matches=filter==='all'?card.dataset.showAll==='true':card.dataset.category===filter;const submatches=filter!=='poster'||poster==='all'||card.dataset.posterCategory===poster;card.hidden=!(matches&&submatches);if(!card.hidden){count++;if(card.classList.contains('pending-card'))pending++;}});const labels={all:'全部作品',brand:'品牌',poster:'海报与动效',campaign:'活动',ip:'个人 IP',experience:'项目经历'};document.querySelector('.work-count').textContent=`${labels[filter]||'作品'} / ${String(count).padStart(2,'0')} 项${pending?` · ${pending} 项待补充`:''}`;if(updateURL){const url=new URL(location.href);if(filter===grid.dataset.initialFilter)url.searchParams.delete('filter');else url.searchParams.set('filter',filter);if(filter==='poster'&&poster!=='all')url.searchParams.set('category',poster);else url.searchParams.delete('category');history.replaceState({},'',url);}motion?.refresh();}

function syncMotionToggle(){const off=localStorage.getItem('sk-motion')==='off';document.body.classList.toggle('reduce-motion',off||reduced.matches);document.querySelectorAll('[data-motion-toggle]').forEach(button=>{button.setAttribute('aria-pressed',String(off));button.textContent=reduced.matches?'动态效果：遵循系统':`动态效果：${off?'关':'开'}`;});}
function cleanupPage(){motion?.destroy();motion=null;routeCleanup.forEach(fn=>fn());routeCleanup=[];document.querySelectorAll('main video').forEach(video=>video.pause());}
function initPage(){const main=document.querySelector('main');syncMotionToggle();const grid=main.querySelector('[data-work-grid]');if(grid){const query=new URL(location.href).searchParams;let filter=query.get('filter')||grid.dataset.initialFilter;const allowed=['all','brand','poster','campaign','ip','experience'];if(!allowed.includes(filter))filter=grid.dataset.initialFilter;let category=query.get('category')||'all';if(category==='three-d')category='3d';if(!['all','illustration','3d','creative','operations'].includes(category))category='all';applyFilter(filter,category);}
  motion=initMotion(main);
  const footprint=main.querySelector('[data-footprint-playground]');
  if(footprint){
    import('./footprint-playground.js').then(({initFootprintPlayground})=>{
      if(footprint.isConnected){
        const cleanup=initFootprintPlayground(footprint);
        if(cleanup)routeCleanup.push(cleanup);
      }
    });
  }
  for(const image of main.querySelectorAll('img')){if(!image.complete)on(image,'load',()=>motion?.refresh(),{once:true});}
  const caseSteps=main.querySelectorAll('[data-case-step]');if(caseSteps.length){const activate=index=>main.querySelectorAll('[data-case-slide]').forEach(slide=>{const active=Number(slide.dataset.caseSlide)===index;slide.classList.toggle('active',active);slide.setAttribute('aria-hidden',String(!active));slide.tabIndex=active?0:-1;});activate(0);if(innerWidth>767){const update=()=>{const center=innerHeight*.48;let target=0,distance=Infinity;caseSteps.forEach(el=>{const r=el.getBoundingClientRect();const d=Math.abs((r.top+r.bottom)/2-center);if(d<distance){distance=d;target=Number(el.dataset.caseStep);}});activate(target);};on(window,'scroll',update,{passive:true});update();}}
  const darks=[...main.querySelectorAll('[data-theme="dark"]')];let pendingFrame=false;const updateTheme=()=>{pendingFrame=false;document.querySelector('.site-header')?.classList.toggle('on-dark',darks.some(el=>{const r=el.getBoundingClientRect();return r.top<=45&&r.bottom>45;}));};on(window,'scroll',()=>{if(!pendingFrame){pendingFrame=true;requestAnimationFrame(updateTheme);}},{passive:true});on(window,'resize',updateTheme,{passive:true});updateTheme();
  document.querySelectorAll('[data-practice-step]').forEach(el=>{const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>el.classList.toggle('is-active',entry.isIntersecting));},{rootMargin:'-35% 0px -35% 0px'});observer.observe(el);routeCleanup.push(()=>observer.disconnect());});
  if(location.hash){const target=document.getElementById(decodeURIComponent(location.hash.slice(1)));if(target)requestAnimationFrame(()=>target.scrollIntoView({behavior:'instant'}));}
}

function showGalleryImage(index){if(!gallery.length)return;galleryIndex=(index+gallery.length)%gallery.length;const item=gallery[galleryIndex];viewerVideo.pause();viewerVideo.hidden=!item.video;viewerImage.hidden=Boolean(item.video);if(item.video){viewerVideo.src=item.video;viewerVideo.poster=item.src;viewerVideo.setAttribute('aria-label',item.title);}else{viewerVideo.removeAttribute('src');viewerVideo.load();viewerImage.src=item.src;viewerImage.alt=item.title;}document.querySelector('#viewer-title').textContent=item.title;document.querySelector('#viewer-count').textContent=`${String(galleryIndex+1).padStart(2,'0')} / ${String(gallery.length).padStart(2,'0')}`;stage.scrollTo(0,0);document.querySelector('[data-viewer-fit]').hidden=Boolean(item.video);}
function openGallery(trigger){previousFocus=trigger;const group=trigger.dataset.gallery;const candidates=[...document.querySelectorAll('[data-zoom]')].filter(b=>b.dataset.gallery===group&&!b.closest('[hidden]'));const unique=new Map();candidates.forEach(b=>{const src=b.dataset.zoom;const video=b.dataset.video||'';const key=video||src;if(!unique.has(key))unique.set(key,{src,video,title:b.dataset.title||b.querySelector('img')?.alt||'作品选录'});});gallery=[...unique.values()];const selected=trigger.dataset.video||trigger.dataset.zoom;const index=gallery.findIndex(p=>(p.video||p.src)===selected);stage.classList.remove('is-native');document.querySelector('[data-viewer-fit]').textContent='原始尺寸';document.querySelector('[data-viewer-fit]').setAttribute('aria-pressed','false');showGalleryImage(Math.max(index,0));viewer.showModal();document.body.classList.add('viewer-open');document.querySelector('[data-viewer-close]').focus();}
function closeViewer(){if(viewer.open)viewer.close();}
viewer.addEventListener('close',()=>{viewerVideo.pause();document.body.classList.remove('viewer-open');previousFocus?.focus({preventScroll:true});});
viewer.addEventListener('click',event=>{if(event.target===viewer){const r=viewer.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)closeViewer();}});
viewer.addEventListener('keydown',event=>{if(event.key==='ArrowLeft'){event.preventDefault();showGalleryImage(galleryIndex-1);}if(event.key==='ArrowRight'){event.preventDefault();showGalleryImage(galleryIndex+1);}});

function tween(target,vars){if(!window.gsap)return Promise.resolve();return new Promise(resolve=>gsap.to(target,{...vars,onComplete:resolve}));}
async function navigate(url,{push=true}={}){if(navigating){if(!push)queuedNavigation={url,options:{push:false}};return;}const destination=new URL(url,location.href);if(destination.origin!==location.origin){location.href=destination.href;return;}navigating=true;closeMenu();closeViewer();document.body.setAttribute('aria-busy','true');const overlay=document.querySelector('.page-transition');const path=overlay.querySelector('path');const animate=window.gsap&&!isReduced();const length=path.getTotalLength();const loading=fetch(destination.href,{credentials:'same-origin'}).then(response=>{if(!response.ok)throw new Error('route');return response.text();});
  try{if(animate){overlay.style.visibility='visible';gsap.set(path,{strokeDasharray:length,strokeDashoffset:length,strokeWidth:14});await tween(path,{strokeDashoffset:0,strokeWidth:1500,duration:.7,ease:'power3.inOut'});}const html=await loading;const parsed=new DOMParser().parseFromString(html,'text/html');const nextMain=parsed.querySelector('main#main');const nextHeader=parsed.querySelector('.site-header');if(!nextMain||!nextHeader)throw new Error('route');cleanupPage();document.querySelector('.site-header').replaceWith(nextHeader);const main=document.querySelector('main');main.innerHTML=nextMain.innerHTML;main.dataset.route=nextMain.dataset.route;document.title=parsed.title;document.body.dataset.page=nextMain.dataset.route;document.body.classList.toggle('is-case',parsed.body.classList.contains('is-case'));if(push)history.pushState({},'',destination.href);window.scrollTo({top:0,left:0,behavior:'instant'});initPage();if(animate){await tween(path,{strokeDashoffset:-length,strokeWidth:14,duration:.85,ease:'power3.inOut'});overlay.style.visibility='hidden';}main.focus({preventScroll:true});}catch{location.assign(destination.href);}finally{navigating=false;document.body.removeAttribute('aria-busy');const next=queuedNavigation;queuedNavigation=null;if(next)navigate(next.url,next.options);}}

document.addEventListener('click',async event=>{const target=event.target.closest('a,button');if(!target)return;
  if(target.matches('[data-menu-toggle]')){toggleMenu();return;}
  if(target.matches('[data-filter]')){applyFilter(target.dataset.filter,'all',true);return;}
  if(target.matches('[data-poster-filter]')){applyFilter('poster',target.dataset.posterFilter,true);return;}
  if(target.matches('[data-zoom]')){openGallery(target);return;}
  if(target.matches('[data-viewer-close]')){closeViewer();return;}
  if(target.matches('[data-viewer-prev]')){showGalleryImage(galleryIndex-1);return;}
  if(target.matches('[data-viewer-next]')){showGalleryImage(galleryIndex+1);return;}
  if(target.matches('[data-viewer-fit]')){const native=stage.classList.toggle('is-native');target.setAttribute('aria-pressed',String(native));target.textContent=native?'适应屏幕':'原始尺寸';return;}
  if(target.matches('[data-copy]')){try{await navigator.clipboard.writeText(target.dataset.copy);showToast(target.dataset.copy.includes('@')?'邮箱已复制':'电话号码已复制');}catch{showToast('请选中联系方式复制');}return;}
  if(target.matches('[data-motion-toggle]')){const off=localStorage.getItem('sk-motion')==='off';localStorage.setItem('sk-motion',off?'on':'off');syncMotionToggle();motion?.refresh();return;}
  if(target.matches('[data-scroll-top]')){window.scrollTo({top:0,behavior:isReduced()?'instant':'smooth'});return;}
  if(!target.matches('a')||event.defaultPrevented||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey||target.target==='_blank'||target.hasAttribute('download'))return;
  const href=target.getAttribute('href');if(!href||href.startsWith('mailto:')||href.startsWith('tel:'))return;const url=new URL(target.href,location.href);if(url.origin!==location.origin)return;
  if(url.pathname===location.pathname&&url.search===location.search&&url.hash){const anchor=document.getElementById(decodeURIComponent(url.hash.slice(1)));if(anchor){event.preventDefault();closeMenu();history.pushState({},'',url);anchor.scrollIntoView({behavior:isReduced()?'instant':'smooth'});}return;}
  if(url.pathname===location.pathname&&url.search===location.search&&!url.hash){event.preventDefault();closeMenu();window.scrollTo({top:0,behavior:isReduced()?'instant':'smooth'});return;}
  event.preventDefault();navigate(url.href);
});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&document.body.classList.contains('menu-open')){event.preventDefault();closeMenu(true);}if(event.key==='Tab'&&document.body.classList.contains('menu-open')){const items=[document.querySelector('[data-menu-toggle]'),...document.querySelectorAll('.mobile-menu a')];const first=items[0],last=items[items.length-1];if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}}});
window.addEventListener('popstate',()=>navigate(location.href,{push:false}));
reduced.addEventListener('change',()=>{syncMotionToggle();motion?.refresh();});
window.addEventListener('pageshow',event=>{if(event.persisted)motion?.refresh();});
initPage();
