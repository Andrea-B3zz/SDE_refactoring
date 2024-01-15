import CanvasRenderer from '../Utility/CanvasRenderer.js';
import MouseListener from '../Utility/MouseListener.js';
import Task from './Task.js';
import Button from './Button.js';
import KeyListener from '../Utility/KeyListener.js';

export default class Word extends Task {
  public constructor(rightAnswer: number, language: number) {
    super();
    this.status = 0;
    this.buttons = [];
    this.isCompleted = false;
    this.rightAnswer = rightAnswer;
    this.language = language;

    this.images = [];
    if (language == 0) {
      this.loadImages('English', 'EN');
    } else {
      this.loadImages('Dutch', 'NL');
    }

    this.addButtons();
    this.mistakeGiven = false;
    this.mistakeN = 0;
  }

  /**
   * loads the specific images, depending on the chosen language
   * @param language the language that is chosen
   * @param letters short letters
   */
  protected override loadImages(language: string, letters: string): void {
    if (this.rightAnswer == 1) {
      this.images.push(CanvasRenderer.loadNewImage(`./assets/Word_tasks/${language}/Word_task1-1${letters}.png`));
      this.images.push(CanvasRenderer.loadNewImage(`./assets/Word_tasks/${language}/Word_task1-2${letters}.png`));
    } else if (this.rightAnswer == 2) {
      this.images.push(CanvasRenderer.loadNewImage(`./assets/Word_tasks/${language}/Word_task2-1${letters}.png`));
      this.images.push(CanvasRenderer.loadNewImage(`./assets/Word_tasks/${language}/Word_task2-2${letters}.png`));
    } else {
      this.images.push(CanvasRenderer.loadNewImage(`./assets/Word_tasks/${language}/Word_task3-1${letters}.png`));
      this.images.push(CanvasRenderer.loadNewImage(`./assets/Word_tasks/${language}/Word_task3-2${letters}.png`));
    }
  }

  private addButtons(): void {
    this.buttons.push(new Button(133, 171, 78, 130, 1));
    this.buttons.push(new Button(635, 670, 23, 67, 1));
    this.buttons.push(new Button(470, 520, 83, 127, 1));
    this.buttons.push(new Button(326, 401, 25, 65, 1));
    this.buttons.push(new Button(635, 670, 83, 127, 1));
  }

  /**
   *
   * @param mouseListener passed parameter
   * @param keyListener passed parameter
   */
  public override processInput(mouseListener: MouseListener, keyListener: KeyListener): void {
    if (mouseListener.buttonPressed(MouseListener.BUTTON_LEFT)) {
      if (this.isCollidingWithRectangle(mouseListener) == this.rightAnswer) {
        this.status += 1;
      } else {
        if (this.isCollidingWithRectangle(mouseListener) != -1) {
          this.mistakeN += 1;
          this.buttons.splice(this.isCollidingWithRectangle(mouseListener) - 1, 1);
        }
      }
    }

    if (keyListener.keyPressed(KeyListener.KEY_SPACE) && this.status >= this.images.length - 1) {
      this.isCompleted = true;
    }
  }

  /**
   *
   * @param mouseListener passed parameter
   * @returns the rectangle it collides with
   */
  public isCollidingWithRectangle(mouseListener: MouseListener): number {
    // 1.363636 bc there is a problem with canvas height and width
    for (let i: number = 0; i < this.buttons.length; i++) {
      const item: Button = this.buttons[i];
      if (
        mouseListener.getMousePosition().x * 1.363636 < item.getRightX()
        && mouseListener.getMousePosition().x * 1.363636 > item.getLeftX()
        && mouseListener.getMousePosition().y * 1.363636 > item.getTopY()
        && mouseListener.getMousePosition().y * 1.363636 < item.getBottomY()
      ) {
        return i + 1;
      }
    }
    return -1;
  }

  public getIsCompleted(): boolean {
    return this.isCompleted;
  }

  /**
   * renders the images for the word tasks
   * @param canvas HTML canvas element
   */
  public override render(canvas: HTMLCanvasElement): void {
    if (this.status < this.images.length) {
      CanvasRenderer.drawImage(canvas, this.images[this.status], -80, 0);
    } else {
      CanvasRenderer.drawImage(canvas, this.images[this.images.length - 1], 0, 0);
    }

    if (!(this.status >= this.images.length - 1)) {
      for (let i: number = 0; i < this.buttons.length; i++) {
        const width: number = this.buttons[i].getRightX() - this.buttons[i].getLeftX();
        const height: number = this.buttons[i].getBottomY() - this.buttons[i].getTopY();
        CanvasRenderer.drawRectangle(
          canvas,
          this.buttons[i].getLeftX(),
          this.buttons[i].getTopY(),
          width,
          height,
          this.buttons[i].getColor(),
        );
      }
    }
  }
}
