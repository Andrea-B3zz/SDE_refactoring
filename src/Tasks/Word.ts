import CanvasRenderer from '../Utility/CanvasRenderer.js';
import MouseListener from '../Utility/MouseListener.js';
import Task from './Task.js';
import Button from './Button.js';

export default class Word extends Task {
  private baseImage: HTMLImageElement;

  private currentTask: number;

  public constructor(rightAnswer: number) {
    super();
    this.buttons = [];
    this.currentTask = 0;

    this.rightAnswer = rightAnswer;
    this.baseImage = CanvasRenderer.loadNewImage('./assets/Word_main.png');
  }

  private addButtons(): void {
    this.buttons.push(new Button(133, 171, 78, 130));
    this.buttons.push(new Button(326, 401, 25, 65));
    this.buttons.push(new Button(470, 520, 83, 127));
    this.buttons.push(new Button(635, 670, 83, 127));
    this.buttons.push(new Button(635, 670, 23, 67));
  }

  /**
   *
   * @param mouseListener
   */
  public override processInput(mouseListener: MouseListener): void {
    // if (mouseListener.buttonPressed(MouseListener.BUTTON_LEFT)) {
    //   if (this.isCollidingWithRectangle(mouseListener)) {
    //     console.log('collision with mouse');
    //   }
    // }
  }

  /**
   *
   * @param mouseListener
   * @returns
   */
  public isCollidingWithRectangle(mouseListener: MouseListener): boolean {
    console.log(mouseListener.getMousePosition().x);
    console.log(mouseListener.getMousePosition().y);
    for (let i: number = 0; i < this.buttons.length; i++) {
      const item: Button = this.buttons[i];
      if (
        mouseListener.getMousePosition().x * 1.363636 < item.getRightX()
        && mouseListener.getMousePosition().x * 1.363636 > item.getLeftX()
        && mouseListener.getMousePosition().y * 1.363636 > item.getTopY()
        && mouseListener.getMousePosition().y * 1.363636 < item.getBottomY()
      ) {
        return true;
      }
    }
    return false;
  }

  public override getIsCompleted(): boolean {
    throw new Error('Method not implemented.');
  }

  /**
   *
   * @param elapsed
   */
  public override update(elapsed: number): void {
  }

  /**
   *
   * @param canvas
   */
  public override render(canvas: HTMLCanvasElement): void {
    CanvasRenderer.drawImage(canvas, this.baseImage, 0, 0);
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
