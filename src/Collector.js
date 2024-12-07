class Collector {
  /**
   *
   * @param {string} from
   * @returns value in element from page
   */
  static collect(from) {
    return document.getElementById(from).value;
  }
  /**
   *
   * @param {string} from
   * @returns element from page
   */
  static getElement(from) {
    return document.getElementById(from);
  }
}
