import * as THREE from "three";
import { Reflector } from "three/examples/jsm/objects/Reflector.js";

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

const box = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshNormalMaterial()
);
box.position.y = 1;
scene.add(box);

// --- ここでReflectorを作成 ---
const geometry = new THREE.PlaneGeometry(10, 10);
const options = {
  clipBias: 0.003,
  textureWidth: window.innerWidth * window.devicePixelRatio,
  textureHeight: window.innerHeight * window.devicePixelRatio,
  color: 0x889999
};
const mirror = new Reflector(geometry, options);
mirror.rotation.x = -Math.PI / 2;
scene.add(mirror);

camera.position.set(0, 3, 5);
camera.lookAt(0, 0, 0);

function animate() {
  requestAnimationFrame(animate);
  box.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();