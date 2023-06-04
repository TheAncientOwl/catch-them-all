export default class Random {
  public static randBetween(min: number, max: number): number {
    return parseFloat((Math.random() * (max - min) + min).toFixed(4));
  }
}
