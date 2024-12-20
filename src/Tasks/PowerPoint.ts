import CanvasRenderer from '../Utility/CanvasRenderer.js';
import MouseListener from '../Utility/MouseListener.js';
import Task from './Task.js';
import Button from './Button.js';
import KeyListener from '../Utility/KeyListener.js';

export default class PowerPoint extends Task {
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
      this.images.push(CanvasRenderer.loadNewImage(`./assets/PowerPoint_tasks/${language}/PowerPoint_task1_01${letters}.png`));
      this.images.push(CanvasRenderer.loadNewImage(`./assets/PowerPoint_tasks/${language}/PowerPoint_task1_02${letters}.png`));
    } else if (this.rightAnswer == 2) {
      this.images.push(CanvasRenderer.loadNewImage(`./assets/PowerPoint_tasks/${language}/PowerPoint_task2_01${letters}.png`));
      this.images.push(CanvasRenderer.loadNewImage(`./assets/PowerPoint_tasks/${language}/PowerPoint_task2_02${letters}.png`));
      this.images.push(CanvasRenderer.loadNewImage(`./assets/PowerPoint_tasks/${language}/PowerPoint_task2_03${letters}.png`));
      this.images.push(CanvasRenderer.loadNewImage(`./assets/PowerPoint_tasks/${language}/PowerPoint_task2_04${letters}.png`));
    } else {
      this.images.push(CanvasRenderer.loadNewImage(`./assets/PowerPoint_tasks/${language}/PowerPoint_task3_01${letters}.png`));
      this.images.push(CanvasRenderer.loadNewImage(`./assets/PowerPoint_tasks/${language}/PowerPoint_task3_02${letters}.png`));
      this.images.push(CanvasRenderer.loadNewImage(`./assets/PowerPoint_tasks/${language}/PowerPoint_task3_03${letters}.png`));
    }
  }

  private addButtons(): void {
    this.buttons.push(new Button(296, 355, 35, 135, 2));
    this.buttons.push(new Button(320, 410, 3, 27, 2));
    this.buttons.push(new Button(843, 965, 3, 27, 2));
    this.buttons.push(new Button(166, 222, 35, 135, 2));
    this.buttons.push(new Button(585, 700, 3, 27, 2));
  }

  /**
   * process the input of the player
   * @param mouseListener the button that the player has pressed
   * @param keyListener the key that the player presses when they finish a task
   */
  public override processInput(mouseListener: MouseListener, keyListener: KeyListener): void {
    if (mouseListener.buttonPressed(MouseListener.BUTTON_LEFT)) {
      for (let i: number = 0; i < this.buttons.length; i++) {
        if (this.buttons[i].isColliding(mouseListener) && i + 1 == this.rightAnswer) {
          this.status += 1;
          this.buttonRefactor();
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

  /**
   * changes the buttons according to the tasks' pictures
   * @returns buttons
   */
  public buttonRefactor(): Button[] {
    if (this.rightAnswer == 2) {
      // this.status >= this.buttons.length
      this.buttons.splice(0, this.buttons.length);
      this.buttons.push(new Button(320, 410, 3, 27, 2));
      this.buttons.push(new Button(330, 390, 35, 135, 2));
      this.buttons.push(new Button(185, 245, 35, 125, 2));
      this.buttons.push(new Button(630, 685, 35, 125, 2));
      this.buttons.push(new Button(800, 925, 3, 27, 2));
      if (this.status === 2) {
        this.buttons.splice(0, this.buttons.length);
        this.buttons.push(new Button(-320, -410, -3, -27, 2));
        this.buttons.push(new Button(242, 405, 255, 480, 2));
      }
    } else if (this.rightAnswer == 3) {
      this.buttons.splice(0, this.buttons.length);
      this.buttons.push(new Button(580, 645, 50, 155, 2));
      this.buttons.push(new Button(755, 860, 50, 155, 2));
      this.buttons.push(new Button(20, 110, 50, 155, 2));
    }
    return this.buttons;
  }

  /**
   *
   * @param canvas passed
   */
  public override render(canvas: HTMLCanvasElement): void {
    if (this.status < this.images.length) {
      CanvasRenderer.drawImage(canvas, this.images[this.status], 0, 0);
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
