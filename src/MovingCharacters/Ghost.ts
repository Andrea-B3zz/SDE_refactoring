import CanvasRenderer from '../Utility/CanvasRenderer.js';
import Monster from './Monster.js';

export default class Ghost extends Monster{
  public constructor(){
    super();
    this.image=CanvasRenderer.loadNewImage('./assets/ghost.png');
  }
}
