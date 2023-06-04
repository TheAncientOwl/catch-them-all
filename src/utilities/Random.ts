export default class Random {
  public static randBetween(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }
}
