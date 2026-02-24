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

// --- ここでカーブを作成 ---
// const curve = new THREE.CatmullRomCurve3([ ... ]);

const curve = new THREE.CatmullRomCurve3([
  new THREE.Vector3(-5, 0, 0),
  new THREE.Vector3(-2.5, 2.5, 0),
  new THREE.Vector3(0, 0, 0),
  new THREE.Vector3(2.5, -2.5, 0),
  new THREE.Vector3(5, 0, 0),
]);

const curveMaterial = new THREE.LineBasicMaterial({ color: 0x00ffff });
const curveGeometry = new THREE.BufferGeometry().setFromPoints(
  curve.getPoints(100)
);
const curveLine = new THREE.Line(curveGeometry, curveMaterial);
scene.add(curveLine);

// 移動する物体
const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(0.2),
  new THREE.MeshBasicMaterial({ color: 0xff0000 })
);
scene.add(sphere);

let progress = 0;

camera.position.z = 10;
camera.position.y = 5;
camera.lookAt(0, 0, 0);

function animate() {
  requestAnimationFrame(animate);

  // --- ここでprogressを増やし、sphereの位置を更新 ---
  progress += 0.01;
  if (progress > 1) progress = 0;
  const point = curve.getPointAt(progress);
  sphere.position.copy(point);

  renderer.render(scene, camera);
}
animate();