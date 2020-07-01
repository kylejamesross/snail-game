import { TICK_RATE } from "./constants";
import initButtons from "./buttons";
import GameState from "./gameState";

(async function initialize() {
  const gameState = new GameState();
  initButtons(gameState);

  let nextTimeToTick = Date.now();

  function nextAnimationFrame() {
    const now = Date.now();
    if (nextTimeToTick <= now) {
      gameState.tick();
      nextTimeToTick = now + TICK_RATE;
    }

    requestAnimationFrame(nextAnimationFrame);
  }

  nextAnimationFrame();
})();
