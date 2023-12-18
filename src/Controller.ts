import Game from './Utility/Game.js';
import CanvasRenderer from './Utility/CanvasRenderer.js';
import KeyListener from './Utility/KeyListener.js';
import MouseListener from './Utility/MouseListener.js';
import Level from './Level.js';
import Backstory from './Backstory.js';

export default class Controller extends Game {
  private canvas: HTMLCanvasElement;

  private keyListener: KeyListener;

  private mouseListener: MouseListener;

  private currentLevel: Level;

  private levelCount: number;

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
    this.currentLevel = new Backstory(canvas);
    this.levelCount = 0;
  }

  public processInput(): void {
    this.currentLevel.processInput(this.keyListener);
  }

  /**
   * updates the level that the player is on
   * @param elapsed something
   * @returns something else
   */
  public override update(elapsed: number): boolean {
    this.currentLevel.update(elapsed);

    const newLevel: Level = this.currentLevel.nextLevel(this.canvas);
    if (newLevel != null) {
      this.levelCount+=1;
      this.currentLevel = newLevel;
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
