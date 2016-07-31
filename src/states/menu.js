var MenuState = {
  preload: function preload() {
    this.stage.backgroundColor = '#235b7d';
  },
  
  create: function create() {
    var hh = this.game.halfheight;
    var hw = this.game.halfwidth;
    var qh = this.game.height / 4;
    var qw = this.game.width / 4;
    
    var clickMotion = function (thing) {thing.y += 8; thing.scale.setTo(0.9)};
    var unclickMotion = function (thing) {thing.y -= 8; thing.scale.setTo(1)};
    
    this.mainGroup = this.add.group();
    
    //title of the game
    this.title = this.add.bitmapText(hw, qh, 'coolvetica', 'Stroopy', 64);
    this.title.anchor.setTo(0.5);
    this.title.inputEnabled = true;
    this.title.events.onInputDown.add(clickMotion);
    this.title.events.onInputUp.add(unclickMotion);
    
    //instructions
    this.instruct = this.add.bitmapText(hw, qh + 100, 'coolvetica', 'Tap what you read, not what you see', 32);
    this.instruct.anchor.setTo(0.5);
    
    //play button
    this.play = this.add.bitmapText(hw , qh * 3 , 'coolvetica', 'Play game', 64);
    this.play.anchor.setTo(0.5);
    this.play.inputEnabled = true;
    this.play.events.onInputDown.add(clickMotion);
    this.play.events.onInputUp.add(unclickMotion);
    
    
    this.play.events.onInputUp.add(function () {
      this.state.start('game');
    }, this);
    
  }
};

module.exports = MenuState;
