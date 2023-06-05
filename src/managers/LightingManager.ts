import * as THREE from 'three';

import ThemeManager from './ThemeManager';

export default class LightingManager {
  private static readonly LIGHT_COUNT: number = 10;
  private static readonly LIGHT_DISTANCE: number = 5;

  private lights: Array<THREE.PointLight>;
  private lightsHelpers: Array<THREE.PointLightHelper>;

  public constructor(helpers: boolean = true) {
    this.lights = [];
    this.lightsHelpers = [];

    for (let i = 0; i < LightingManager.LIGHT_COUNT; i++) {
      const light = new THREE.PointLight(0xffffff, 1);
      let lightX = LightingManager.LIGHT_DISTANCE * Math.sin(((Math.PI * 2) / LightingManager.LIGHT_COUNT) * i);
      let lightZ = LightingManager.LIGHT_DISTANCE * Math.cos(((Math.PI * 2) / LightingManager.LIGHT_COUNT) * i);

      light.position.set(lightX, LightingManager.LIGHT_DISTANCE, lightZ);
      light.lookAt(0, 0, 0);
      this.lights.push(light);

      if (helpers) {
        const lightHelper = new THREE.PointLightHelper(light, 0.5, ThemeManager.getTheme().light);
        this.lightsHelpers.push(lightHelper);
      }
    }
  }

  public getLights(): Array<THREE.PointLight> {
    return this.lights;
  }

  public getLightHelpers(): Array<THREE.PointLightHelper> {
    return this.lightsHelpers;
  }
}
