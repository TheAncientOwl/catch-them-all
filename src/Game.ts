import SceneRenderer from './SceneRenderer';
import LightingManager from './LightingManager';
import Player from './Player';

export default class Game {
  private sceneRenderer: SceneRenderer;
  private lightingManager: LightingManager;
  private player: Player;

  constructor() {
    this.sceneRenderer = new SceneRenderer(true);

    this.lightingManager = new LightingManager(6, 3);
    this.lightingManager.createLighting();
    this.lightingManager.addToSceneRenderer(this.sceneRenderer);

    this.player = new Player();
    this.sceneRenderer.add(this.player.getObject3D());
  }

  run() {
    this.sceneRenderer.render();

    requestAnimationFrame(() => this.run());
  }
}
