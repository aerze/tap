var GameState = {
  //following references to `this` refers to this ↑ GameState object
  TEXTURES: {},

  //change this to however many seconds
  GAME_SECONDS: 5,

  BUTTON_HEIGHT: 150,
  BUTTON_WIDTH: 0,

  COLORS: {
    red: 0xFF1607,
    orange: 0xFF9B07,
    yellow: 0xE8E800,
    blue: 0x204CFF,
    green: 0x17ED0E,
    purple: 0xAD00FF,
    offWhite: 0xFAFAFA
  },

  COLOR_KEYS: ["red", "orange", "yellow", "blue", "green", "purple"],

  score: 0,

  create: function () {

    this.BUTTON_WIDTH = this.game.width / 3;

    // set stage options
    this.stage.backgroundColor =  this.COLORS.offWhite;
    this.stage.smoothed = false;

    // generate sprite textures
    this.createTextures(this.game.width, this.game.height);

    this.createBoard();
    this.createText();
    this.setupTimers();
    this.setupEndText();

    // add setupEndGameText -------------------------------------------------------<


    this.sound.volume = 0.8;
    this.childSFX = {
      1: this.add.audio('childShort'),
      2: this.add.audio('childLong')
    };

    this.startTimer.start();

    // reset score
    this.score = 0;

    // create bitmap debug text
    this.game.time.advancedTiming = true;
    this.fpsText = this.add.bitmapText(this.game.width - 64, 10, 'coolvetica', '0', 64);    // fps
    // this.otherText = this.add.bitmapText(10, 40, 'coolvetica', '0', 32);  // desired:suggested
    // this.minmaxText = this.add.bitmapText(10, 70, 'coolvetica', '0', 32); // min:max
  },

  createBoard: function () {

    this.board = this.add.group();
    this.board.position.setTo(0, this.game.height - this.BUTTON_HEIGHT * 2);

    this.green = this.board.create(0, 0, this.TEXTURES.button);
    this.green.color = 'green';
    this.green.tint = this.COLORS.green;

    this.red = this.board.create(this.BUTTON_WIDTH, 0, this.TEXTURES.button);
    this.red.color = 'red';
    this.red.tint = this.COLORS.red;

    this.orange = this.board.create(this.BUTTON_WIDTH * 2, 0, this.TEXTURES.button);
    this.orange.color = 'orange';
    this.orange.tint = this.COLORS.orange;

    this.yellow = this.board.create(0, this.BUTTON_HEIGHT, this.TEXTURES.button);
    this.yellow.color = 'yellow';
    this.yellow.tint = this.COLORS.yellow;

    this.blue = this.board.create(this.BUTTON_WIDTH, this.BUTTON_HEIGHT, this.TEXTURES.button);
    this.blue.color = 'blue';
    this.blue.tint = this.COLORS.blue;

    this.purple = this.board.create(this.BUTTON_WIDTH * 2, this.BUTTON_HEIGHT, this.TEXTURES.button);
    this.purple.color = 'purple';
    this.purple.tint = this.COLORS.purple;

    this.board.setAll('inputEnabled', false);
    this.board.forEach(function (button) {
      button.events.onInputUp.add(function () {
        this.checkMatch(button.color);
      }, this);
    }, this);
  },

  createText: function () {

    this.coloredText = this.add.bitmapText(this.game.width/2, this.game.height/4, 'coolvetica', 'Ready?', 128);
    this.coloredText.anchor.setTo(0.5);
    this.coloredText.align = 'center';

    this.countdownStartText = this.add.bitmapText(this.game.width/2, (this.game.height/4) * 2.5 , 'coolvetica', '3', 256);
    this.countdownStartText.anchor.setTo(0.5);

    this.gameTimerText = this.add.bitmapText(0, 0, 'coolvetica', '3', 128);
  },

  setupTimers: function () {
    this.gameTimer = this.time.create();
    this.startTimer = this.time.create();

    this.startTimerEvent = this.startTimer.add(Phaser.Timer.SECOND * 3, this.startGame, this);
    //GAME_SECONDS defined @ top
    this.gameTimerEvent = this.gameTimer.add(Phaser.Timer.SECOND * this.GAME_SECONDS, this.endGame, this);
  },

  update: function () {
    this.updateCountdown();

    if (this.time.fps !== 0) {
      this.fpsText.setText(this.time.fps);
      // this.otherText.setText(this.time.desiredFps + ':' + this.time.suggestedFps);
      // this.minmaxText.setText(this.time.fpsMin + ':' + this.time.fpsMax);
      // if (this.time.suggestedFps > this.time.fps) this.time.desiredFps = this.time.suggestedFps;
    }
  },

  setupEndText: function(){
    this.restartText = this.add.bitmapText(this.game.width/2, this.game.height/1.4, 'coolvetica', 'Restart?', 128);
    this.restartText.exists = false;
    this.restartText.anchor.setTo(0.5);
    this.restartText.inputEnabled = false;
    this.restartText.events.onInputUp.add(function() {
      this.state.start('game');
    }, this);
  },

  displayEndText: function () {
    this.restartText.exists = true;
    this.restartText.inputEnabled = true;
  },

  updateWord: function () {
    // store previous color
    this.oldColor = this.fillColor;
    this.oldText = this.textColor;

    // set new random fill color
    this.fillColor = this.COLOR_KEYS[this.game.rnd.integerInRange(0, 5)];

    // retry if same as the old color
    if (this.oldColor === this.fillColor) return this.updateWord();

    // set new random text
    this.textColor = this.COLOR_KEYS[this.game.rnd.integerInRange(0, 5)];

    // retry if word is same word
    if (this.oldText === this.textColor) return this.updateWord();

    // retry if the color and text match
    if (this.textColor === this.fillColor) return this.updateWord();

    // update bitmap text
    this.coloredText.text = this.textColor;
    this.coloredText.tint = this.COLORS[this.fillColor];
  },

  updateCountdown: function(){
    if (!this.startTimer.expired){
      this.countdownStartText.text = Math.ceil(3 - this.startTimer.seconds);
    }
  },

  startGame: function () {
      this.countdownStartText.text = '';
      this.coloredText.text = '';
      this.gameTimer.start();

      this.board.setAll('inputEnabled', true);
      this.updateWord();
  },

  endGame: function () {
    this.board.setAll('inputEnabled', false);
    this.coloredText.text = "Your score:\n" + this.score;
    this.coloredText.tint = this.COLORS.blue;
    this.displayEndText();
  },

  checkMatch: function (color) {
    if (this.textColor === color) {
      this.score += 1;
      this.playSound();
      this.updateWord();
    }
  },

  playSound: function () {
    this.childSFX[this.game.rnd.integerInRange(1, 2)].play();
  },

  createTextures: function (w, h) {
    //color button function at bottom of
    var button = this.make.graphics(0, 0);
    var borderWidth = 4;
    button.lineStyle(borderWidth, this.COLORS.offWhite, 1);
    button.beginFill(0xFFFFFF, 1);
    button.drawRect(0, 0, this.BUTTON_WIDTH - (borderWidth *2), this.BUTTON_HEIGHT - (borderWidth *2));
    button.endFill();

    this.TEXTURES.button = button.generateTexture();

  }
};

module.exports = GameState;
