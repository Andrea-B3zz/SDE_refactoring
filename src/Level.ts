import KeyListener from './Utility/KeyListener.js';
import MouseListener from './Utility/MouseListener.js';

export default abstract class Level {
  protected image: HTMLImageElement;

  protected canvas: HTMLCanvasElement;

  protected music: HTMLAudioElement;

  public abstract update(elapsed: number): void;

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
