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

// --- ここで円柱を作成してください ---
const geometry = new THREE.CylinderGeometry(0, 1, 1, 32);
const material = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
  wireframe: true,
});
const cylinder = new THREE.Mesh(geometry, material);
scene.add(cylinder);

camera.position.z = 5;

function animate() {
  requestAnimationFrame(animate);
  // 回転
  cylinder.rotation.x += 0.01;
  cylinder.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();
