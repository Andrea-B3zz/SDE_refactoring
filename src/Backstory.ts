import Level from './Level.js';
import CanvasRenderer from './Utility/CanvasRenderer.js';
import KeyListener from './Utility/KeyListener.js';
import MouseListener from './Utility/MouseListener.js';

export default class Backstory extends Level {
  private arrayOfImages: string[];

  private currentImage: number;

  private mouseListener: MouseListener;

  private keyListener: KeyListener;

  public constructor() {
    super();
    this.keyListener = new KeyListener();

    this.arrayOfImages = [];
    this.arrayOfImages.push('./assets/image1.jpeg', './assets/image2.jpeg', './assets/image3.jpeg', './assets/image4.jpeg', './assets/image5.jpeg');
     this.currentImage = 0;
    this.image = CanvasRenderer.loadNewImage(this.arrayOfImages[this.currentImage]);
  }

  public override update(elapsed: number): void {

  }

  public override nextLevel(canvas: HTMLCanvasElement): Level | null {
    return null;
  }

  public override startLevel(): void {

  }

  public override processInput(keyListener: KeyListener): void {
    if (keyListener.keyPressed(KeyListener.KEY_SPACE)){
      this.currentImage++;
    }
  }

  public render(canvas: HTMLCanvasElement): void {
    CanvasRenderer.drawImage(this.canvas, this.image, 0, 0);
  }
}
