import { RAIN_CHANCE, SCENES } from "./constants";

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

export function modRandomScene() {
  const scene = Math.random() > RAIN_CHANCE ? 0 : 1;
  modScene(SCENES[scene]);
}

export function togglePoopPile(show: boolean) {
  const element = document.querySelector<HTMLElement>(".poop-pile");
  if (element) {
    element.classList.toggle("hidden", !show);
  }
}

export function writeModal(text = "") {
  const element = document.querySelector<HTMLElement>(".modal");
  if (element) {
    element.innerHTML = `<div class="modal-inner">${text}</div>`;
  }
}
