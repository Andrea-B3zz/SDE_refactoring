import CanvasRenderer from '../Utility/CanvasRenderer.js';
import KeyListener from '../Utility/KeyListener.js';
import MovingCharacter from './MovingCharacter.js';
import Wall from './Wall.js';

export default class Player extends MovingCharacter {
  private walls: Wall[];

  public constructor() {
    super();
    this.image = CanvasRenderer.loadNewImage('assets/boy.png');
  }

  public override update(elapsed: number): void {

  }

  public isColliding(): boolean {
    let item: Wall;
    for (let i: number = 0; i < this.walls.length; i++) {
      item = this.walls[i];
      if (this.getPosX() < item.getTopRight()
        && this.getPosX() + this.getWidth() > item.getTopLeft()
        && this.getPosY() + this.getHeight() > item.getBottomLeft()
        && this.getPosY() < item.getBottomRight()) {
        return true;
      }
    }

    return false;
  }

  public override move(elapsed: number, keyListener: KeyListener): void {
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

  public override render(canvas: HTMLCanvasElement): void {
    CanvasRenderer.drawImage(canvas, this.image, 0, 0);
  }
}
