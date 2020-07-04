import { toggleClassOnElement } from "./../../.history/src/ts/utils_20200701140937";
import { createElementAndAddClickEventListener } from "./utils";
import GameState from "./gameState";

export default function initializeButtons(gameState: GameState): void {
  createElementAndAddClickEventListener(".start-button", startButtonClick);
  createElementAndAddClickEventListener(".feed-control", feedButtonClick);
  createElementAndAddClickEventListener(
    ".environment-control",
    environmentButtonClick
  );
  createElementAndAddClickEventListener(".poop-control", poopButtonClick);

  function startButtonClick() {
    toggleClassOnElement(".game-screen", "start-menu");
    gameState.startGame();
  }

  function feedButtonClick() {
    gameState.feed();
  }

  function environmentButtonClick() {
    gameState.changeWeather();
  }

  function poopButtonClick() {
    gameState.cleanUpPoop();
  }
}
