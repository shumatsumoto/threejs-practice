import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xf0f0f0);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 5, 5);
scene.add(light);
scene.add(new THREE.AmbientLight(0x404040));

// 椅子モデル
const chairGroup = new THREE.Group();

const seatMat = new THREE.MeshStandardMaterial({ color: 0x333333 });
const seat = new THREE.Mesh(new THREE.BoxGeometry(1, 0.1, 1), seatMat);
chairGroup.add(seat);

const backMat = new THREE.MeshStandardMaterial({ color: 0x333333 });
const back = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 0.1), backMat);
back.position.set(0, 0.5, -0.45);
chairGroup.add(back);

const legGeo = new THREE.CylinderGeometry(0.05, 0.05, 1);
const legMat = new THREE.MeshStandardMaterial({ color: 0x888888 });
const leg1 = new THREE.Mesh(legGeo, legMat);
leg1.position.set(-0.4, -0.5, -0.4);
const leg2 = new THREE.Mesh(legGeo, legMat);
leg2.position.set(0.4, -0.5, -0.4);
const leg3 = new THREE.Mesh(legGeo, legMat);
leg3.position.set(-0.4, -0.5, 0.4);
const leg4 = new THREE.Mesh(legGeo, legMat);
leg4.position.set(0.4, -0.5, 0.4);
chairGroup.add(leg1, leg2, leg3, leg4);

scene.add(chairGroup);

// UI作成
const colors = [
  { name: "Red", hex: 0xff0000, cam: { x: 2, y: 2, z: 2 } },
  { name: "Blue", hex: 0x0000ff, cam: { x: -2, y: 1, z: 2 } },
  { name: "Green", hex: 0x00ff00, cam: { x: 0, y: 2, z: 3 } },
];

let targetCamPos = new THREE.Vector3(2, 2, 2);

colors.forEach((c, i) => {
  const btn = document.createElement("button");
  btn.innerText = c.name;
  btn.style.position = "absolute";
  btn.style.top = "10px";
  btn.style.left = 10 + i * 60 + "px";
  document.body.appendChild(btn);

  btn.addEventListener("click", () => {
    seatMat.color.setHex(c.hex);
    backMat.color.setHex(c.hex);
    targetCamPos.set(c.cam.x, c.cam.y, c.cam.z);
  });
});

camera.position.set(2, 2, 2);

function animate() {
  requestAnimationFrame(animate);

  // カメラをスムーズに移動
  camera.position.lerp(targetCamPos, 0.05);
  controls.update();

  renderer.render(scene, camera);
}
animate();
