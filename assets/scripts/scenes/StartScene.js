class StartScene extends Phaser.Scene {
  constructor() {
    super('Start');
  }

  create() {
    this.createBackground();
    this.createStartText();
    this.setEvents();
  }

  createBackground() {
    this.add.image(0, 0, 'bg').setOrigin(0);
  }

  createStartText() {
    this.startText = this.add.text(config.width / 2, 500, 'Tap to start', {
      font: '40px CurseCasual',
      fill: '#fff'
    }).setOrigin(0.5);
  }

  setEvents() {
    this.input.on('pointerdown', () => {
      this.scene.start('Game')
    });
  }
}
