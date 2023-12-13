import Backstory from './Backstory.js';
import KeyListener from './Utility/KeyListener.js';
import MouseListener from './Utility/MouseListener.js';

export default abstract class Level {
  protected image: HTMLImageElement;

  protected canvas: HTMLCanvasElement;

  public abstract update(elapsed: number): void;

  public abstract nextLevel(canvas: HTMLCanvasElement): Level | null;
;
  public abstract startLevel(): void;

  public abstract processInput(keyListener: KeyListener): void;

  public abstract render(canvas: HTMLCanvasElement): void;
}
