class UIUpdater {
  /**
   * General purpose method for updating UI
   * Add to UI element event listener apply the function
   *
   * @param {HTMLElement} element
   * @param {Event} event
   * @param {Function} callback
   * @returns void
   */
  static update = (element, event, callback) =>
    element.addEventListener(event, callback);
}
