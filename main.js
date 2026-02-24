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

// --- シェーダー定義 ---
const vShader = `
    void main() {
        // ここで頂点の位置を変換して出力
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;

const fShader = `
    void main() {
        // ここで色を出力
        gl_FragColor = vec4(1.0, 0.0, 1.0, 1.0); // 赤色
    }
`;

// --- マテリアル作成 ---
const material = new THREE.ShaderMaterial({
  vertexShader: vShader,
  fragmentShader: fShader,
});

const mesh = new THREE.Mesh(new THREE.BoxGeometry(2, 2, 2), material);
scene.add(mesh);

camera.position.z = 5;

function animate() {
  requestAnimationFrame(animate);
  mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();