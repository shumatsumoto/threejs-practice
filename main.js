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

const bullets = [];
const enemies = [];

// プレイヤー（自機）
const player = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshNormalMaterial(),
);
player.position.set(0, 0, 4);
scene.add(player);

// キー状態管理
const keys = {};
document.addEventListener("keydown", (e) => (keys[e.code] = true));
document.addEventListener("keyup", (e) => (keys[e.code] = false));

// 弾発射
document.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    const geometry = new THREE.SphereGeometry(0.1);
    const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    const bullet = new THREE.Mesh(geometry, material);
    // 自機の位置から発射
    bullet.position.copy(player.position);
    scene.add(bullet);
    bullets.push(bullet);
  }
});

// 敵生成
setInterval(() => {
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
  const enemy = new THREE.Mesh(geometry, material);
  enemy.position.set((Math.random() - 0.5) * 10, 0, -20);
  scene.add(enemy);
  enemies.push(enemy);
}, 1000);

camera.position.set(0, 5, 10);
camera.lookAt(0, 0, 0);

function animate() {
  requestAnimationFrame(animate);

  // 自機の移動
  if (keys["ArrowLeft"]) player.position.x -= 0.1;
  if (keys["ArrowRight"]) player.position.x += 0.1;

  // 弾の移動
  for (let i = bullets.length - 1; i >= 0; i--) {
    const b = bullets[i];
    b.position.z -= 0.5; // 奥へ

    // 画面外削除
    if (b.position.z < -30) {
      scene.remove(b);
      bullets.splice(i, 1);
    }
  }

  // 敵の移動と衝突判定
  for (let i = enemies.length - 1; i >= 0; i--) {
    const e = enemies[i];
    e.position.z += 0.1; // 手前へ

    // 衝突判定
    for (let j = bullets.length - 1; j >= 0; j--) {
      const b = bullets[j];
      if (e.position.distanceTo(b.position) < 0.8) {
        // ヒット
        scene.remove(e);
        scene.remove(b);
        enemies.splice(i, 1);
        bullets.splice(j, 1);
        break; // この敵は消えたのでループ抜ける
      }
    }

    // 画面外削除
    if (e.position.z > 10) {
      scene.remove(e);
      enemies.splice(i, 1);
    }
  }

  renderer.render(scene, camera);
}
animate();
