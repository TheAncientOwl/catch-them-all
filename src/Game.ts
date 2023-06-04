import * as THREE from 'three';

import SceneRenderer from './managers/SceneRenderer';
import LightingManager from './managers/LightingManager';
import Player from './objects/Player';
import InputManager from './managers/InputManager';
import Timer from './utilities/Timer';
import Ground from './objects/Ground';
import FruitSpawner from './managers/FruitSpawner';
import FPSManager from './managers/FPSManager';

export default class Game {
  private sceneRenderer: SceneRenderer;
  private lightingManager: LightingManager;
  private inputManager: InputManager;
  private fpsManager: FPSManager;
  private fruitSpawner: FruitSpawner;
  private timer: Timer;
  private player: Player;
  private ground: Ground;

  public constructor() {
    this.sceneRenderer = new SceneRenderer();

    this.lightingManager = new LightingManager();
    this.lightingManager.createLighting();
    this.lightingManager.addToSceneRenderer(this.sceneRenderer);

    this.fpsManager = new FPSManager();
    this.inputManager = new InputManager();
    this.timer = new Timer();

    this.ground = new Ground();
    this.sceneRenderer.add(this.ground.getObject3D());

    this.player = new Player();
    this.sceneRenderer.add(this.player.getObject3D());
    this.sceneRenderer.add(this.player.getParticleObject3D());

    this.fruitSpawner = new FruitSpawner();
    for (let fruit of this.fruitSpawner.getFruitsObject3D()) {
      this.sceneRenderer.add(fruit);
    }
  }

  public runGameLoop() {
    const deltaTime = this.timer.calculateDeltaTime();

    this.fpsManager.update(deltaTime);
    this.player.update(this.inputManager, deltaTime);
    this.fruitSpawner.update(deltaTime, this.player.getObject3D() as THREE.Mesh);

    this.sceneRenderer.render();

    requestAnimationFrame(() => this.runGameLoop());
  }
}
