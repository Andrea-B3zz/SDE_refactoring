import CanvasRenderer from '../Utility/CanvasRenderer.js';
import Monster from './Monster.js';

export default class Angel extends Monster {
  public constructor() {
    super();
    this.image = CanvasRenderer.loadNewImage('assets/angel.png');
  }
}
