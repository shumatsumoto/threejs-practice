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

// --- ここから記述してください ---

// 1. 球体ジオメトリを作成
const geometry = new THREE.SphereGeometry(1, 16, 16);

// 2. 青色のワイヤーフレームマテリアルを作成
const material = new THREE.MeshBasicMaterial({
  color: 0x0000ff,
  wireframe: true,
});

// 3. メッシュを作成してシーンに追加
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// --- ここまで ---

camera.position.z = 5;
renderer.render(scene, camera);