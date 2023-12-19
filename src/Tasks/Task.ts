import MouseListener from '../Utility/MouseListener.js';
import Button from './Button.js';

export default abstract class Task {
  protected images: HTMLImageElement[];

  protected status: number;

  protected buttons: Button[];

  protected rightAnswer: number;

  public abstract processInput(mouseListener: MouseListener): void;

  public abstract update(elapsed: number): void;

  public abstract render(canvas: HTMLCanvasElement): void;
}
