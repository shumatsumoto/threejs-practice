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

// 太陽（中央）
const sunGeo = new THREE.SphereGeometry(1, 32, 16);
const sunMat = new THREE.MeshBasicMaterial({
  color: 0xff0000,
  wireframe: true,
});
const sun = new THREE.Mesh(sunGeo, sunMat);
scene.add(sun);

// --- ここでグループと地球を作成してください ---
const earthGroup = new THREE.Group();
scene.add(earthGroup);

const earthGeo = new THREE.SphereGeometry(0.5, 32, 16);
const earthMat = new THREE.MeshBasicMaterial({
  color: 0x0000ff,
  wireframe: true,
});
const earth = new THREE.Mesh(earthGeo, earthMat);
earth.position.x = 4;
earthGroup.add(earth);
earthGroup.add(sun);

camera.position.z = 10;

function animate() {
  requestAnimationFrame(animate);

  // --- ここでグループを回転させてください ---
  earthGroup.rotation.y += 0.03;

  renderer.render(scene, camera);
}
animate();
