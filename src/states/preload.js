var PreloadState = {
  preload: function preload () {
    this.game.halfheight = this.game.height / 2;
    this.game.halfwidth = this.game.width / 2;
    
    var hh = this.game.halfheight;
    var hw = this.game.halfwidth;
    
    this.stage.backgroundColor = '#17394f';

    // Create preload sprite
    this.preloadBar = this.add.sprite(hw, hh, this.game.TEXTURES.preloadBar);
    this.preloadBar.anchor.setTo(0.5, 0.5);
    // Add loading message
    // this.add.text(halfWidth, this.game.height / 2 - 30, "Loading...", { font: "32px monospace", fill: "#fff" })
    //   .anchor.setTo(0.5, 0.5);

    // crops preload sprite
    this.load.setPreloadSprite(this.preloadBar);
    
    this.load.crossOrigin = 'Anonymous';
    // Bitmap Fonts
    this.load.bitmapFont('coolvetica', 'https://cdn.hyperdev.com/us-east-1%3A8652ca76-2558-49ba-8963-53a019bd3acc%2Fcoolvetica.png', 'assets/coolvetica.xml');

    this.load.audio('childShort', ['https://cdn.hyperdev.com/us-east-1%3A0a0b9d25-5740-46b3-89df-07d61e239380%2Fchildren-yeah-short.mp3']);
    this.load.audio('childLong', ['https://cdn.hyperdev.com/us-east-1%3A0a0b9d25-5740-46b3-89df-07d61e239380%2Fchildren-yeah-long-and-laugh.mp3']);
    // this.load.audio('childLong', ['assets/spriteShoot/wrong_target.ogg', 'assets/spriteShoot/wrong_target.m4a']);
    
    // Load the rest of the assets
    // this.load.image('logo', 'assets/logo.png');
    // this.load.spritesheet('blueButton', 'assets/blue_button_123.png', 580, 123);
  },
  
  update: function update() {
    if (this.cache.isSoundDecoded('childShort')) {
      this.state.start('menu');
    }
  }
};

module.exports = PreloadState;
