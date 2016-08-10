var BootState = {

  init: function init() {
    var body = document.querySelector('body');
    var container = document.querySelector('#gameContainer');

    // Only change if we need multiTouch
    this.input.maxPointers = 1;

    // Force Phone-like dimensions
    if (this.game.device.desktop) {
      body.style.width = '400px';
      body.style.margin = '10px auto';
    } else {
      container.style.height = window.innerHeight + 'px';
      container.style.width = window.innerWidth + 'px';
    }

    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
  },

  preload: function preload() {
    this.game.TEXTURES = {};
    this.createTextures();
  },

  createTextures: function createTextures() {
    var preloadBar = this.make.graphics(0, 0);

    preloadBar.lineStyle(0, 0x000000, 0);
    preloadBar.beginFill(0xFFFFFF, 1);
    preloadBar.drawRect(0, 0, 200, 20);
    preloadBar.endFill();
    this.game.TEXTURES.preloadBar = preloadBar.generateTexture();
  },

  create: function create() {
    this.state.start('preload');
  }

};

module.exports = BootState;
