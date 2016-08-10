var MainMenuState = {

  preload: function preload() {
    this.stage.backgroundColor = '#235b7d';
    this.sound.volume = 0.8;
  },

  create: function create() {
    this.childSFX = {
      short: this.add.audio('childShort'),
      long: this.add.audio('childLong')
    };

    this.mainGroup = this.add.group();

    this.title = this.addBitmap('Tap', null, 100);

    this.signin = this.addBitmap('sign in', null, 200);
    this.signin.events.onInputUp.add(function play() {
      // create a small lib for creating a modal and getting back a value
      var test = window.prompt('Username');
      console.log('play');
    });

    this.signup = this.addBitmap('sign up', null, 260);

    this.play = this.addBitmap('play', null, this.game.height - 100);
  },

  addBitmap: function addBitmap(text, x, y) {
    var newBitmap = this.add.bitmapText(
      x || this.game.halfWidth,
      y || this.game.halfHeight,
      this.game.FONT,
      text,
      this.game.FONT_SIZE);

    newBitmap.anchor.setTo(0.5);
    newBitmap.inputEnabled = true;
    newBitmap.events.onInputDown.add(this._clickDownMotion);
    newBitmap.events.onInputDown.add(function () {
      this.childSFX.short.play();
    }, this);

    newBitmap.events.onInputUp.add(this._clickUpMotion);


    return newBitmap;
  },

  _clickDownMotion: function _clickDownMotion(sprite) {
    sprite.y = sprite.y + 8;
    sprite.scale.setTo(0.9);
  },

  _clickUpMotion: function _clickUpMotion(sprite) {
    sprite.y = sprite.y - 8;
    sprite.scale.setTo(1);
  }

};

module.exports = MainMenuState;
