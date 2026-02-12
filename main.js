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
// --- ここでレンダラーの影を有効にしてください ---
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

// ライト
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 5, 5);
// --- ここでライトの影を有効にしてください ---
light.castShadow = true;
scene.add(light);

// キューブ
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
// --- ここでキューブが影を落とすように設定してください ---
cube.castShadow = true;
scene.add(cube);

// 床
const planeGeo = new THREE.PlaneGeometry(10, 10);
const planeMat = new THREE.MeshStandardMaterial({ color: 0xaaaaaa });
const plane = new THREE.Mesh(planeGeo, planeMat);
plane.rotation.x = -Math.PI / 2; // 水平にする
plane.position.y = -1; // キューブの下へ
// --- ここで床が影を受けるように設定してください ---
plane.receiveShadow = true;
scene.add(plane);

camera.position.z = 5;
camera.position.y = 2;
camera.lookAt(0, 0, 0);

function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();
