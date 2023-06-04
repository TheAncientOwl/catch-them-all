import * as THREE from 'three';

export default class MoveParticles {
  public static readonly PARTICLE_COUNT: number = 15;

  private geometry: THREE.BufferGeometry;
  private particles: THREE.Points;

  public constructor(playerPosition: THREE.Vector3) {
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
  }

  private getTextContentOrDefault(element: HTMLElement | null, def: string = ''): string {
    if (element === null) return def;
    if (element.textContent === null) return def;

    return element.textContent;
  }

  public getObject3D(): THREE.Object3D {
    return this.particles;
  }

  public update(playerPosition: THREE.Vector3) {
    console.log(playerPosition);
  }
}
