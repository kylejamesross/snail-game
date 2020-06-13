export function modFox(state: string) {
  const element = document.querySelector<HTMLElement>(".fox");
  if (element) {
    element.className = `fox fox-${state}`;
  }
}

export function modScene(state: string) {
  const element = document.querySelector<HTMLElement>(".game");
  if (element) {
    element.className = `game ${state}`;
  }
}

export function togglePoopBag(show: boolean) {
  const element = document.querySelector<HTMLElement>(".poop-bag");
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
