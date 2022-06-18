export default function temporaryFocus(element: HTMLElement) {
  element.tabIndex = -1;
  element.focus();
  element.removeAttribute('tabindex');
}
