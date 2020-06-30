import { modSnail, modScene, togglePoopBag, writeModal } from "./ui";
import {
  RAIN_CHANCE,
  SCENES,
  DAY_LENGTH,
  NIGHT_LENGTH,
  getNextDieTime,
  getNextHungerTime,
  getNextPoopTime,
} from "./constants";
import GameState from "./gameStates";

const gameState = {
  current: GameState.INIT,
  clock: 1,
  wakeTime: -1,
  sleepTime: -1,
  hungryTime: -1,
  dieTime: -1,
  poopTime: -1,
  timeToStartCelebrating: -1,
  timeToEndCelebrating: -1,
  scene: 0,
  tick() {
    this.clock++;

    switch (this.clock) {
      case this.wakeTime:
        this.wake();
        break;
      case this.hungryTime:
        this.getHungry();
        break;
      case this.dieTime:
        this.die();
        break;
      case this.timeToStartCelebrating:
        this.startCelebrating();
        break;
      case this.timeToEndCelebrating:
        this.endCelebrating();
        break;
      case this.poopTime:
        this.poop();
    }
  },
  startGame() {
    this.current = GameState.HATCHING;
    this.wakeTime = this.clock + 3;
    modSnail("hatching");
    modScene("day");
    writeModal();
  },
  wake() {
    this.current = GameState.IDLING;
    this.wakeTime = -1;
    modSnail("idling");
    this.scene = Math.random() > RAIN_CHANCE ? 0 : 1;
    modScene(SCENES[this.scene]);
    this.determineFoxState();
    this.sleepTime = this.clock + DAY_LENGTH;
    this.hungryTime = getNextHungerTime(this.clock);
  },
  handleUserAction(icon: string) {
    if (
      [
        GameState.SLEEP,
        GameState.FEEDING,
        GameState.CELEBRATING,
        GameState.HATCHING,
      ].includes(this.current)
    ) {
      return;
    }

    if (this.current === GameState.INIT || this.current === GameState.DEAD) {
      this.startGame();
      return;
    }

    switch (icon) {
      case "weather":
        this.changeWeather();
        break;
      case "poop":
        this.cleanUpPoop();
        break;
      case "fish":
        this.feed();
        break;
      default:
        break;
    }
  },
  changeWeather() {
    this.scene = (this.scene + 1) % SCENES.length;
    modScene(SCENES[this.scene]);
    this.determineFoxState();
  },
  cleanUpPoop() {
    if (this.current === GameState.POOPING) {
      this.dieTime = -1;
      togglePoopBag(true);
      this.startCelebrating();
      this.hungryTime = getNextHungerTime(this.clock);
    }
  },
  poop() {
    this.current = GameState.POOPING;
    this.poopTime = -1;
    this.dieTime = getNextDieTime(this.clock);
    modSnail("pooping");
  },
  sleep() {
    this.current = GameState.SLEEP;
    modSnail("sleep");
    modScene("night");
    this.clearTimes();
    this.wakeTime = this.clock + NIGHT_LENGTH;
  },
  getHungry() {
    this.current = GameState.HUNGRY;
    this.dieTime = getNextDieTime(this.clock);
    this.hungryTime = -1;
    modSnail("hungry");
  },
  die() {
    this.current = GameState.DEAD;
    modScene("dead");
    modSnail("dead");
    this.clearTimes();
    writeModal("The fox died :( <br/> Press the middle button to start");
  },
  startCelebrating() {
    this.current = GameState.CELEBRATING;
    modSnail("celebrate");
    this.timeToStartCelebrating = -1;
    this.timeToEndCelebrating = this.clock + 2;
  },
  endCelebrating() {
    this.timeToStartCelebrating = -1;
    this.current = GameState.IDLING;
    this.determineFoxState();
    togglePoopBag(false);
  },
  determineFoxState() {
    if (this.current === GameState.IDLING) {
      if (SCENES[this.scene] === "rain") {
        modSnail("rain");
      } else {
        modSnail("idling");
      }
    }
  },
  feed() {
    if (this.current !== GameState.HUNGRY) {
      return;
    }
    this.current = GameState.FEEDING;
    this.dieTime = -1;
    this.poopTime = getNextPoopTime(this.clock);
    modSnail("eating");
    this.timeToStartCelebrating = this.clock + 2;
  },
  clearTimes() {
    this.wakeTime = -1;
    this.sleepTime = -1;
    this.hungryTime = -1;
    this.dieTime = -1;
    this.poopTime = -1;
    this.timeToStartCelebrating = -1;
    this.timeToEndCelebrating = -1;
  },
};

export const handleUserAction = gameState.handleUserAction.bind(gameState);

export default gameState;
