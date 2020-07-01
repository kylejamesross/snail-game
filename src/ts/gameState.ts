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
import GameStates from "./GameStates";

class GameState {
  private current: GameStates;

  private clock: number;

  private sleepTime: number;

  private hungryTime: number;

  private dieTime: number;

  private poopTime: number;

  private timeToStartCelebrating: number;

  private timeToEndCelebrating: number;

  private scene: number;

  constructor() {
    this.current = GameStates.INIT;
    this.clock = 1;
    this.sleepTime = -1;
    this.hungryTime = -1;
    this.dieTime = -1;
    this.poopTime = -1;
    this.timeToStartCelebrating = -1;
    this.timeToEndCelebrating = -1;
    this.scene = 0;
  }

  public clearTimes() {
    this.sleepTime = -1;
    this.hungryTime = -1;
    this.dieTime = -1;
    this.poopTime = -1;
    this.timeToStartCelebrating = -1;
    this.timeToEndCelebrating = -1;
  }

  public startGame() {
    modScene("day");
    writeModal();

    this.current = GameStates.IDLING;
    modSnail("idling");
    this.scene = Math.random() > RAIN_CHANCE ? 0 : 1;
    modScene(SCENES[this.scene]);
    this.determineFoxState();
    this.sleepTime = this.clock + DAY_LENGTH;
    this.hungryTime = getNextHungerTime(this.clock);
  }

  public tick() {
    this.clock++;

    switch (this.clock) {
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
  }

  public handleUserAction(icon: string) {
    if (
      [
        GameStates.SLEEP,
        GameStates.FEEDING,
        GameStates.CELEBRATING,
        GameStates.HATCHING,
      ].includes(this.current)
    ) {
      return;
    }

    if (this.current === GameStates.INIT || this.current === GameStates.DEAD) {
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
  }

  public changeWeather() {
    this.scene = (this.scene + 1) % SCENES.length;
    modScene(SCENES[this.scene]);
    this.determineFoxState();
  }
  public cleanUpPoop() {
    if (this.current === GameStates.POOPING) {
      this.dieTime = -1;
      togglePoopBag(true);
      this.startCelebrating();
      this.hungryTime = getNextHungerTime(this.clock);
    }
  }
  public poop() {
    this.current = GameStates.POOPING;
    this.poopTime = -1;
    this.dieTime = getNextDieTime(this.clock);
    modSnail("pooping");
  }
  public sleep() {
    this.current = GameStates.SLEEP;
    modSnail("sleep");
    modScene("night");
    this.clearTimes();
    this.sleepTime = this.clock + NIGHT_LENGTH;
  }
  public getHungry() {
    this.current = GameStates.HUNGRY;
    this.dieTime = getNextDieTime(this.clock);
    this.hungryTime = -1;
    modSnail("hungry");
  }
  public die() {
    this.current = GameStates.DEAD;
    modScene("dead");
    modSnail("dead");
    this.clearTimes();
    writeModal("The fox died :( <br/> Press the middle button to start");
  }
  public startCelebrating() {
    this.current = GameStates.CELEBRATING;
    modSnail("celebrate");
    this.timeToStartCelebrating = -1;
    this.timeToEndCelebrating = this.clock + 2;
  }
  public endCelebrating() {
    this.timeToStartCelebrating = -1;
    this.current = GameStates.IDLING;
    this.determineFoxState();
    togglePoopBag(false);
  }
  public determineFoxState() {
    if (this.current === GameStates.IDLING) {
      if (SCENES[this.scene] === "rain") {
        modSnail("rain");
      } else {
        modSnail("idling");
      }
    }
  }
  public feed() {
    if (this.current !== GameStates.HUNGRY) {
      return;
    }
    this.current = GameStates.FEEDING;
    this.dieTime = -1;
    this.poopTime = getNextPoopTime(this.clock);
    modSnail("eating");
    this.timeToStartCelebrating = this.clock + 2;
  }
}

export default GameState;
