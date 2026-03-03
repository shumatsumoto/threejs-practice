import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

// 環境マップ
const loader = new THREE.TextureLoader();
loader.load(
  "https://threejs.org/examples/textures/2294472375_24a3b8ef46_o.jpg",
  (texture) => {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    scene.environment = texture;
    scene.background = texture;
  }
);

// 中身（透けて見えるもの）
const innerCube = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshNormalMaterial()
);
scene.add(innerCube);

// --- ここでガラスの球体を作成 ---
const material = new THREE.MeshPhysicalMaterial({ 
  color: 0xffffff,
  metalness: 0,
  roughness: 0,
  transmission: 1, // ガラスの透過性
  transparent: true, // 透明にする
  opacity: 1, // 不透明度
});
const glassSphere = new THREE.Mesh(
  new THREE.SphereGeometry(1.5, 32, 32),
  material
);
scene.add(glassSphere);

camera.position.z = 5;

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  innerCube.rotation.x += 0.01;
  renderer.render(scene, camera);
}
animate();