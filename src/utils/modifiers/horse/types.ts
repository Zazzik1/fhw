export type ModifierType = "glasses" | "stick" | "hair";

export type HorseModifier = {
  /**
   * An unique identifier
   */
  id: number;
  name: string;
  type: ModifierType;
  icon: string;
  /**
   * A minimal score needed to use this product.
   */
  cost: number;
  scaleInStore: number;
  /**
   * Modifier width in px.
   */
  width: number;
  /**
   * Modifier height in px.
   */
  height: number;
  /**
   * Relative `x` position on horse.
   */
  x: number;
  /**
   * Relative `y` position on horse.
   */
  y: number;
};
