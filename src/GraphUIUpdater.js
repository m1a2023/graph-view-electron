class GraphUIUpdater extends UIUpdater {
  /**
   * Method for updating graph nodes and edges in UI
   *
   * @param {HTMLElement} element
   * @param {Event} event
   * @param {Network} network
   */
  static nodes = (element, event, network) => {
    super.update(element, event, () => {
      const nodes = Parser.parseNodes(Collector.collect("graph-input-data"));
      const edges = Parser.parseEdges(Collector.collect("graph-edges-data"));

      network.setData({
        nodes: new vis.DataSet(nodes),
        edges: new vis.DataSet(edges),
      });
    });
  };

  /**
   * Method for updating edges for graph in UI
   *
   * @param {HTMLElement} element
   * @param {Event} event
   * @param {Network} network
   */
  static edges = (element, event, network) => {
    super.update(element, event, () => {
      const edges = Parser.parseEdges(Collector.collect("graph-edges-data"));

      network.setData({
        nodes: network.body.data.nodes,
        edges: new vis.DataSet(edges),
      });
    });
  };
}
