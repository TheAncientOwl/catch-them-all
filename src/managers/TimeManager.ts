import ScoreManager from './Scoremanager';
import ThemeManager from './ThemeManager';

export default class TimeManager {
  private static readonly ROUND_TIME: number = 30;

  private static time: number;
  private static timeHtmlElement: HTMLElement;
  private static gameOverHtmlElement: HTMLElement;

  public static setup() {
    TimeManager.time = TimeManager.ROUND_TIME;

    TimeManager.timeHtmlElement = document.getElementById('time-left') as HTMLElement;
    TimeManager.timeHtmlElement.textContent = `Score: 0`;

    TimeManager.gameOverHtmlElement = document.getElementById('game-over') as HTMLElement;
    this.gameOverHtmlElement.style.display = 'none';

    ThemeManager.onThemeChanged(() => {
      TimeManager.timeHtmlElement!.style.color = ThemeManager.getTheme().scoreColor;
    });
  }

  public static reset() {
    TimeManager.time = TimeManager.ROUND_TIME;
    ScoreManager.reset();
    this.gameOverHtmlElement.style.display = 'none';
  }

  public static update(deltaTime: number, resetCallback: () => void = TimeManager.reset): boolean {
    TimeManager.time -= deltaTime;

    if (TimeManager.time > 0) {
      const timeLeft = TimeManager.time.toFixed(1);
      TimeManager.timeHtmlElement!.textContent = `Time left: ${timeLeft}s`;

      const button = document.getElementById('play-again-button') as HTMLElement;
      const handleReset = () => {
        resetCallback();
        button.removeEventListener('click', handleReset);
      };
      button.addEventListener('click', handleReset);

      return true;
    } else {
      this.gameOverHtmlElement.style.display = 'flex';

      return false;
    }
  }
}
