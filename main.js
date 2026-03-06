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

const player = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshNormalMaterial(),
);
scene.add(player);

const wall = new THREE.Mesh(
  new THREE.BoxGeometry(2, 2, 2),
  new THREE.MeshBasicMaterial({ color: 0xff0000 }),
);
wall.position.set(3, 0, 0);
scene.add(wall);

// 境界ボックスのヘルパー（可視化用）
const playerBoxHelper = new THREE.BoxHelper(player, 0xffff00);
scene.add(playerBoxHelper);
const wallBoxHelper = new THREE.BoxHelper(wall, 0xff00ff);
scene.add(wallBoxHelper);

const keys = {};
document.addEventListener("keydown", (e) => (keys[e.code] = true));
document.addEventListener("keyup", (e) => (keys[e.code] = false));

camera.position.set(0, 10, 0);
camera.lookAt(0, 0, 0);

function animate() {
  requestAnimationFrame(animate);

  let dx = 0;
  let dz = 0;
  if (keys["ArrowUp"]) dz = -0.1;
  if (keys["ArrowDown"]) dz = 0.1;
  if (keys["ArrowLeft"]) dx = -0.1;
  if (keys["ArrowRight"]) dx = 0.1;

  if (dx !== 0 || dz !== 0) {
    // 移動後の位置を計算（実際にはまだ動かさない）
    const nextPosition = player.position
      .clone()
      .add(new THREE.Vector3(dx, 0, dz));

    // 移動後のボックスを作成
    const tempBox = new THREE.Box3().setFromObject(player);
    // Box3はワールド座標系なので、移動分を適用する
    tempBox.translate(new THREE.Vector3(dx, 0, dz));

    // 壁のボックス
    const wallBox = new THREE.Box3().setFromObject(wall);

    // 衝突判定
    if (!tempBox.intersectsBox(wallBox)) {
      // 衝突しないなら移動
      player.position.copy(nextPosition);
    } else {
      // 衝突！
      console.log("Hit!");
    }
  }

  playerBoxHelper.update();

  renderer.render(scene, camera);
}
animate();
