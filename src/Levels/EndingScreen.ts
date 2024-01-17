import Level from './Level.js';
import CanvasRenderer from '../Utility/CanvasRenderer.js';
import KeyListener from '../Utility/KeyListener.js';

export default class EndingScreen extends Level {
  public constructor(canvas: HTMLCanvasElement, type: string, language: number) {
    super();
    this.canvas = canvas;
    this.language = language;
    if (type === 'win') {
      if (this.language == 0) {
        this.image = CanvasRenderer.loadNewImage('./assets/Ending_scene/gameWinEN.png');
      } else {
        this.image = CanvasRenderer.loadNewImage('./assets/Ending_scene/gameWinNL.png');
      }
    } else if (type === 'lose') {
      if (this.language == 0) {
        this.image = CanvasRenderer.loadNewImage('./assets/Ending_scene/gameOverEN.png');
      } else {
        this.image = CanvasRenderer.loadNewImage('./assets/Ending_scene/gameOverNL.png');
      }
    }
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
  public override processInput(keyListener: KeyListener): void {
    // doesn't have any implementation
  }

  /**
   *
   * @param elapsed time in ms
   */
  public override update(): void {
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
