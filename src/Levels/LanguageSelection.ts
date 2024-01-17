import Level from './Level.js';
import CanvasRenderer from '../Utility/CanvasRenderer.js';
import KeyListener from '../Utility/KeyListener.js';
import MouseListener from '../Utility/MouseListener.js';
import Backstory from './Backstory.js';

export default class LanguageSelection extends Level {
  private keyListener: KeyListener;

  private mouseListener: MouseListener;

  private languageChosen: boolean;

  private dutchFlag: HTMLImageElement;

  private englishFlag: HTMLImageElement;

  private posXNL: number;

  private posXEN: number;

  private posYNL: number;

  private posYEN: number;

  public constructor(canvas: HTMLCanvasElement) {
    super();
    this.keyListener = new KeyListener();
    this.mouseListener = new MouseListener(canvas);
    this.canvas = canvas;

    this.language = 0;
    this.languageChosen = false;
    this.image = CanvasRenderer.loadNewImage('./assets/Backstory/English/Backstory00EN.jpg');
    this.dutchFlag = CanvasRenderer.loadNewImage('./assets/dutch.png');
    this.englishFlag = CanvasRenderer.loadNewImage('./assets/english.png');

    this.canvas.width = this.image.width;
    this.canvas.height = this.image.height;


    this.canvas.style.width = '94%';
    this.canvas.style.height = '94%';
    this.canvas.style.marginLeft = '3%';

    this.posXEN = 800;
    this.posYEN = 100;
    this.posXNL = 1000;
    this.posYNL = 100;
  }

  /**
   * updates the images
   * @param elapsed that does nothing here, but it's used in the abstract class Level
   */
  public override update(elapsed: number): void {

  }

  /**
   * method to go from the backstory to level 1
   * @param canvas changing the canvas from the pictures in the backstory to the map
   * @returns null for now so it doesn't scream at me
   */
  public override nextLevel(canvas: HTMLCanvasElement): Level | null {
    if (this.languageChosen) {
      return new Backstory(canvas, this.language);
    } else {
      return null;
    }
  }

  /**
   * method to change the photos in the arrey by pressing the space bar
   * @param keyListener adding the key listener so we can use the space bar
   * @param mouseListener a
   */
  public override processInput(keyListener: KeyListener, mouseListener: MouseListener): void {
    if (mouseListener.isButtonDown(MouseListener.BUTTON_LEFT) && this.isDutch(mouseListener)) {
      this.language = 1;
    }
    if (mouseListener.isButtonDown(MouseListener.BUTTON_LEFT) && this.isEnglish(mouseListener)) {
      this.language = 0;
    }

    if (keyListener.keyPressed(KeyListener.KEY_SPACE)) {
      this.languageChosen = true;
    }
  }

  public getLanguage(): number {
    return this.language;
  }

  /**
   * Check if we are selecting Dutch
   * @param mouseListener to see if the player chose Dutch or English
   * @returns true or false
   */
  public isDutch(mouseListener: MouseListener): boolean {
    const mouseX: number = mouseListener.getMousePosition().x;
    const mouseY: number = mouseListener.getMousePosition().y;

    if (
      mouseX <= 840
      && mouseX >= 750
      && mouseY <= 120
      && mouseY >= 75
    ) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Check if we are selecting English
   * @param mouseListener to see if the player chose Dutch or English
   * @returns true or false
   */
  public isEnglish(mouseListener: MouseListener): boolean {
    const mouseX: number = mouseListener.getMousePosition().x;
    const mouseY: number = mouseListener.getMousePosition().y;

    if (
      mouseX <= 691
      && mouseX >= 601
      && mouseY <= 119
      && mouseY >= 75
    ) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * drawing the images on the cancas
   * @param canvas HTML canvas element
   */
  public render(canvas: HTMLCanvasElement): void {
    if (this.language == 0) {
      this.image = CanvasRenderer.loadNewImage('./assets/Backstory/English/Backstory00EN.jpg');
      CanvasRenderer.drawImage(canvas, this.image, 0, 0);
    } else {
      this.image = CanvasRenderer.loadNewImage('./assets/Backstory/Dutch/Backstory00NL.jpg');
      CanvasRenderer.drawImage(canvas, this.image, 0, 0);
    }
    CanvasRenderer.drawImage(canvas, this.englishFlag, this.posXEN, this.posYEN);
    CanvasRenderer.drawImage(canvas, this.dutchFlag, this.posXNL, this.posYNL);
  }
}
