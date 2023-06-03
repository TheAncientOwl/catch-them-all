export default class Timer {
  private previousTime: number;

  public constructor() {
    this.previousTime = performance.now();
  }

  public calculateDeltaTime(): number {
    const currentTime = performance.now();

    const deltaTime = (currentTime - this.previousTime) / 1000; // Convert to seconds
    this.previousTime = currentTime;

    return deltaTime;
  }
}
