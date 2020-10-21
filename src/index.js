import Phaser from "phaser";
import { CONFIG } from "./constants/config";
import { SceneLoad } from "./scenes/SceneLoad";

export const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: CONFIG.gameWidth,
  height: CONFIG.gameHeight,
  scene: [SceneLoad],
};

const game = new Phaser.Game(config);
