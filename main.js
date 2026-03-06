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

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

const gridSize = 3;
const cubes = []; // 1次元配列で管理して、インデックス計算で隣接を求める

// 初期化
for (let i = 0; i < gridSize * gridSize; i++) {
  const geometry = new THREE.BoxGeometry(0.8, 0.8, 0.1);
  const material = new THREE.MeshBasicMaterial({ color: 0xff0000 }); // 赤
  const mesh = new THREE.Mesh(geometry, material);

  const x = (i % gridSize) - 1;
  const y = Math.floor(i / gridSize) - 1;

  mesh.position.set(x, y, 0);
  mesh.userData = { index: i, active: false }; // 状態を持たせる

  scene.add(mesh);
  cubes.push(mesh);
}

function toggle(index) {
  if (index < 0 || index >= cubes.length) return;

  const mesh = cubes[index];
  mesh.userData.active = !mesh.userData.active;
  mesh.material.color.set(mesh.userData.active ? 0x0000ff : 0xff0000);
}

window.addEventListener("click", (event) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(cubes);

  if (intersects.length > 0) {
    const index = intersects[0].object.userData.index;
    const x = index % gridSize;
    const y = Math.floor(index / gridSize);

    toggle(index); // 自分
    if (x > 0) toggle(index - 1); // 左
    if (x < gridSize - 1) toggle(index + 1); // 右
    if (y > 0) toggle(index - gridSize); // 下
    if (y < gridSize - 1) toggle(index + gridSize); // 上
  }
});

camera.position.z = 5;

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
