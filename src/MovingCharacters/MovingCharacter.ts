import KeyListener from '../Utility/KeyListener.js';

export default abstract class MovingCharacter {
  protected posX: number;

  protected posY: number;

  protected speed: number;

  protected image: HTMLImageElement;

  public getPosX(): number {
    return this.posX;
  }

  public getSpeed(): number {
    return this.speed;
  }

  public getPosY(): number {
    return this.posY;
  }

  public getWidth(): number {
    return this.image.width;
  }

  public getHeight(): number {
    return this.image.height;
  }

  public setSpeed(value: number): void {
    this.speed = value;
  }

  /**
   * to update the item position
   * @param elapsed the time elapsed
   */
  public abstract update(elapsed: number): void;

  /**
   * to render
   * @param canvas to draw on
   */
  public abstract render(canvas: HTMLCanvasElement): void;
}
