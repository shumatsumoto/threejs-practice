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

// --- ここでスカイボックスを作成 ---
const loader = new THREE.CubeTextureLoader();
const path = "https://threejs.org/examples/textures/cube/Bridge2/";
const urls = [
  "posx.jpg",
  "negx.jpg",
  "posy.jpg",
  "negy.jpg",
  "posz.jpg",
  "negz.jpg",
];
const texture = loader.load(urls.map(url => path + url));
scene.background = texture; // スカイボックスを背景に設定

camera.position.z = 5;

function animate() {
  requestAnimationFrame(animate);
  // カメラを回して確認
  camera.rotation.y += 0.002;
  renderer.render(scene, camera);
}
animate();