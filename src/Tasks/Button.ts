import CanvasRenderer from '../Utility/CanvasRenderer.js';
import MouseListener from '../Utility/MouseListener.js';
export default class Button {
  protected leftX: number;

  protected rightX: number;

  protected topY: number;

  protected bottomY: number;

  private borderColor: string;

  private borderWidth: number;

  public constructor(leftX: number, rightX: number,
    topY: number, bottomY: number, currentLevel: number) {
    this.leftX = leftX;
    this.rightX = rightX;
    this.topY = topY;
    this.bottomY = bottomY;
    if (currentLevel === 1) {
      this.borderColor = 'cyan';
    } else if (currentLevel === 2) {
      this.borderColor = 'red';
    } else if (currentLevel === 3) {
      this.borderColor = 'green';
    }
    this.borderWidth = 4;
  }

  public getLeftX(): number {
    return this.leftX;
  }

  public getRightX(): number {
    return this.rightX;
  }

  public getTopY(): number {
    return this.topY;
  }

  public getBottomY(): number {
    return this.bottomY;
  }

  public getColor(): string {
    return this.borderColor;
  }

  public getBorderWidth(): number {
    return this.borderWidth;
  }

  /**
   * removes the button when the player make a mistake
   */
  public delete(): void {
    this.topY = -10;
    this.bottomY = -10;
    this.rightX = -10;
    this.leftX = -10;
  }

  /**
   * to render the buttons
   * @param canvas the canvas
   */
  public render(canvas: HTMLCanvasElement): void {
    const width: number = this.rightX - this.leftX;
    const height: number = this.bottomY - this.topY;
    CanvasRenderer.drawRectangle(
      canvas,
      this.leftX,
      this.topY,
      width,
      height,
      this.borderColor,
      this.borderWidth);
  }

  /**
   * to check if the player is clicking on the buttons
   * @param mouseListener which button is the player clicking on
   * @returns -1 if it is not colliding with anything or the number of the button
   */
  public isColliding(mouseListener: MouseListener): boolean {
    // 1.363636 bc there is a problem with canvas height and width
    if (
      mouseListener.getMousePosition().x * 1.363636 < this.rightX
      && mouseListener.getMousePosition().x * 1.363636 > this.leftX
      && mouseListener.getMousePosition().y * 1.363636 > this.topY
      && mouseListener.getMousePosition().y * 1.363636 < this.bottomY
    ) {
      return true;
    }
    return false;
  }
}
