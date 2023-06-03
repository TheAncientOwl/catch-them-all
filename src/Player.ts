import * as THREE from 'three';
import InputManager, { InputKey } from './InputManager';
import Ground from './Ground';

type Boundaries = {
  max: number;
  min: number;
};

export default class Player {
  public static readonly MOVE_SPEED: number = 10;

  private cube: THREE.Mesh;
  private boundaries: Boundaries;

  public constructor() {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x006600 });

    this.cube = new THREE.Mesh(geometry, material);
    this.cube.position.y = 0.5;

    this.boundaries = {
      max: Ground.WIDTH / 2 - 0.5,
      min: -(Ground.WIDTH / 2) + 0.5,
    };
  }

  public getObject3D(): THREE.Object3D {
    return this.cube;
  }

  public update(inputManager: InputManager, deltaTime: number) {
    const movementSpeed = Player.MOVE_SPEED * deltaTime;

    if (inputManager.isKeyPressed(InputKey.ArrowLeft)) {
      this.cube.position.x = Math.max(this.cube.position.x - movementSpeed, this.boundaries.min);
    } else if (inputManager.isKeyPressed(InputKey.ArrowRight)) {
      this.cube.position.x = Math.min(this.cube.position.x + movementSpeed, this.boundaries.max);
    }
  }
}
