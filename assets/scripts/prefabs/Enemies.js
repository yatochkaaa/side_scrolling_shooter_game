class Enemies extends Phaser.Physics.Arcade.Group {
  constructor(scene) {
    super(scene.physics.world, scene);
    this.scene = scene;
    this.fires = new Fires(this.scene);
    this.wave = 1;
    this.waves = {
      "1": 10,
      "2": 15,
      "3": 20,
      "4": 25,
      "5": 30
    }
    this.countKilled = 0;
    this.createTimer();
  }

  onEnemyKilled() {
    ++this.countKilled;

    if (this.countKilled >= this.waves[this.wave]) {
      ++this.wave;

      if (this.wave > Object.keys(this.waves).length) {
        this.scene.events.emit('enemies-killed');
      } else {
        this.countKilled = 0;
        this.scene.events.emit('show-next-wave');
        this.createTimer();
      }
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
      repeat: this.waves[this.wave] - 1
    });
  }
}