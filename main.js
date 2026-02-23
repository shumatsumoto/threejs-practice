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

// 1. Canvasの作成と描画
const canvas = document.createElement("canvas");
canvas.width = 256;
canvas.height = 256;
const ctx = canvas.getContext("2d");

// --- ここでCanvasに背景と文字を描画してください ---
ctx.fillStyle = "blue";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.fillStyle = "white";
ctx.font = "28px sans-serif";
ctx.fillText("Hello, World!", 50, 128);

// 2. テクスチャの作成
const texture = new THREE.CanvasTexture(canvas);

// 3. マテリアルとメッシュの作成
const material = new THREE.MeshBasicMaterial({ map: texture });
const geometry = new THREE.BoxGeometry();
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();