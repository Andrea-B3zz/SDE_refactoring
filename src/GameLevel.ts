import Level from './Level.js';
import Player from './MovingCharacters/Player.js';
import Monster from './MovingCharacters/Monster.js';
import Wall from './MovingCharacters/Wall.js';
import KeyListener from './Utility/KeyListener.js';
import CanvasRenderer from './Utility/CanvasRenderer.js';
import MouseListener from './Utility/MouseListener.js';

export default class GameLevel extends Level {
  private keyListener: KeyListener;

  private player: Player;

  private monster: Monster;

  private walls: Wall[];

  private mouseListener: MouseListener;

  public constructor(canvas: HTMLCanvasElement) {
    super();
    this.walls = [];
    this.player = new Player(this.walls);
    this.keyListener = new KeyListener();

    this.canvas = canvas;
    this.populateWalls();
    canvas.style.marginLeft = '';
    canvas.style.width = '';
    canvas.style.height = '';
    this.image = CanvasRenderer.loadNewImage('./assets/FinalMap.png');

    this.mouseListener = new MouseListener(this.canvas);
  }

  private populateWalls(): void {
    this.walls.push(new Wall(151, 154, 144, 251));
    this.walls.push(new Wall(10, 154, 235, 251));
    this.walls.push(new Wall(341, 346, 203, 320));
    this.walls.push(new Wall(341, 554, 203, 219));
    this.walls.push(new Wall(549, 554, 128, 320));
    this.walls.push(new Wall(757, 762, 10, 219));
    this.walls.push(new Wall(757, 864, 203, 219));
    this.walls.push(new Wall(1030, 1034, 10, 128));
    this.walls.push(new Wall(10, 154, 427, 443));
    this.walls.push(new Wall(150, 154, 427, 448));
    this.walls.push(new Wall(148, 154, 608, 710));
    this.walls.push(new Wall(336, 586, 507, 523));
    this.walls.push(new Wall(582, 586, 507, 710));
    this.walls.push(new Wall(853, 858, 427, 544));
    this.walls.push(new Wall(853, 1270, 427, 443));
    this.walls.push(new Wall(1029, 1034, 336, 443));
    this.walls.push(new Wall(0, 1280, 0, 27));
    this.walls.push(new Wall(1269, 1280, 0, 720));
    this.walls.push(new Wall(0, 1280, 699, 720));
    this.walls.push(new Wall(0, 10, 0, 720));
  }

  /**
   * updates the images
   * @param elapsed still no function
   */
  public override update(elapsed: number): void {
    // this.player.update(elapsed);

    const newPosX: number = this.player.getPosX();
    const newPosY: number = this.player.getPosY();

    if (this.player.isColliding(newPosX, newPosY)) {
      this.player.doNotMove();
    } else {
      this.player.move(this.keyListener);
    }


    if (this.mouseListener.isButtonDown(MouseListener.BUTTON_LEFT)) {
      console.log(this.mouseListener.getMousePosition().x);
      console.log(this.mouseListener.getMousePosition().y);
    }
  }

  /**
   * method to go from the backstory to level 1
   * @param canvas changing the canvas from the pictures in the backstory to the map
   * @returns null for now
   */
  public override nextLevel(canvas: HTMLCanvasElement): Level | null {
    return null;
  }

  /**
   * method to change the photos in the arrey by pressing the space bar
   * @param keyListener adding the key listener so we can use the space bar
   */
  public override processInput(keyListener: KeyListener): void {
    this.player.processInput(keyListener);
  }

  /**
   * drawing the images on the cancas
   * @param canvas HTML canvas element
   */
  public render(canvas: HTMLCanvasElement): void {
    canvas.style.width='1408px';
    canvas.style.height='792px';

    const windowWidth: number = canvas.width;
    const windowHeight: number = canvas.height;

    const tempW: number = Number(this.canvas.style.width.substring(0, 4));
    const marginWidth: number = (windowWidth - tempW) / 2;
    const marginPercentW: number = marginWidth * 100 / windowWidth;
    canvas.style.marginLeft = marginPercentW + '%';

    const tempH: number = Number(this.canvas.style.height.substring(0, 3));
    const marginHeight: number = (windowHeight - tempH) / 2;
    const marginPercentH: number = marginHeight * 100 / windowHeight;
    canvas.style.marginTop = marginPercentH + '%';



    /*console.log(tempW);
    console.log(windowWidth);
    console.log(marginWidth);
    console.log(marginPercentW);
    console.log(canvas.style.marginLeft);*/

    CanvasRenderer.drawImage(this.canvas, this.image, 0, 0);

    for (let i: number = 0; i < this.walls.length; i++) {
      const width: number = this.walls[i].getRightX() - this.walls[i].getLeftX();
      const height: number = this.walls[i].getBottomY() - this.walls[i].getTopY();
      CanvasRenderer.drawRectangle(
        this.canvas,
        this.walls[i].getLeftX(),
        this.walls[i].getTopY(),
        width,
        height,
        this.walls[i].getColor(),
      );
    }
    this.player.render(this.canvas);
  }
}
