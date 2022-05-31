import './style.css'

import * as THREE from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


//always need:
// 1 - Scene
// 1.1 - scene == container 

// 2 - Camera
// 3 - Renderer
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'), 
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

//adding objects
// 1- geometry

const geometry = new THREE.TetrahedronGeometry(10,0)
const material = new THREE.MeshStandardMaterial({color:0xFF6347});
const tetra = new THREE.Mesh( geometry, material);

scene.add(tetra)

const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(20,5,5)

const ambientLight = new THREE.AmbientLight(0xffffff)
scene.add(pointLight, ambientLight)

//where is the light?

const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200, 50);
//scene.add(lightHelper, gridHelper)

const controls = new OrbitControls(camera, renderer.domElement);

//renderer.render(scene, camera);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.07, 24, 24);
  const material = new THREE.MeshLambertMaterial({color: 0xffffff})
  const star = new THREE.Mesh(geometry, material);

  const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x,y,z);
  scene.add(star)
}

Array(200).fill().forEach(addStar)

const spaceTexture = new THREE.TextureLoader().load('bg1.webp');
scene.background = spaceTexture;


function animate() {
  requestAnimationFrame(animate);

  tetra.rotation.x += 0.01;
  tetra.rotation.y += 0.005;
  tetra.rotation.z += 0.01;

  controls.update();

  renderer.render(scene, camera);
}

animate()