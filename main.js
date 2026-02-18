import * as THREE from "three";

const scene = new THREE.Scene();

// 1. 背景色の設定
const color = 0xcccccc;
scene.background = new THREE.Color(color);

// 2. フォグの設定
// Fog(色, 開始距離, 終了距離)
// 10m先から霧がかかり始め、30m先で完全に見えなくなる
scene.fog = new THREE.Fog(color, 10, 30);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// キューブを奥に向かって配置
for (let i = 0; i < 30; i++) {
  const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0x00ff00 })
  );
  cube.position.z = -i * 1.5; // 1.5m間隔で奥へ
  cube.position.x = Math.sin(i) * 5; // 左右に大きく散らす
  scene.add(cube);
}

camera.position.z = 5;

function animate() {
  requestAnimationFrame(animate);

  // カメラを少しずつ前進させる演出
  camera.position.z -= 0.05;

  renderer.render(scene, camera);
}
animate();