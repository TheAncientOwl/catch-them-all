import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import ThemeManager from './ThemeManager';

export default class SceneRenderer extends THREE.Scene {
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.Renderer;
  private orbitals: OrbitControls;

  public render() {
    this.camera.updateProjectionMatrix();
    this.renderer.render(this, this.camera);
    this.orbitals.update();
  }

  public constructor() {
    super();

    this.camera = this.createCamera();
    this.renderer = this.createRenderer();
    this.orbitals = new OrbitControls(this.camera, this.renderer.domElement);
    this.background = new THREE.Color(ThemeManager.getTheme().background);

    this.addWindowResizing(this.camera, this.renderer);

    ThemeManager.onThemeChanged(() => {
      this.background = new THREE.Color(ThemeManager.getTheme().background);
    });
  }

  private createCamera(): THREE.PerspectiveCamera {
    const newCamera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 1000);
    newCamera.position.z = 20;
    newCamera.position.y = 7;
    newCamera.position.x = 3;

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
