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
import Word from './Tasks/Word.js';
import Excel from './Tasks/Excel.js';
import RedMonster from './MovingCharacters/RedMonster.js';
import Zombie from './MovingCharacters/Zombie.js';
import EndingScreen from './EndingScreen.js';

export default class GameLevel extends Level {
  private keyListener: KeyListener;

  private player: Player;

  private monsters: Monster[];

  private walls: Wall[];

  private timeElapsedRight: number;

  private timeElapsedLeft: number;

  private battleMusic: HTMLAudioElement;

  private mouseListener: MouseListener;

  private tasks: Task[];

  private currentLevel: number;

  private inATask: boolean;

  private monsterColliding: number;

  private questionNumber: number;

  private lives: number;

  private lifeImg: HTMLImageElement;

  private levelStartAnimationDuration: number;

  private levelStartFlag: boolean;

  private levelAnimation: HTMLImageElement[];

  private bfImage: HTMLImageElement;

  public constructor(canvas: HTMLCanvasElement, currentLevel: number, lives: number, language: number) {
    super();
    this.walls = [];
    this.keyListener = new KeyListener();
    this.inATask = false;

    this.currentLevel = currentLevel;

    this.questionNumber = 0;
    this.levelStartAnimationDuration = 5000;
    this.language = language;
    this.canvas = canvas;

    this.populateWalls();

    canvas.style.marginLeft = '17.5%';
    canvas.style.marginTop = '4%';
    canvas.style.width = '1408px';
    canvas.style.height = '792px';
    canvas.style.overflow = 'hidden';

    this.image = CanvasRenderer.loadNewImage('./assets/FinalMap2.png');
    this.battleMusic = document.querySelector('#battle');
    this.battleMusic.src = 'assets/Audio/battle.ogg';
    this.music = document.querySelector('#audio');
    this.music.src = 'assets/Audio/dungeon.ogg';
    this.music.play();

    this.lifeImg = CanvasRenderer.loadNewImage('./assets/heart.png');
    this.levelAnimation = [];
    if (language == 0) {
      this.levelAnimation.push(CanvasRenderer.loadNewImage('./assets/Animations/LevelWordEN.jpg'));
      this.levelAnimation.push(CanvasRenderer.loadNewImage('./assets/Animations/LevelPowerPointEN.jpg'));
      this.levelAnimation.push(CanvasRenderer.loadNewImage('./assets/Animations/LevelExcelEN.jpg'));
    } else {
      this.levelAnimation.push(CanvasRenderer.loadNewImage('./assets/Animations/LevelWordNL.jpg'));
      this.levelAnimation.push(CanvasRenderer.loadNewImage('./assets/Animations/LevelPowerPointNL.jpg'));
      this.levelAnimation.push(CanvasRenderer.loadNewImage('./assets/Animations/LevelExcelNL.jpg'));
    }


    this.mouseListener = new MouseListener(this.canvas);
    this.keyListener = new KeyListener();

    this.monsters = [];

    this.timeElapsedRight = 2;
    this.timeElapsedLeft = 2;

    this.createMonsters();

    this.tasks = [];
    switch (this.currentLevel) {
      case 1: {
        this.tasks.push(new Word(1, this.language), new Word(2, this.language),
          new Word(3, this.language));
        break;
      }
      case 2: {
        this.tasks.push(new PowerPoint(1, this.language),
          new PowerPoint(2, this.language), new PowerPoint(3, this.language));
        break;
      }
      case 3: {
        this.tasks.push(new Excel(1, this.language), new Excel(2, this.language),
          new Excel(3, this.language));
        break;
      }
    }
    this.player = new Player(this.walls, this.monsters);
    this.lives = lives;
    if (language == 0) {
      this.bfImage = CanvasRenderer.loadNewImage('./assets/bestFriendEN.png');
    } else {
      this.bfImage = CanvasRenderer.loadNewImage('./assets/bestFriendNL.png');
    }
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
   * spawns 3 monsters specific to the level
   */
  public createMonsters(): void {
    const coordinates: { x: number; y: number }[] = [];
    if (this.currentLevel === 1) {
      let ghost: Ghost;
      coordinates.push({ x: 90, y: 90 }, { x: 200, y: 340 }, { x: 600, y: 250 });
      for (let i: number = 0; i <= 2; i++) {
        ghost = new Ghost(coordinates[i].x, coordinates[i].y, this.walls);
        this.monsters.push(ghost);
      }
    } else if (this.currentLevel === 2) {
      let redMonster: RedMonster;
      coordinates.push({ x: 400, y: 90 }, { x: 800, y: 340 }, { x: 200, y: 550 });
      for (let i: number = 0; i <= 2; i++) {
        redMonster = new RedMonster(coordinates[i].x, coordinates[i].y, this.walls);
        this.monsters.push(redMonster);
      }
    } else {
      let zombie: Zombie;
      coordinates.push({ x: 200, y: 550 }, { x: 200, y: 340 }, { x: 800, y: 240 });
      for (let i: number = 0; i <= 2; i++) {
        zombie = new Zombie(coordinates[i].x, coordinates[i].y, this.walls);
        this.monsters.push(zombie);
      }
    }
  }

  /**
   * updates the images
   * @param elapsed still no function
   */
  public override update(elapsed: number): void {
    if (this.levelStartAnimationDuration > 0) {
      this.levelStartAnimationDuration -= elapsed;
      this.levelStartFlag = true;
    } else {
      this.levelStartFlag = false;
    }

    this.timeElapsedRight -= 0.001 * elapsed;

    const newPosX: number = this.player.getPosX();
    const newPosY: number = this.player.getPosY();

    this.player.update(elapsed);

    if (this.player.isCollidingWithWalls(newPosX, newPosY)) {
      this.player.doNotMove();
    } else {
      this.player.move(this.keyListener);
    }

    for (let i: number = 0; i < this.monsters.length; i++) {
      this.monsters[i].move(elapsed);
      this.monsters[i].update(elapsed, this.walls);
      if (this.monsters[i].isColliding(this.walls,
        this.monsters[i].getPosX(),
        this.monsters[i].getPosY())) {
        this.monsters[i].setSpeed(-(this.monsters[i].getSpeed()));
      }
    }

    //if (this.mouseListener.isButtonDown(MouseListener.BUTTON_LEFT)) {
    //console.log(this.mouseListener.getMousePosition().x);
    //console.log(this.mouseListener.getMousePosition().y);
    //}

    if (this.player.isCollidingWithMonster(this.monsters) > 0) {
      if (this.keyListener.keyPressed(KeyListener.KEY_SPACE)) {
        this.monsterColliding = this.player.isCollidingWithMonster(this.monsters) - 1;
        this.inATask = true;
      }
    }

    if (this.tasks[this.questionNumber].getIsCompleted()) {
      this.monsters.splice(this.monsterColliding, 1);
      this.inATask = false;
      if (this.questionNumber < this.tasks.length - 1) {
        this.questionNumber += 1;
      }
    }

    // mistake checking
    for (let i: number = 0; i < this.tasks.length; i++) {
      if (this.tasks[i].checkMistake()) {
        this.lives -= 1;
      }
    }
  }

  /**
   * method to go from the backstory to level 1
   * @param canvas changing the canvas from the pictures in the backstory to the map
   * @returns null for now
   */
  public override nextLevel(canvas: HTMLCanvasElement): Level | null {
    if (this.lives == 0) {
      return new EndingScreen(this.canvas, 'lose', this.language);
    }
    if (this.monsters.length != 0) {
      return null;
    } else {
      this.currentLevel += 1;
      if (this.currentLevel === 4) {
        return new EndingScreen(canvas, 'win', this.language);
      } else {
        return new GameLevel(canvas, this.currentLevel, this.lives, this.language);
      }
    }
  }

  /**
   * @param keyListener using the mouse
   * @param mouseListener using the keyboard
   */
  public override processInput(keyListener: KeyListener, mouseListener: MouseListener): void {
    this.player.processInput(keyListener);
    this.tasks[this.questionNumber].processInput(this.mouseListener, keyListener);
  }

  public getLives(): number {
    return this.lives;
  }

  private colorForBorder(): string {
    let color: string;
    if (this.currentLevel === 1) {
      color = 'cyan';
    } else if (this.currentLevel === 2) {
      color = 'red';
    } else if (this.currentLevel === 3) {
      color = 'green';
    }
    return color;
  }

  /**
   * drawing the images on the canvas
   * @param canvas HTML canvas element
   */
  public render(canvas: HTMLCanvasElement): void {
    if (this.levelStartFlag) {
      CanvasRenderer.drawImage(canvas, this.levelAnimation[this.currentLevel - 1], 0, 0);
    } else if (this.inATask) {
      this.tasks[this.questionNumber].render(this.canvas);
      this.music.pause();
      this.battleMusic.play();
      for (let i: number = 1; i <= this.lives; i++) {
        CanvasRenderer.drawImage(canvas, this.lifeImg, window.innerWidth - i * 75, 10);
      }
    } else {
      CanvasRenderer.drawImage(canvas, this.image, 0, 0);
      this.battleMusic.pause();
      this.music.play();
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
          this.colorForBorder(),
        );
      }
      this.player.render(this.canvas);

      CanvasRenderer.drawImage(canvas, this.bfImage,
        window.innerWidth - this.bfImage.width,
        window.innerHeight - this.bfImage.height);

      for (let i: number = 1; i <= this.lives; i++) {
        CanvasRenderer.drawImage(canvas, this.lifeImg, window.innerWidth - i * 75, 10);
      }

      CanvasRenderer.writeText(this.canvas, `Level: ${this.currentLevel}`, 20, 50, 'left', 'Bungee Spice', 40, 'white');
    }
  }
}
