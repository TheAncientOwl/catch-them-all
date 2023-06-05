export enum InputKey {
  ArrowLeft = 'ArrowLeft',
  ArrowRight = 'ArrowRight',
}

export default class InputManager {
  private keys: { [key: string]: boolean };

  constructor() {
    this.keys = {};

    document.addEventListener('keydown', this.handleKeyDown.bind(this));
    document.addEventListener('keyup', this.handleKeyUp.bind(this));
  }

  private handleKeyDown(event: KeyboardEvent): void {
    this.keys[event.key] = true;
  }

  private handleKeyUp(event: KeyboardEvent): void {
    this.keys[event.key] = false;
  }

  public isKeyPressed(key: InputKey): boolean {
    return this.keys[key] === true;
  }
}
