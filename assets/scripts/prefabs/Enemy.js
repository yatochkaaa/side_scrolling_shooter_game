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
    const points = {
      "1": 1,
      "2": 1,
      "3": 2,
      "4": 3
    }

    return {
      x,
      y,
      frame: `enemy${id}`,
      lifes: lifes[id],
      points: points[id]
    };
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
      points: data.points,
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
    this.points = data.points;
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
    this.fires.createFire(this);
  }

  reset() {
    const data = Enemy.generateAttributes();
    super.reset(data.x, data.y);
    this.setFrame(data.frame);
    this.lifes = data.lifes;
    this.points = data.points;
  }

  isDead() {
    return this.active && this.x < -this.width;
  }
}
