import CanvasRenderer from '../Utility/CanvasRenderer.js';
import Task from './Task.js';
import Button from './Button.js';

export default class Word extends Task {
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
   * renders the images for the word tasks
   * @param canvas HTML canvas element
   */
  public override render(canvas: HTMLCanvasElement): void {
    if (this.status < this.images.length) {
      CanvasRenderer.drawImage(canvas, this.images[this.status], -80, 0);
    }

    if (!(this.status >= this.images.length - 1)) {
      for (let i: number = 0; i < this.buttons.length; i++) {
        this.buttons[i].render(canvas);
      }
    }
  }
}
