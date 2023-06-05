import * as THREE from 'three';

import Pokeball from '../objects/Pokeball';
import SceneRenderer from './SceneRenderer';

export default class PokeballSpawner {
  private fruits: Array<Pokeball>;
  private fruitCount: number;

  public constructor() {
    this.fruits = [];
    this.fruitCount = 6;

    for (let _ = 0; _ < this.fruitCount; _++) {
      this.fruits.push(new Pokeball());
    }
  }

  public setupListener(sceneRenderer: SceneRenderer) {
    const input = document.getElementById('fruit-count');
    input?.addEventListener('input', e => {
      const inputValue = parseInt((e.target as HTMLInputElement).value);
      if (inputValue <= 0) return;

      for (; this.fruitCount < inputValue; this.fruitCount++) {
        const newFruit = new Pokeball();
        this.fruits.push(newFruit);
        sceneRenderer.add(newFruit.getObject3D());
      }

      for (; this.fruitCount > inputValue; this.fruitCount--) {
        sceneRenderer.remove(this.fruits[this.fruits.length - 1].getObject3D());
        this.fruits.pop();
      }
    });
  }

  public getFruitsObject3D(): Array<THREE.Object3D> {
    return this.fruits.map(fruit => fruit.getObject3D());
  }

  public update(deltaTime: number, player: THREE.Mesh): void {
    for (let fruit of this.fruits) {
      fruit.update(deltaTime, player);
    }
  }

  public reset() {
    for (let fruit of this.fruits) {
      fruit.reset();
    }
  }
}
