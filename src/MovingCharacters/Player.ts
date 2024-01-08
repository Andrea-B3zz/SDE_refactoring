import CanvasRenderer from '../Utility/CanvasRenderer.js';
import KeyListener from '../Utility/KeyListener.js';
import MovingCharacter from './MovingCharacter.js';
import Wall from './Wall.js';
import Monster from './Monster.js';

export default class Player extends MovingCharacter {
  private walls: Wall[];

  private monsters: Monster[];

  private fovImage: HTMLImageElement;

  public constructor(walls: Wall[], monsters: Monster[]) {
    super();
    this.walls = walls;
    this.monsters = monsters;

    this.fovImage = CanvasRenderer.loadNewImage('./assets/FOV.png');

    // random positions for the Player object
    // const randomX: number = Math.floor(Math.random() * window.innerWidth);
    // const randomY: number = Math.floor(Math.random() * window.innerHeight);

    this.image = CanvasRenderer.loadNewImage('./assets/boy.png');
    this.posX = 200;
    this.posY = 200;

    this.speed = 0.4;
  }


  /**
   * updating the player object
   * @param elapsed the time elapsed
   */
  public override update(elapsed: number): void {
    const fovX: number = this.posX - this.fovImage.width / 2;
    const fovY: number = this.posY - this.fovImage.height / 2;
    this.fovImage.style.left = fovX + 'px';
    this.fovImage.style.top = fovY + 'px';
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

    if (!this.isCollidingWithWalls(newPosX, newPosY)) {
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
  public isCollidingWithWalls(newPosX: number, newPosY: number): boolean {
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
   * Checks if the player collides with monsters
   * @param monsters array of monsters
   * @returns true if there is collision with monsters, and false - if not
   */
  public isCollidingWithMonster(monsters: Monster[]): number {
    for (let i: number = 0; i < monsters.length; i++) {
      const monster: Monster = monsters[i];
      if (
        this.posX < monster.getPosX() + monster.getWidth() &&
        this.posX + this.getWidth() > monster.getPosX() &&
        this.posY < monster.getPosY() + monster.getHeight() &&
        this.posY + this.getHeight() > monster.getPosY()
      ) {
        return i+1;
      }
    }
    return -1;
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
    CanvasRenderer.drawImage(canvas, this.fovImage,
      this.posX - this.fovImage.width / 2 + this.getWidth() / 2,
      this.posY - this.fovImage.height / 2 + this.getHeight() / 2);

    CanvasRenderer.drawImage(canvas, this.image, this.posX, this.posY);
  }
}
