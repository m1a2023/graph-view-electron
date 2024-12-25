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
  var graph; //= new GraphView(
  //   _graph_container.__default_graph_data,
  //   _graph_container.__default_graph_options
  // );
  let innerShow = [];
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

  /** maximum flow button */
  document.getElementById("max-flow-button").addEventListener("click", () => {
    if (edges.value) {
      try {
        const textData = edges.value
          .split(/\n+/)
          .filter((line) => line.trim().indexOf("$") > -1)
          .map((line) => {
            const match = line.trim().match(/^\$:(\d+)->(\d+)$/);
            if (!match) {
              throw new Error(`Invalid input line: ${line}`);
            }
            const [_, source, sink] = match;
            return { source: Number(source), sink: Number(sink) };
          });

        if (!textData.length) {
          alert(
            `There is not any expression. In new line of "Edges" input block enter expression: \`$:X->Y\`, where X is source node, Y is sink node`
          );
          return;
        }

        const { source, sink } = textData[0];

        console.log("__flow_inputed_values: \n", textData);
        const maxFlow = fordFulkerson(
          graph.network.body.data.edges.get(),
          source,
          sink
        );

        alert(`Maximum flow is ${maxFlow}`);
      } catch (e) {
        console.error(e.message);
      }
    } else {
      alert("There is no any value in `Edge` block");
    }
  });

  /** minimum path button */
  document.getElementById("min-path-button").addEventListener("click", () => {
    if (edges.value) {
      try {
        const textData = edges.value
          .split(/\n+/)
          .filter((line) => line.trim().indexOf("/") > -1)
          .map((line) => {
            const match = line.trim().match(/^\/\/:(\d+)->(\d+)$/);
            if (!match) {
              throw new Error(`Invalid input line: ${line}`);
            }
            const [_, source, sink] = match;
            return { source: Number(source), sink: Number(sink) };
          });

        const { source, sink } = textData[0];

        console.log(`Finding minimum path from ${source} to ${sink}`);

        const minPath = dijkstra(
          graph.network.body.data.edges.get(),
          source,
          sink
        );

        if (minPath === Infinity) {
          alert("No path exists between the given nodes.");
        } else {
          alert(`Minimum path is distance: ${minPath.distance}`);
        }
      } catch (e) {
        console.error(e.message);
      }
    } else {
      alert("There is no value in the Edge block.");
    }
  });

  /** build span tree button */
  document
    .getElementById("spanning-tree-button")
    .addEventListener("click", () => {});

  /** */
  nodesUpdateButton.addEventListener("click", () => {
    //if line has one value => GraphView
    //else => SpaningTree
    let isUpdated = false;

    nodes.value.split("\n").some((line) => {
      if (
        line.split(/[\s,]+/).filter((element) => element.trim() != "").length
      ) {
        /**
         * graph = new SpaningTree(...);
         */

        return false; //alongside break here
      } else {
        graph = new GraphView(
          new _graph_data(
            new vis.DataSet(Parser.parseNodes(nodes.value)),
            new vis.DataSet(Parser.parseEdges(edges.value))
          ),
          _graph_container.__default_graph_options
        );

        // edgesUpdateButton.click();
        console.log("graph view succeed!");
        isUpdated = true;
        return true; //alongside break here
      }
    });

    /** updating graph nodes */
    if (isUpdated) {
      GraphUIUpdater.updateNodes(
        nodes,
        edges,
        nodesUpdateButton,
        "click",
        graph
      );
      isUpdated = false;
    }
  });

  edgesUpdateButton.addEventListener("click", () => {
    //if line has one value => GraphView
    //else => FlowGraph
    let isUpdated = false;

    edges.value.split("\n").some((line) => {
      let len = line
        .split(/[\s,]+/)
        .filter((element) => element.trim() != "").length;

      /** debug */
      console.log(`Length of edge line: ${len}`);

      if (len == 3) {
        graph = new FlowView(
          new _graph_data(
            new vis.DataSet(Parser.parseNodes(nodes.value)),
            new vis.DataSet(Parser.parseFlowEdges(edges.value))
          ),
          _flow_container.__default_flow_options
        );

        console.log("flow view succeed!");
        isUpdated = true;
        return false;
      } else if (len == 2) {
        graph = new GraphView(
          new _graph_data(
            new vis.DataSet(Parser.parseNodes(nodes.value)),
            new vis.DataSet(Parser.parseEdges(edges.value))
          ),
          _graph_container.__default_graph_options
        );

        console.log("graph view succeed!");
        isUpdated = true;
        return true; //alongside break here
      }
    });

    /** updating graph edges */
    if (isUpdated) {
      GraphUIUpdater.updateEdges(edges, edgesUpdateButton, "click", graph);
      isUpdated = false;
    }
  });
});

const bfs = async (startNodeId, network, infoFieldId = "graph-system-info") => {
  const infoField = document.getElementById(infoFieldId);

  const logInfo = (message) => {
    if (infoField) {
      infoField.value += message + "\n";
      infoField.scrollTop = infoField.scrollHeight;
    }
  };

  let visited = new Set();
  let queue = [startNodeId];
  let visitedNodes = [];

  logInfo(`Starting BFS from node ${startNodeId}.`);

  const updateNode = (nodeId, value) => {
    GraphUIUpdater.changeValueFor(nodeId, value, network);
    network.redraw();
  };

  while (queue.length > 0) {
    const nodeId = queue.shift();
    logInfo(`Dequeued node ${nodeId}.`);

    if (!visited.has(nodeId)) {
      logInfo(`Visiting node ${nodeId}.`);
      visited.add(nodeId);
      visitedNodes.push(nodeId);

      updateNode(nodeId, 20);
      logInfo(`Updated node ${nodeId} with value 20.`);

      const neighbors = network.getConnectedNodes(nodeId);
      logInfo(`Neighbors of node ${nodeId}: ${neighbors.join(", ")}.`);

      for (const neighbor of neighbors) {
        if (!visited.has(neighbor)) {
          logInfo(`Enqueuing neighbor ${neighbor} of node ${nodeId}.`);
          queue.push(neighbor);
        } else {
          logInfo(`Neighbor ${neighbor} of node ${nodeId} already visited.`);
        }
      }

      await new Promise((resolve) => setTimeout(resolve, 500));
    } else {
      logInfo(`Node ${nodeId} already visited. Skipping.`);
    }
  }

  logInfo(`BFS complete. Visited nodes: ${visitedNodes.join(", ")}.`);
  return visitedNodes;
};

const dfs = async (
  nodeId,
  visited,
  network,
  visitedNodes = [],
  infoFieldId = "graph-system-info"
) => {
  const infoField = document.getElementById(infoFieldId);

  const logInfo = (message) => {
    if (infoField) {
      infoField.value += message + "\n";
      infoField.scrollTop = infoField.scrollHeight;
    }
  };

  if (visited.has(nodeId)) {
    logInfo(`Node ${nodeId} already visited. Skipping.`);
    return;
  }

  logInfo(`Visiting node ${nodeId}.`);
  visited.add(nodeId);
  visitedNodes.push(nodeId);

  GraphUIUpdater.changeValueFor(nodeId, 20, network);
  network.redraw();
  logInfo(`Updated node ${nodeId} with value 20.`);

  const neighbors = network.getConnectedNodes(nodeId);
  logInfo(`Neighbors of node ${nodeId}: ${neighbors.join(", ")}.`);

  for (const neighbor of neighbors) {
    if (!visited.has(neighbor)) {
      logInfo(`Exploring neighbor ${neighbor} of node ${nodeId}.`);
      await dfs(neighbor, visited, network, visitedNodes, infoFieldId);
    } else {
      logInfo(`Neighbor ${neighbor} of node ${nodeId} already visited.`);
    }

    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  logInfo(`Finished processing node ${nodeId}.`);
  return visitedNodes;
};

const startDFS = (startNodeId, network) => {
  let visited = new Set();
  dfs(startNodeId, visited, network);
};

function fordFulkerson(edges, source, sink, infoFieldId = "graph-system-info") {
  const infoField = document.getElementById(infoFieldId);

  const logInfo = (message) => {
    if (infoField) {
      infoField.value += message + "\n";
      infoField.scrollTop = infoField.scrollHeight; // Автопрокрутка вниз
    }
  };

  logInfo("Starting Ford-Fulkerson algorithm.");
  logInfo(`Source: ${source}, Sink: ${sink}`);

  const nodes = new Set();
  edges.forEach((edge) => {
    nodes.add(edge.from);
    nodes.add(edge.to);
  });

  const nodeList = Array.from(nodes);
  const nodeIndex = Object.fromEntries(
    nodeList.map((node, index) => [node, index])
  );
  const n = nodeList.length;

  logInfo(`Nodes in the graph: ${nodeList.join(", ")}`);
  logInfo("Constructing residual graph...");

  const residualGraph = Array.from({ length: n }, () => Array(n).fill(0));
  edges.forEach((edge) => {
    const u = nodeIndex[edge.from];
    const v = nodeIndex[edge.to];
    residualGraph[u][v] = edge.value;
    logInfo(`Edge from ${edge.from} to ${edge.to} with capacity ${edge.value}`);
  });

  function dfs(residualGraph, visited, current, sink, path) {
    visited[current] = true;

    if (current === sink) return true;

    for (let next = 0; next < n; next++) {
      if (!visited[next] && residualGraph[current][next] > 0) {
        path[next] = current;
        if (dfs(residualGraph, visited, next, sink, path)) return true;
      }
    }

    return false;
  }

  const sourceIndex = nodeIndex[source];
  const sinkIndex = nodeIndex[sink];
  let maxFlow = 0;
  const path = Array(n);

  logInfo("Starting the main loop to find augmenting paths...");
  while (true) {
    const visited = Array(n).fill(false);
    if (!dfs(residualGraph, visited, sourceIndex, sinkIndex, path)) {
      logInfo("No more augmenting paths found.");
      break;
    }

    logInfo("Augmenting path found:");
    let pathFlow = Infinity;
    for (let v = sinkIndex; v !== sourceIndex; v = path[v]) {
      const u = path[v];
      pathFlow = Math.min(pathFlow, residualGraph[u][v]);
      logInfo(
        `Edge from ${nodeList[u]} to ${nodeList[v]} with capacity ${residualGraph[u][v]}`
      );
    }

    logInfo(`Flow for this path: ${pathFlow}`);
    for (let v = sinkIndex; v !== sourceIndex; v = path[v]) {
      const u = path[v];
      residualGraph[u][v] -= pathFlow;
      residualGraph[v][u] += pathFlow;
      logInfo(
        `Updated residual capacity of edge ${nodeList[u]} -> ${nodeList[v]}: ${residualGraph[u][v]}`
      );
      logInfo(
        `Reverse edge ${nodeList[v]} -> ${nodeList[u]}: ${residualGraph[v][u]}`
      );
    }

    maxFlow += pathFlow;
    logInfo(`Updated max flow: ${maxFlow}`);
  }

  logInfo(`Ford-Fulkerson algorithm completed. Maximum flow: ${maxFlow}`);
  return maxFlow;
}

function dijkstra(edges, source, sink, infoFieldId = "graph-system-info") {
  const infoField = document.getElementById(infoFieldId);

  const logInfo = (message) => {
    if (infoField) {
      infoField.value += message + "\n";
      infoField.scrollTop = infoField.scrollHeight;
    }
  };

  logInfo("Starting Dijkstra's algorithm.");
  logInfo(`Source: ${source}, Sink: ${sink}`);

  const nodes = new Set();
  edges.forEach((edge) => {
    nodes.add(edge.from);
    nodes.add(edge.to);
  });

  const nodeList = Array.from(nodes);
  const nodeIndex = Object.fromEntries(
    nodeList.map((node, index) => [node, index])
  );
  const n = nodeList.length;

  logInfo(`Nodes in the graph: ${nodeList.join(", ")}`);
  logInfo("Initializing distances, previous nodes, and queue...");

  const distances = Array(n).fill(Infinity);
  const previous = Array(n).fill(-1);
  const visited = Array(n).fill(false);
  const queue = [];

  const sourceIndex = nodeIndex[source];
  distances[sourceIndex] = 0;
  queue.push(sourceIndex);

  logInfo(`Starting from source node: ${source}`);
  while (queue.length > 0) {
    const current = queue.reduce(
      (minNode, node) =>
        distances[node] < distances[minNode] ? node : minNode,
      queue[0]
    );

    logInfo(
      `Visiting node: ${nodeList[current]}, Current distance: ${distances[current]}`
    );
    queue.splice(queue.indexOf(current), 1);

    if (current === nodeIndex[sink]) {
      logInfo(`Reached sink node: ${sink}`);
      break;
    }

    edges.forEach((edge) => {
      const u = nodeIndex[edge.from];
      const v = nodeIndex[edge.to];

      if (
        u === current &&
        !visited[v] &&
        distances[v] > distances[u] + edge.value
      ) {
        distances[v] = distances[u] + edge.value;
        previous[v] = u;
        queue.push(v);

        logInfo(
          `Updated distance for node ${nodeList[v]} to ${distances[v]} via ${nodeList[u]}`
        );
      }
    });

    visited[current] = true;
    logInfo(`Marked node ${nodeList[current]} as visited.`);
  }

  const path = [];
  let currentNode = nodeIndex[sink];
  while (previous[currentNode] !== -1) {
    path.unshift(nodeList[currentNode]);
    currentNode = previous[currentNode];
  }

  if (distances[nodeIndex[sink]] === Infinity) {
    logInfo("No path found from source to sink.");
    return null;
  }

  path.unshift(source);
  logInfo(`Path found: ${path.join(" -> ")}`);
  logInfo(`Total distance: ${distances[nodeIndex[sink]]}`);

  return { path, distance: distances[nodeIndex[sink]] };
}
