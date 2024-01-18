import Level from './Level.js';
import Player from '../MovingCharacters/Player.js';
import Monster from '../MovingCharacters/Monster.js';
import Wall from '../MovingCharacters/Wall.js';
import KeyListener from '../Utility/KeyListener.js';
import CanvasRenderer from '../Utility/CanvasRenderer.js';
import Ghost from '../MovingCharacters/Ghost.js';
import MouseListener from '../Utility/MouseListener.js';
import Task from '../Tasks/Task.js';
import PowerPoint from '../Tasks/PowerPoint.js';
import Word from '../Tasks/Word.js';
import Excel from '../Tasks/Excel.js';
import RedMonster from '../MovingCharacters/RedMonster.js';
import Zombie from '../MovingCharacters/Zombie.js';
import EndingScreen from './EndingScreen.js';
import Angel from '../MovingCharacters/Angel.js';

export default class GameLevel extends Level {
  private keyListener: KeyListener;

  private player: Player;

  private monsters: Monster[];

  private walls: Wall[];

  private angel: Angel;

  private battleMusic: HTMLAudioElement;

  private tasks: Task[];

  private currentLevel: number;

  private monsterCounter: number;

  private inATask: boolean;

  private monsterColliding: number;

  private questionNumber: number;

  private lives: number;

  private lifeImg: HTMLImageElement;

  private levelStartAnimationDuration: number;

  private levelStartFlag: boolean;

  private levelAnimation: HTMLImageElement[];

  private bfImage: HTMLImageElement;

  private triggerEffect: boolean;

  private arrayOfEffect: string[];

  private currentImage: HTMLImageElement;

  private currentItem: number;

  private timeToNextItem: number;

  public constructor(canvas: HTMLCanvasElement,
    currentLevel: number,
    lives: number,
    language: number) {
    super();

    this.walls = [];
    this.keyListener = new KeyListener();
    this.inATask = false;

    this.currentLevel = currentLevel;
    this.monsterCounter = 3;

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
    this.keyListener = new KeyListener();

    this.monsters = [];

    this.createMonsters();
    this.angel = new Angel();

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

    if (currentLevel === 1) {
      this.arrayOfEffect = ['./assets/specialeffect/1.png', './assets/specialeffect/2.png', './assets/specialeffect/3.png',
        './assets/specialeffect/4.png', './assets/specialeffect/5.png', './assets/specialeffect/6.png',
        './assets/specialeffect/7.png', './assets/specialeffect/8.png', './assets/specialeffect/9.png'];
    } else if (currentLevel === 2) {
      this.arrayOfEffect = ['./assets/specialeffect/10.png', './assets/specialeffect/12.png', './assets/specialeffect/13.png',
        './assets/specialeffect/14.png', './assets/specialeffect/15.png', './assets/specialeffect/16.png',
        './assets/specialeffect/17.png', './assets/specialeffect/18.png',];
    } else if (currentLevel === 3) {
      this.arrayOfEffect = ['./assets/specialeffect/19.png', './assets/specialeffect/20.png', './assets/specialeffect/21.png',
        './assets/specialeffect/22.png', './assets/specialeffect/23.png', './assets/specialeffect/24.png',
        './assets/specialeffect/25.png'];
    }

    this.triggerEffect = false;
    this.currentItem = 0;
    this.currentImage = CanvasRenderer.loadNewImage(this.arrayOfEffect[this.currentItem]);
    this.timeToNextItem = 1;
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
    if (this.currentLevel === 1) {
      let ghost: Ghost;
      for (let i: number = 0; i <= 2; i++) {
        ghost = new Ghost();
        while (this.isAlreadyThere(ghost)) {
          ghost = new Ghost();
        }
        this.monsters.push(ghost);
      }
    } else if (this.currentLevel === 2) {
      let redMonster: RedMonster;
      for (let i: number = 0; i <= 2; i++) {
        redMonster = new RedMonster();
        while (this.isAlreadyThere(redMonster)) {
          redMonster = new RedMonster();
        }
        this.monsters.push(redMonster);
      }
    } else {
      let zombie: Zombie;
      for (let i: number = 0; i <= 2; i++) {
        zombie = new Zombie();
        while (this.isAlreadyThere(zombie)) {
          zombie = new Zombie();
        }
        this.monsters.push(zombie);
      }
    }
  }

  /**
   * Checking if there is a monster already in that position
   * @param monster the new moster to spawn
   * @returns true or false
   */
  public isAlreadyThere(monster: Monster): boolean {
    for (let i: number = 0; i < this.monsters.length; i++) {
      if (this.monsters[i].getPosY() == monster.getPosY() &&
        this.monsters[i].getPosX() == monster.getPosX()) {
        return true;
      }
    }
    return false;
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

    this.player.update(elapsed);

    for (let i: number = 0; i < this.monsters.length; i++) {
      this.monsters[i].update(elapsed);
      if (this.monsters[i].isColliding(this.walls,
        this.monsters[i].getPosX(),
        this.monsters[i].getPosY())) {
        this.monsters[i].setSpeed(-(this.monsters[i].getSpeed()));
      }
    }

    for (let i: number = 0; i < this.monsters.length; i++) {
      if (this.player.isCollidingWithMonster(this.monsters[i])) {
        if (this.keyListener.keyPressed(KeyListener.KEY_SPACE)) {
          this.triggerEffect = true;
          this.monsterColliding = i;
        }
      }

      if (this.angel != null) {
        if (this.player.isCollidingWithMonster(this.angel)) {
          if (this.keyListener.keyPressed(KeyListener.KEY_SPACE)) {
            if (this.lives < 3) {
              this.lives += 1;
              this.angel = null;
            }
          }
        }
      }

      if (this.triggerEffect) {
        this.startAnimation(elapsed);
      }
    }

    if (this.tasks[this.questionNumber].getIsCompleted()) {
      this.monsterCounter -= 1;
      this.inATask = false;
      if (this.questionNumber < this.tasks.length - 1) {
        this.questionNumber += 1;
      }
    }

    for (let i: number = 0; i < this.tasks.length; i++) {
      if (this.tasks[i].checkMistake()) {
        this.lives -= 1;
      }
    }
  }

  /**
   * to start the animation
   * @param elapsed the time elapsed
   */
  public startAnimation(elapsed: number): void {
    this.timeToNextItem -= 0.015 * elapsed;
    if (this.timeToNextItem < 0) {
      this.currentItem = this.currentItem + 1;
      if (this.currentItem > this.arrayOfEffect.length - 1) {
        this.currentItem = 0;
        this.triggerEffect = false;
        this.inATask = true;
        this.monsters.splice(this.monsterColliding, 1);
      }
      this.currentImage = CanvasRenderer.loadNewImage(this.arrayOfEffect[this.currentItem]);
      this.timeToNextItem = 1;
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
    if (this.monsters.length != 0 || !this.tasks[this.questionNumber].getIsCompleted()) {
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
    this.tasks[this.questionNumber].processInput(mouseListener, keyListener);
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

      if (this.angel != null && this.lives <= 2) {
        this.angel.render(canvas);
      }

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
      if (this.language == 0) {
        CanvasRenderer.writeText(this.canvas, `Monsters left: ${this.monsterCounter}`, 20, 110, 'left', 'Bungee Spice', 40, 'white');
      } else {
        CanvasRenderer.writeText(this.canvas, `Monsters overgebleven: ${this.monsterCounter}`, 20, 110, 'left', 'Bungee Spice', 40, 'white');
      }
      if (this.triggerEffect) {
        CanvasRenderer.drawImage(canvas, this.currentImage,
          this.monsters[this.monsterColliding].getPosX(),
          this.monsters[this.monsterColliding].getPosY());
      }
    }
  }
}
