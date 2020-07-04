import { modSnail, modScene, togglePoopPile, modEnvironmentButton } from "./ui";
import {
  SCENES,
  DAY_LENGTH,
  NIGHT_LENGTH,
  getNextDieTime,
  getNextHungerTime,
  getNextPoopTime,
  RAIN_CHANCE,
} from "./constants";
import GameStates from "./GameStates";
import { toggleClassOnElement } from "./utils";

class GameState {
  public current: GameStates;

  private clock: number;

  private sleepTime: number;

  private hungryTime: number;

  private dieTime: number;

  private timeToStartCelebrating: number;

  private timeToEndCelebrating: number;

  private timeToStartPooping: number;

  private timeToEndPooping: number;

  private wakeTime: number;

  private scene: number;

  constructor() {
    this.current = GameStates.INIT;
    this.clock = 1;
    this.sleepTime = -1;
    this.hungryTime = -1;
    this.dieTime = -1;
    this.timeToStartPooping = -1;
    this.timeToEndPooping = -1;
    this.timeToStartCelebrating = -1;
    this.timeToEndCelebrating = -1;
    this.wakeTime = -1;
    this.scene = 0;
  }

  public clearTimes() {
    this.sleepTime = -1;
    this.hungryTime = -1;
    this.dieTime = -1;
    this.timeToStartPooping = -1;
    this.timeToEndPooping = -1;
    this.timeToStartCelebrating = -1;
    this.timeToEndCelebrating = -1;
    this.wakeTime = -1;
  }

  public startGame() {
    this.current = GameStates.IDLING;
    this.scene = Math.random() > RAIN_CHANCE ? 0 : 1;
    modScene(SCENES[this.scene]);
    toggleClassOnElement(".feed-control", "warning", false);
    toggleClassOnElement(".poop-control", "warning", false);
    modEnvironmentButton(SCENES[this.scene]);
    modSnail("");
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
      case this.timeToStartPooping:
        this.startPooping();
        break;
      case this.timeToEndPooping:
        this.endPooping();
        break;
      case this.sleepTime:
        this.sleep();
        break;
      case this.wakeTime:
        this.wake();
        break;
    }
  }

  public changeWeather() {
    if (this.current !== GameStates.SLEEP) {
      this.scene = (this.scene + 1) % SCENES.length;
      modScene(SCENES[this.scene]);
      modEnvironmentButton(SCENES[this.scene]);
    }
  }

  public cleanUpPoop() {
    if (this.current === GameStates.POOPED) {
      this.dieTime = -1;
      togglePoopPile(false);
      this.hungryTime = getNextHungerTime(this.clock);
      toggleClassOnElement(".poop-control", "warning", false);
    }
  }

  public sleep() {
    this.current = GameStates.SLEEP;
    modSnail("sleeping");
    modScene("night");
    this.clearTimes();
    toggleClassOnElement(".feed-control", "warning", false);
    toggleClassOnElement(".poop-control", "warning", false);
    this.wakeTime = this.clock + NIGHT_LENGTH;
  }

  public wake() {
    this.startGame();
  }

  public getHungry() {
    this.current = GameStates.HUNGRY;
    this.dieTime = getNextDieTime(this.clock);
    this.hungryTime = -1;
    toggleClassOnElement(".feed-control", "warning", true);
    modSnail("hungry");
  }

  public die() {
    this.current = GameStates.DEAD;
    modSnail("dead");
    this.clearTimes();
    toggleClassOnElement(".game-screen", "death-menu");
  }

  public startPooping() {
    this.current = GameStates.POOPING;
    this.timeToStartPooping = -1;
    this.timeToEndPooping = this.clock + 4;
    modSnail("pooping");
  }

  public endPooping() {
    this.current = GameStates.POOPED;
    this.timeToEndPooping = -1;
    this.dieTime = getNextDieTime(this.clock);
    toggleClassOnElement(".poop-control", "warning", true);
    togglePoopPile(true);
    modSnail("");
  }

  public startCelebrating() {
    this.current = GameStates.CELEBRATING;
    modSnail("celebrate");
    this.timeToStartCelebrating = -1;
    this.timeToEndCelebrating = this.clock + 2;
  }

  public endCelebrating() {
    this.timeToStartCelebrating = -1;
    this.timeToStartPooping = getNextPoopTime(this.clock);
    this.current = GameStates.IDLING;
    modSnail("");
  }

  public feed() {
    if (this.current !== GameStates.HUNGRY) {
      return;
    }
    this.current = GameStates.FEEDING;
    this.dieTime = -1;
    modSnail("eating");
    toggleClassOnElement(".feed-control", "warning", false);
    this.timeToStartCelebrating = this.clock + 2;
  }
}

export default GameState;
