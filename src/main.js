
var BootState = require('./states/boot.js');
var PreloadState = require('./states/preload.js');
var MenuState = require('./states/menu.js');
var GameState = require('./states/game.js');

window.onload = function () {
  var game = new Phaser.Game(740, 1200, Phaser.AUTO, 'gameContainer');
  
  console.log('loading states');
  game.state.add('boot', BootState);
  game.state.add('preload', PreloadState);
  game.state.add('menu', MenuState);
  game.state.add('game', GameState);
  
  game.state.start('boot');
};
