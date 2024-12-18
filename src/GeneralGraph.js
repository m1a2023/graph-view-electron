class GeneralGraph {
  /**
   *
   * @param {Map<Number, Array>} map<number, array>
   */
  constructor(map = new Map()) {
    this.map = map;
  }

  /**
   * Add element to array in map
   *
   * @param {Number} idFrom
   * @param {Number} idTo
   * @returns void
   */
  add(idFrom, idTo) {
    if (!this.map.has(idFrom)) {
      this.map.set(idFrom, [idTo]);
    } else {
      this.map.get(idFrom).push(idTo);
    }
  }

  /**
   * Delete item from array in map
   *
   * @param {Number} idFrom
   * @param {Number} idTo
   * @returns void
   */
  delete = (idFrom, idTo) => {
    if (this.map.has(idFrom)) {
      const index = this.map.get(idFrom).indexOf(idTo);
      if (index > -1) {
        this.map.get(idFrom).splice(index, 1);
      }
    }
  };

  clear = () => {
    this.map.clear();
  };
  /**
   *
   * @param {Map<Number, Array>} map input map
   */
  update = (edges) => {
    this.clear();

    edges.forEach(({ from, to }) => {
      this.add(from, to);
    });
  };

  /**
   *
   * @param {Number} idFrom
   * @param {Number} idTo
   * @returns {Boolean} if map has edge
   */
  hasEdge = (idFrom, idTo) => {
    return this.map.has(idFrom) && this.map.get(idFrom).includes(idTo);
  };

  /**
   *
   * @param {*} node
   * @returns
   */
  getNeighbors = (node) => {
    return this.map.has(node) ? this.map.get(node) : [];
  };

  /**
   *
   * @returns map<id, arr_id>
   */
  get = () => {
    return this.map;
  };
}
