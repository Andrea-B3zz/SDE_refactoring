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

  public delete(): void{
    this.topY=-10;
    this.bottomY=-10;
    this.rightX=-10;
    this.leftX=-10;
  }
}
