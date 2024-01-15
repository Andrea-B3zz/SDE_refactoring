import CanvasRenderer from '../Utility/CanvasRenderer.js';
import Monster from './Monster.js';
import Wall from './Wall.js';


export default class Ghost extends Monster {
  public constructor(x: number, y: number, walls: Wall[]) {
    super(1280, 720, walls);
    this.image = CanvasRenderer.loadNewImage('./assets/blue_monster.png');
    this.posX = x;
    this.posY = y;
  }
}
