# Scence implementation

To make appear a simple scene write:

```js
import * as THREE from "three";

function init() {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerHeight / window.innerWidth,
    1,
    1000
  );

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById("graphic-section").appendChild(renderer.domElement);

  renderer.render(scene, camera);
}

init();
```

## Geometry instantation 

A box is introduced in the scence:

```js
function get_box(scene: THREE.Scene) {
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.name = "box-1"

  scene.add(mesh);
}
```

To be able to get continuous rendering in Three.js you need to call the ```requestAnimationFrame``` function.

```js
function update(renderer: THREE.WebGLRenderer, scene: THREE.Scene, camera: THREE.Camera) {
    renderer.render(
        scene,
        camera
    );

    const box = scene.getObjectByName("box-1");

    box.rotation.y += 0.001;
    box.rotation.x += 0.001;
    
    requestAnimationFrame( () => {
        update(renderer, scene, camera);
    })
}
```