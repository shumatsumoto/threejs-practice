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
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

// --- ここでRaycasterなどの準備 ---
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener("click", (event) => {
  // --- ここでクリック判定処理を記述 ---

  // マウス座標を正規化
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  // Raycasterを更新
  raycaster.setFromCamera(mouse, camera);

  // オブジェクトとの交差を計算
  const intersects = raycaster.intersectObjects(scene.children);
  if (intersects.length > 0) {
    console.log("オブジェクトがクリックされました:", intersects[0].object);
    // ここでクリックされたオブジェクトに対する処理を行うことができます
    intersects[0].object.material.color.set(Math.random() * 0xffffff); // 例: クリックされたオブジェクトの色をランダムに変更
  }
});

function animate() {
  requestAnimationFrame(animate);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
}
animate();
