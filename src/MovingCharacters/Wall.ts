export default class Wall {
  protected topLeft: number;

  protected topRight: number;

  protected bottomLeft: number;

  protected bottomRight: number;

  public constructor(tl: number, tr: number, bl: number, br: number) {
    this.topLeft = tl;
    this.topRight = tr;
    this.bottomLeft = bl;
    this.bottomRight = br;
  }

  public getBottomLeft(): number {
    return this.bottomLeft;
  }

  public getBottomRight(): number {
    return this.bottomRight;
  }

  public getTopLeft(): number {
    return this.topLeft;
  }

  public getTopRight(): number {
    return this.topRight;
  }
}
