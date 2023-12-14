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

  public constructor(canvas: HTMLCanvasElement) {
    super();
    this.keyListener = new KeyListener();
    this.canvas = canvas;
    this.arrayOfImages = ['./assets/Backstory00.jpg', './assets/Backstory01.jpg', './assets/Backstory02.jpg', './assets/Backstory03.jpg', './assets/Backstory04.jpg', './assets/Backstory05.jpg', './assets/Backstory06.jpg', './assets/Backstory07.jpg'];
    this.currentImage = 0;
    this.image = CanvasRenderer.loadNewImage(this.arrayOfImages[this.currentImage]);
  }

  /**
   * updates the images
   * @param elapsed i don't know what that does
   */
  public override update(elapsed: number): void {
    this.image = CanvasRenderer.loadNewImage(this.arrayOfImages[this.currentImage]);
  }

  /**
   * method to go from the backstory to level 1
   * @param canvas changing the canvas from the pictures in the backstory to the map
   * @returns null for now so it doesn't scream at me
   */
  public override nextLevel(canvas: HTMLCanvasElement): Level | null {
    if (this.currentImage >= this.arrayOfImages.length) {
      return new GameLevel(canvas);
    } else {
      return null;
    }
  }

  /**
   * method to change the photos in the arrey by pressing the space bar
   * @param keyListener adding the key listener so we can use the space bar
   */
  public override processInput(keyListener: KeyListener): void {
    if (keyListener.keyPressed(KeyListener.KEY_SPACE)) {
      this.currentImage++;
    }
  }

  /**
   * drawing the images on the cancas
   * @param canvas HTML canvas element
   */
  public render(canvas: HTMLCanvasElement): void {
    CanvasRenderer.drawImage(canvas, this.image, 0, 0);
  }
}
