import * as THREE from 'three';

import Random from '../utilities/Random';
import Constants from '../utilities/Constants';

import vertexshader from '../shaders/vertexshader.glsl';
import fragmentshader from '../shaders/fragmentshader.glsl';

export default class RainbowParticles {
  private static readonly OFFSET_X: number = 0.8;
  private static readonly OFFSET_Y: number = 0.5;
  private static readonly OFFSET_Z: number = 0.7;
  private static readonly RECALCULATE_HEIGHT_OFFSETS_TIME: number = 0.19;

  private particleCount: number;

  private geometry: THREE.BufferGeometry;
  private particles: THREE.Points;

  private randomOffsets: Array<THREE.Vector3>;
  private heightOffsetTimer: number;

  public constructor(centerPosition: THREE.Vector3, particleCount: number) {
    this.particleCount = particleCount;
    this.heightOffsetTimer = 0;

    this.randomOffsets = this.createRandomOffsets();
    this.geometry = this.createGeometry();

    this.particles = new THREE.Points(this.geometry, this.createShaderMaterial());

    this.centerParticlesAround(centerPosition, 0);
  }

  public getObject3D(): THREE.Object3D {
    return this.particles;
  }

  public update(position: THREE.Vector3, deltaTime: number) {
    this.recalculateHeightOffsets(deltaTime);

    this.centerParticlesAround(position, deltaTime);
  }

  private recalculateHeightOffsets(deltaTime: number) {
    this.heightOffsetTimer += deltaTime;

    if (this.heightOffsetTimer > RainbowParticles.RECALCULATE_HEIGHT_OFFSETS_TIME) {
      this.heightOffsetTimer -= RainbowParticles.RECALCULATE_HEIGHT_OFFSETS_TIME;

      for (let i = 0; i < this.particleCount; i++) {
        this.randomOffsets[i].y = Random.randBetween(0.3, RainbowParticles.OFFSET_Y);
      }
    }
  }

  private createGeometry(): THREE.BufferGeometry {
    const positions = new Float32Array(this.particleCount * 3);
    const colors: number[] = [];
    const sizes: number[] = [];

    const color = new THREE.Color(0xffffff);

    for (let i = 0; i < this.particleCount; i++) {
      color.setHSL(1.0 * (i / this.particleCount), 0.9, 0.5);
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
      pointTexture: { value: new THREE.TextureLoader().load('../../assets/rainbow_particle.png') },
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

  private createRandomOffsets(): Array<THREE.Vector3> {
    const offsets: Array<THREE.Vector3> = [];

    for (let i = 0; i < this.particleCount; i++) {
      offsets.push(
        new THREE.Vector3(
          Random.randBetween(-RainbowParticles.OFFSET_X, RainbowParticles.OFFSET_X),
          Random.randBetween(0.3, RainbowParticles.OFFSET_Y),
          Random.randBetween(-RainbowParticles.OFFSET_Z, RainbowParticles.OFFSET_Z)
        )
      );
    }

    return offsets;
  }

  private centerParticlesAround(position: THREE.Vector3, deltaTime: number) {
    const positions = this.particles.geometry.attributes.position;

    for (let i = 0; i < this.particleCount; i++) {
      const { x, y, z } = this.randomOffsets[i];

      positions.setXYZ(
        i,
        position.x + x,
        Math.max(
          position.y - y - (Random.randBetween(0, 10) >= 5 ? -1 : 1) * Random.randBetween(0.25, 0.35) * deltaTime,
          Constants.GROUND_LEVEL
        ),
        position.z + z
      );
    }

    positions.needsUpdate = true;
  }
}
