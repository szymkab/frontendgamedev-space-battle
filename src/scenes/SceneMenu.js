import { Scene } from "phaser";
import { CONFIG } from "../constants/config";

export class SceneMenu extends Scene {
  constructor() {
    super("SceneMenu");
  }
  create() {
    this.input.keyboard.on(`keydown-SPACE`, this.handleSpaceClick, this);

    this.add.image(0, 0, "menu-background").setOrigin(0, 0);

    this.add
      .text(CONFIG.gameWidth / 2, 250, "Space\nBattle", {
        align: "center",
        fontSize: 100,
        color: "#fff",
      })
      .setOrigin(0.5, 0.5);

    this.add.text(CONFIG.gameWidth / 2, 400, "Press space to start a game", {
      align: "center",
      fontSize: 33,
      color: "#fff"
    }).setOrigin(0.5, 0.5);
  }
  handleSpaceClick() {
    this.scene.start("SceneGame");
  }
}
