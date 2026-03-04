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

// スポットライト
const spotLight = new THREE.SpotLight(0xffffff, 2);
spotLight.position.set(0, 5, 0);
spotLight.angle = Math.PI / 6;
spotLight.penumbra = 0.5;
scene.add(spotLight);

// 床
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20),
  new THREE.MeshStandardMaterial({ color: 0x222222 }),
);
floor.rotation.x = -Math.PI / 2;
scene.add(floor);

// ボリュームライト用コーン
const height = 5;
const radius = Math.tan(spotLight.angle) * height;
const geometry = new THREE.ConeGeometry(radius, height, 32, 1, true); // 底面なし
geometry.translate(0, -height / 2, 0); // 頂点を原点に
geometry.rotateX(-Math.PI / 2); // スポットライトの向きに合わせる（下向き）

const vShader = `
    varying vec2 vUv;
    void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;

const fShader = `
    varying vec2 vUv;
    void main() {
        // UVのY座標（高さ方向）を使ってフェードさせる
        // 根元(1.0) -> 先端(0.0)
        float alpha = pow(vUv.y, 2.0); 
        
        // 端の方も少しフェードさせるとより自然
        
        gl_FragColor = vec4(1.0, 1.0, 0.8, alpha * 0.5);
    }
`;

const material = new THREE.ShaderMaterial({
  vertexShader: vShader,
  fragmentShader: fShader,
  transparent: true,
  depthWrite: false, // 奥の物体を隠さない
  blending: THREE.AdditiveBlending,
  side: THREE.DoubleSide,
});

const cone = new THREE.Mesh(geometry, material);
cone.position.copy(spotLight.position);
// スポットライトと同じ向きにする必要があるが、今回は真下なのでそのまま
scene.add(cone);

camera.position.set(0, 2, 10);

function animate() {
  requestAnimationFrame(animate);

  // ライトを揺らす
  spotLight.position.x = Math.sin(Date.now() * 0.001) * 2;
  cone.position.copy(spotLight.position);

  renderer.render(scene, camera);
}
animate();
