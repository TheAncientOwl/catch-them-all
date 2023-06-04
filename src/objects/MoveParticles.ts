import * as THREE from 'three';
import Random from '../utilities/Random';
import Constants from '../utilities/Constants';

import fragmentshader from '../shaders/fragmentshader.glsl';
import vertexshader from '../shaders/vertexshader.glsl';

export default class MoveParticles {
  public static readonly PARTICLE_COUNT: number = 40;
  public static readonly OFFSET_X: number = 1;
  public static readonly OFFSET_Y: number = 0.45;
  public static readonly OFFSET_Z: number = 1;
  public static readonly MOVE_OFFSET: number = 0.5;

  private geometry: THREE.BufferGeometry;
  private particles: THREE.Points;

  private offsets: Array<THREE.Vector3>;

  public constructor(playerPosition: THREE.Vector3) {
    this.offsets = this.createOffsets();
    this.geometry = this.createGeometry();

    this.particles = new THREE.Points(this.geometry, this.createShaderMaterial());

    this.centerParticlesAround(playerPosition);
  }

  public getObject3D(): THREE.Object3D {
    return this.particles;
  }

  public update(playerPosition: THREE.Vector3) {
    this.centerParticlesAround(playerPosition);
  }

  private createGeometry(): THREE.BufferGeometry {
    const positions = new Float32Array(MoveParticles.PARTICLE_COUNT * 3);
    const colors: number[] = [];
    const sizes: number[] = [];

    const color = new THREE.Color(0xffffff);

    for (let i = 0; i < MoveParticles.PARTICLE_COUNT; i++) {
      color.setHSL(1.0 * (i / MoveParticles.PARTICLE_COUNT), 0.9, 0.5);
      color.toArray(colors, i * 3);

      sizes.push(25);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('customColor', new THREE.Float32BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1));

    return geometry;
  }

  private createShaderMaterial(): THREE.ShaderMaterial {
    const uniforms = {
      color: { value: new THREE.Color(0xffffff) },
      pointTexture: { value: new THREE.TextureLoader().load('../../assets/player_move_particle.png') },
    };

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: vertexshader,
      fragmentShader: fragmentshader,
      blending: THREE.AdditiveBlending,
      depthTest: false,
      transparent: true,
    });

    return material;
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
