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

const vShader = `
    varying vec3 vNormal;
    varying vec3 vViewPosition;
    void main() {
        vNormal = normalize(normalMatrix * normal);
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        vViewPosition = -mvPosition.xyz;
        gl_Position = projectionMatrix * mvPosition;
    }
`;

const fShader = `
    varying vec3 vNormal;
    varying vec3 vViewPosition;
    void main() {
        // 法線と視線の内積（0〜1）
        // 正面から見ると1、横から見ると0
        float dotProduct = dot(normalize(vNormal), normalize(vViewPosition));
        
        // 反転して累乗することで、エッジを鋭く光らせる
        float fresnel = pow(1.0 - dotProduct, 3.0);
        
        // 水色で光らせる
        gl_FragColor = vec4(0.0, 0.8, 1.0, fresnel);
    }
`;

const material = new THREE.ShaderMaterial({
  vertexShader: vShader,
  fragmentShader: fShader,
  transparent: true,
  blending: THREE.AdditiveBlending, // 加算合成
  side: THREE.DoubleSide,
});

const sphere = new THREE.Mesh(new THREE.SphereGeometry(2, 32, 32), material);
scene.add(sphere);

camera.position.z = 5;

function animate() {
  requestAnimationFrame(animate);
  sphere.rotation.y += 0.005;
  renderer.render(scene, camera);
}
animate();