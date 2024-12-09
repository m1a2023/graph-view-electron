window.addEventListener("DOMContentLoaded", () => {
  let nodes = document.getElementById("graph-input-data");
  let edges = document.getElementById("graph-edges-data");

  let graph = new GraphView(
    new _graph_data(
      new vis.DataSet([
        { id: 1, label: "1", value: 10 },
        { id: 2, label: "2", value: 10 },
        { id: 3, label: "3", value: 10 },
      ]),
      new vis.DataSet([
        { from: 1, to: 2 },
        { from: 1, to: 3 },
      ])
    ),
    new _graph_options({
      autoResize: false,
      nodes: {
        shape: "dot",
        size: 13,
        scaling: {
          min: 10,
          max: 50,
        },
        borderWidth: 2,
        color: {
          background: "#6A1E55",
          border: "#3B1C32",
          highlight: {
            border: "#A64D79",
            background: "#D2E5FF",
          },
        },
      },
      edges: { arrows: "to" },
      physics: { enabled: true },
    }),
    _graph_container.__base_name
  );
  let network = graph.get();

  GraphUIUpdater.updateNodes(nodes, "dblclick", network);
  GraphUIUpdater.updateEdges(edges, "dblclick", network);

  /**
   * change all values in nodes
   */
  // GraphUIUpdater.changeEachValueIn(
  //   document.getElementById("graph-view-area"),
  //   "dblclick",
  //   20,
  //   network,
  //   2000
  // );

  // GraphUIUpdater.update(
  //   document.getElementById("graph-view-area"),
  //   "dblclick",
  //   async () => {
  //     const inNodes = network.body.data.nodes.get();

  //     for (var node of inNodes) {
  //       GraphUIUpdater.changeValueFor(node.id, 20, network);

  //       network.redraw();

  //       await new Promise((resolve) => setTimeout(resolve, 2000));
  //     }
  //   }
  // );
});
