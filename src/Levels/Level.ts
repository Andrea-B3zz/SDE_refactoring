import KeyListener from '../Utility/KeyListener.js';
import MouseListener from '../Utility/MouseListener.js';

export default abstract class Level {
  protected image: HTMLImageElement;

  protected canvas: HTMLCanvasElement;

  protected music: HTMLAudioElement;

  // 0 is english, 1 is dutch
  protected language: number;

  /**
   * to update the current level
   * @param elapsed the time elapsed
   */
  public update(elapsed: number): void{
    this.music.play();
  }

  public abstract nextLevel(canvas: HTMLCanvasElement): Level | null;

  public abstract processInput(keyListener: KeyListener, mouseListener: MouseListener): void;

  public abstract render(canvas: HTMLCanvasElement): void;

  public getMapWidth(): number {
    return this.image.width;
  }

  public getMapHeight(): number {
    return this.image.height;
  }
}
