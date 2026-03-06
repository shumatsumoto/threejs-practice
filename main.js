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

scene.add(new THREE.GridHelper(20, 20));

const player = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshNormalMaterial(),
);
scene.add(player);

let theta = 0; // 水平角度
let phi = 60 * (Math.PI / 180); // 垂直角度
const radius = 10;

let isDragging = false;
let prevMouse = { x: 0, y: 0 };

document.addEventListener("mousedown", (e) => {
  isDragging = true;
  prevMouse = { x: e.clientX, y: e.clientY };
});

document.addEventListener("mouseup", () => (isDragging = false));

document.addEventListener("mousemove", (e) => {
  if (isDragging) {
    const deltaX = e.clientX - prevMouse.x;
    const deltaY = e.clientY - prevMouse.y;

    theta -= deltaX * 0.01;
    phi -= deltaY * 0.01;

    // 制限
    phi = Math.max(0.1, Math.min(Math.PI - 0.1, phi));

    prevMouse = { x: e.clientX, y: e.clientY };
  }
});

function animate() {
  requestAnimationFrame(animate);

  // プレイヤーが勝手に動くデモ
  player.position.x = Math.sin(Date.now() * 0.001) * 5;

  // カメラ位置計算（球座標）
  // プレイヤー位置を基準にする
  const ox = radius * Math.sin(phi) * Math.sin(theta);
  const oy = radius * Math.cos(phi);
  const oz = radius * Math.sin(phi) * Math.cos(theta);

  camera.position.set(
    player.position.x + ox,
    player.position.y + oy,
    player.position.z + oz,
  );

  camera.lookAt(player.position);

  renderer.render(scene, camera);
}
animate();
