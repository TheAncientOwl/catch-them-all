import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export default class SceneRenderer extends THREE.Scene {
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.Renderer;
  private orbitals: OrbitControls;
  private lights: Array<THREE.Light> = [];
  private lightCount: number = 6;
  private lightDistance: number = 3;

  render() {
    this.camera.updateProjectionMatrix();
    this.renderer.render(this, this.camera);
    this.orbitals.update();
  }

  constructor(withGridHelper: boolean = true) {
    super();

    this.camera = this.createCamera();
    this.renderer = this.createRenderer();
    this.orbitals = new OrbitControls(this.camera, this.renderer.domElement);
    this.background = new THREE.Color(0xefefef);

    this.addWindowResizing(this.camera, this.renderer);
    this.addLights();

    if (withGridHelper) this.addGridHelper();

    this.add(this.createCube());
  }

  private createCube(): THREE.Mesh {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshPhongMaterial({ color: 0xff9900 });
    let cube = new THREE.Mesh(geometry, material);
    cube.position.y = 0.5;

    return cube;
  }

  private addLights() {
    for (let i = 0; i < this.lightCount; i++) {
      // Positions evenly in a circle pointed at the origin
      const light = new THREE.PointLight(0xffffff, 1);
      let lightX = this.lightDistance * Math.sin(((Math.PI * 2) / this.lightCount) * i);
      let lightZ = this.lightDistance * Math.cos(((Math.PI * 2) / this.lightCount) * i);

      // Create a light
      light.position.set(lightX, this.lightDistance, lightZ);
      light.lookAt(0, 0, 0);
      this.add(light);
      this.lights.push(light);

      // Visual helpers to indicate light positions
      this.add(new THREE.PointLightHelper(light, 0.5, 0xff9900));
    }
  }

  private addGridHelper() {
    this.add(new THREE.GridHelper(10, 10, 'red'));
    this.add(new THREE.AxesHelper(3));
  }

  private createCamera(): THREE.PerspectiveCamera {
    const newCamera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 1000);
    newCamera.position.z = 12;
    newCamera.position.y = 12;
    newCamera.position.x = 12;

    return newCamera;
  }

  private createRenderer(): THREE.Renderer {
    const newRenderer = new THREE.WebGLRenderer({
      canvas: document.getElementById('appCanvas') as HTMLCanvasElement,
      alpha: true,
    });
    newRenderer.setSize(window.innerWidth, window.innerHeight);

    return newRenderer;
  }

  private addWindowResizing(camera: THREE.PerspectiveCamera, renderer: THREE.Renderer) {
    window.addEventListener('resize', onWindowResize, false);
    function onWindowResize() {
      // uses the global window widths and height
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
  }
}
