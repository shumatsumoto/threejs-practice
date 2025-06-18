import "./style.css";
import javascriptLogo from "./javascript.svg";
import viteLogo from "/vite.svg";
import { setupCounter } from "./counter.js";

import * as THREE from "three";
import { ThreeMFLoader, OrbitControls } from "three/examples/jsm/Addons.js";

let scene, camera, renderer, pointLight, controls;

// シーン作成
scene = new THREE.Scene();
console.log(scene);

// カメラ追加
camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 0, +500);
console.log(camera);

// レンダラー追加
renderer = new THREE.WebGLRenderer({
  alpha: true,
});

document.body.appendChild(renderer.domElement);
renderer.setSize(window.innerWidth, window.innerHeight);

// ジオメトリ作成
const ballGeometry = new THREE.SphereGeometry(100, 64, 32);

// マテリアル作成
const ballMaterial = new THREE.MeshPhysicalMaterial();

// メッシュ作成
const ballMesh = new THREE.Mesh(ballGeometry, ballMaterial);

scene.add(ballMesh);

// 平行光源を追加
const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);

// ポイント光源を追加
pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(-200, -200, -200);
pointLight.decay = 1;
pointLight.power = 1000;
scene.add(pointLight);

// ポイント光源がどこにあるかを特定
let pointLightHelper = new THREE.PointLightHelper(pointLight, 30);
scene.add(pointLightHelper);

// マウス操作可能にする
controls = new OrbitControls(camera, renderer.domElement);

function animate() {
  // ポイント光源を巡回させる
  pointLight.position.set(
    200 * Math.sin(Date.now() / 500),
    200 * Math.sin(Date.now() / 1000),
    200 * Math.cos(Date.now() / 500)
  );

  // レンダリング
  renderer.render(scene, camera);

  requestAnimationFrame(animate);
}

animate();

// document.querySelector("#app").innerHTML = `
//   <div>
//     <a href="https://vite.dev" target="_blank">
//       <img src="${viteLogo}" class="logo" alt="Vite logo" />
//     </a>
//     <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
//       <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
//     </a>
//     <h1>Hello Vite!</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite logo to learn more
//     </p>
//   </div>
// `;

// setupCounter(document.querySelector("#counter"));
