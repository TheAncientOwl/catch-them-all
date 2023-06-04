import * as THREE from 'three';
import InputManager, { InputKey } from '../managers/InputManager';
import Ground from './Ground';
import ThemeManager from '../managers/ThemeManager';
import Constants from '../utilities/Constants';
import RainbowParticles from './RainbowParticles';

type Boundaries = {
  max: number;
  min: number;
};

export default class Player {
  private static readonly PARTICLE_COUNT: number = 40;
  private static readonly PARTICLES_OFFSET: number = 0.8;
  private static readonly MOVE_SPEED: number = 12;

  private body: THREE.Mesh;
  private boundaries: Boundaries;
  private rainbowParticles: RainbowParticles;

  public constructor() {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: ThemeManager.getTheme().player });

    this.body = new THREE.Mesh(geometry, material);
    this.body.position.y = Constants.GROUND_LEVEL + 0.5;

    this.boundaries = {
      max: Ground.WIDTH / 2 - 0.5,
      min: -(Ground.WIDTH / 2) + 0.5,
    };

    this.rainbowParticles = new RainbowParticles(this.body.position, Player.PARTICLE_COUNT);

    ThemeManager.onThemeChanged(() => {
      this.body.material = new THREE.MeshBasicMaterial({ color: ThemeManager.getTheme().player });
    });
  }

  public getObject3D(): THREE.Object3D {
    return this.body;
  }

  public getParticleObject3D(): THREE.Object3D {
    return this.rainbowParticles.getObject3D();
  }

  public update(inputManager: InputManager, deltaTime: number) {
    const movementSpeed = Player.MOVE_SPEED * deltaTime;

    const particleReferencePoint = new THREE.Vector3().copy(this.body.position);

    if (inputManager.isKeyPressed(InputKey.ArrowLeft)) {
      this.body.position.x = Math.max(this.body.position.x - movementSpeed, this.boundaries.min);
      particleReferencePoint.x += Player.PARTICLES_OFFSET;
    } else if (inputManager.isKeyPressed(InputKey.ArrowRight)) {
      this.body.position.x = Math.min(this.body.position.x + movementSpeed, this.boundaries.max);
      particleReferencePoint.x -= Player.PARTICLES_OFFSET;
    }
    this.rainbowParticles.update(particleReferencePoint, deltaTime);
  }

  public reset() {
    this.body.position.x = 0;
    this.body.position.z = 0;
  }
}
