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

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 10;

// --- ここで位置を変更してください ---
// cube.position.x = 5;
// cube.position.y = 5;
// cube.position.z = 3;
cube.position.set(5, 5, 3);

// 軸を表示するためのヘルパーを追加
const axesHelper = new THREE.AxesHelper(50);
scene.add(axesHelper);

// --- ここまで ---

renderer.render(scene, camera);