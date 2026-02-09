/* ================================
   HERO 3D OBJECT
================================ */

const container = document.getElementById("hero3d");

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  60,
  container.clientWidth/container.clientHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({alpha:true});
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);
renderer.domElement.style.position = "absolute";
renderer.domElement.style.top = 0;
renderer.domElement.style.left = 0;



/* Geometry */

const geo = new THREE.IcosahedronGeometry(1.6,1);
const mat = new THREE.MeshStandardMaterial({
  color:0x9f6bff,
  metalness:0.7,
  roughness:0.2
});

const mesh = new THREE.Mesh(geo, mat);
scene.add(mesh);


/* Lights */

const light1 = new THREE.PointLight(0xffffff,1.2);
light1.position.set(5,5,5);
scene.add(light1);

const light2 = new THREE.PointLight(0x6df0ff,1);
light2.position.set(-5,-3,4);
scene.add(light2);

camera.position.z = 4;


/* Mouse interaction */

let targetX=0;
let targetY=0;

document.addEventListener("mousemove",e=>{
  targetX = (e.clientX/window.innerWidth-0.5)*2;
  targetY = (e.clientY/window.innerHeight-0.5)*2;
});


/* Animation */

function animate(){

  mesh.rotation.y += 0.004;

  mesh.rotation.x += (targetY - mesh.rotation.x)*0.05;
  mesh.rotation.y += (targetX - mesh.rotation.y)*0.05;

  renderer.render(scene,camera);

  requestAnimationFrame(animate);
}

animate();


/* Responsive */

window.addEventListener("resize",()=>{
  renderer.setSize(container.clientWidth, container.clientHeight);
  camera.aspect =
    container.clientWidth/container.clientHeight;
  camera.updateProjectionMatrix();
});
