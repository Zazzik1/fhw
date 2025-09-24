import { GRAVITY, HORSE_INITIAL_POSITION, JUMP_VELOCITY } from "../constants";
import { store } from "../../redux/store";

class Horse extends Phaser.GameObjects.Sprite {
  constructor(params) {
    super(
      params.scene,
      HORSE_INITIAL_POSITION.x,
      HORSE_INITIAL_POSITION.y,
      "horse",
      params.frame,
    );
    params.scene.add.existing(this);

    // sprite
    this.setScale(3);
    this.setOrigin(0, 0.5);

    // physics
    this.scene.physics.world.enable(this);
    this.body.setGravityY(GRAVITY);
    this.body.setSize(this.width - 4, this.height - 6);
    this.body.setCollideWorldBounds(true);

    // modifiers (glasses, hair, etc.)
    this.modifiers = [];
    const mods = store.getState().modifier.activeModifiers.horse;
    mods.forEach((mod) => {
      const image = this.scene.add.image(
        mod.x,
        mod.y,
        `modifier_horse_${mod.id}`,
      );
      image.setScale(3);
      image.setOrigin(0, 0.5);
      image.modifierType = mod.type;
      image.renderingOrder = mod.renderingOrder;
      image.isAffectedByGravity = mod.isAffectedByGravity;
      image.baseY = mod.y;
      this.modifiers.push(image);
    });
    this.modifiers.sort((a, b) => a.renderingOrder - b.renderingOrder);

    this.visualContainer = this.scene.add.container(this.x, this.y);
    this.visualContainer.add(this.modifiers);
    // make sure all modifiers render above the horse:
    this.visualContainer.setDepth(100);

    this._postUpdateHandler = this._syncVisualToSprite.bind(this);
    this.scene.sys.events.on("postupdate", this._postUpdateHandler);
  }

  _syncVisualToSprite() {
    if (!this.body) {
      return;
    }

    this.visualContainer.x = this.x;
    this.visualContainer.y = this.y;
    this.visualContainer.rotation = this.rotation;

    // e.g. glasses fall slowly for fancy effect:
    this.modifiers.forEach((mod) => {
      if (!mod.isAffectedByGravity) return;

      const baseY = mod.baseY ?? 0;

      if (mod.lagY === undefined) {
        mod.lagY = baseY;
      }

      if (this.body.velocity.y < 0) {
        mod.lagY = baseY - 10;
      } else if (this.body.velocity.y > 0) {
        mod.lagY += (baseY - mod.lagY) * 0.1;
      }
      mod.y = mod.lagY;
    });
  }

  handleAngle() {
    if (this.angle < 10) {
      this.angle += 2;
      this.body.setOffset(4, this.angle * 0.3);
    }
  }

  restartPosition() {
    this.x = HORSE_INITIAL_POSITION.x;
    this.y = HORSE_INITIAL_POSITION.y;
    this.body.setVelocity(0);
  }

  jump() {
    this.body.velocity.y = JUMP_VELOCITY;
    this.scene.tweens.add({
      targets: this,
      angle: -20,
      duration: 300,
      ease: "Power0",
      yoyo: true,
    });
  }

  destroy(fromScene) {
    if (this.scene && this._postUpdateHandler) {
      this.scene.sys.events.off("postupdate", this._postUpdateHandler);
    }
    if (this.visualContainer) {
      this.visualContainer.destroy(true);
    }
    super.destroy(fromScene);
  }
}

export default Horse;
