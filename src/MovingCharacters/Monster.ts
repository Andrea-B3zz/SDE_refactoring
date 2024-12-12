import CanvasRenderer from '../Utility/CanvasRenderer.js';
import MovingCharacter from './MovingCharacter.js';
import Wall from './Wall.js';


export default class Monster extends MovingCharacter {
  private level: number = 1;

  private selectedPos: number[];

  public constructor(type: number) {
    super();
    const pos: number[][] =
      [[80, 80], [200, 340], [60, 260],
        [400, 90], [800, 340], [600, 250],
        [200, 550], [200, 340], [800, 240]];

    this.selectedPos = pos[Math.floor(Math.random() * pos.length)];
    this.posX = this.selectedPos[0];
    this.posY = this.selectedPos[1];
    this.speed = 0.05;

    if(type == 1){
      // Ghost
      this.image = CanvasRenderer.loadNewImage('./assets/blue_monster.png');
    } else if(type == 2){
      // Red monster
      this.image = CanvasRenderer.loadNewImage('./assets/red_monster.png');
    } else if(type == 3){
      // Zombie
      this.image = CanvasRenderer.loadNewImage('./assets/green_monster.png');
    } else if(type == 4){
      // Angel
      this.image = CanvasRenderer.loadNewImage('assets/angel.png');
    }
  }

  /**
   * updating our monsters
   * @param elapsed time elapsed
   * @param walls the array of walls
   */
  public override update(elapsed: number): void {
    this.move(elapsed);
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
        newPosX <= item.getRightX()
        && newPosX + this.getWidth() >= item.getLeftX()
        && newPosY + this.getHeight() >= item.getTopY()
        && newPosY <= item.getBottomY()
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
  private move(elapsed: number): void {
    this.posX += this.speed * elapsed;
  }
}
