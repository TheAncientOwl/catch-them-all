export default class FPSManager {
  private timer: number;
  private display: HTMLElement;
  private frames: number;

  public constructor() {
    this.timer = 0;
    this.frames = 0;

    this.display = document.getElementById('fps-counter') as HTMLElement;
  }

  public update(deltaTime: number) {
    this.timer += deltaTime;
    this.frames++;

    if (this.timer >= 1) {
      const fps = Math.round(this.frames / deltaTime);
      this.display.textContent = `${fps} FPS`;
      this.timer -= 60;
      this.frames = 0;
    }
  }
}
