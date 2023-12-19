import MouseListener from '../Utility/MouseListener.js';

export default abstract class Task {
  protected images: HTMLImageElement[];

  protected status: number;

  protected buttons: HTMLElement[];

  public abstract processInput(mouseListener: MouseListener): void;

  public abstract update(elapsed: number): void;

  public abstract render(canvas: HTMLCanvasElement): void;
}
