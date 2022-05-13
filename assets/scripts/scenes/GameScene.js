class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  init() {
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  create() {
    this.createBackground();
    this.player = new Player(this);
    this.enemies = new Enemies(this);
    this.createCompleteEvents();
    this.addOverlap();
  }

  addOverlap() {
    this.physics.add.overlap(this.player.fires, this.enemies, this.onOverlap, undefined, this);
    this.physics.add.overlap(this.enemies.fires, this.player, this.onOverlap, undefined, this);
    this.physics.add.overlap(this.player, this.enemies, this.onOverlap, undefined, this);
  }

  onOverlap(source, target) {
    source.setAlive(false);
    target.setAlive(false);
  }

  createCompleteEvents() {
    this.player.once('killed', this.onComplete, this);
    // this.enemies.once('killed', this.onComplete, this);
    this.events.once('enemies-killed', this.onComplete, this);
  }

  onComplete() {
    this.scene.start('Start');
  }

  update() {
    this.player.move();
    this.bg.tilePositionX += 0.5;

  }

  createBackground() {
    this.bg = this.add.tileSprite(0, 0, config.width, config.height, 'bg').setOrigin(0);
  }
}
