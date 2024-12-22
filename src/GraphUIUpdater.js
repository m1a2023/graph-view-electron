class GraphUIUpdater extends UIUpdater {
  /**
   * Method for updating graph nodes and edges in UI
   *
   * @param {HTMLElement} nodesArea - Input element for nodes
   * @param {HTMLElement} edgesArea - Input element for edges
   * @param {HTMLElement} buttonUpdater - Button to trigger update
   * @param {string} event - Event type (e.g., 'click')
   * @param {__graph} graph - GraphView or FlowGraph
   */
  static updateNodes = (nodesArea, edgesArea, buttonUpdater, event, graph) => {
    if (!nodesArea || !edgesArea || !buttonUpdater || !event || !graph) {
      throw new Error("Argument error. Check given arguments;\n");
    }

    console.log("join in updateNodes;");

    /** updating depends on type of graph representation: GraphView or FlowGraph */
    super.update(buttonUpdater, event, () => {
      /** general variables declaration */
      let nodes, edges;

      /** main difference between flow and graph */
      if (graph instanceof GraphView) {
        /** default parsing if it is GraphView */
        edges = Parser.parseEdges(Collector.collect(edgesArea.id));
        console.log("GraphView was triggered;");
      } else if (graph instanceof FlowView) {
        /** parsing if it is FlowView */
        edges = Parser.parseFlowEdges(Collector.collect(edgesArea.id));
        console.log("FlowGraph was triggered;");
      }

      /** nodes are always general */
      nodes = Parser.parseNodes(Collector.collect(nodesArea.id));

      graph.network.setData({
        nodes: new vis.DataSet(nodes),
        edges: new vis.DataSet(edges),
      });
    });
  };

  /**
   * Method for updating edges for graph in UI
   *
   * @param {HTMLElement} edgesArea - Input element for edges
   * @param {HTMLElement} buttonUpdater - Button to trigger update
   * @param {String} event - Event type (e.g., 'click')
   * @param {__graph} graph - Vis.js network instance
   */
  static updateEdges = (edgesArea, buttonUpdater, event, graph) => {
    if (!edgesArea || !buttonUpdater || !event || !graph) {
      throw new Error("Argument error. Check given arguments;\n");
    }

    console.log("join in updateEdges;");

    super.update(buttonUpdater, event, () => {
      /** general variable declaration */
      let edges;

      /** main difference between flow and graph */
      if (graph instanceof GraphView) {
        /** default parsing if it is GraphView */
        edges = Parser.parseEdges(Collector.collect(edgesArea.id));
        console.log("GraphView was triggered;");
      } else if (graph instanceof FlowView) {
        /** parsing if it is FlowView */
        edges = Parser.parseFlowEdges(Collector.collect(edgesArea.id));
        console.log("FlowGraph was triggered;");
      }

      graph.network.setData({
        nodes: graph.network.body.data.nodes,
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
      value: network.body.data.nodes.get(nodeId).value + value,
    });
  };

  /**
   * Changes each valie in network
   *
   * @param {HTMLElement} element
   * @param {Event} event
   * @param {any} value
   * @param {Netowrk} network
   * @param {Number} delay
   */
  static changeEachValueIn = async (element, event, value, network, delay) => {
    GraphUIUpdater.update(element, event, async () => {
      const _nodes = network.body.data.nodes.get();

      for (const node of _nodes) {
        GraphUIUpdater.changeValueFor(node.id, value, network);

        network.redraw();

        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    });
  };
}
