import * as THREE from 'three';
import InputManager, { InputKey } from './InputManager';

export default class Player {
  private cube: THREE.Mesh;
  private moveSpeed: number;

  public constructor() {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0xff9900 });

    this.cube = new THREE.Mesh(geometry, material);
    this.cube.position.y = 0.5;

    this.moveSpeed = 7;
  }

  public getObject3D(): THREE.Object3D {
    return this.cube;
  }

  public update(inputManager: InputManager, deltaTime: number) {
    const movementSpeed = this.moveSpeed * deltaTime;

    if (inputManager.isKeyPressed(InputKey.ArrowLeft)) {
      this.cube.position.x -= movementSpeed;
    } else if (inputManager.isKeyPressed(InputKey.ArrowRight)) {
      this.cube.position.x += movementSpeed;
    }
  }
}
