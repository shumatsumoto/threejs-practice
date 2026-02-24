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

const material = new THREE.MeshNormalMaterial({ wireframe: true });
const lod = new THREE.LOD();

// レベル1: 高精細（距離0以上）
const geoHigh = new THREE.IcosahedronGeometry(2, 3);
const meshHigh = new THREE.Mesh(geoHigh, material);
lod.addLevel(meshHigh, 0);

// レベル2: 中程度（距離10以上）
const geoMed = new THREE.IcosahedronGeometry(2, 1);
const meshMed = new THREE.Mesh(geoMed, material);
lod.addLevel(meshMed, 10);

// レベル3: 低精細（距離20以上）
const geoLow = new THREE.IcosahedronGeometry(2, 0);
const meshLow = new THREE.Mesh(geoLow, material);
lod.addLevel(meshLow, 20);

scene.add(lod);

camera.position.z = 30;

function animate() {
  requestAnimationFrame(animate);

  // カメラを自動で前後に移動
  // 距離が変化すると、ポリゴンの細かさが変わるのがわかる
  camera.position.z = 15 + Math.sin(Date.now() * 0.001) * 12;

  renderer.render(scene, camera);
}
animate();