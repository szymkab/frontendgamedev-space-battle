import Phaser from "phaser";
import { CONFIG } from "./constants/config";
import { SceneGame } from "./scenes/SceneGame";
import { SceneGameOver } from "./scenes/SceneGameOver";
import { SceneLoad } from "./scenes/SceneLoad";
import { SceneMenu } from "./scenes/SceneMenu";

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
  scene: [SceneLoad, SceneGame, SceneMenu, SceneGameOver],
};

const game = new Phaser.Game(config);
