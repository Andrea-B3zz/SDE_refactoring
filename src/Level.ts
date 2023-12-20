import KeyListener from './Utility/KeyListener.js';

export default abstract class Level {
  protected image: HTMLImageElement;

  protected canvas: HTMLCanvasElement;

  public abstract update(elapsed: number): void;

  public abstract nextLevel(canvas: HTMLCanvasElement): Level | null;

  public abstract processInput(keyListener: KeyListener): void;

  public abstract render(canvas: HTMLCanvasElement): void;

  public getMapWidth(): number {
    return this.image.width;
  }

  public getMapHeight(): number {
    return this.image.height;
  }
}
