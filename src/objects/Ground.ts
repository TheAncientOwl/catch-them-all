import * as THREE from 'three';

export default class Ground {
  public static readonly WIDTH: number = 16;
  public static readonly HEIGHT: number = 6;

  private ground: THREE.Mesh;

  constructor() {
    const geometry = new THREE.PlaneGeometry(Ground.WIDTH, Ground.HEIGHT);
    const material = new THREE.MeshBasicMaterial({ color: 0x808080, side: THREE.DoubleSide });

    this.ground = new THREE.Mesh(geometry, material);
    this.ground.rotation.x = Math.PI * -0.5; // Rotate the ground to be horizontal
  }

  public getObject3D(): THREE.Object3D {
    return this.ground;
  }
}
