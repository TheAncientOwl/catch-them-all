import * as THREE from 'three';

import FallingFruit from '../objects/FallingFruit';

export default class FruitSpawner {
  public static readonly FRUIT_COUNT: number = 6;
  private fruits: Array<FallingFruit>;

  public constructor() {
    this.fruits = [];

    for (let _ = 0; _ < FruitSpawner.FRUIT_COUNT; _++) {
      this.fruits.push(new FallingFruit());
    }
  }

  public getFruitsObject3D(): Array<THREE.Object3D> {
    return this.fruits.map(fruit => fruit.getObject3D());
  }

  public update(deltaTime: number, player: THREE.Mesh): void {
    for (let fruit of this.fruits) {
      fruit.update(deltaTime, player);
    }
  }
}
