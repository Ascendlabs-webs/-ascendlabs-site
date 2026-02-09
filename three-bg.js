/* ================================
   THREE.JS BACKGROUND SCENE
================================ */

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth/window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({alpha:true});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.domElement.style.position = "fixed";
renderer.domElement.style.top = 0;
renderer.domElement.style.left = 0;
renderer.domElement.style.zIndex = "-2";

document.body.appendChild(renderer.domElement);


/* ================================
   PARTICLE FIELD
================================ */

const particles = 2000;
const geometry = new THREE.BufferGeometry();

const positions = new Float32Array(particles * 3);

for(let i=0;i<particles*3;i++){
  positions[i] = (Math.random()-0.5)*80;
}

geometry.setAttribute(
  'position',
  new THREE.BufferAttribute(positions,3)
);

const material = new THREE.PointsMaterial({
  color:0x6df0ff,
  size:0.06
});

const points = new THREE.Points(geometry, material);
scene.add(points);

camera.position.z = 25;


/* ================================
   ANIMATION LOOP
================================ */

function animate(){
  requestAnimationFrame(animate);

  points.rotation.y += 0.0006;
  points.rotation.x += 0.0003;

  renderer.render(scene,camera);
}

animate();


/* ================================
   RESPONSIVE
================================ */

window.addEventListener("resize", ()=>{
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
