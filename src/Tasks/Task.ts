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

  public constructor(rightAnswer: number){
    this.status = 0;
    this.buttons = [];
    this.isCompleted = false;
    this.rightAnswer = rightAnswer;
    this.images = [];

    this.images = [];

    this.mistakeN = 0;
    this.mistakeGiven = false;
  }

  /**
   * process the input of the player
   * @param mouseListener the button that the player has pressed
   * @param keyListener the key that the player presses when they finish a task
   */
  public processInput(mouseListener: MouseListener, keyListener: KeyListener): void {
    if (mouseListener.buttonPressed(MouseListener.BUTTON_LEFT)) {
      for (let i: number = 0; i < this.buttons.length; i++) {
        if (this.buttons[i].isColliding(mouseListener) && i + 1 == this.rightAnswer) {
          this.status += 1;
        } else {
          if (this.buttons[i].isColliding(mouseListener) && i + 1 != this.rightAnswer) {
            this.mistakeN += 1;
            this.buttons[i].delete();
          }
        }
      }
    }

    if (keyListener.keyPressed(KeyListener.KEY_SPACE) && this.status >= this.images.length - 1) {
      this.isCompleted = true;
    }
  }
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

  public getIsCompleted(): boolean {
    return this.isCompleted;
  }

  protected abstract loadImages(language: string, letters: string): void;
}
