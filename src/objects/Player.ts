import * as THREE from 'three';
import InputManager, { InputKey } from '../managers/InputManager';
import Ground from './Ground';
import ThemeManager from '../managers/ThemeManager';
import Constants from '../utilities/Constants';
import MoveParticles from './MoveParticles';

type Boundaries = {
  max: number;
  min: number;
};

export default class Player {
  public static readonly MOVE_SPEED: number = 10;

  private body: THREE.Mesh;
  private boundaries: Boundaries;
  private moveParticles: MoveParticles;

  public constructor() {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: ThemeManager.getTheme().player });

    this.body = new THREE.Mesh(geometry, material);
    this.body.position.y = Constants.GROUND_LEVEL + 0.5;

    this.boundaries = {
      max: Ground.WIDTH / 2 - 0.5,
      min: -(Ground.WIDTH / 2) + 0.5,
    };

    this.moveParticles = new MoveParticles(this.body.position);

    ThemeManager.onThemeChanged(() => {
      this.body.material = new THREE.MeshBasicMaterial({ color: ThemeManager.getTheme().player });
    });
  }

  public getObject3D(): THREE.Object3D {
    return this.body;
  }

  public getParticleObject3D(): THREE.Object3D {
    return this.moveParticles.getObject3D();
  }

  public update(inputManager: InputManager, deltaTime: number) {
    const movementSpeed = Player.MOVE_SPEED * deltaTime;

    const particleReferencePoint = new THREE.Vector3().copy(this.body.position);

    if (inputManager.isKeyPressed(InputKey.ArrowLeft)) {
      this.body.position.x = Math.max(this.body.position.x - movementSpeed, this.boundaries.min);
      particleReferencePoint.x += MoveParticles.MOVE_OFFSET;
      this.moveParticles.update(particleReferencePoint);
    } else if (inputManager.isKeyPressed(InputKey.ArrowRight)) {
      this.body.position.x = Math.min(this.body.position.x + movementSpeed, this.boundaries.max);
      particleReferencePoint.x -= MoveParticles.MOVE_OFFSET;
      this.moveParticles.update(particleReferencePoint);
    }
  }
}
