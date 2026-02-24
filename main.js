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

const geometry = new THREE.BufferGeometry();
const vertices = new Float32Array([
  -1.0, -1.0, 0.0, 1.0, -1.0, 0.0, 0.0, 1.0, 0.0,
]);
geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));

// --- ここで頂点カラーを設定 ---
// const colors = new Float32Array([ ... ]);
// geometry.setAttribute('color', ...);

// --- ここで頂点カラーを設定 ---
const colors = new Float32Array([
  1.0, 0.0, 0.0, // 赤
  0.0, 1.0, 0.0, // 緑
  0.0, 0.0, 1.0, // 青
]);
geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

// --- マテリアルで vertexColors: true を有効化 ---
const material = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, vertexColors: true });

const triangle = new THREE.Mesh(geometry, material);
scene.add(triangle);

camera.position.z = 5;

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();