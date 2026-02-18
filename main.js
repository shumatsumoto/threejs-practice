import * as THREE from "three";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// --- ここでパーティクルを作成してください ---
const particleCount = 1000;
const particles = new THREE.BufferGeometry();
const positions = [];

for (let i = 0; i < particleCount; i++) {
  positions.push((Math.random() - 0.5) * 10);
  positions.push((Math.random() - 0.5) * 10);
  positions.push((Math.random() - 0.5) * 10);
}

particles.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));

const particleMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.1 });
const particleSystem = new THREE.Points(particles, particleMaterial);
scene.add(particleSystem);

camera.position.z = 5;

function animate() {
  requestAnimationFrame(animate);
  // 回転させると綺麗です
  particleSystem.rotation.y += 0.002;
  renderer.render(scene, camera);
}
animate();
