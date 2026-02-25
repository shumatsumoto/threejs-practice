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
    void main() {
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;

const fShader = `
    uniform float uTime;
    void main() {
        // --- ここで色を計算 ---
        float r = 0.5 + 0.5 * abs(sin(uTime));
        float g = 0.5 + 0.5 * abs(sin(uTime + 2.0));
        float b = 0.5 + 0.5 * abs(sin(uTime + 4.0));
        gl_FragColor = vec4(r, g, b, 1.0);
    }
`;

const uniforms = { uTime: { value: 0.0 } };
const material = new THREE.ShaderMaterial({
  vertexShader: vShader,
  fragmentShader: fShader,
  uniforms: uniforms,
});

const cube = new THREE.Mesh(new THREE.BoxGeometry(2, 2, 2), material);
scene.add(cube);

camera.position.z = 5;

function animate() {
  requestAnimationFrame(animate);
  material.uniforms.uTime.value += 0.05;
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();