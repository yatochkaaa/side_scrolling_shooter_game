class Enemies extends Phaser.Physics.Arcade.Group {
  constructor(scene) {
    super(scene.physics.world, scene);
    this.scene = scene;
    this.fires = new Fires(this.scene);
    this.count = 10;
    this.countKilled = 0;
    this.createTimer();
  }

  onEnemyKilled() {
    ++this.countKilled;

    if (this.countKilled >= this.count) {
      this.scene.events.emit('enemies-killed');
    }
  }

  createEnemy() {
    let enemy = this.getFirstDead();

    if (!enemy) {
      enemy = Enemy.generate(this.scene, this.fires);
      enemy.on('killed', this.onEnemyKilled, this);
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