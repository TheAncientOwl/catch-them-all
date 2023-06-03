import SceneRenderer from './SceneRenderer';
import LightingManager from './LightingManager';

export default class Game {
  private sceneRenderer: SceneRenderer;
  private lightingManager: LightingManager;

  constructor() {
    this.sceneRenderer = new SceneRenderer(true);

    this.lightingManager = new LightingManager(6, 3);
    this.lightingManager.createLighting();
    this.lightingManager.addToSceneRenderer(this.sceneRenderer);
  }

  run() {
    this.sceneRenderer.render();

    requestAnimationFrame(() => this.run());
  }
}
