import { DefaultModifiers, HorseModifier, RequiredModifiers } from "./types";

const defaultConfig: Readonly<DefaultModifiers> = {
  width: 24,
  height: 24,
  x: 0,
  y: 0,
  scaleInStore: 3,
  renderingOrder: 100,
  isAffectedByGravity: false,
};

function createHorseModifier(
  config: Partial<DefaultModifiers> & RequiredModifiers,
) {
  return {
    ...defaultConfig,
    ...config,
  };
}

const horseModifiers: HorseModifier[] = [
  createHorseModifier({
    id: 1,
    name: "Okulary przeciwsłoneczne",
    icon: "sunglasses.png",
    renderingOrder: 300,
    isAffectedByGravity: true,
    cost: 5,
  }),
  createHorseModifier({
    id: 2,
    name: "Złoty kij",
    icon: "golden_stick.png",
    cost: 20,
  }),
  createHorseModifier({
    id: 3,
    name: "???",
    icon: "bloody_hair.png",
    cost: 40,
  }),
];

export default horseModifiers;
