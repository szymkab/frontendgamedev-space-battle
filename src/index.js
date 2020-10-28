import Phaser from "phaser";
import { CONFIG } from "./constants/config";
import { SceneGame } from "./scenes/SceneGame";
import { SceneLoad } from "./scenes/SceneLoad";

export const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: CONFIG.gameWidth,
  height: CONFIG.gameHeight,
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
    },
  },
  scene: [SceneLoad, SceneGame],
};

const game = new Phaser.Game(config);
