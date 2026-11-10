// Bounded-view 2.5D rig. Original texture stays visible until the WebGL scene succeeds.
import * as THREE from 'three';
import { GLTFLoader } from './vendor/three/loaders/GLTFLoader.js';

const hero=document.querySelector('.wild-hero');
const visual=document.querySelector('.wild-visual');
const toggle=document.querySelector('[data-motion-toggle]');
const response=document.querySelector('[data-character-action]');
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const fine=matchMedia('(pointer: fine)');
let paused=reduced.matches;
let visible=true;
let renderer,model,mixer,head,spine,loop,observer;
let pointer={x:0,y:0},smooth={x:0,y:0},pulseAt=-100;
let last=performance.now();

function syncMotion(){
 hero.classList.toggle('is-paused',paused);
 toggle.setAttribute('aria-pressed',String(!paused));
 toggle.querySelector('span').textContent=paused?'动效：静止':'动效：开启';
 response.disabled=paused;
 if(renderer&&model){if(visible&&!document.hidden&&!paused)renderer.setAnimationLoop(loop);else renderer.setAnimationLoop(null);if(paused&&visible&&loop)loop(performance.now());}
}
syncMotion();
toggle.addEventListener('click',()=>{paused=!paused;if(paused){pointer={x:0,y:0};hero.style.setProperty('--mouse-x','0px');hero.style.setProperty('--mouse-y','0px');hero.style.setProperty('--mouse-yaw','0deg');}syncMotion();});
reduced.addEventListener('change',()=>{paused=reduced.matches;syncMotion();});
function respond(){
 if(paused)return;
 pulseAt=performance.now()/1000;
 hero.classList.remove('is-tapped');
 requestAnimationFrame(()=>hero.classList.add('is-tapped'));
}
response.addEventListener('click',respond);
hero.addEventListener('pointerdown',e=>{
 if(e.target.closest('a,button,nav'))return;
 const r=hero.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;
 if(x>.2&&x<.88&&y>.2&&y<.9)respond();
});
hero.addEventListener('pointermove',e=>{
 if(paused||!fine.matches)return;
 const r=hero.getBoundingClientRect();
 pointer.x=THREE.MathUtils.clamp((e.clientX-r.left)/r.width*2-1,-1,1);
 pointer.y=THREE.MathUtils.clamp((e.clientY-r.top)/r.height*2-1,-1,1);
 hero.style.setProperty('--mouse-x',(pointer.x*6).toFixed(2)+'px');
 hero.style.setProperty('--mouse-y',(pointer.y*3).toFixed(2)+'px');
 hero.style.setProperty('--mouse-yaw',(pointer.x*2).toFixed(2)+'deg');
});
hero.addEventListener('pointerleave',()=>{pointer={x:0,y:0};hero.style.setProperty('--mouse-x','0px');hero.style.setProperty('--mouse-y','0px');hero.style.setProperty('--mouse-yaw','0deg');});

async function start(){
 try{
  renderer=new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:'high-performance'});
  renderer.setClearColor(0x000000,0);
  renderer.setPixelRatio(Math.min(devicePixelRatio||1,1.5));
  renderer.outputColorSpace=THREE.SRGBColorSpace;
  renderer.toneMapping=THREE.NoToneMapping;
  renderer.domElement.className='wild-webgl';
  renderer.domElement.setAttribute('aria-hidden','true');
  visual.append(renderer.domElement);
  const scene=new THREE.Scene();
  const camera=new THREE.PerspectiveCamera(26,1,.1,100);
  const loader=new GLTFLoader();
  const loaded=await loader.loadAsync('/assets/wild-relief-rig-v1.glb');
  model=loaded.scene;
  model.traverse(object=>{
   if(!object.isMesh)return;
   object.frustumCulled=false;
   const materials=Array.isArray(object.material)?object.material:[object.material];
   for(const material of materials){material.depthWrite=false;if(material.map)material.map.anisotropy=Math.min(4,renderer.capabilities.getMaxAnisotropy());}
  });
  scene.add(model);
  head=model.getObjectByName('Head');spine=model.getObjectByName('Spine');
  mixer=new THREE.AnimationMixer(model);
  if(loaded.animations[0])mixer.clipAction(loaded.animations[0]).play();
  const resize=()=>{
   const r=visual.getBoundingClientRect();
   camera.aspect=r.width/Math.max(1,r.height);
   const distance=Math.max(20,8.1/(2*Math.tan(THREE.MathUtils.degToRad(camera.fov/2))*camera.aspect));
   camera.position.set(0,5.1,distance);camera.lookAt(0,5.1,0);camera.updateProjectionMatrix();
   renderer.setSize(r.width,r.height,false);
  };
  resize();
  const resizeObserver=new ResizeObserver(resize);resizeObserver.observe(visual);
  loop=now=>{
   const dt=Math.min(.05,Math.max(0,(now-last)/1000));last=now;
   const blend=1-Math.exp(-dt*5);
   smooth.x+=(pointer.x-smooth.x)*blend;smooth.y+=(pointer.y-smooth.y)*blend;
   if(!paused){
    mixer.update(dt);
    model.rotation.y=smooth.x*.10;
    model.rotation.x=smooth.y*.018;
    const age=now/1000-pulseAt;
    const nod=age>=0&&age<1.15?Math.sin(age/1.15*Math.PI)*.045:0;
    if(head){head.rotateY(smooth.x*.035);head.rotateX(smooth.y*.014+nod);}
    if(spine&&nod)spine.rotateZ(-nod*.12);
   }
   renderer.render(scene,camera);
  };
  await renderer.compileAsync(scene,camera);
  mixer.update(0);model.updateMatrixWorld(true);renderer.render(scene,camera);
  if(renderer.info.render.calls<1)throw new Error('No model draw calls');
  visual.dataset.renderer='webgl';
  visual.dataset.rig='image-relief';
  renderer.domElement.addEventListener('webglcontextlost',event=>{event.preventDefault();renderer.setAnimationLoop(null);visual.dataset.renderer='poster';});
  observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;last=performance.now();syncMotion();},{threshold:.02});observer.observe(hero);
  document.addEventListener('visibilitychange',()=>{last=performance.now();syncMotion();});
  syncMotion();
 }catch(error){
  if(renderer){renderer.setAnimationLoop(null);renderer.domElement.remove();renderer.dispose();}
  visual.dataset.renderer='poster';
  console.info('Character relief preview unavailable; poster motion retained.',error?.message);
 }
}
start();
