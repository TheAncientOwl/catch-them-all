import * as THREE from 'three';
import CollisionManager from '../managers/CollisionManager';
import Random from '../utilities/Random';
import Ground from './Ground';
import ThemeManager from '../managers/ThemeManager';
import Constants from '../utilities/Constants';

export default class FallingFruit {
  public static readonly SPEED: number = 2.5;

  private body: THREE.Mesh;

  public constructor() {
    const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    const material = new THREE.MeshBasicMaterial({ color: ThemeManager.getTheme().fruit });

    this.body = new THREE.Mesh(geometry, material);

    this.randomizePosition();
  }

  public getObject3D(): THREE.Object3D {
    return this.body;
  }

  public update(deltaTime: number, player: THREE.Mesh): void {
    this.body.position.y -= FallingFruit.SPEED * deltaTime;

    if (this.body.position.y < Constants.GROUND_LEVEL + 0.25 || CollisionManager.collide(this.body, player)) {
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
}
