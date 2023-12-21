import CanvasRenderer from '../Utility/CanvasRenderer.js';
import Monster from './Monster.js';
import Wall from './Wall.js';

export default class Zombie extends Monster{
  public constructor(walls: Wall[]){
    // super(walls);
    super(1, 1);
    this.image=CanvasRenderer.loadNewImage('./assets/zombie.png');
  }
}
