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

const geometry = new THREE.BoxGeometry(2, 2, 2);

// --- ここで6つのマテリアルを作成し、配列にしてください ---
const materials = [
  new THREE.MeshBasicMaterial({ color: 0xff0000 }), // 赤
  new THREE.MeshBasicMaterial({ color: 0x00ff00 }), // 緑
  new THREE.MeshBasicMaterial({ color: 0x0000ff }), // 青
  new THREE.MeshBasicMaterial({ color: 0xffff00 }), // 黄
  new THREE.MeshBasicMaterial({ color: 0xff00ff }), // マゼンタ
  new THREE.MeshBasicMaterial({ color: 0x00ffff }), // シアン
];

const cube = new THREE.Mesh(geometry, materials);
scene.add(cube);



// --- ここで配列を使ってメッシュを作成 ---

camera.position.z = 5;

function animate() {
  requestAnimationFrame(animate);
  // 回転
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();