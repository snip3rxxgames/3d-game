const keys = {
  w: false,
  a: false,
  s: false,
  d: false
};

document.addEventListener('keydown', (e) => {
  if (keys[e.key.toLowerCase()] !== undefined) keys[e.key.toLowerCase()] = true;
});

document.addEventListener('keyup', (e) => {
  if (keys[e.key.toLowerCase()] !== undefined) keys[e.key.toLowerCase()] = false;
});

import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';

// SCENE
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x001f1f); // jungle color

// CAMERA
const camera = new THREE.PerspectiveCamera(
  75, window.innerWidth / window.innerHeight, 0.1, 1000
);
camera.position.z = 5;

// RENDERER
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('gameCanvas') });
renderer.setSize(window.innerWidth, window.innerHeight);

// LIGHT
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 7.5);
scene.add(light);

// PLAYER (a box for now)
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshStandardMaterial({ color: 0x00ff88 });
const player = new THREE.Mesh(geometry, material);
scene.add(player);

// Ground plane
const groundGeo = new THREE.PlaneGeometry(100, 100);
const groundMat = new THREE.MeshStandardMaterial({ color: 0x113322 });
const ground = new THREE.Mesh(groundGeo, groundMat);
ground.rotation.x = -Math.PI / 2; // Rotate to be flat
scene.add(ground);


// RESIZE HANDLING
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// ANIMATION
function animate() {
  requestAnimationFrame(animate);
  player.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();
