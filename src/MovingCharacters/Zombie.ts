import CanvasRenderer from '../Utility/CanvasRenderer.js';
import Monster from './Monster.js';

export default class Zombie extends Monster {
  public constructor() {
    super();
    this.image = CanvasRenderer.loadNewImage('./assets/green_monster.png');
  }
}
