export const createElementAndAddClickEventListener = (
  className: string,
  listener: () => void
): void => {
  const element = document!.querySelector(className);
  if (element) {
    element.addEventListener("click", listener);
  }
};

export const toggleClassOnElement = (
  ElementClassName: string,
  classNameToToggle: string,
  force?: boolean
): void => {
  const element = document!.querySelector(ElementClassName);
  if (element) {
    const classList = element.classList;
    classList.toggle(classNameToToggle, force);
  }
};
