import Phaser from "phaser";
import { CONFIG } from "./constants/config";

export const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: CONFIG.gameWidth,
  height: CONFIG.gameHeight,
  scene: [],
};

const game = new Phaser.Game(config);
