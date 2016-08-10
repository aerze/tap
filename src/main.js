
var BootState = require('./state_main/boot.js');
var PreloadState = require('./state_main/preload.js');
var MainMenuState = require('./state_main/menu_main.js');
// var PreloadState = require('./states/preload.js');
// var MenuState = require('./states/menu.js');
// var GameState = require('./states/game.js');

window.onload = function () {
  var game = new Phaser.Game(320, 480, Phaser.AUTO, 'gameContainer');

  // console.log('loading states');
  game.state.add('boot', BootState);
  game.state.add('preload', PreloadState);
  game.state.add('menu', MainMenuState);
  // game.state.add('game', GameState);

  game.state.start('boot');
};
