import CanvasRenderer from '../Utility/CanvasRenderer.js';
import KeyListener from '../Utility/KeyListener.js';
import MovingCharacter from './MovingCharacter.js';
import Wall from './Wall.js';

export default class Player extends MovingCharacter {
  private walls: Wall[];

  public constructor(walls: Wall[]) {
    super();
    this.walls = walls;
    
    // random positions for the Player object
    // const randomX: number = Math.floor(Math.random() * window.innerWidth);
    // const randomY: number = Math.floor(Math.random() * window.innerHeight);

    this.image = CanvasRenderer.loadNewImage('./assets/field-of-view.png');
    this.posX = -1200;
    this.posY = -1200;

    this.speed = 0.2;
  }


  /**
   * updating the player object
   * @param elapsed the time elapsed
   */
  public override update(elapsed: number): void {
  }

  /**
   * @param keyListener user input
   */
  public processInput(keyListener: KeyListener): void {
    this.move(keyListener);
  }

  /**
   * moving our character around the map
   * @param keyListener user input
   */
  public move(keyListener: KeyListener): void {
    let newPosX: number = this.posX;
    let newPosY: number = this.posY;

    if (keyListener.isKeyDown(KeyListener.KEY_W)
      || keyListener.isKeyDown(KeyListener.KEY_UP)) {
      newPosY -= 4 * this.speed;
    } else if (keyListener.isKeyDown(KeyListener.KEY_A)
      || keyListener.isKeyDown(KeyListener.KEY_LEFT)) {
      newPosX -= 4 * this.speed;
    } else if (keyListener.isKeyDown(KeyListener.KEY_D)
      || keyListener.isKeyDown(KeyListener.KEY_RIGHT)) {
      newPosX += 4 * this.speed;
    } else if (keyListener.isKeyDown(KeyListener.KEY_S)
      || keyListener.isKeyDown(KeyListener.KEY_DOWN)) {
      newPosY += 4 * this.speed;
    }

    if (!this.isColliding(newPosX, newPosY)) {
      this.posX = newPosX;
      this.posY = newPosY;
    }
  }

  /**
   *
   * @param newPosX receives the possible next posX
   * @param newPosY receives the possible next posY
   * @returns true if there is collision, and false - if not
   */
  public isColliding(newPosX: number, newPosY: number): boolean {
    for (let i: number = 0; i < this.walls.length; i++) {
      const item: Wall = this.walls[i];
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
   * if this method is called, the player doesn't change its position
   */
  public doNotMove(): void {
    this.posX = this.posX;
    this.posY = this.posY;
  }

  /**
   * displaying our character
   * @param canvas our canvas where everything will be displayed
   */
  public override render(canvas: HTMLCanvasElement): void {
    CanvasRenderer.drawImage(canvas, this.image, this.posX, this.posY);
  }
}
