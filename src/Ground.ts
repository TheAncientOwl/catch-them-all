import * as THREE from 'three';

export default class Ground {
  private ground: THREE.Mesh;

  constructor(width: number, height: number) {
    const geometry = new THREE.PlaneGeometry(width, height);
    const material = new THREE.MeshBasicMaterial({ color: 0x808080, side: THREE.DoubleSide });
    this.ground = new THREE.Mesh(geometry, material);
    this.ground.rotation.x = Math.PI * -0.5; // Rotate the ground to be horizontal
  }

  public getObject3D(): THREE.Object3D {
    return this.ground;
  }
}
