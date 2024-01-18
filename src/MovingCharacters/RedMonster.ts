import CanvasRenderer from '../Utility/CanvasRenderer.js';
import Monster from './Monster.js';

export default class RedMonster extends Monster {
  public constructor() {
    super();
    this.image = CanvasRenderer.loadNewImage('./assets/red_monster.png');
  }
}
