export default class ScoreManager {
  private static score: number = 0;
  private static htmlElement: HTMLElement | null = null;

  public static increase() {
    if (ScoreManager.htmlElement === null) {
      ScoreManager.htmlElement = document.getElementById('score');
      ScoreManager.htmlElement!.textContent = `Score: 0`;
      ScoreManager.score = 0;
    }

    ScoreManager.score++;
    ScoreManager.htmlElement!.textContent = `Score: ${ScoreManager.score}`;
  }
}
