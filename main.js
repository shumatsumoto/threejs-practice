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

// STEP 5: 描画を実行
renderer.render(scene, camera);