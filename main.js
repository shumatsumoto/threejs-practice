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
    uniform float uTime;
    varying float vElevation;
    void main() {
        vec3 pos = position;
        // 複雑な波を作る
        float wave1 = sin(pos.x * 2.0 + uTime);
        float wave2 = sin(pos.y * 1.5 + uTime * 0.5);
        
        pos.z = (wave1 + wave2) * 0.2;
        vElevation = pos.z;
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
`;

const fShader = `
    varying float vElevation;
    void main() {
        // --- ここで高さに応じた色を決める ---
        vec3 color = vec3(0.0, 0.3, 1.0) + vElevation * 0.5; // 青色をベースに高さで色を変える
        float alpha = 0.5 + vElevation * 0.5; // 高さに応じて透明度も変える
        gl_FragColor = vec4(color, alpha);
    }
`;

const material = new THREE.ShaderMaterial({
  vertexShader: vShader,
  fragmentShader: fShader,
  uniforms: { uTime: { value: 0 } },
  transparent: true,
  side: THREE.DoubleSide,
});

const plane = new THREE.Mesh(new THREE.PlaneGeometry(5, 5, 64, 64), material);
plane.rotation.x = -Math.PI / 2; // 水平にする
scene.add(plane);

camera.position.set(0, 3, 5);
camera.lookAt(0, 0, 0);

function animate() {
  requestAnimationFrame(animate);
  material.uniforms.uTime.value += 0.05;
  renderer.render(scene, camera);
}
animate();