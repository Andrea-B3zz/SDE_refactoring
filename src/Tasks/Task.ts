import KeyListener from '../Utility/KeyListener.js';
import MouseListener from '../Utility/MouseListener.js';
import Button from './Button.js';

export default abstract class Task {
  protected images: HTMLImageElement[];

  protected status: number;

  protected buttons: Button[];

  protected rightAnswer: number;

  protected isCompleted: boolean;

  public abstract processInput(mouseListener: MouseListener, keyListener: KeyListener): void;

  public abstract update(elapsed: number): void;

  public abstract render(canvas: HTMLCanvasElement): void;

  public abstract getIsCompleted(): boolean;
}
