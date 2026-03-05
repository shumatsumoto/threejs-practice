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
player.position.y = 0.5;
scene.add(player);

const ground = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20),
  new THREE.MeshBasicMaterial({ color: 0x555555 }),
);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

let velocityY = 0;
const gravity = 0.01;
const jumpPower = 0.3;
let onGround = true;

document.addEventListener("keydown", (e) => {
  if (e.code === "Space" && onGround) {
    velocityY = jumpPower;
    onGround = false;
  }
});

camera.position.set(0, 5, 10);
camera.lookAt(0, 0, 0);

function animate() {
  requestAnimationFrame(animate);

  // 重力適用
  velocityY -= gravity;
  player.position.y += velocityY;

  // 接地判定
  if (player.position.y <= 0.5) {
    player.position.y = 0.5;
    velocityY = 0;
    onGround = true;
  } else {
    onGround = false;
  }

  renderer.render(scene, camera);
}
animate();
