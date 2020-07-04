import {
  modSnail,
  modScene,
  togglePoopPile,
  writeModal,
  modRandomScene,
} from "./ui";
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

  private timeToStartCelebrating: number;

  private timeToEndCelebrating: number;

  private timeToStartPooping: number;

  private timeToEndPooping: number;

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
  }

  public startGame() {
    this.current = GameStates.IDLING;
    modRandomScene();
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
    }
  }

  public changeWeather() {
    this.scene = (this.scene + 1) % SCENES.length;
    modScene(SCENES[this.scene]);
  }
  public cleanUpPoop() {
    if (this.current === GameStates.POOPED) {
      this.dieTime = -1;
      togglePoopPile(false);
      this.hungryTime = getNextHungerTime(this.clock);
    }
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
    this.timeToStartCelebrating = this.clock + 2;
  }
}

export default GameState;
