import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export default class SceneRenderer extends THREE.Scene {
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.Renderer;
  private orbitals: OrbitControls;

  public render() {
    this.camera.updateProjectionMatrix();
    this.renderer.render(this, this.camera);
    this.orbitals.update();
  }

  public constructor(withGridHelper: boolean = true) {
    super();

    this.camera = this.createCamera();
    this.renderer = this.createRenderer();
    this.orbitals = new OrbitControls(this.camera, this.renderer.domElement);
    this.background = new THREE.Color(0x1c1c1c);

    this.addWindowResizing(this.camera, this.renderer);

    if (withGridHelper) this.addGridHelper();
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
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
  }
}
