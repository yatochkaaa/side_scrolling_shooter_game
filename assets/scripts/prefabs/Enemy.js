class Enemy extends MovableObject {
  static generateAttributes() {
    const x = config.width + 200;
    const y = Phaser.Math.Between(100, config.height - 100);

    return {x, y, frame: `enemy${Phaser.Math.Between(1, 4)}`};
  }

  static generate(scene) {
    const data = Enemy.generateAttributes();

    return new Enemy({
      scene,
      x: data.x,
      y: data.y,
      texture: 'enemy',
      frame: data.frame,
      velocity: -500
    });
  }

  reset() {
    const data = Enemy.generateAttributes();
    super.reset(data.x, data.y);
    this.setFrame(data.frame);
  }

  isDead() {
    return this.active && this.x < -this.width;
  }
}
