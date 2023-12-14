import CanvasRenderer from '../Utility/CanvasRenderer.js';
import KeyListener from '../Utility/KeyListener.js';
import MovingCharacter from './MovingCharacter.js';
import Wall from './Wall.js';

export default class Player extends MovingCharacter {
  public constructor() {
    super();
    this.image = CanvasRenderer.loadNewImage('assets/boy.png');
  }

  /**
   * updating the player object
   * @param elapsed the time elapsed
   */
  public override update(elapsed: number): void {

  }

  /**
   *
   * @param walls array of objects of type Wall
   * @returns return true if we are colliding with a wall
   */
  public isColliding(walls: Wall[]): boolean {
    let item: Wall;
    for (let i: number = 0; i < walls.length; i++) {
      item = walls[i];
      if (this.getPosX() < item.getRightX()
        && this.getPosX() + this.getWidth() > item.getLeftX()
        && this.getPosY() + this.getHeight() > item.getTopY()
        && this.getPosY() < item.getBottomY()) {
        return true;
      }
    }

    return false;
  }

  /**
   *
   * @param keyListener user input
   */
  public processInput( keyListener: KeyListener): void {
    this.move(keyListener);
  }

  /**
   * moving our character around the map
   * @param keyListener user input
   */
  public move(keyListener: KeyListener): void {
    if(keyListener.isKeyDown(KeyListener.KEY_W || KeyListener.KEY_UP)){
      this.posY-=10;
    } else if(keyListener.isKeyDown(KeyListener.KEY_A || KeyListener.KEY_LEFT)){
      this.posX-=10;
    }else if(keyListener.isKeyDown(KeyListener.KEY_D || KeyListener.KEY_RIGHT)){
      this.posX+=10;
    }else if(keyListener.isKeyDown(KeyListener.KEY_S || KeyListener.KEY_DOWN)){
      this.posY+=10;
    }
  }

  /**
   * displaying our character
   * @param canvas our canvas where everything will be displayed
   */
  public override render(canvas: HTMLCanvasElement): void {
    CanvasRenderer.drawImage(canvas, this.image, 0, 0);
  }
}
