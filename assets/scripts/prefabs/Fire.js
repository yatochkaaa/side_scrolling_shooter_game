class Fire extends MovableObject {
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

  isDead() {
    return this.x > this.width + config.width || this.x < -this.width;
  }
}
