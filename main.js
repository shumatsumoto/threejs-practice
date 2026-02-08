import * as THREE from "three";

// STEP 1: シーンを作成
const scene = new THREE.Scene();

// STEP 2: カメラを作成
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;

// STEP 3: レンダラーを作成
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

// STEP 4: レンダラーをDOMに追加
document.body.appendChild(renderer.domElement);


// 1. ジオメトリ（形状）を作成
const geometry = new THREE.BoxGeometry(1, 1, 1);

// 2. マテリアル（材質）を作成
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

// 3. メッシュ（物体）を作成
const cube = new THREE.Mesh(geometry, material);

// 4. シーンに追加
scene.add(cube);

// 5. カメラの位置を調整
camera.position.z = 5;

// STEP 5: 描画を実行
renderer.render(scene, camera);