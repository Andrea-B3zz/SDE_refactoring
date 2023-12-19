import CanvasRenderer from '../Utility/CanvasRenderer.js';
import Monster from './Monster.js';
import Wall from './Wall.js';

export default class Ghost extends Monster{
  public constructor(walls: Wall[]){
    super(walls);
    this.image=CanvasRenderer.loadNewImage('./assets/ghost2.png');
  }
}
