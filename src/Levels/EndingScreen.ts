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
    this.music = document.querySelector('#audio');
    this.music.src = '';
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
   */
  public override processInput(keyListener: KeyListener): void {
    // doesn't have any implementation
  }

  /**
   *
   * @param canvas HTML canvas element
   */
  public override render(canvas: HTMLCanvasElement): void {
    CanvasRenderer.drawImage(canvas, this.image, 0, 0);
  }
}
