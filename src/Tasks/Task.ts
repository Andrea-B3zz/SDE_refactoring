import KeyListener from '../Utility/KeyListener.js';
import MouseListener from '../Utility/MouseListener.js';
import Button from './Button.js';

export default abstract class Task {
  protected images: HTMLImageElement[];

  protected status: number;

  protected buttons: Button[];

  protected rightAnswer: number;

  protected isCompleted: boolean;

  protected mistakeN: number;

  protected mistakeGiven: boolean;

  public abstract processInput(mouseListener: MouseListener, keyListener: KeyListener): void;

  public abstract update(elapsed: number): void;

  public abstract render(canvas: HTMLCanvasElement): void;

  public checkMistake(): boolean {
    if (this.mistakeN == 2 && this.mistakeGiven == false) {
      this.mistakeGiven = true;
      return true;
    } else {
      return false;
    }
  }

  public abstract getIsCompleted(): boolean;
}
