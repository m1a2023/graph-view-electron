class GraphUIUpdater extends UIUpdater {
  /**
   * Method for updating graph nodes and edges in UI
   *
   * @param {HTMLElement} element
   * @param {Event} event
   * @param {Network} network
   */
  static updateNodes = (element, event, network) => {
    super.update(element, event, () => {
      const nodes = Parser.parseNodes(Collector.collect("graph-input-data"));
      const edges = Parser.parseEdges(Collector.collect("graph-edges-data"));

      network.setData({
        nodes: new vis.DataSet(nodes),
        edges: new vis.DataSet(edges),
      });

      console.log(nodes);
    });
  };

  /**
   * Method for updating edges for graph in UI
   *
   * @param {HTMLElement} element
   * @param {Event} event
   * @param {Network} network
   */
  static updateEdges = (element, event, network) => {
    super.update(element, event, () => {
      const edges = Parser.parseEdges(Collector.collect("graph-edges-data"));

      network.setData({
        nodes: network.body.data.nodes,
        edges: new vis.DataSet(edges),
      });
    });
  };

  /**
   * Change value in node in network
   *
   * @param {Number} nodeId
   * @param {Number} value
   * @param {Network} network
   */
  static changeValueFor = (nodeId, value, network) => {
    network.body.data.nodes.update({
      id: nodeId,
      value: value,
    });
  };

  static changeEachValueIn = async (element, event, value, network, delay) => {
    GraphUIUpdater.update(element, event, async () => {
      const _nodes = network.body.data.nodes.get();

      for (var node of _nodes) {
        GraphUIUpdater.changeValueFor(node.id, value, network);

        network.redraw();

        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    });
  };
}
