import CanvasRenderer from '../Utility/CanvasRenderer.js';
import Monster from './Monster.js';
import Wall from './Wall.js';

export default class RedMonster extends Monster{
  public constructor(walls: Wall[]){
    // super(walls);
    super(1200, 680, walls);
    this.image=CanvasRenderer.loadNewImage('./assets/red_monster.png');
  }
}
