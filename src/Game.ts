import SceneRenderer from './SceneRenderer';

export default class Game {
  private sceneRenderer: SceneRenderer;

  constructor() {
    this.sceneRenderer = new SceneRenderer(true);
  }

  run() {
    this.sceneRenderer.render();

    requestAnimationFrame(() => this.run());
  }
}
