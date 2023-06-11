import ThemeManager from './ThemeManager';

export default class ScoreManager {
  private static score: number = 0;
  private static htmlElement: HTMLElement | null = null;

  public static setup() {
    ScoreManager.htmlElement = document.getElementById('score');
    ScoreManager.htmlElement!.textContent = `Score: 0`;
    ScoreManager.score = 0;

    ThemeManager.onThemeChanged(() => {
      ScoreManager.htmlElement!.style.color = ThemeManager.getTheme().scoreColor;
    });
  }

  public static reset() {
    ScoreManager.score = 0;
    ScoreManager.htmlElement!.textContent = `Score: ${ScoreManager.score}`;
  }

  public static increase() {
    ScoreManager.score++;
    ScoreManager.htmlElement!.textContent = `Score: ${ScoreManager.score}`;
  }
}
