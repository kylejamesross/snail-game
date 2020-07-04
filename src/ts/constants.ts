export const TICK_RATE = 3000;
export const ICONS = ["fish", "poop", "weather"];
export const RAIN_CHANCE = 0.2;
export const SCENES = ["day", "raining"];
export const DAY_LENGTH = 10;
export const NIGHT_LENGTH = 3;

export const getNextHungerTime = (clock: number): number =>
  Math.floor(Math.random() * 3) + 1 + clock;

export const getNextDieTime = (clock: number): number =>
  Math.floor(Math.random() * 2) + 300 + clock;

export const getNextPoopTime = (clock: number): number =>
  Math.floor(Math.random() * 3) + 1 + clock;
