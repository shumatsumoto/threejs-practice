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

// シェーダーは演習56をベースに改良
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
        float dotProduct = dot(normalize(vNormal), normalize(vViewPosition));
        float rim = pow(1.0 - dotProduct, 2.0);
        
        // --- ここでベース色とリム色を合成 ---
        vec3 baseColor = vec3(0.0, 0.5, 0.0); // ベース色
        vec3 rimColor = vec3(1.0, 1.0, 0.0); // リム色
        vec3 color = mix(baseColor, rimColor, rim);
        
        gl_FragColor = vec4(color, 1.0);
    }
`;

const material = new THREE.ShaderMaterial({
  vertexShader: vShader,
  fragmentShader: fShader,
});

const mesh = new THREE.Mesh(
  new THREE.TorusKnotGeometry(1, 0.3, 100, 16),
  material
);
scene.add(mesh);

camera.position.z = 5;

function animate() {
  requestAnimationFrame(animate);
  mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();