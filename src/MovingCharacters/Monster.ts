import CanvasRenderer from '../Utility/CanvasRenderer.js';
import MovingCharacter from './MovingCharacter.js';
import Wall from './Wall.js';


export default abstract class Monster extends MovingCharacter {
  private level: number = 1;

  public constructor(walls: Wall[]) {
    const randomX: number = Math.floor(Math.random() * window.innerWidth);
    const randomY: number = Math.floor(Math.random() * window.innerHeight);
    super();
    this.posX = randomX;
    this.posY = randomY;
    this.speed = 0.05;

    if (this.isColliding(walls, this.posX, this.posY)) {
      const newRandomX: number = Math.floor(Math.random() * window.innerWidth - 100);
      const newRandomY: number = Math.floor(Math.random() * window.innerHeight - 300);
      console.log('true');
      this.posX = newRandomX;
      this.posY = newRandomY;
    }
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
