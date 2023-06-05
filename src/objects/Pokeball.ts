import * as THREE from 'three';
import CollisionManager from '../managers/CollisionManager';
import Random from '../utilities/Random';
import Ground from './Ground';
import Constants from '../utilities/Constants';
import ScoreManager from '../managers/ScoreManager';

export default class Pokeball {
  private static readonly MIN_SPEED: number = 3;
  private static readonly MAX_SPEED: number = 4;

  private body: THREE.Mesh;
  private speed: number;

  public constructor() {
    this.speed = Random.randBetween(Pokeball.MIN_SPEED, Pokeball.MAX_SPEED);

    this.body = this.makePokeball(0.4, 32, 32) as THREE.Mesh;

    this.randomizePosition();
  }

  public getObject3D(): THREE.Object3D {
    return this.body;
  }

  public update(deltaTime: number, player: THREE.Mesh): void {
    this.body.position.y -= this.speed * deltaTime;

    if (this.body.position.y < Constants.GROUND_LEVEL + 0.25) {
      this.speed = Random.randBetween(Pokeball.MIN_SPEED, Pokeball.MAX_SPEED);
      this.randomizePosition();
    }

    if (CollisionManager.collide(this.body, player)) {
      ScoreManager.increase();
      this.randomizePosition();
    }
  }

  private randomizePosition(): void {
    const randomPosition = new THREE.Vector3(
      Random.randBetween(-Ground.WIDTH / 2, Ground.WIDTH / 2),
      Random.randBetween(6, 9),
      0
    );

    this.body.position.copy(randomPosition);
  }

  public reset() {
    this.body.position.y = Random.randBetween(6, 9);
    this.speed = Random.randBetween(Pokeball.MIN_SPEED, Pokeball.MAX_SPEED);
  }

  private makePokeball(radius: number, widthSegments: number, heightSegments: number): THREE.Object3D {
    const geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);

    // Get the vertex positions and indices
    const positions = geometry.getAttribute('position').array as Float32Array;
    const indices = geometry.getIndex()!.array as Uint16Array;

    // Create materials for the two halves
    const firstHalfMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const secondHalfMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });

    // Split the indices into two parts
    const indexCount = indices.length;
    const halfIndexCount = Math.floor(indexCount / 2);

    // Create geometry and mesh for the first half
    const firstHalfGeometry = new THREE.BufferGeometry();
    firstHalfGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    firstHalfGeometry.setIndex(new THREE.BufferAttribute(indices.slice(0, halfIndexCount), 1));
    const firstHalfMesh = new THREE.Mesh(firstHalfGeometry, firstHalfMaterial);

    // Create geometry and mesh for the second half
    const secondHalfGeometry = new THREE.BufferGeometry();
    secondHalfGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    secondHalfGeometry.setIndex(new THREE.BufferAttribute(indices.slice(halfIndexCount), 1));
    const secondHalfMesh = new THREE.Mesh(secondHalfGeometry, secondHalfMaterial);

    // Create a parent object to hold both halves
    const pokeball = new THREE.Object3D();
    pokeball.add(firstHalfMesh);
    pokeball.add(secondHalfMesh);

    return pokeball;
  }
}
