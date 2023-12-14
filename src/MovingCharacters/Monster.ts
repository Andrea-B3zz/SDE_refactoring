import CanvasRenderer from '../Utility/CanvasRenderer.js';
import MovingCharacter from './MovingCharacter.js';

export default class Monster extends MovingCharacter {
  public constructor() {
    const randomX: number = Math.floor(Math.random() * window.innerHeight);
    const randomY: number = Math.floor(Math.random() * window.innerWidth);
    super();
    this.posX = randomX;
    this.posY = randomY;
    this.speed = 0.2;
  }

  /**
   * updating our monsters
   * @param elapsed time elapsed
   */
  public override update(elapsed: number): void {

  }

  /**
   * displaying our monsters
   * @param canvas our canvas where everything will be displayed
   */
  public override render(canvas: HTMLCanvasElement): void {
    CanvasRenderer.drawImage(canvas, this.image, this.posX, this.posY);
  }

  /**
   * moving our monster around
   * @param elapsed time elapsed
   */
  public move(elapsed: number): void {
    this.posX += this.speed * elapsed;
  }
}
