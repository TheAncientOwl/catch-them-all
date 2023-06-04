import * as THREE from 'three';
import ThemeManager from '../managers/ThemeManager';
import Constants from '../utilities/Constants';

export default class Ground {
  public static readonly WIDTH: number = 16;
  public static readonly HEIGHT: number = 6;

  private ground: THREE.Mesh;

  constructor() {
    const geometry = new THREE.PlaneGeometry(Ground.WIDTH, Ground.HEIGHT);
    const material = new THREE.MeshBasicMaterial({ color: ThemeManager.getTheme().ground, side: THREE.DoubleSide });

    this.ground = new THREE.Mesh(geometry, material);
    this.ground.rotation.x = Math.PI * -0.5; // Rotate the ground to be horizontal

    this.ground.position.y = Constants.GROUND_LEVEL;
  }

  public getObject3D(): THREE.Object3D {
    return this.ground;
  }
}
