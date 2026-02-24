import * as THREE from "three";
import { DotScreenShader, ShaderPass } from "three/examples/jsm/Addons.js";
// --- ここで必要なクラスをインポート ---
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
// ...

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
  new THREE.MeshNormalMaterial()
);
scene.add(cube);

// --- ここでComposerを設定 ---
// const composer = new EffectComposer(renderer);
// composer.addPass(new RenderPass(scene, camera));
// ...

const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));
// composer.addPass(...); // ここに他のエフェクトパスを追加

const effectPass = new ShaderPass(DotScreenShader);
effectPass.uniforms["scale"].value = 40; // ドットの大きさを調整
composer.addPass(effectPass);


camera.position.z = 5;

function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  // renderer.render(scene, camera); の代わりに
  composer.render();
}
animate();