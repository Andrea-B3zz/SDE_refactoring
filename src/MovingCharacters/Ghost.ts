import CanvasRenderer from '../Utility/CanvasRenderer.js';
import Monster from './Monster.js';
import Wall from './Wall.js';

export default class Ghost extends Monster{
  public constructor(walls: Wall[]){
    // super(walls);
    super(1280, 720, walls);
    this.image=CanvasRenderer.loadNewImage('./assets/ghost2.png');
  }
}
