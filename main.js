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

// 床
scene.add(new THREE.GridHelper(20, 20));

// プレイヤー
const player = new THREE.Group();
const body = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshNormalMaterial(),
);
const nose = new THREE.Mesh(
  new THREE.BoxGeometry(0.2, 0.2, 0.5),
  new THREE.MeshBasicMaterial({ color: 0x000000 }),
);
nose.position.set(0, 0, 0.6); // Z軸プラス方向を正面とする
player.add(body);
player.add(nose);
scene.add(player);

const keys = {};
document.addEventListener("keydown", (e) => (keys[e.code] = true));
document.addEventListener("keyup", (e) => (keys[e.code] = false));

camera.position.set(0, 10, 10);
camera.lookAt(0, 0, 0);

function animate() {
  requestAnimationFrame(animate);

  let dx = 0;
  let dz = 0;

  if (keys["ArrowUp"] || keys["KeyW"]) dz = -1; // 奥へ（Zマイナス）
  if (keys["ArrowDown"] || keys["KeyS"]) dz = 1;
  if (keys["ArrowLeft"] || keys["KeyA"]) dx = -1;
  if (keys["ArrowRight"] || keys["KeyD"]) dx = 1;

  if (dx !== 0 || dz !== 0) {
    // 移動
    const speed = 0.1;
    player.position.x += dx * speed;
    player.position.z += dz * speed;

    // 目標角度（Math.atan2は(y, x)だが、3DのXZ平面では(x, z)の順序に注意）
    // ここではZ軸プラスが正面(0度)としたい場合などの調整が必要
    // Math.atan2(dx, dz) でベクトル(dx, dz)の角度が得られる
    const targetAngle = Math.atan2(dx, dz);

    // クォータニオンでスムーズ回転
    const targetQuaternion = new THREE.Quaternion();
    targetQuaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), targetAngle);

    player.quaternion.slerp(targetQuaternion, 0.1);
  }

  // カメラ追従
  camera.position.x = player.position.x;
  camera.position.z = player.position.z + 10;

  renderer.render(scene, camera);
}
animate();
