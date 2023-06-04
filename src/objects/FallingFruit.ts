import * as THREE from 'three';
import CollisionManager from '../managers/CollisionManager';
import Random from '../utilities/Random';
import Ground from './Ground';
import ThemeManager from '../managers/ThemeManager';
import Constants from '../utilities/Constants';
import ScoreManager from '../managers/Scoremanager';

export default class FallingFruit {
  private static readonly MIN_SPEED: number = 2.5;
  private static readonly MAX_SPEED: number = 3.5;

  private body: THREE.Mesh;
  private speed: number;

  public constructor() {
    this.speed = Random.randBetween(FallingFruit.MIN_SPEED, FallingFruit.MAX_SPEED);

    const geometry = new THREE.SphereGeometry(0.3, 32, 32);
    const material = new THREE.MeshBasicMaterial({ color: ThemeManager.getTheme().fruit });

    this.body = new THREE.Mesh(geometry, material);

    this.randomizePosition();

    ThemeManager.onThemeChanged(() => {
      this.body.material = new THREE.MeshBasicMaterial({ color: ThemeManager.getTheme().fruit });
    });
  }

  public getObject3D(): THREE.Object3D {
    return this.body;
  }

  public update(deltaTime: number, player: THREE.Mesh): void {
    this.body.position.y -= this.speed * deltaTime;

    if (this.body.position.y < Constants.GROUND_LEVEL + 0.25) {
      this.speed = Random.randBetween(FallingFruit.MIN_SPEED, FallingFruit.MAX_SPEED);
      this.randomizePosition();
    }

    if (CollisionManager.collide(this.body, player)) {
      ScoreManager.increase();
      this.randomizePosition();
    }
  }

  private randomizePosition(): void {
    const randomPosition = new THREE.Vector3(
      Random.randBetween(-Ground.WIDTH / 2, Ground.WIDTH / 2),
      Random.randBetween(6, 9),
      0
    );

    this.body.position.copy(randomPosition);
  }

  public reset() {
    this.body.position.y = Random.randBetween(6, 9);
    this.speed = Random.randBetween(FallingFruit.MIN_SPEED, FallingFruit.MAX_SPEED);
  }
}
