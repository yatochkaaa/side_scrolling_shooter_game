class Fire extends Phaser.GameObjects.Sprite {
  constructor(data) {
    super(data.scene, data.x, data.y, data.texture);
    this.init(data);
  }

  static generate(scene, source) {
    const data = {
      scene,
      x: source.x + source.width / 2,
      y: source.y,
      texture: 'fire',
      velocity: 750
    }

    return new Fire(data);
  }

  init(data) {
    this.scene.add.existing(this);
    this.velocity = data.velocity;
    this.scene.events.on('update', this.update, this);
  }

  reset(source) {
    this.x = source.x + source.width / 2;
    this.y = source.y;
    this.setAlive(true);
  }

  update() {
    if (this.active && (this.x > this.width + config.width || this.x < -this.width)) {
      this.setAlive(false);
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
