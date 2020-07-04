import { RAIN_CHANCE, SCENES } from "./constants";
import { toggleClassOnElement } from "./utils";

export function modSnail(state: string) {
  const element = document.querySelector<HTMLElement>(".snail");
  if (element) {
    element.className = `snail ${state}`;
  }
}

export function modScene(state: string) {
  const element = document.querySelector(".game-screen");

  if (element) {
    const classList = element.classList;
    const existingScene = [...classList].find((className: string) =>
      className.startsWith("scene-")
    );
    if (existingScene) {
      classList.toggle(existingScene, false);
    }
    classList.toggle(`scene-${state}`, true);
  }
}

export function modEnvironmentButton(state: string) {
  const inverted = state === "raining" ? "day" : "raining";
  toggleClassOnElement(".environment-control", inverted, true);
  toggleClassOnElement(".environment-control", state, false);
}

export function togglePoopPile(show: boolean) {
  const element = document.querySelector<HTMLElement>(".poop-pile");
  if (element) {
    element.classList.toggle("hidden", !show);
  }
}
