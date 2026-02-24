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

const loader = new THREE.TextureLoader();
// const map = loader.load('...');
// const material = new THREE.SpriteMaterial({ map: map });
// const sprite = new THREE.Sprite(material);

// scene.add(sprite);

const map = loader.load("https://threejs.org/examples/textures/sprite.png");
const material = new THREE.SpriteMaterial({ map: map });
const sprite = new THREE.Sprite(material);
scene.add(sprite);

camera.position.z = 5;

const cube = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0x00ff00 })
);
scene.add(cube);

cube.position.x = 2;

function animate() {
  requestAnimationFrame(animate);

  // カメラを回して確認
  camera.position.x = Math.sin(Date.now() * 0.001) * 5;
  camera.position.z = Math.cos(Date.now() * 0.001) * 5;
  camera.lookAt(0, 0, 0);

  renderer.render(scene, camera);
}
animate();