import * as THREE from "three";
import { GUI } from "dat.gui";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import import_file from "./import_file";

/**
 * A class to set up some basic scene elements to minimize code in the
 * main execution file.
 */
export default class BasicScene extends THREE.Scene {
  // A dat.gui class debugger that is added by default
  debugger: GUI = null;

  // Setups a scene camera
  camera: THREE.PerspectiveCamera = null;

  // setup renderer
  renderer: THREE.Renderer = null;

  // setup Orbitals
  orbitals: OrbitControls = null;

  // Holds the lights for easy reference
  lights: Array<THREE.Light> = [];

  // Number of PointLight objects around origin
  lightCount: number = 6;

  // Distance above ground place
  lightDistance: number = 3;

  // Get some basic params
  width = window.innerWidth;
  height = window.innerHeight;

  /**
   * Initializes the scene by adding lights, and the geometry
   */
  initialize(debug: boolean = true, addGridHelper: boolean = true) {
    // setup camera
    this.camera = new THREE.PerspectiveCamera(
      35,
      this.width / this.height,
      0.1,
      1000
    );
    this.camera.position.z = 12;
    this.camera.position.y = 12;
    this.camera.position.x = 12;

    // setup renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas: document.getElementById("app") as HTMLCanvasElement,
      alpha: true,
    });
    this.renderer.setSize(this.width, this.height);

    // add window resizing
    BasicScene.addWindowResizing(this.camera, this.renderer);

    // sets up the camera's orbital controls
    this.orbitals = new OrbitControls(this.camera, this.renderer.domElement);

    // Adds an origin-centered grid for visual reference
    if (addGridHelper) {
      // Adds a grid
      this.add(new THREE.GridHelper(10, 10, "red"));

      // Adds an axis-helper
      this.add(new THREE.AxesHelper(3));
    }

    // set the background color
    this.background = new THREE.Color(0xefefef);

    // create the lights
    for (let i = 0; i < this.lightCount; i++) {
      // Positions evenly in a circle pointed at the origin
      const light = new THREE.PointLight(0xffffff, 1);
      let lightX =
        this.lightDistance * Math.sin(((Math.PI * 2) / this.lightCount) * i);
      let lightZ =
        this.lightDistance * Math.cos(((Math.PI * 2) / this.lightCount) * i);

      // Create a light
      light.position.set(lightX, this.lightDistance, lightZ);
      light.lookAt(0, 0, 0);
      this.add(light);
      this.lights.push(light);

      // Visual helpers to indicate light positions
      this.add(new THREE.PointLightHelper(light, 0.5, 0xff9900));
    }

    // add to scene
    const external_file_import = import_file();

    get_external_geometry(this);
    this.scale;

    // setup Debugger
    if (debug) {
      this.debugger = new GUI();

      // Debug group with all lights in it.
      const lightGroup = this.debugger.addFolder("Lights");
      for (let i = 0; i < this.lights.length; i++) {
        lightGroup.add(this.lights[i], "visible", true);
      }
      lightGroup.open();
    }
  }

  /**
   * Given a ThreeJS camera and renderer, resizes the scene if the
   * browser window is resized.
   * @param camera - a ThreeJS PerspectiveCamera object.
   * @param renderer - a subclass of a ThreeJS Renderer object.
   */
  static addWindowResizing(
    camera: THREE.PerspectiveCamera,
    renderer: THREE.Renderer
  ) {
    window.addEventListener("resize", onWindowResize, false);
    function onWindowResize() {
      // uses the global window widths and height
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
  }
}

function get_external_geometry(scene: THREE.Scene) {
  const loader = new OBJLoader();

  loader.load(
    "./models/torous.obj",
    (object) => {

      object.position.y = 0.5;

      // const material = new THREE.MeshPhongMaterial({ color: 0xff9900 });
      scene.add(object);
    },
    undefined,
    function (error) {
      console.log(error);
    }
  );
}