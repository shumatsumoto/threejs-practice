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

const data = [10, 50, 30, 80, 20, 90, 40, 60, 100, 10];

// 基準となるジオメトリ（高さ1）
// 底面を原点に合わせるためにY方向に0.5ずらす
const geometry = new THREE.BoxGeometry(0.8, 1, 0.8);
geometry.translate(0, 0.5, 0);

data.forEach((value, index) => {
  // 値に応じて色を変える（0〜100を0〜1に正規化してHSLで設定）
  const color = new THREE.Color();
  const normalized = value / 100;
  color.setHSL(0.7 - normalized * 0.7, 1.0, 0.5); // 青(0.7) -> 赤(0.0)

  const material = new THREE.MeshBasicMaterial({ color: color });
  const bar = new THREE.Mesh(geometry, material);

  // 位置
  bar.position.x = index * 1.2;

  // 高さ（スケール）
  bar.scale.y = value * 0.1; // 見やすい大きさに調整

  scene.add(bar);
});

// グリッド
scene.add(new THREE.GridHelper(20, 20));

camera.position.set(5, 10, 15);
camera.lookAt(5, 0, 0);

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
