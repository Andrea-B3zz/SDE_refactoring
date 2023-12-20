import Level from './Level.js';
import Player from './MovingCharacters/Player.js';
import Monster from './MovingCharacters/Monster.js';
import Wall from './MovingCharacters/Wall.js';
import KeyListener from './Utility/KeyListener.js';
import CanvasRenderer from './Utility/CanvasRenderer.js';
import Ghost from './MovingCharacters/Ghost.js';
import MouseListener from './Utility/MouseListener.js';
import Task from './Tasks/Task.js';
import PowerPoint from './Tasks/PowerPoint.js';

export default class GameLevel extends Level {
  private keyListener: KeyListener;

  private player: Player;

  private monsters: Monster[];

  private walls: Wall[];

  private level: number;

  private timeElapsedRight: number;

  private timeElapsedLeft: number;

  private mouseListener: MouseListener;

  private tasks: Task[];

  private inATask: boolean;

  public constructor(canvas: HTMLCanvasElement) {
    super();
    this.walls = [];
    this.player = new Player(this.walls);
    this.keyListener = new KeyListener();
    this.inATask = false;

    this.canvas = canvas;

    this.populateWalls();
    this.canvas.style.marginLeft = '';
    this.canvas.style.width = '';
    this.canvas.style.height = '';
    this.canvas.style.overflow = 'hidden';
    this.image = CanvasRenderer.loadNewImage('./assets/FinalMap2.png');

    this.mouseListener = new MouseListener(this.canvas);

    this.monsters = [];
    this.level = 1;
    this.timeElapsedRight = 2;
    this.timeElapsedLeft = 2;
    this.createMonsters();

    this.tasks = [];
    this.tasks.push(new PowerPoint(1), new PowerPoint(2), new PowerPoint(3));
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
   * creating 3 monster per level
   */
  public createMonsters(): void {
    for (let i: number = 0; i <= 2; i++) {
      if (this.level = 1) {
        this.monsters.push(new Ghost(this.walls));
      }
    }
  }

  /**
   * updates the images
   * @param elapsed still no function
   */
  public override update(elapsed: number): void {
    // this.player.update(elapsed);
    this.timeElapsedRight -= 0.001 * elapsed;

    const newPosX: number = this.player.getPosX();
    const newPosY: number = this.player.getPosY();

    if (this.player.isColliding(newPosX, newPosY)) {
      this.player.doNotMove();
    } else {
      this.player.move(this.keyListener);
    }

    for (let i: number = 0; i < this.monsters.length; i++) {
      this.monsters[i].move(elapsed);
      if (this.monsters[i].isColliding(this.walls,
        this.monsters[i].getPosX(),
        this.monsters[i].getPosY())) {
        this.monsters[i].setSpeed(-(this.monsters[i].getSpeed()));
      }
    }

    if (this.mouseListener.isButtonDown(MouseListener.BUTTON_LEFT)) {
      console.log(this.mouseListener.getMousePosition().x);
      console.log(this.mouseListener.getMousePosition().y);
    }

    if (this.keyListener.keyPressed(KeyListener.KEY_SPACE)) {
      this.inATask = true;
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
    this.tasks[0].processInput(this.mouseListener);
    // console.log(this.mouseListener.getMousePosition().x);
    // console.log(this.mouseListener.getMousePosition().y);
  }

  /**
   * drawing the images on the cancas
   * @param canvas HTML canvas element
   */
  public render(canvas: HTMLCanvasElement): void {
    canvas.style.marginLeft = '17.5%';
    canvas.style.marginTop = '4%';

    if (this.inATask) {
      this.tasks[1].render(this.canvas);
      canvas.style.width = '1408px';
      canvas.style.height = '792px';
    } else {
      canvas.style.width = '1408px';
      canvas.style.height = '792px';

      CanvasRenderer.drawImage(canvas, this.image, 0, 0);

      for (let i: number = 0; i < this.monsters.length; i++) {
        this.monsters[i].render(canvas);
      }

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
}
