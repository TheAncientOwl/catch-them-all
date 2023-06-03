import * as THREE from 'three';

export default interface ILighting {
  lights: Array<THREE.PointLight>;
  lightCount: number;
  lightDistance: number;
}
