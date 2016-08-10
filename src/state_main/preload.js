var PreloadState = {

  preload: function preload() {
    this.game.halfHeight = this.game.height / 2;
    this.game.halfWidth = this.game.width / 2;

    this.state.backgroundColor = '#17394f';

    this.preloadBarSprite = this.add.sprite(
      this.game.halfWidth,
      this.game.halfHeight,
      this.game.TEXTURES.preloadBar);

    this.preloadBarSprite.anchor.setTo(0.5, 0.5);

    this.load.setPreloadSprite(this.preloadBarSprite);

    // Bitmap Fonts
    this.load.bitmapFont('coolvetica', 'assets/coolvetica.png', 'assets/coolvetica.xml');
    this.game.FONT = 'coolvetica';
    this.game.FONT_SIZE = 64;


    this.load.audio('childShort', ['assets/children-yeah-short.mp3']);
    this.load.audio('childLong', ['assets/children-yeah-long-and-laugh.mp3']);
  },

  update: function update() {
    if (this.cache.isSoundDecoded('childLong')) {
      this.state.start('menu');
    }
  }

};

module.exports = PreloadState;
