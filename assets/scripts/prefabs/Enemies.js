class Enemies extends Phaser.Physics.Arcade.Group {
  constructor(scene) {
    super();
    this.scene = scene;
    this.count = 10;
    this.createTimer();
  }

  createEnemy() {
    let enemy = this.getFirstDead();

    if (!enemy) {
      enemy = Enemy.generate(this.scene);
      this.add(enemy);
    } else {
      enemy.reset();
    }

    enemy.move();
  }

  createTimer() {
    this.timer = this.scene.time.addEvent({
      delay: 1000,
      callback: this.createEnemy,
      callbackScope: this,
      repeat: this.count - 1
    });
  }
}