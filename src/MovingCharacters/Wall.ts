export default class Wall {
  protected leftX: number;

  protected rightX: number;

  protected topY: number;

  protected bottomY: number;

  private borderColor: string;

  public constructor(leftX: number, rightX: number, topY: number, bottomY: number) {
    this.leftX = leftX;
    this.rightX = rightX;
    this.topY = topY;
    this.bottomY = bottomY;
    this.borderColor = 'red';
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
}
