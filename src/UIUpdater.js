class UIUpdater {
  /**
   * General purpose method for updating UI
   * Add to UI element event listener apply the function
   *
   * @param {HTMLElement} element
   * @param {Event} event
   * @param {Function} func
   * @returns nothing
   */
  static update = (element, event, func) =>
    element.addEventListener(event, func);
}
