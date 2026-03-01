import * as THREE from "three";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 周囲の物体
const box = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshNormalMaterial()
);
box.position.set(3, 0, 0);
scene.add(box);

// --- CubeCamera設定 ---
const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(256);
const cubeCamera = new THREE.CubeCamera(0.1, 1000, cubeRenderTarget);
scene.add(cubeCamera);

// 鏡の球体
const material = new THREE.MeshStandardMaterial({ envMap: cubeRenderTarget.texture, metalness: 1, roughness: 0 });

const sphere = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 32), material);
scene.add(sphere);


camera.position.z = 5;

function animate() {
  requestAnimationFrame(animate);

  // 周囲の物体を動かす
  box.position.x = Math.sin(Date.now() * 0.001) * 3;
  box.position.z = Math.cos(Date.now() * 0.001) * 3;

  // --- ここでCubeCamera更新 ---
  sphere.visible = false; // 鏡の球体を一時的に非表示
  cubeCamera.position.copy(sphere.position); // 鏡の位置にCubeCameraを配置
  cubeCamera.update(renderer, scene); // シーンをレンダリングして環境マップを更新
  sphere.visible = true; // 鏡の球体を再表示

  renderer.render(scene, camera);
}
animate();