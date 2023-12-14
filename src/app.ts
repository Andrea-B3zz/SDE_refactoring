import Controller from './Controller.js';

const game: Controller = new Controller(document.getElementById('canvas') as HTMLCanvasElement);

window.addEventListener('load', () => {
  game.start();
});
