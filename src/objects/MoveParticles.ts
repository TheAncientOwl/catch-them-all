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

  private offsets: Array<THREE.Vector3>;

  public constructor(playerPosition: THREE.Vector3) {
    this.offsets = this.createOffsets();

    const positions = new Float32Array(MoveParticles.PARTICLE_COUNT * 3);
    const colors: number[] = [];
    const sizes: number[] = [];

    const color = new THREE.Color(0xffffff);

    for (let i = 0; i < MoveParticles.PARTICLE_COUNT; i++) {
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

    this.centerParticlesAround(playerPosition);
  }

  public getObject3D(): THREE.Object3D {
    return this.particles;
  }

  public update(playerPosition: THREE.Vector3) {
    this.centerParticlesAround(playerPosition);
  }

  private getTextContentOrDefault(element: HTMLElement | null, def: string = ''): string {
    if (element === null) return def;
    if (element.textContent === null) return def;

    return element.textContent;
  }

  private createOffsets(): Array<THREE.Vector3> {
    const offsets: Array<THREE.Vector3> = [];

    for (let i = 0; i < MoveParticles.PARTICLE_COUNT; i++) {
      offsets.push(
        new THREE.Vector3(
          Random.randBetween(-MoveParticles.OFFSET_X, MoveParticles.OFFSET_X),
          Random.randBetween(0.3, MoveParticles.OFFSET_Y),
          Random.randBetween(-MoveParticles.OFFSET_Z, MoveParticles.OFFSET_Z)
        )
      );
    }

    return offsets;
  }

  private centerParticlesAround(position: THREE.Vector3) {
    const positions = this.particles.geometry.attributes.position;

    for (let i = 0; i < MoveParticles.PARTICLE_COUNT; i++) {
      const { x, y, z } = this.offsets[i];

      positions.setXYZ(
        i,
        position.x + x,
        THREE.MathUtils.clamp(position.y - y, Constants.GROUND_LEVEL, 10),
        position.z + z
      );
    }

    positions.needsUpdate = true;
  }
}
