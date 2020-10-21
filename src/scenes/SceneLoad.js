import { Scene } from "phaser";
import button from "../assets/button.png";
import menuBackground from "../assets/menu-background.jpg";
import gameBackground from "../assets/space-background.jpg";
import ship from "../assets/space-ship.png";

import asteroids from "../assets/asteroids.png";
import bullets from "../assets/bullets.png";
import explosion from "../assets/exp.png";

import asteroidExplosionOGG from "../assets/asteroid-explosion.ogg";
import asteroidExplosionMP3 from "../assets/asteroid-explosion.mp3";
import backgroundMusicOGG from "../assets/ObservingTheStar.ogg";
import backgroundMusicMP3 from "../assets/ObservingTheStar.mp3";
import { CONFIG } from "../constants/config";

export class SceneLoad extends Scene {
  constructor() {
    super("SceneLoad");
  }
  preload() {
    this.progress = this.add.text(CONFIG.gameWidth / 2, CONFIG.gameHeight / 2, "Loading 0%", {
      color: "#ffffff",
      fontSize: 32,
    });
    this.progress.setOrigin(0.5, 0.5);
    this.load.on("progress", this.handleProgress, this);

    this.load.image("button", button);
    this.load.image("menu-background", menuBackground);
    this.load.image("game-background", gameBackground);
    this.load.image("ship", ship);

    this.load.spritesheet("asteroids", asteroids, { frameWidth: 125, frameHeight: 125 });
    this.load.spritesheet("bullets", bullets, { frameWidth: 39, frameHeight: 39 });
    this.load.spritesheet("explosion", explosion, { frameWidth: 64, frameHeight: 64 });

    this.load.audio("asteroid-explosion", [asteroidExplosionOGG, asteroidExplosionMP3]);
    this.load.audio("background-music", [backgroundMusicOGG, backgroundMusicMP3]);
  }
  handleProgress(value) {
    const percent = Math.floor(value * 100);
    this.progress.setText(`Loading ${percent}%`);
  }
}
