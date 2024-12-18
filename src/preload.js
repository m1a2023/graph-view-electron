window.addEventListener("DOMContentLoaded", () => {
  /**
   * these values is used to update graph
   */
  let nodes = document.getElementById("graph-input-data");
  let edges = document.getElementById("graph-edges-data");

  /**
   * graph view
   */
  const graph = new GraphView(
    _graph_container.__default_graph_data,
    _graph_container.__default_graph_options,
    _graph_container.__default_name
  );

  let network = graph.get();

  /**
   * updating graph
   */
  GraphUIUpdater.updateNodes(nodes, "dblclick", network);
  GraphUIUpdater.updateEdges(edges, "dblclick", network);

  document.getElementById("bfs-button").addEventListener("click", () => {
    const startNodeId = 1;
    bfs(startNodeId, network);
  });

  document.getElementById("dfs-button").addEventListener("click", () => {
    const startNodeId = 1;
    startDFS(startNodeId, network);
  });

  document.getElementById("max-flow-button").addEventListener("click", () => {
    const sourceNode = 1; // Define your source node here
    const sinkNode = 5; // Define your sink node here
    const maxFlow = GraphFlow.findMaxFlow(sourceNode, sinkNode, network);
    alert(`Maximum Flow: ${maxFlow}`);
  });
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
