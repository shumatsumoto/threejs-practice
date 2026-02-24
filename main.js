import * as THREE from "three";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// --- ここでジオメトリとパーティクルを作成 ---
// const geometry = new THREE.BufferGeometry();
// const count = 1000;
// const positions = new Float32Array(count * 3);
// ...

const geometry = new THREE.BufferGeometry();
const count = 1000;
const positions = new Float32Array(count * 3);
for (let i = 0; i < count * 3; i++) {
  positions[i] = (Math.random() - 0.5) * 10;
}
geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

const material = new THREE.PointsMaterial({ color: 0xffffff, size: 0.1 });
const points = new THREE.Points(geometry, material);
scene.add(points);

camera.position.z = 15;

function animate() {
  requestAnimationFrame(animate);
  // 回転させると綺麗
  points.rotation.x += 0.01;
  points.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();