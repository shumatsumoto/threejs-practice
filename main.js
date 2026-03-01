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

// 環境マップ（これがないと金属が黒くなる）
const loader = new THREE.TextureLoader();
loader.load(
  "https://threejs.org/examples/textures/2294472375_24a3b8ef46_o.jpg",
  (texture) => {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    scene.environment = texture;
    scene.background = texture;
  }
);

const geometry = new THREE.SphereGeometry(0.5, 32, 32);

// 縦横に並べる
for (let x = 0; x <= 5; x++) {
  for (let y = 0; y <= 5; y++) {
    const metalness = x / 5;
    const roughness = y / 5;

    const material = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: metalness,
      roughness: roughness,
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set((x - 2.5) * 1.2, (y - 2.5) * 1.2, 0);
    scene.add(mesh);
  }
}

camera.position.z = 8;

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();