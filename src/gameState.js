const gameState = {
  current: "INIT",
  clock: 1,
  tick() {
    this.clock++;
    console.log("clock: ", this.clock);
  },
};

export default gameState;
