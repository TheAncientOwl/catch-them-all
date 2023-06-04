import * as THREE from 'three';
import CollisionManager from '../managers/CollisionManager';
import Random from '../utilities/Random';
import Ground from './Ground';

export default class FallingFruit {
  public static readonly SPEED: number = 2.5;

  private cube: THREE.Mesh;

  public constructor() {
    const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });

    this.cube = new THREE.Mesh(geometry, material);

    this.randomizePosition();
  }

  public getObject3D(): THREE.Object3D {
    return this.cube;
  }

  public update(deltaTime: number, player: THREE.Mesh): void {
    this.cube.position.y -= FallingFruit.SPEED * deltaTime;

    if (this.cube.position.y < 0 || CollisionManager.collide(this.cube, player)) {
      this.randomizePosition();
    }
  }

  private randomizePosition(): void {
    const randomPosition = new THREE.Vector3(Random.randBetween(-Ground.WIDTH / 2, Ground.WIDTH / 2), 7, 0);

    this.cube.position.copy(randomPosition);
  }
}
