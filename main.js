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

camera.position.z = 5;

function animate() {
  requestAnimationFrame(animate);
  // 回転させると綺麗です
  // particles.rotation.y += 0.002;
  renderer.render(scene, camera);
}
animate();
