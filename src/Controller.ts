import Game from './Utility/Game.js';
import CanvasRenderer from './Utility/CanvasRenderer.js';
import KeyListener from './Utility/KeyListener.js';
import MouseListener from './Utility/MouseListener.js';

export default class Controller extends Game {
  private canvas: HTMLCanvasElement;

  private keyListener: KeyListener;

  private mouseListener: MouseListener;

  private currentLevel: Level;

  /**
   * Create a new instance of the game.
   *
   * @param canvas HTML canvas where the game should be rendered
   */
  public constructor(canvas: HTMLCanvasElement) {
    super();
    this.canvas = canvas;
    this.canvas.height = window.innerHeight;
    this.canvas.width = window.innerWidth;
    this.keyListener = new KeyListener();
    this.currentLevel = new Background();
  }

  /**
   * processing the input
   */
  public processInput(): void {
    this.currentLevel.processInput(this.keyListener, this.mouseListener);
  }

  /**
   * starting new Level, when we finish the previous one
   * @param elapsed time elapsed
   * @returns returning true
   */
  public update(elapsed: number): boolean {
    this.currentLevel.update(elapsed);

    const newLevel: Level = this.currentLevel.nextLevel();
    if (newLevel != null) {
      this.currentLevel = newLevel;
      this.currentLevel.startLevel();
    }

    return true;
  }

  /**
   * clearing the canvas and rendering the current level
   */
  public override render(): void {
    CanvasRenderer.clearCanvas(this.canvas);
    this.currentLevel.render(this.canvas);
  }
}
