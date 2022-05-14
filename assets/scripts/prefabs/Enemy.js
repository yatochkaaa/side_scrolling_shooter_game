class Enemy extends MovableObject {
  static generateAttributes() {
    const x = config.width + 200;
    const y = Phaser.Math.Between(100, config.height - 100);
    const id = Phaser.Math.Between(1, 4);
    const lifes = {
      "1": 0,
      "2": 0,
      "3": 1,
      "4": 2
    };

    return {x, y, frame: `enemy${id}`, lifes: lifes[id]};
  }

  static generate(scene, fires) {
    const data = Enemy.generateAttributes();

    return new Enemy({
      scene,
      fires,
      x: data.x,
      y: data.y,
      texture: 'enemy',
      frame: data.frame,
      velocity: -250,
      lifes: data.lifes,
      bullet: {
        delay: 1000,
        texture: 'bullet',
        velocity: -500
      },
      origin: {
        x: 0,
        y: 0.5
      }
    });
  }

  init(data) {
    super.init(data);
    this.setOrigin(data.origin.x, data.origin.y)
    this.fires = data.fires || new Fires(this.scene);
    this.createTimer(data);
    this.bullet = data.bullet;
    this.lifes = data.lifes;
  }

  createTimer(data) {
    this.timer = this.scene.time.addEvent({
      delay: data.bullet.delay,
      callback: this.fire,
      callbackScope: this,
      loop: true
    });
  }

  fire() {
    this.fires.createFire(this)
  }

  reset() {
    const data = Enemy.generateAttributes();
    super.reset(data.x, data.y);
    this.setFrame(data.frame);
    this.lifes = data.lifes;
  }

  isDead() {
    return this.active && this.x < -this.width;
  }
}
