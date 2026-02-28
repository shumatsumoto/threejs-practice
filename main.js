import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { AfterimagePass } from "three/examples/jsm/postprocessing/AfterimagePass";

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

const cube = new THREE.Mesh(
  new THREE.BoxGeometry(2, 2, 2),
  new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true })
);
scene.add(cube);

// --- ComposerとAfterimagePass ---
const composer = new EffectComposer(renderer);
const renderPass = new RenderPass(scene, camera);
composer.addPass(renderPass);

const afterimagePass = new AfterimagePass();
composer.addPass(afterimagePass);

camera.position.z = 5;

function animate() {
  requestAnimationFrame(animate);

  // 高速回転
  cube.rotation.x += 0.05;
  cube.rotation.z += 0.05;
  cube.position.x = Math.sin(Date.now() * 0.001) * 2;

  composer.render();
}
animate();