import Level from './Level.js';
import CanvasRenderer from './Utility/CanvasRenderer.js';
import KeyListener from './Utility/KeyListener.js';
import MouseListener from './Utility/MouseListener.js';

export default class EndingScreen extends Level {
  public constructor(canvas: HTMLCanvasElement) {
    super();
    this.canvas = canvas;
    this.image = CanvasRenderer.loadNewImage('./assets/gameWin.png');
    this.render();
  }

  /**
   *
   * @param canvas  passed
   * @returns null for now
   */
  public override nextLevel(canvas: HTMLCanvasElement): Level | null {
    return null;
    // doesn't have any implementation
  }

  /**
   *
   * @param keyListener passed
   * @param mouseListener passed
   */
  public override processInput(keyListener: KeyListener, mouseListener: MouseListener): void {
    // doesn't have any implementation
  }

  /**
   *
   * @param elapsed time in ms
   */
  public override update(elapsed: number): void {
    // doesn't have any implementation
  }

  /**
   *
   * @param canvas passed as a parameter
   */
  public override render(): void {
    CanvasRenderer.drawImage(this.canvas, this.image, 0, 0);
  }
}
