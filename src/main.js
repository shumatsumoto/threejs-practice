import "./style.css";
import javascriptLogo from "./javascript.svg";
import viteLogo from "/vite.svg";
import { setupCounter } from "./counter.js";

import * as THREE from "three";
import { ThreeMFLoader } from "three/examples/jsm/Addons.js";

// シーン作成
const scene = new THREE.Scene();
console.log(scene);

// カメラ追加
const camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 0, +500);
console.log(camera);

// レンダラー追加
const renderer = new THREE.WebGLRenderer({
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

// レンダリング
renderer.render(scene, camera);

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
