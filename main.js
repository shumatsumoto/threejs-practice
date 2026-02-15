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

// クリック判定用の透明な床
const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20),
  new THREE.MeshBasicMaterial({ visible: false }), // 見えない床
);
scene.add(plane);

const cube = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0x00ff00 }),
);
scene.add(cube);

camera.position.z = 10;

const targetPosition = new THREE.Vector3(); // 目標位置
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener("click", (event) => {
  // マウス座標を正規化
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  // レイキャスターを更新
  raycaster.setFromCamera(mouse, camera);

  // 交差するオブジェクトを取得
  const intersects = raycaster.intersectObject(plane);

  if (intersects.length > 0) {
    // 目標位置を更新
    targetPosition.copy(intersects[0].point);
  }
});

function animate() {
  requestAnimationFrame(animate);

  // --- ここでlerpを使って移動 ---
  cube.position.lerp(targetPosition, 0.05);

  renderer.render(scene, camera);
}
animate();
