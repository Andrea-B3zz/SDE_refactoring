import CanvasRenderer from '../Utility/CanvasRenderer.js';
import Monster from './Monster.js';
import Wall from './Wall.js';

export default class RedMonster extends Monster{
  public constructor(walls: Wall[], MapWidth: number, MapHeight: number){
    super(walls, MapWidth, MapHeight);
    this.image=CanvasRenderer.loadNewImage('./assets/red_monster.png');
  }
}
