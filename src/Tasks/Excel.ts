import CanvasRenderer from '../Utility/CanvasRenderer.js';
import MouseListener from '../Utility/MouseListener.js';
import Task from './Task.js';
import Button from './Button.js';
import KeyListener from '../Utility/KeyListener.js';

export default class Excel extends Task {
  public constructor(rightAnswer: number) {
    super();
    this.status = 0;
    this.buttons = [];
    this.isCompleted = false;
    this.rightAnswer = rightAnswer;
    this.images = [];
    if (this.rightAnswer == 1) {
      this.images.push(CanvasRenderer.loadNewImage('./assets/Excel_tasks/Excel_task1-1.png'));
      this.images.push(CanvasRenderer.loadNewImage('./assets/Excel_tasks/Excel_task1-2.png'));
    } else if (this.rightAnswer == 2) {
      this.images.push(CanvasRenderer.loadNewImage('./assets/Excel_tasks/Excel_task2-1.png'));
      this.images.push(CanvasRenderer.loadNewImage('./assets/Excel_tasks/Excel_task2-2.png'));
    }
    else {
      this.images.push(CanvasRenderer.loadNewImage('./assets/Excel_tasks/Excel_task3-1.png'));
      this.images.push(CanvasRenderer.loadNewImage('./assets/Excel_tasks/Excel_task3-2.png'));
    }

    this.addButtons();
  }

  private addButtons(): void {
    this.buttons.push(new Button(613, 659, 60, 95));
    this.buttons.push(new Button(375, 418, 60, 95));
    this.buttons.push(new Button(326, 371, 60, 95));
    this.buttons.push(new Button(230, 255, 63, 90));
    this.buttons.push(new Button(900, 990, 2, 28));
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
      }
    }

    if (keyListener.keyPressed(KeyListener.KEY_SPACE) && this.status >= this.images.length - 1) {
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

  /**
   *
   * @param canvas
   */
  public override render(canvas: HTMLCanvasElement): void {
    if (this.status < this.images.length) {
      CanvasRenderer.drawImage(canvas, this.images[this.status], -40, 0);
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
