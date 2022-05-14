class PreloadScene extends Phaser.Scene {
  constructor() {
    super('Preload');
  }

  preload() {
    this.load.image('fire', 'assets/sprites/fire.png');
    this.load.image('bullet', 'assets/sprites/bullet.png');
    this.load.atlas('dragon', 'assets/sprites/dragon.png', 'assets/sprites/dragon.json');
    this.load.atlas('enemy', 'assets/sprites/enemy.png', 'assets/sprites/enemy.json');
    this.load.atlas('boom', 'assets/sprites/boom.png', 'assets/sprites/boom.json');
  }

  create() {
    this.scene.start('Start');
  }
}