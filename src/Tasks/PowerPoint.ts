import CanvasRenderer from '../Utility/CanvasRenderer.js';
import MouseListener from '../Utility/MouseListener.js';
import Task from './Task.js';
import Button from './Button.js';

export default class PowerPoint extends Task {
  private baseImage: HTMLImageElement;

  public constructor(rightAnswer: number) {
    super();
    this.buttons = [];

    this.rightAnswer = rightAnswer;
    this.baseImage = CanvasRenderer.loadNewImage('./assets/PowerPoint_main.png');
    this.addButtons();
  }

  private addButtons(): void {
    this.buttons.push(new Button(166, 222, 35, 135));
    this.buttons.push(new Button(296, 355, 35, 135));
    this.buttons.push(new Button(320, 410, 3, 27));
    this.buttons.push(new Button(585, 700, 3, 27));
    this.buttons.push(new Button(843, 965, 3, 27));
  }

  /**
   *
   * @param mouseListener
   */
  public override processInput(mouseListener: MouseListener): void {
    if (mouseListener.isButtonDown(MouseListener.BUTTON_LEFT)) {
      if (this.isCollidingWithRectangle(mouseListener)) {
        console.log('collision with mouse');
      }
    }
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
