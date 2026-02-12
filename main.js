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

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// 床（光の当たり方がわかりやすいように）
const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(10, 10),
  new THREE.MeshStandardMaterial({ color: 0xaaaaaa }),
);
plane.rotation.x = -Math.PI / 2;
plane.position.y = -1;
scene.add(plane);

camera.position.set(0, 2, 5);
camera.lookAt(0, 0, 0);

// --- ここでSpotLightとHelperを追加してください ---
const spotLight = new THREE.SpotLight(0xffffff, 10);

scene.add(spotLight);

const spotLightHelper = new THREE.SpotLightHelper(spotLight);
spotLight.position.set(0, 5, 0);
spotLight.angle = Math.PI / 6;
spotLight.penumbra = 0.2;
scene.add(spotLightHelper);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // 環境光
scene.add(ambientLight);

// --- ここまで ---

function animate() {
  requestAnimationFrame(animate);
  cube.rotation.y += 0.01;
  spotLightHelper.update();
  renderer.render(scene, camera);
}
animate();
