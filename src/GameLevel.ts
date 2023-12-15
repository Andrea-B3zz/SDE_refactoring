import Level from './Level.js';
import Player from './MovingCharacters/Player.js';
import Monster from './MovingCharacters/Monster.js';
import Wall from './MovingCharacters/Wall.js';
import KeyListener from './Utility/KeyListener.js';
import CanvasRenderer from './Utility/CanvasRenderer.js';

export default class GameLevel extends Level {
  private keyListener: KeyListener;

  private player: Player;

  private monster: Monster;

  private walls: Wall[];

  public constructor(canvas: HTMLCanvasElement) {
    super();
    this.walls = [];
    this.player = new Player(this.walls);
    this.keyListener = new KeyListener();

    this.canvas = canvas;
    this.image = CanvasRenderer.loadNewImage('./assets/FinalMap.png');
    this.canvas.width = this.image.width;
    this.canvas.height = this.image.height;
    this.canvas.style.width = '89%';
    this.canvas.style.height = '89%';
    this.canvas.style.marginLeft = '6%';

    this.populateWalls();
  }

  private populateWalls(): void {
    this.walls.push(new Wall(192, 203, 16, 182));
    this.walls.push(new Wall(410, 422, 69, 185));
    this.walls.push(new Wall(614, 626, 17, 490,));
    this.walls.push(new Wall(769, 780, 17, 106));
    this.walls.push(new Wall(998, 1011, 17, 94));
    this.walls.push(new Wall(1102, 1114, 82, 185));
    this.walls.push(new Wall(1242, 1254, 17, 185));
    this.walls.push(new Wall(295, 307, 210, 361));
    this.walls.push(new Wall(769, 781, 183, 260));
    this.walls.push(new Wall(806, 818, 400, 488));
    this.walls.push(new Wall(1254, 1266, 325, 413));
    this.walls.push(new Wall(257, 268, 461, 579));
    this.walls.push(new Wall(257, 267, 643, 735));
    this.walls.push(new Wall(718, 730, 477, 645));
    this.walls.push(new Wall(922, 934, 477, 644));
    this.walls.push(new Wall(1267, 1279, 477, 733));
    this.walls.push(new Wall(1395, 1408, 477, 580));
    this.walls.push(new Wall(410, 1012, 171, 184));
    this.walls.push(new Wall(1102, 1406, 172, 185));
    this.walls.push(new Wall(193, 946, 350, 362));
    this.walls.push(new Wall(1267, 1510, 325, 338));
    this.walls.push(new Wall(1269, 1395, 399, 413));
    this.walls.push(new Wall(615, 1114, 477, 489));
    this.walls.push(new Wall(102, 268, 464, 476));
    this.walls.push(new Wall(474, 754, 630, 644));
    this.walls.push(new Wall(897, 1113, 630, 896));
    this.walls.push(new Wall(1267, 1406, 477, 489));
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
    CanvasRenderer.clearCanvas(canvas);
    CanvasRenderer.drawImage(canvas, this.image, 0, 0);

    for (let i: number = 0; i < this.walls.length; i++) {
      const width: number = this.walls[i].getRightX() - this.walls[i].getLeftX();
      const height: number = this.walls[i].getBottomY() - this.walls[i].getTopY();
      CanvasRenderer.drawRectangle(
        canvas,
        this.walls[i].getLeftX(),
        this.walls[i].getTopY(),
        width,
        height,
        this.walls[i].getColor(),
      );
    }

    this.player.render(canvas);
  }
}
