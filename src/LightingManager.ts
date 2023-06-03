import * as THREE from 'three';
import SceneRenderer from './SceneRenderer';

export default class LightingManager {
  lights: Array<THREE.PointLight>;
  lightsHelpers: Array<THREE.PointLightHelper>;
  lightCount: number;
  lightDistance: number;

  public constructor(lightCount: number, lightDistance: number) {
    this.lightCount = lightCount;
    this.lightDistance = lightDistance;
    this.lights = [];
    this.lightsHelpers = [];
  }

  public createLighting() {
    for (let i = 0; i < this.lightCount; i++) {
      // Positions evenly in a circle pointed at the origin
      const light = new THREE.PointLight(0xffffff, 1);
      let lightX = this.lightDistance * Math.sin(((Math.PI * 2) / this.lightCount) * i);
      let lightZ = this.lightDistance * Math.cos(((Math.PI * 2) / this.lightCount) * i);

      // Create a light
      light.position.set(lightX, this.lightDistance, lightZ);
      light.lookAt(0, 0, 0);
      this.lights.push(light);
    }
  }

  public addToSceneRenderer(sceneRenderer: SceneRenderer, helpers: boolean = true) {
    for (let light of this.lights) {
      sceneRenderer.add(light);

      if (helpers) {
        const lightHelper = new THREE.PointLightHelper(light, 0.5, 0xff9900);
        this.lightsHelpers.push(lightHelper);
        sceneRenderer.add(lightHelper);
      }
    }
  }

  public removeFromSceneRenderer(sceneRenderer: SceneRenderer) {
    for (let light of this.lights) {
      sceneRenderer.remove(light);
    }

    for (let lightHelper of this.lightsHelpers) {
      sceneRenderer.remove(lightHelper);
    }
  }
}
