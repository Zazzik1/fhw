export type HorseModifier = {
  /**
   * An unique identifier
   */
  id: number;
  name: string;
  icon: string;
  /**
   * Modifiers with larger values of `renderingOrder` are rendered on top.
   * Useful for example when one wants to make glasses always render on top of hair.
   * e.g. A: 22, B: 88, C: 33 -> B renders on top, then C, and A is on the bottom
   */
  renderingOrder: number;
  isAffectedByGravity: boolean;
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

export type OptionalModifiers =
  | "scaleInStore"
  | "height"
  | "width"
  | "x"
  | "y"
  | "renderingOrder"
  | "isAffectedByGravity";

export type DefaultModifiers = Pick<HorseModifier, OptionalModifiers>;
export type RequiredModifiers = Omit<HorseModifier, OptionalModifiers>;
