class Enemy extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture, frame) {
    super(scene, x, y, texture, frame);
    this.init();
  }

  static generateAttributes() {
    const x = config.width + 200;
    const y = Phaser.Math.Between(100, config.height - 100);
    const id = Phaser.Math.Between(1, 4);

    return {x, y, id};
  }

  static generate(scene) {
    const data = Enemy.generateAttributes();

    return new Enemy(scene, data.x, data.y, 'enemy', `enemy${data.id}`);
  }

  init() {
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.body.enable = true;
    this.velocity = -250;
    this.scene.events.on('update', this.update, this);
  }

  reset() {
    const data = Enemy.generateAttributes();

    this.x = data.x;
    this.y = data.y;
    this.setFrame(`enemy${data.id}`);
    this.setAlive(true);
  }

  update() {
    if (this.active && this.x < -this.width) {
      this.setAlive(false);
      console.log('deactivate');
    }
  }

  setAlive(status) {
    // активировать/деактевировать физическое тело
    this.body.enable = status;
    // показать/скрыть текстуру
    this.setVisible(status);
    // активировать/деактивировать объект
    this.setActive(status);
  }

  move() {
    this.body.setVelocityX(this.velocity);
  }
}
