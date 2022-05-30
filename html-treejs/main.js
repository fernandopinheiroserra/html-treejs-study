import './style.css'

import * as THREE from 'three'


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
const material = new THREE.MeshBasicMaterial({color:0xFF6347, wireframe: true});
const tetra = new THREE.Mesh( geometry, material);

scene.add(tetra)

//renderer.render(scene, camera);

function animate() {
  requestAnimationFrame(animate);

  tetra.rotation.x += 0.01;
  tetra.rotation.y += 0.005;
  tetra.rotation.z += 0.01;

  renderer.render(scene, camera);
}

animate()