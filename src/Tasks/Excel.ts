import CanvasRenderer from '../Utility/CanvasRenderer.js';
import Task from './Task.js';
import Button from './Button.js';

export default class Excel extends Task {
  public constructor(rightAnswer: number, language: number) {
    super(rightAnswer);
    this.addButtons();
    if (language == 0) {
      this.loadImages('English', 'EN');
    } else {
      this.loadImages('Dutch', 'NL');
    }
  }

  /**
   * loads the specific images, depending on the chosen language
   * @param language the language that is chosen
   * @param letters short letters
   */
  protected override loadImages(language: string, letters: string): void {
    if (this.rightAnswer == 1) {
      this.images.push(CanvasRenderer.loadNewImage(`./assets/Excel_tasks/${language}/Excel_task1-1${letters}.png`));
      this.images.push(CanvasRenderer.loadNewImage(`./assets/Excel_tasks/${language}/Excel_task1-2${letters}.png`));
    } else if (this.rightAnswer == 2) {
      this.images.push(CanvasRenderer.loadNewImage(`./assets/Excel_tasks/${language}/Excel_task2-1${letters}.png`));
      this.images.push(CanvasRenderer.loadNewImage(`./assets/Excel_tasks/${language}/Excel_task2-2${letters}.png`));
    } else {
      this.images.push(CanvasRenderer.loadNewImage(`./assets/Excel_tasks/${language}/Excel_task3-1${letters}.png`));
      this.images.push(CanvasRenderer.loadNewImage(`./assets/Excel_tasks/${language}/Excel_task3-2${letters}.png`));
    }
  }

  private addButtons(): void {
    this.buttons.push(new Button(613, 659, 60, 95, 3));
    this.buttons.push(new Button(375, 418, 60, 95, 3));
    this.buttons.push(new Button(326, 371, 60, 95, 3));
    this.buttons.push(new Button(230, 255, 63, 90, 3));
    this.buttons.push(new Button(900, 990, 2, 28, 3));
  }

  /**
   * renders the Excel tasks on the canvas
   * @param canvas HTML canvas element
   */
  public override render(canvas: HTMLCanvasElement): void {
    if (this.status < this.images.length) {
      CanvasRenderer.drawImage(canvas, this.images[this.status], -40, 0);
    } else {
      CanvasRenderer.drawImage(canvas, this.images[this.images.length - 1], 0, 0);
    }

    if (!(this.status >= this.images.length - 1)) {
      for (let i: number = 0; i < this.buttons.length; i++) {
        this.buttons[i].render(canvas);
      }
    }
  }
}
