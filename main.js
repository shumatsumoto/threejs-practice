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

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(1, 1, 1);
scene.add(light);

// --- ここでグラデーションマップを作成 ---
const texture = new THREE.CanvasTexture(createGradientCanvas());
texture.minFilter = THREE.NearestFilter;
texture.magFilter = THREE.NearestFilter;
function createGradientCanvas() {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext("2d");

  // グラデーションの作成
  const gradient = context.createLinearGradient(0, 0, size, size);
  gradient.addColorStop(0, "#ffffff"); // 白
  gradient.addColorStop(0.5, "#ff0000"); // 赤
  gradient.addColorStop(1, "#000000"); // 黒

  context.fillStyle = gradient;
  context.fillRect(0, 0, size, size);

  return canvas;
}

// --- ToonMaterial作成 ---
const material = new THREE.MeshToonMaterial({ gradientMap: texture, color: 0xff0000 });

const mesh = new THREE.Mesh(
  new THREE.TorusKnotGeometry(1, 0.3, 100, 16),
  material
);
scene.add(mesh);

camera.position.z = 5;

function animate() {
  requestAnimationFrame(animate);
  mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();