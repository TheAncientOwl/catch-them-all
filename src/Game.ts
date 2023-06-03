import SceneRenderer from './SceneRenderer';
import LightingManager from './LightingManager';
import Player from './Player';
import InputManager from './InputManager';
import Timer from './Timer';

export default class Game {
  private sceneRenderer: SceneRenderer;
  private lightingManager: LightingManager;
  private inputManager: InputManager;
  private timer: Timer;
  private player: Player;

  public constructor() {
    this.sceneRenderer = new SceneRenderer(true);

    this.lightingManager = new LightingManager(6, 3);
    this.lightingManager.createLighting();
    this.lightingManager.addToSceneRenderer(this.sceneRenderer);

    this.inputManager = new InputManager();
    this.timer = new Timer();

    this.player = new Player();
    this.sceneRenderer.add(this.player.getObject3D());
  }

  public runGameLoop() {
    const deltaTime = this.timer.calculateDeltaTime();

    this.player.update(this.inputManager, deltaTime);
    this.sceneRenderer.render();

    requestAnimationFrame(() => this.runGameLoop());
  }
}
