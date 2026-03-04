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

const count = 2000;
const geometry = new THREE.BufferGeometry();
const positions = new Float32Array(count * 3);
geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

const material = new THREE.PointsMaterial({ size: 0.05, color: 0x00ffff });
const particles = new THREE.Points(geometry, material);
scene.add(particles);

// ターゲット座標
const boxPositions = [];
const spherePositions = [];

// 座標計算
for (let i = 0; i < count; i++) {
  // Box (ランダムに内部または表面)
  boxPositions.push(
    (Math.random() - 0.5) * 3,
    (Math.random() - 0.5) * 3,
    (Math.random() - 0.5) * 3,
  );

  // Sphere (半径2の球面上)
  const phi = Math.acos(-1 + (2 * i) / count);
  const theta = Math.sqrt(count * Math.PI) * phi;
  const r = 2;
  spherePositions.push(
    r * Math.cos(theta) * Math.sin(phi),
    r * Math.sin(theta) * Math.sin(phi),
    r * Math.cos(phi),
  );

  // 初期位置はBox
  positions[i * 3] = boxPositions[i * 3];
  positions[i * 3 + 1] = boxPositions[i * 3 + 1];
  positions[i * 3 + 2] = boxPositions[i * 3 + 2];
}

let useSphere = false;

// クリックで切り替え
window.addEventListener("click", () => {
  useSphere = !useSphere;
});

camera.position.z = 6;

function animate() {
  requestAnimationFrame(animate);

  const target = useSphere ? spherePositions : boxPositions;
  const current = geometry.attributes.position.array;

  // 補間アニメーション
  for (let i = 0; i < count * 3; i++) {
    current[i] += (target[i] - current[i]) * 0.05;
  }

  geometry.attributes.position.needsUpdate = true;

  particles.rotation.y += 0.002;

  renderer.render(scene, camera);
}
animate();
