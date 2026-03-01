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

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 5, 5);
scene.add(light);

// --- ここでフラットシェーディングのマテリアルを作成 ---
const material = new THREE.MeshStandardMaterial({ ... THREE.MeshStandardMaterial.prototype, flatShading: true });

const mesh = new THREE.Mesh(new THREE.IcosahedronGeometry(2, 1), material);
scene.add(mesh);

camera.position.z = 5;

function animate() {
  requestAnimationFrame(animate);
  mesh.rotation.x += 0.005;
  mesh.rotation.y += 0.005;
  renderer.render(scene, camera);
}
animate();