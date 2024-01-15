import CanvasRenderer from '../Utility/CanvasRenderer.js';
import Monster from './Monster.js';
import Wall from './Wall.js';

export default class Ghost extends Monster{
  public constructor(walls: Wall[]){
    // super(alls);
    super(1200, 680, walls);
    this.image=CanvasRenderer.loadNewImage('./assets/blue_monster.png');
  }
}
