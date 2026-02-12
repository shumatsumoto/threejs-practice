import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

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

// カメラ動かせるようにする
const controls = new OrbitControls(camera, renderer.domElement);

// --- ここでテクスチャを読み込んでください ---
// 画像URL例: 'https://threejs.org/examples/textures/crate.gif'

// --- ここで平面を作成し、テクスチャを貼り付けてください ---

const textureLoader = new THREE.TextureLoader();
textureLoader.load(
  "https://threejs.org/examples/textures/crate.gif",
  (texture) => {
    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);
  },
);

camera.position.z = 5;

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  controls.update();
}
animate();
