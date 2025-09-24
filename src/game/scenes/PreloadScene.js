import Phaser from "phaser";

import WebFontFile from "../WebFontFile";

import { MENU_FONT } from "../constants";
import { store } from "../../redux/store";
class PreloadScene extends Phaser.Scene {
  constructor() {
    super("PreloadScene");
  }

  preload() {
    this.load.image("trippyBg", "assets/trippyBgHand.png");
    this.load.image("horse", "assets/horse.png");
    this.load.image("finger", "assets/finger.png");

    store.getState().modifier.activeModifiers.horse.forEach((mod) => {
      this.load.image(`modifier_horse_${mod.id}`, `assets/${mod.icon}`);
    });

    this.load.addFile(new WebFontFile(this.load, MENU_FONT));
  }

  create() {
    this.scene.start("MenuScene");
  }
}

export default PreloadScene;
