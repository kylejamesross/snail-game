export function modFox(state) {
  document.querySelector(".fox").className = `fox fox-${state}`;
}

export function modeScene(state) {
  document.querySelector(".game").className = `game ${state}`;
}

export function togglePoopBag(show) {
  document.querySelector(".poop-bag").classList.toggle("hidden", !show);
}
