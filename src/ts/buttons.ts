import { toggleClassOnElement } from "./../../.history/src/ts/utils_20200701140937";
import { createElementAndAddClickEventListener } from "./utils";
import GameState from "./gameState";

export default function initializeButtons(gameState: GameState): void {
  createElementAndAddClickEventListener(".start-button", startButtonClick);

  function startButtonClick() {
    toggleClassOnElement(".game-screen", "start-menu");
    gameState.startGame();
  }
}
