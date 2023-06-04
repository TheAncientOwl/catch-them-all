import * as THREE from 'three';
import Random from '../utilities/Random';
import Constants from '../utilities/Constants';

export default class MoveParticles {
  public static readonly PARTICLE_COUNT: number = 40;
  public static readonly OFFSET_X: number = 1;
  public static readonly OFFSET_Y: number = 0.45;
  public static readonly OFFSET_Z: number = 1;

  private geometry: THREE.BufferGeometry;
  private particles: THREE.Points;
  private previousPlayerPositionX: number;

  public constructor(playerPosition: THREE.Vector3) {
    this.previousPlayerPositionX = playerPosition.x;

    const positions = new Float32Array(MoveParticles.PARTICLE_COUNT * 3);
    const colors: number[] = [];
    const sizes: number[] = [];

    const color = new THREE.Color(0xffffff);

    for (let i = 0; i < MoveParticles.PARTICLE_COUNT; i++) {
      const position = new THREE.Vector3(
        playerPosition.x + Random.randBetween(-MoveParticles.OFFSET_X, MoveParticles.OFFSET_X),
        THREE.MathUtils.clamp(
          playerPosition.y - Random.randBetween(0.3, MoveParticles.OFFSET_Y),
          Constants.GROUND_LEVEL,
          10
        ),
        playerPosition.z + Random.randBetween(-MoveParticles.OFFSET_Z, MoveParticles.OFFSET_Z)
      );
      position.toArray(positions, i * 3);

      color.setHSL(1.0 * (i / MoveParticles.PARTICLE_COUNT), 0.9, 0.5);
      color.toArray(colors, i * 3);

      sizes.push(25);
    }

    this.geometry = new THREE.BufferGeometry();
    this.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    this.geometry.setAttribute('customColor', new THREE.Float32BufferAttribute(colors, 3));
    this.geometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1));

    const uniforms = {
      color: { value: new THREE.Color(0xffffff) },
      pointTexture: { value: new THREE.TextureLoader().load('../../assets/player_move_particle.png') },
    };

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: this.getTextContentOrDefault(document.getElementById('vertexshader')),
      fragmentShader: this.getTextContentOrDefault(document.getElementById('fragmentshader')),
      blending: THREE.AdditiveBlending,
      depthTest: false,
      transparent: true,
    });

    this.particles = new THREE.Points(this.geometry, material);
  }

  private getTextContentOrDefault(element: HTMLElement | null, def: string = ''): string {
    if (element === null) return def;
    if (element.textContent === null) return def;

    return element.textContent;
  }

  public getObject3D(): THREE.Object3D {
    return this.particles;
  }

  public update(playerPositionX: number) {
    const xDelta = this.previousPlayerPositionX - playerPositionX;
    this.previousPlayerPositionX = playerPositionX;

    const positions = this.particles.geometry.attributes.position;
    for (let i = 0; i < MoveParticles.PARTICLE_COUNT; i++) {
      positions.setX(i, positions.getX(i) - xDelta);
    }
    positions.needsUpdate = true;
  }
}
