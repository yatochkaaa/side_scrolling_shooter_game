class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  init() {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.score = 0;
  }

  create() {
    this.createBackground();
    if (!this.sounds) {
      this.createSounds();
    }
    this.player = new Player(this);
    this.enemies = new Enemies(this);
    this.createText();
    this.createCompleteEvents();
    this.addOverlap();
  }

  createSounds() {
    this.sounds = {
      theme: this.sound.add('theme', { volume: 0.3, loop: true }),
      boom: this.sound.add('boom', { volume: 0.1 })
    }
    this.sounds.theme.play();
  }

  createText() {
    this.scoreText = this.add.text(50, 60, `Score: ${this.score}`, { font: '40px CurseCasual' });
    this.waveText = this.add.text(50, 25, `Wave: ${this.enemies.wave}`, { font: '40px CurseCasual' });
  }

  addOverlap() {
    this.physics.add.overlap(this.player.fires, this.enemies, this.onOverlap, undefined, this);
    this.physics.add.overlap(this.enemies.fires, this.player, this.onOverlap, undefined, this);
    this.physics.add.overlap(this.player, this.enemies, this.onOverlap, undefined, this);
  }

  onOverlap(source, target) {
    const enemy = [source, target].find(item => item.texture.key === 'enemy');

    if (enemy) {
      ++this.score;
      this.scoreText.setText('Score: ' + this.score);
      Boom.generate(this, enemy.x, enemy.y);
      this.sounds.boom.play();
    }

    source.setAlive(false);
    target.setAlive(false);
  }

  createCompleteEvents() {
    this.player.once('killed', this.onComplete, this);
    this.events.on('wave-complete', this.onWaveComplete, this);
    this.events.once('enemies-killed', this.onComplete, this);
  }

  onWaveComplete() {
    this.waveText.setText(`Wave: ${this.enemies.wave}`);
  }

  onComplete() {
    this.scene.start('Start', {
      completed: this.player.active,
      score: this.score
    });
  }

  update() {
    this.player.move();
    this.bg.tilePositionX += 0.5;
  }

  createBackground() {
    this.bg = this.add.tileSprite(0, 0, config.width, config.height, 'bg').setOrigin(0);
  }
}
