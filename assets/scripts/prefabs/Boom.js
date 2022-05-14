class Boom extends Phaser.GameObjects.Sprite {
  static generate(scene, x, y) {
    return new Boom({
      scene,
      x,
      y,
      texture: 'boom',
      frame: 'boom1',
      origin: { x: 0.5, y: 0.5 }
    });
  }

  constructor(target) {
    super(target.scene, target.x, target.y);
    this.scene.add.existing(this);

    const frames = this.scene.anims.generateFrameNames('boom', {
      prefix: 'boom',
      start: 1,
      end: 4
    });

    this.scene.anims.create({
      key: 'boom',
      frames,
      frameRate: 10,
      repeat: 0
    });

    this.play('boom');
    this.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => this.destroy());
  }
}
