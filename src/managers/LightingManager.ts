import * as THREE from 'three';
import SceneRenderer from './SceneRenderer';
import ThemeManager from './ThemeManager';

export default class LightingManager {
  public static readonly LIGHT_COUNT: number = 10;
  public static readonly LIGHT_DISTANCE: number = 6;

  private lights: Array<THREE.PointLight>;
  private lightsHelpers: Array<THREE.PointLightHelper>;

  public constructor() {
    this.lights = [];
    this.lightsHelpers = [];
  }

  public createLighting() {
    for (let i = 0; i < LightingManager.LIGHT_COUNT; i++) {
      // Positions evenly in a circle pointed at the origin
      const light = new THREE.PointLight(0xffffff, 1);
      let lightX = LightingManager.LIGHT_DISTANCE * Math.sin(((Math.PI * 2) / LightingManager.LIGHT_COUNT) * i);
      let lightZ = LightingManager.LIGHT_DISTANCE * Math.cos(((Math.PI * 2) / LightingManager.LIGHT_COUNT) * i);

      // Create a light
      light.position.set(lightX, LightingManager.LIGHT_DISTANCE, lightZ);
      light.lookAt(0, 0, 0);
      this.lights.push(light);
    }
  }

  public addToSceneRenderer(sceneRenderer: SceneRenderer, helpers: boolean = true) {
    for (let light of this.lights) {
      sceneRenderer.add(light);

      if (helpers) {
        const lightHelper = new THREE.PointLightHelper(light, 0.5, ThemeManager.getTheme().light);
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
