import * as THREE from "three";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 太陽
const sun = new THREE.Mesh(
  new THREE.SphereGeometry(1.5),
  new THREE.MeshBasicMaterial({ color: 0xffff00 }),
);
scene.add(sun);

// 地球の公転用グループ（太陽の中心に配置）
const earthOrbit = new THREE.Group();
sun.add(earthOrbit);

// 地球
const earth = new THREE.Mesh(
  new THREE.SphereGeometry(0.5),
  new THREE.MeshBasicMaterial({ color: 0x0000ff }),
);
earth.position.x = 5; // 太陽からの距離
earthOrbit.add(earth);

// 月の公転用グループ（地球の中心に配置）
const moonOrbit = new THREE.Group();
earth.add(moonOrbit);

// 月
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(0.15),
  new THREE.MeshBasicMaterial({ color: 0x888888 }),
);
moon.position.x = 1.5; // 地球からの距離
moonOrbit.add(moon);

camera.position.z = 10;
camera.position.y = 5;
camera.lookAt(0, 0, 0);

function animate() {
  requestAnimationFrame(animate);

  sun.rotation.y += 0.005; // 太陽自転
  earthOrbit.rotation.y += 0.01; // 地球公転
  earth.rotation.y += 0.02; // 地球自転
  moonOrbit.rotation.y += 0.05; // 月公転

  renderer.render(scene, camera);
}
animate();
