import CanvasRenderer from '../Utility/CanvasRenderer.js';
import MovingCharacter from './MovingCharacter.js';
import Wall from './Wall.js';


export default abstract class Monster extends MovingCharacter {
  private level: number = 1;

  public constructor(randomX: number, randomY: number) {
    super();
    this.posX = randomX;
    this.posY = randomY;
    this.speed = 0.05;
  }

  /**
   * updating our monsters
   * @param elapsed time elapsed
   */
  public override update(elapsed: number): void {

  }

  /**
   * displaying our monsters
   * @param canvas our canvas where everything will be displayed
   */
  public override render(canvas: HTMLCanvasElement): void {
    CanvasRenderer.drawImage(canvas, this.image, this.posX, this.posY);
  }

  /**
   * checks if the monster is colliding with a wall
   *
   * @param walls the array of walls
   * @param newPosX the current position of x coordinates
   * @param newPosY the current position of the y coordinates
   * @returns  return true or false
   */
  public isColliding(walls: Wall[], newPosX: number, newPosY: number): boolean {
    for (let i: number = 0; i < walls.length; i++) {
      const item: Wall = walls[i];
      if (
        newPosX < item.getRightX()
        && newPosX + this.getWidth() > item.getLeftX()
        && newPosY + this.getHeight() > item.getTopY()
        && newPosY < item.getBottomY()
      ) {
        return true;
      }
    }
    return false;
  }


  /**
   * moving our monster around
   * @param elapsed time elapsed
   */
  public move(elapsed: number): void {
    this.posX += this.speed * elapsed;
  }
}
