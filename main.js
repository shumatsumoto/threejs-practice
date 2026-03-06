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

// UI
const inventory = document.createElement("div");
inventory.style.position = "absolute";
inventory.style.bottom = "10px";
inventory.style.left = "50%";
inventory.style.transform = "translateX(-50%)";
inventory.style.width = "80%";
inventory.style.height = "80px";
inventory.style.backgroundColor = "rgba(50, 50, 50, 0.8)";
inventory.style.display = "flex";
inventory.style.alignItems = "center";
inventory.style.justifyContent = "center";
inventory.style.border = "2px solid white";
document.body.appendChild(inventory);

// アイテム
const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
const material = new THREE.MeshNormalMaterial();
const items = [];

for (let i = 0; i < 3; i++) {
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.x = (i - 1) * 2;
  mesh.userData = { id: i, name: `Box ${i + 1}` };
  scene.add(mesh);
  items.push(mesh);
}

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener("click", (event) => {
  // UI上のクリックは無視（簡易実装）
  if (event.target !== renderer.domElement) return;

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(items);

  if (intersects.length > 0) {
    const obj = intersects[0].object;
    if (obj.visible) {
      addToInventory(obj);
    }
  }
});

function addToInventory(obj) {
  obj.visible = false;

  const slot = document.createElement("div");
  slot.innerText = obj.userData.name;
  slot.style.width = "60px";
  slot.style.height = "60px";
  slot.style.backgroundColor = "#888";
  slot.style.margin = "5px";
  slot.style.display = "flex";
  slot.style.alignItems = "center";
  slot.style.justifyContent = "center";
  slot.style.cursor = "pointer";
  slot.style.color = "white";

  slot.onclick = () => {
    obj.visible = true;
    obj.position.set(0, 0, 2); // 手前に出現
    inventory.removeChild(slot);
  };

  inventory.appendChild(slot);
}

camera.position.z = 5;

function animate() {
  requestAnimationFrame(animate);
  items.forEach((item) => {
    if (item.visible) {
      item.rotation.x += 0.01;
      item.rotation.y += 0.01;
    }
  });
  renderer.render(scene, camera);
}
animate();
