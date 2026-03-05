import * as THREE from "three";
import { DragControls } from "three/examples/jsm/controls/DragControls";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf0f0f0);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// ライト
scene.add(new THREE.AmbientLight(0xaaaaaa));
const light = new THREE.SpotLight(0xffffff);
light.position.set(0, 25, 50);
light.angle = Math.PI / 5;
light.penumbra = 0.2;
light.decay = 2;
light.distance = 200;
light.castShadow = true;
scene.add(light);

// オブジェクト生成
const objects = [];
const geometry = new THREE.BoxGeometry(1, 1, 1);

for (let i = 0; i < 5; i++) {
  const material = new THREE.MeshLambertMaterial({
    color: Math.random() * 0xffffff,
  });
  const mesh = new THREE.Mesh(geometry, material);

  mesh.position.x = (Math.random() - 0.5) * 10;
  mesh.position.y = (Math.random() - 0.5) * 6;
  mesh.position.z = (Math.random() - 0.5) * 4;

  mesh.castShadow = true;
  mesh.receiveShadow = true;

  scene.add(mesh);
  objects.push(mesh);
}

// OrbitControls（カメラ操作用）
const orbitControls = new OrbitControls(camera, renderer.domElement);

// DragControls（オブジェクト操作用）
const dragControls = new DragControls(objects, camera, renderer.domElement);

// イベントリスナー
dragControls.addEventListener("dragstart", function (event) {
  // ドラッグ中はカメラ操作を無効化
  orbitControls.enabled = false;
  // 色を変えて掴んでいることを強調
  event.object.material.emissive.set(0xaaaaaa);
});

dragControls.addEventListener("dragend", function (event) {
  // ドラッグ終了でカメラ操作を有効化
  orbitControls.enabled = true;
  // 色を戻す
  event.object.material.emissive.set(0x000000);
});

camera.position.z = 10;

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
