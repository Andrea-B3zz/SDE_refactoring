import CanvasRenderer from '../Utility/CanvasRenderer.js';
import MouseListener from '../Utility/MouseListener.js';
import Task from './Task.js';
import Button from './Button.js';
import KeyListener from '../Utility/KeyListener.js';

export default class PowerPoint extends Task {
  public constructor(rightAnswer: number) {
    super();
    this.status = 0;
    this.buttons = [];
    this.isCompleted = false;
    this.rightAnswer = rightAnswer;
    this.images = [];
    if (this.rightAnswer == 1) {
      this.images.push(CanvasRenderer.loadNewImage('./assets/PowerPoint_tasks/PowerPoint_task1_01.png'));
      this.images.push(CanvasRenderer.loadNewImage('./assets/PowerPoint_tasks/PowerPoint_task1_02.png'));
    } else if (this.rightAnswer == 2) {
      this.images.push(CanvasRenderer.loadNewImage('./assets/PowerPoint_tasks/PowerPoint_task2_01.png'));
      this.images.push(CanvasRenderer.loadNewImage('./assets/PowerPoint_tasks/PowerPoint_task2_02.png'));
      this.images.push(CanvasRenderer.loadNewImage('./assets/PowerPoint_tasks/PowerPoint_task2_03.png'));
      this.images.push(CanvasRenderer.loadNewImage('./assets/PowerPoint_tasks/PowerPoint_task2_04.png'));
    } else {
      this.images.push(CanvasRenderer.loadNewImage('./assets/PowerPoint_tasks/PowerPoint_task3_01.png'));
      this.images.push(CanvasRenderer.loadNewImage('./assets/PowerPoint_tasks/PowerPoint_task3_02.png'));
      this.images.push(CanvasRenderer.loadNewImage('./assets/PowerPoint_tasks/PowerPoint_task3_03.png'));
    }

    this.addButtons();
  }

  private addButtons(): void {
    this.buttons.push(new Button(296, 355, 35, 135));
    this.buttons.push(new Button(166, 222, 35, 135));
    this.buttons.push(new Button(320, 410, 3, 27));
    this.buttons.push(new Button(585, 700, 3, 27));
    this.buttons.push(new Button(843, 965, 3, 27));
  }

  /**
   *
   * @param mouseListener
   * @param keyListener
   */
  public override processInput(mouseListener: MouseListener, keyListener: KeyListener): void {
    if (mouseListener.buttonPressed(MouseListener.BUTTON_LEFT)) {
      if (this.isCollidingWithRectangle(mouseListener) == this.rightAnswer) {
        console.log(this.status);
        this.status += 1;
        this.buttonRefactor();
      }
    }

    if (keyListener.keyPressed(KeyListener.KEY_SPACE) && this.status >= this.images.length-1) {
      this.isCompleted = true;
    }
  }

  /**
   *
   * @param mouseListener
   * @returns
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

  /**
   *
   * @param elapsed
   */
  public override update(elapsed: number): void {
  }

  public getIsCompleted(): boolean {
    return this.isCompleted;
  }

  public buttonRefactor(): void {
    if (this.rightAnswer == 0) {
    } else if (this.rightAnswer == 1) {
      // this.status >= this.buttons.length
    } else {

    }
  }

  /**
   *
   * @param canvas
   */
  public override render(canvas: HTMLCanvasElement): void {
    if (this.status < this.images.length) {
      CanvasRenderer.drawImage(canvas, this.images[this.status], 0, 0);
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
