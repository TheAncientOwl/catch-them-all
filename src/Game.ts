import * as THREE from 'three';

import Timer from './utilities/Timer';
import Player from './objects/Player';
import Ground from './objects/Ground';
import TimeManager from './managers/TimeManager';
import InputManager from './managers/InputManager';
import SceneRenderer from './managers/SceneRenderer';
import PokeballSpawner from './managers/PokeballSpawner';
import LightingManager from './managers/LightingManager';

export default class Game {
  private timer: Timer;

  private sceneRenderer: SceneRenderer;
  private lightingManager: LightingManager;

  private inputManager: InputManager;
  private fruitSpawner: PokeballSpawner;
  private ground: Ground;
  private player: Player;

  private paused: boolean;
  private pauseHTMLElement: HTMLElement;

  public constructor() {
    this.timer = new Timer();

    this.sceneRenderer = new SceneRenderer();

    this.lightingManager = new LightingManager();
    this.lightingManager.createLighting();
    this.lightingManager.addToSceneRenderer(this.sceneRenderer);

    this.inputManager = new InputManager();

    this.ground = new Ground();
    this.sceneRenderer.add(this.ground.getObject3D());

    this.player = new Player();
    this.sceneRenderer.add(this.player.getObject3D());
    this.sceneRenderer.add(this.player.getParticleObject3D());

    this.fruitSpawner = new PokeballSpawner();
    this.fruitSpawner.setupListener(this.sceneRenderer);
    for (let fruit of this.fruitSpawner.getFruitsObject3D()) {
      this.sceneRenderer.add(fruit);
    }

    this.paused = false;
    this.pauseHTMLElement = document.getElementById('pause') as HTMLElement;
    this.pauseHTMLElement.style.display = 'none';

    this.setupKeydownListener();
  }

  private setupKeydownListener() {
    document.addEventListener('keydown', event => {
      if (event.key === 'r' || event.key === 'R') {
        this.reset();
      } else if (event.key === 'p' || event.key === 'P') {
        if (!TimeManager.gameOver()) this.pause();
      }
    });
  }

  private setupPause() {}

  public runGameLoop() {
    const deltaTime = this.timer.calculateDeltaTime();

    if (!this.paused && TimeManager.update(deltaTime, () => this.reset())) {
      this.player.update(this.inputManager, deltaTime);
      this.fruitSpawner.update(deltaTime, this.player.getObject3D() as THREE.Mesh);
    }

    this.sceneRenderer.render();

    requestAnimationFrame(() => this.runGameLoop());
  }

  private reset() {
    TimeManager.reset();
    this.player.reset();
    this.fruitSpawner.reset();
  }

  private pause() {
    if (this.paused === true) {
      this.paused = false;
      this.pauseHTMLElement.style.display = 'none';
    } else if (this.paused === false) {
      this.paused = true;
      this.pauseHTMLElement.style.display = 'block';
    }
  }
}
