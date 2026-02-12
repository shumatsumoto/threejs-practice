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

const geometry = new THREE.BoxGeometry(2, 2, 2);

// --- ここでWireframeGeometryを使って線画を作成してください ---

camera.position.z = 5;

function animate() {
  requestAnimationFrame(animate);
  // 回転させる（変数名は適宜変更）
  // line.rotation.x += 0.01;
  // line.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();
