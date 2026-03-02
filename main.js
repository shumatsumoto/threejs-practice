import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

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

const controls = new OrbitControls(camera, renderer.domElement);

const loader = new THREE.TextureLoader();
// 環境マップ用画像
const texture = loader.load(
  "https://threejs.org/examples/textures/2294472375_24a3b8ef46_o.jpg"
);

// --- ここでマッピングモードを変更 ---
texture.mapping = THREE.EquirectangularReflectionMapping;

scene.background = texture;

// --- ここでマテリアル作成 ---
const material = new THREE.MeshBasicMaterial({ 
  envMap: texture,
  combine: THREE.MixOperation,
  reflectivity: 0.9
}); 
material.refractionRatio = 0.98;

const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(2, 32, 32),
  material
);
scene.add(sphere);

camera.position.z = 5;

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();