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

// 地面
const ground = new THREE.Mesh(
  new THREE.PlaneGeometry(100, 100),
  new THREE.MeshBasicMaterial({ color: 0x228822 }),
);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

// グリッド（移動感のため）
const grid = new THREE.GridHelper(100, 20);
scene.add(grid);

// 環境オブジェクト（木やビルに見立てた箱）をランダム配置
const boxGeo = new THREE.BoxGeometry(2, 5, 2);
const boxMat = new THREE.MeshNormalMaterial();
for (let i = 0; i < 50; i++) {
  const box = new THREE.Mesh(boxGeo, boxMat);
  box.position.set((Math.random() - 0.5) * 80, 2.5, (Math.random() - 0.5) * 80);
  scene.add(box);
}

// 車
const car = new THREE.Mesh(
  new THREE.BoxGeometry(1, 0.5, 2),
  new THREE.MeshNormalMaterial(),
);
scene.add(car);

let speed = 0;
let angle = 0;
const keys = {};

document.addEventListener("keydown", (e) => (keys[e.code] = true));
document.addEventListener("keyup", (e) => (keys[e.code] = false));

camera.position.set(0, 10, 10);

function animate() {
  requestAnimationFrame(animate);

  // 加速・減速
  if (keys["ArrowUp"]) speed += 0.01;
  if (keys["ArrowDown"]) speed -= 0.01;

  // 旋回（動いている時だけ）
  if (Math.abs(speed) > 0.001) {
    if (keys["ArrowLeft"]) angle += 0.03;
    if (keys["ArrowRight"]) angle -= 0.03;
  }

  // 摩擦
  speed *= 0.96;

  // 移動反映
  car.rotation.y = angle;
  car.position.x += Math.sin(angle) * speed;
  car.position.z += Math.cos(angle) * speed;

  // カメラ追従（簡易的）
  camera.position.x = car.position.x;
  camera.position.z = car.position.z + 10;
  camera.lookAt(car.position);

  renderer.render(scene, camera);
}
animate();
