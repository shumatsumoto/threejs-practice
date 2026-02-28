import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { BokehPass } from "three/examples/jsm/postprocessing/BokehPass";

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

// キューブを散らす
for (let i = 0; i < 100; i++) {
  const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshNormalMaterial()
  );
  mesh.position.set(
    (Math.random() - 0.5) * 20,
    (Math.random() - 0.5) * 20,
    (Math.random() - 0.5) * 20 - 10
  );
  scene.add(mesh);
}

// --- ComposerとBokehPass ---
const composer = new EffectComposer(renderer);
const renderPass = new RenderPass(scene, camera);
composer.addPass(renderPass);

const bokehPass = new BokehPass(scene, camera, {
  focus: 1.0,
  aperture: 0.008,
  maxblur: 3.0,
});
composer.addPass(bokehPass);

camera.position.z = 5;

function animate() {
  requestAnimationFrame(animate);
  composer.render();
}
animate();