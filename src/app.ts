import Controller from './Controller.js';

const game: Controller = new Controller(document.getElementById('game') as HTMLCanvasElement);

window.addEventListener('load', () => {
  game.start();
});
