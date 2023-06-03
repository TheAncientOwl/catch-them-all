import * as THREE from 'three';

import SceneRenderer from './SceneRenderer';
import LightingManager from './LightingManager';
import Player from './Player';
import InputManager from './InputManager';
import Timer from './Timer';
import Ground from './Ground';
import FallingFruit from './FallingFruit';

export default class Game {
  private sceneRenderer: SceneRenderer;
  private lightingManager: LightingManager;
  private inputManager: InputManager;
  private timer: Timer;
  private player: Player;
  private ground: Ground;

  private fruit: FallingFruit;

  public constructor() {
    this.sceneRenderer = new SceneRenderer();

    this.lightingManager = new LightingManager();
    this.lightingManager.createLighting();
    this.lightingManager.addToSceneRenderer(this.sceneRenderer);

    this.inputManager = new InputManager();
    this.timer = new Timer();

    this.ground = new Ground();
    this.sceneRenderer.add(this.ground.getObject3D());

    this.player = new Player();
    this.sceneRenderer.add(this.player.getObject3D());

    this.fruit = new FallingFruit(new THREE.Vector3(0, 7, 0));
    this.sceneRenderer.add(this.fruit.getObject3D());
  }

  public runGameLoop() {
    const deltaTime = this.timer.calculateDeltaTime();

    this.player.update(this.inputManager, deltaTime);
    this.fruit.update(deltaTime, this.player.getObject3D() as THREE.Mesh);
    this.sceneRenderer.render();

    requestAnimationFrame(() => this.runGameLoop());
  }
}
