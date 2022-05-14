class MovableObject extends Phaser.GameObjects.Sprite {
  constructor(data) {
    super(data.scene, data.x, data.y, data.texture, data.frame);
    this.init(data);
  }

  init(data) {
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.body.enable = true;
    this.velocity = data.velocity;
    this.lifes = data.lifes;
    this.scene.events.on('update', this.update, this);
  }

  update() {
    if (this.active && this.isDead()) {
      this.setAlive(false);
    }
  }

  reset(x, y) {
    this.x = x;
    this.y = y;
    this.setAlive(true);
  }

  setAlive(status) {
    // активировать/деактевировать физическое тело
    this.body.enable = status;
    // показать/скрыть текстуру
    this.setVisible(status);
    // активировать/деактивировать объект
    this.setActive(status);

    if (this.timer) {
      this.timer.paused = !status;
    }

    if (!status) {
      this.emit('killed');
    }
  }

  move() {
    this.body.setVelocityX(this.velocity);
  }

  isDead() {
    return false;
  }
}