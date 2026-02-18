import * as THREE from "three";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  2000
); // Farを大きく
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// --- ここで星空を作成してください ---
const starCount = 5000;
const stars = new THREE.BufferGeometry();
const starPositions = [];

for (let i = 0; i < starCount; i++) {
  starPositions.push((Math.random() - 0.5) * 2000);
  starPositions.push((Math.random() - 0.5) * 2000);
  starPositions.push((Math.random() - 0.5) * 2000);
}

stars.setAttribute("position", new THREE.Float32BufferAttribute(starPositions, 3));

const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 1 });
const starSystem = new THREE.Points(stars, starMaterial);
scene.add(starSystem);

camera.position.z = 5;

function animate() {
  requestAnimationFrame(animate);
  // 星空を回転
  starSystem.rotation.y += 0.0001;

  renderer.render(scene, camera);
}
animate();