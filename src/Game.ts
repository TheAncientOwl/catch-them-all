import SceneRenderer from './SceneRenderer';
import LightingManager from './LightingManager';
import Player from './Player';
import InputManager from './InputManager';

export default class Game {
  private sceneRenderer: SceneRenderer;
  private lightingManager: LightingManager;
  private inputManager: InputManager;
  private previousTime: number;

  private player: Player;

  public constructor() {
    this.sceneRenderer = new SceneRenderer(true);

    this.lightingManager = new LightingManager(6, 3);
    this.lightingManager.createLighting();
    this.lightingManager.addToSceneRenderer(this.sceneRenderer);
    this.inputManager = new InputManager();

    this.previousTime = performance.now();

    this.player = new Player();
    this.sceneRenderer.add(this.player.getObject3D());
  }

  public run() {
    const deltaTime = this.calculateDeltaTime();

    this.player.update(this.inputManager, deltaTime);
    this.sceneRenderer.render();

    requestAnimationFrame(() => this.run());
  }

  private calculateDeltaTime(): number {
    const currentTime = performance.now();

    const deltaTime = (currentTime - this.previousTime) / 1000; // Convert to seconds
    this.previousTime = currentTime;

    return deltaTime;
  }
}
