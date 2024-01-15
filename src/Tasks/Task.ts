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

  protected language: number;

  public abstract processInput(mouseListener: MouseListener, keyListener: KeyListener): void;

  public abstract render(canvas: HTMLCanvasElement): void;

  /**
   *
   * @returns true if a mistake is made
   */
  public checkMistake(): boolean {
    if (this.mistakeN == 2 && this.mistakeGiven == false) {
      this.mistakeGiven = true;
      return true;
    } else {
      return false;
    }
  }

  public abstract getIsCompleted(): boolean;

  protected abstract loadImages(language: string, letters: string): void;
}
