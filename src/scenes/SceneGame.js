import { Scene } from "phaser";
import { CONFIG } from "../constants/config";

export class SceneGame extends Scene {
  constructor() {
    super("SceneGame");
  }
  create() {
    this.points = 0;
    this.hitPoints = 100;

    this.w = this.input.keyboard.addKey("W");
    this.q = this.input.keyboard.addKey("Q");
    this.e = this.input.keyboard.addKey("E");
    this.input.keyboard.on(`keydown-SPACE`, this.handleSpaceClick, this);

    this.background = this.add.image(0, 0, "game-background").setOrigin(0, 0);
    this.physics.world.setBounds(0, 0, this.background.displayWidth, this.background.displayHeight);

    this.hitPointsText = this.add.text(20, 20, `${this.hitPoints} HP`, {
      fontSize: 32,
    });
    this.hitPointsText.setScrollFactor(0);

    this.pointsText = this.add.text(CONFIG.gameWidth - 20, 20, `Points ${this.points}`, {
      fontSize: 32,
    });
    this.pointsText.setOrigin(1, 0);
    this.pointsText.setScrollFactor(0);

    this.ship = this.physics.add
      .image(this.background.displayWidth / 2, this.background.displayHeight / 2, "ship")
      .setOrigin(0.5, 0.5);
    this.ship.body.collideWorldBounds = true;

    this.cameras.main.setBounds(0, 0, this.background.displayWidth, this.background.displayHeight);
    this.cameras.main.startFollow(this.ship, true);

    this.asteroids = this.physics.add.group();
    this.createAsteroids();
    this.asteroidsInterval = setInterval(this.createAsteroids.bind(this), 10000);

    this.physics.add.collider(this.asteroids);
    this.physics.add.collider(this.asteroids, this.ship, this.handleAsteroidAndShipCollision, null, this);

    const explosionFrameNames = this.anims.generateFrameNumbers("explosion");
    this.anims.create({
      key: "boom",
      frames: [...[...explosionFrameNames].reverse(), ...explosionFrameNames],
      frameRate: 48,
      repeat: false,
    });

    const bulletFrameNames = this.anims.generateFrameNumbers("bullets");
    this.anims.create({
      key: "fire",
      frames: bulletFrameNames,
      frameRate: 5,
      repeat: false,
    });

    this.explosionSound = this.sound.add("asteroid-explosion");
  }
  handleAsteroidAndShipCollision(ship, asteroid) {
    this.hitPoints -= 10;
    this.hitPointsText.text = `${this.hitPoints} HP`;
    this.handleAsteroidDestroy(asteroid);

    if (this.hitPoints === 0) {
      clearInterval(this.asteroidsInterval);
      this.scene.start("SceneGameOver");
    }
  }
  createAsteroids() {
    for (let i = 0; i < 10; i++) {
      const x = Math.floor(Math.random() * this.background.displayWidth);
      const y = Math.floor(Math.random() * this.background.displayHeight);

      const child = this.asteroids.create(x, y, "asteroids", Math.floor(Math.random() * 5));
      child.setScale(Math.random() > 0.5 ? 0.33 : 0.66);

      let vx = Math.floor(Math.random() * 1) - 1;
      let vy = Math.floor(Math.random() * 1) - 1;

      while (vx === 0 && vy === 0) {
        vx = Math.floor(Math.random() * 1) - 1;
        vy = Math.floor(Math.random() * 1) - 1;
      }

      const speed = Math.floor(Math.random() * 200);
      child.body.setVelocity(vx * speed, vy * speed);

      child.body.setBounce(1, 1);
      child.body.collideWorldBounds = true;

      if (Math.random() > 0.66) {
        child.body.angularVelocity = 200;
      }
    }
  }
  handleSpaceClick() {
    const bullet = this.physics.add.sprite(this.ship.x, this.ship.y, "bullets", 0);
    bullet.play("fire");
    this.physics.velocityFromAngle(this.ship.angle - 90, 600, bullet.body.velocity);
    this.physics.add.collider(this.asteroids, bullet, this.handleBulletHitAsteroid, null, this);
  }
  handleBulletHitAsteroid(bullet, asteroid) {
    bullet.destroy();
    this.handleAsteroidDestroy(asteroid);
  }
  handleAsteroidDestroy(asteroid) {
    this.explosionSound.play();
    const explosion = this.add.sprite(asteroid.x, asteroid.y, "explosion");
    explosion.play("boom");
    asteroid.destroy();
    this.points += 1;
    this.pointsText.text = `Points ${this.points}`;
  }
  update() {
    this.ship.body.velocity.x = 0;
    this.ship.body.velocity.y = 0;
    this.ship.body.angularVelocity = 0;

    if (this.q.isDown) {
      this.ship.body.angularVelocity = -250;
    } else if (this.e.isDown) {
      this.ship.body.angularVelocity = 250;
    }

    if (this.w.isDown) {
      this.physics.velocityFromAngle(this.ship.angle - 90, 300, this.ship.body.velocity);
    }
  }
}
