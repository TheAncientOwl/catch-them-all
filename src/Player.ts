import * as THREE from 'three';

export default class Player {
  private cube: THREE.Mesh;

  constructor() {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0xff9900 });

    this.cube = new THREE.Mesh(geometry, material);
    this.cube.position.y = 0.5;
  }

  public getObject3D(): THREE.Object3D {
    return this.cube;
  }
}
