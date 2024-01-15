import Level from './Level.js';
import CanvasRenderer from './Utility/CanvasRenderer.js';
import KeyListener from './Utility/KeyListener.js';
import MouseListener from './Utility/MouseListener.js';
import GameLevel from './GameLevel.js';

export default class Backstory extends Level {
  private arrayOfImages: string[];

  private currentImage: number;

  private mouseListener: MouseListener;

  private keyListener: KeyListener;

  public constructor(canvas: HTMLCanvasElement, language: number) {
    super();
    this.keyListener = new KeyListener();
    this.canvas = canvas;
    this.language = language;

    if (language == 0) {
      this.arrayOfImages = ['./assets/Backstory/English/Backstory01EN.jpg', './assets/Backstory/English/Backstory02EN.jpg', './assets/Backstory/English/Backstory03EN.jpg', './assets/Backstory/English/Backstory04EN.jpg', './assets/Backstory/English/Backstory05EN.jpg', './assets/Backstory/English/Backstory06EN.jpg', './assets/Backstory/English/Backstory07EN.jpg', './assets/Backstory/English/Backstory08EN.jpg'];
    } else {
      this.arrayOfImages = ['./assets/Backstory/Dutch/Backstory01NL.jpg', './assets/Backstory/Dutch/Backstory02NL.jpg', './assets/Backstory/Dutch/Backstory03NL.jpg', './assets/Backstory/Dutch/Backstory04NL.jpg', './assets/Backstory/Dutch/Backstory05NL.jpg', './assets/Backstory/Dutch/Backstory06NL.jpg', './assets/Backstory/Dutch/Backstory07NL.jpg', './assets/Backstory/Dutch/Backstory08NL.jpg'];
    }
    this.currentImage = 0;
    this.music = document.querySelector('#audio');
    this.music.src = 'assets/Audio/backstoryMusic.ogg';

    this.image = CanvasRenderer.loadNewImage(this.arrayOfImages[this.currentImage]);
    this.image.onload = (): void => {
      this.canvas.width = this.image.width;
      this.canvas.height = this.image.height;
    };

    this.canvas.style.width = '94%';
    this.canvas.style.height = '94%';
    this.canvas.style.marginLeft = '3%';

    this.arrayOfImages.forEach((imagePath: string) => {
      const image: HTMLImageElement = new Image();
      image.src = imagePath;
    });
  }

  /**
   * updates the images
   * @param elapsed that does nothing here, but it's used in the abstract class Level
   */
  public override update(elapsed: number): void {
    this.music.play();
    this.image = CanvasRenderer.loadNewImage(this.arrayOfImages[this.currentImage]);
  }

  /**
   * method to go from the backstory to level 1
   * @param canvas changing the canvas from the pictures in the backstory to the map
   * @returns null for now so it doesn't scream at me
   */
  public override nextLevel(canvas: HTMLCanvasElement): Level | null {
    if (this.currentImage >= this.arrayOfImages.length) {
      return new GameLevel(canvas, 1, 3, this.language);
    } else {
      return null;
    }
  }

  /**
   * method to change the photos in the arrey by pressing the space bar
   * @param keyListener adding the key listener so we can use the space bar
   */
  public override processInput(keyListener: KeyListener, mouseListener: MouseListener): void {
    if (keyListener.keyPressed(KeyListener.KEY_SPACE)) {
      this.currentImage = this.currentImage + 1;
    }
  }

  /**
   * drawing the images on the cancas
   * @param canvas HTML canvas element
   */
  public render(canvas: HTMLCanvasElement): void {
    CanvasRenderer.clearCanvas(canvas);
    CanvasRenderer.drawImage(canvas, this.image, 0, 0);
  }
}
