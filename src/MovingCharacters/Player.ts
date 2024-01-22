import CanvasRenderer from '../Utility/CanvasRenderer.js';
import KeyListener from '../Utility/KeyListener.js';
import MovingCharacter from './MovingCharacter.js';
import Wall from './Wall.js';
import Monster from './Monster.js';

export default class Player extends MovingCharacter {
  private fovImage: HTMLImageElement;

  private movementFlag: boolean;

  private frameChangeTime: number;

  private frameChangeCounter: number;

  public constructor() {
    super();

    this.fovImage = CanvasRenderer.loadNewImage('./assets/FOV.png');

    this.image = CanvasRenderer.loadNewImage('./assets/boyCharacter/boy_front01.png');
    this.posX = 700;
    this.posY = 300;

    this.movementFlag = false;
    this.frameChangeTime = 400;
    this.frameChangeCounter = 0;
  }


  /**
   * updating the player object
   * @param elapsed the time elapsed
   */
  public override update(elapsed: number): void {
    this.speed=0.045*elapsed;
    const fovX: number = this.posX - (this.fovImage.width / 2);
    const fovY: number = this.posY - (this.fovImage.height / 2);
    this.fovImage.style.left = fovX + 'px';
    this.fovImage.style.top = fovY + 'px';

    if (this.frameChangeTime > 0) {
      this.frameChangeTime -= elapsed;
      if (this.frameChangeCounter % 2 === 0) {
        this.movementFlag = true;
      }
    } else {
      this.frameChangeCounter += 1;
      this.frameChangeTime = 400;
      this.movementFlag = false;
    }
  }

  /**
   * @param keyListener user input
   * @param walls the wall array
   */
  public processInput(keyListener: KeyListener, walls: Wall[]): void {
    this.move(keyListener, walls);
  }

  /**
   * moving our character around the map
   * @param keyListener user input
   * @param walls the wall array
   */
  public move(keyListener: KeyListener, walls: Wall[]): void {
    let newPosX: number = this.posX;
    let newPosY: number = this.posY;

    if (keyListener.isKeyDown(KeyListener.KEY_W)
      || keyListener.isKeyDown(KeyListener.KEY_UP)) {
      newPosY -= 4 * this.speed;
      if (this.movementFlag === true) {
        this.image = CanvasRenderer.loadNewImage('./assets/boyCharacter/boy_back01.png');
      } else {
        this.image = CanvasRenderer.loadNewImage('./assets/boyCharacter/boy_back02.png');
      }
    } else if (keyListener.isKeyDown(KeyListener.KEY_A)
      || keyListener.isKeyDown(KeyListener.KEY_LEFT)) {
      newPosX -= 4 * this.speed;
      if (this.movementFlag === true) {
        this.image = CanvasRenderer.loadNewImage('./assets/boyCharacter/boy_sideLeft01.png');
      } else {
        this.image = CanvasRenderer.loadNewImage('./assets/boyCharacter/boy_sideLeft02.png');
      }
    } else if (keyListener.isKeyDown(KeyListener.KEY_D)
      || keyListener.isKeyDown(KeyListener.KEY_RIGHT)) {
      newPosX += 4 * this.speed;
      if (this.movementFlag === true) {
        this.image = CanvasRenderer.loadNewImage('./assets/boyCharacter/boy_sideRight01.png');
      } else {
        this.image = CanvasRenderer.loadNewImage('./assets/boyCharacter/boy_sideRight02.png');
      }
    } else if (keyListener.isKeyDown(KeyListener.KEY_S)
      || keyListener.isKeyDown(KeyListener.KEY_DOWN)) {
      newPosY += 4 * this.speed;
      if (this.movementFlag === true) {
        this.image = CanvasRenderer.loadNewImage('./assets/boyCharacter/boy_front01.png');
      } else {
        this.image = CanvasRenderer.loadNewImage('./assets/boyCharacter/boy_front02.png');
      }
    }

    if (!this.isCollidingWithWalls(newPosX, newPosY, walls)) {
      this.posX = newPosX;
      this.posY = newPosY;
    }
  }

  /**
   *
   * @param newPosX receives the possible next posX
   * @param newPosY receives the possible next posY
   * @param walls the wall array
   * @returns true if there is collision, and false - if not
   */
  public isCollidingWithWalls(newPosX: number, newPosY: number, walls: Wall[]): boolean {
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
   * Checks if the player collides with monsters
   * @param monster array of monsters
   * @returns true if there is collision with monsters, and false - if not
   */
  public isCollidingWithMonster(monster: Monster): boolean {
    if (
      this.posX < monster.getPosX() + monster.getWidth() &&
      this.posX + this.getWidth() > monster.getPosX() &&
      this.posY < monster.getPosY() + monster.getHeight() &&
      this.posY + this.getHeight() > monster.getPosY()
    ) {
      return true;
    }

    return false;
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
