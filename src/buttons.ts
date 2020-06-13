import { ICONS } from "./constants";

const toggleHighlighted = (icon: number, show: boolean) => {
  const element = document.querySelector<HTMLElement>(`.${ICONS[icon]}-icon`);
  if (element) {
    const classList = element.classList;
    classList.toggle("highlighted", show);
  }
};

export default function initButtons(handleUserAction: (icon: string) => void) {
  let selectedIcon = 0;

  function buttonClick({ target }: Event) {
    if (target instanceof Element) {
      if (target.classList.contains("left-btn")) {
        toggleHighlighted(selectedIcon, false);
        selectedIcon = (2 + selectedIcon) % ICONS.length;
        toggleHighlighted(selectedIcon, true);
      } else if (target.classList.contains("right-btn")) {
        toggleHighlighted(selectedIcon, false);
        selectedIcon = (1 + selectedIcon) % ICONS.length;
        toggleHighlighted(selectedIcon, true);
      } else {
        handleUserAction(ICONS[selectedIcon]);
      }
    }
  }

  const buttonElement = document!.querySelector(".buttons");

  if (buttonElement) {
    buttonElement.addEventListener("click", buttonClick);
  }
}
