import * as THREE from 'three';

export default class CollisionManager {
  public static collide(cube1: THREE.Mesh, cube2: THREE.Mesh): boolean {
    const box1 = new THREE.Box3().setFromObject(cube1);
    const box2 = new THREE.Box3().setFromObject(cube2);

    return box1.intersectsBox(box2);
  }
}
