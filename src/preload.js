window.addEventListener("DOMContentLoaded", () => {
  /** these values is used to update graph */
  let nodes = document.getElementById("graph-input-data");
  /** these values is used to update graph */
  let edges = document.getElementById("graph-edges-data");
  /** button for updating nodes in graph */
  let nodesUpdateButton = document.getElementById("update-nodes-button");
  /** button for updating edges in graph */
  let edgesUpdateButton = document.getElementById("update-edges-button");

  /** graph view */
  // let graph = new GraphView(
  //   _graph_container.__default_graph_data,
  //   _graph_container.__default_graph_options
  // );

  /** graph flow */
  let graph = new FlowView(
    _flow_container.__default_flow_data,
    _flow_container.__default_flow_options
  );

  // console.log(graph.data);
  /** updating graph nodes */
  GraphUIUpdater.updateNodes(nodes, edges, nodesUpdateButton, "click", graph);
  /** updating graph edges */
  GraphUIUpdater.updateEdges(edges, edgesUpdateButton, "click", graph);

  /** bfs function */
  document.getElementById("bfs-button").addEventListener("click", () => {
    const startNodeId = 1;
    bfs(startNodeId, graph.get());
  });

  /** dfs function */
  document.getElementById("dfs-button").addEventListener("click", () => {
    const startNodeId = 1;
    startDFS(startNodeId, graph.get());
  });

  document
    .getElementById("max-flow-button")
    .addEventListener("click", async () => {});
});

const bfs = async (startNodeId, network) => {
  let visited = new Set();
  let queue = [startNodeId];

  const updateNode = (nodeId, value) => {
    GraphUIUpdater.changeValueFor(nodeId, value, network);
    network.redraw();
  };

  while (queue.length > 0) {
    const nodeId = queue.shift();
    if (!visited.has(nodeId)) {
      visited.add(nodeId);
      updateNode(nodeId, 20);

      const neighbors = network.getConnectedNodes(nodeId);
      for (const neighbor of neighbors) {
        if (!visited.has(neighbor)) {
          queue.push(neighbor);
        }
      }

      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  }
};

const dfs = async (nodeId, visited, network) => {
  if (visited.has(nodeId)) return;

  visited.add(nodeId);
  GraphUIUpdater.changeValueFor(nodeId, 20, network);
  network.redraw();

  const neighbors = network.getConnectedNodes(nodeId);
  for (const neighbor of neighbors) {
    if (!visited.has(neighbor)) {
      await dfs(neighbor, visited, network);
    }

    await new Promise((resolve) => setTimeout(resolve, 500));
  }
};

const startDFS = (startNodeId, network) => {
  let visited = new Set();
  dfs(startNodeId, visited, network);
};
