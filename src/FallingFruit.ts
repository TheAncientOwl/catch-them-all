import * as THREE from 'three';

export default class FallingFruit {
  public static readonly SPEED: number = 2.5;

  private cube: THREE.Mesh;
  private initialPosition: THREE.Vector3;

  constructor(position: THREE.Vector3) {
    this.initialPosition = position;

    const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });

    this.cube = new THREE.Mesh(geometry, material);
    this.cube.position.copy(position);
  }

  public getObject3D(): THREE.Object3D {
    return this.cube;
  }

  public update(deltaTime: number): void {
    this.cube.position.y -= FallingFruit.SPEED * deltaTime;

    if (this.cube.position.y < 0) {
      this.resetPosition();
    }
  }

  private resetPosition(): void {
    this.cube.position.copy(this.initialPosition);
  }
}
