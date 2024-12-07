class _graph_data {
  /**
   *
   * @param {*} nodesDataSet
   * @param {*} edgesDataSet
   */
  constructor(nodesDataSet, edgesDataSet) {
    this.nodes = nodesDataSet;
    this.edges = edgesDataSet;
  }

  get() {
    return { nodes: this.nodes, edges: this.edges };
  }
}

class _graph_options {
  /**
   *
   * @param {*} options
   */
  constructor(options) {
    this.options = options;
  }

  get() {
    return this.options;
  }
}

let _graph_container = {
  __base_name: "network",
};

class GraphView {
  /**
   *
   * @param {_graph_data} graphData
   * @param {_graph_options} graphOptions
   * @param {_graph_container} graphContainer
   */
  constructor(graphData, graphOptions, graphContainerName) {
    this.data = graphData.get();
    this.options = graphOptions.get();
    this.container = document.getElementById(graphContainerName);

    if (!this.container) {
      throw new Error(
        "Container with id '${graphContainer.__base_name}' not found"
      );
    }
  }

  get = () => {
    return new vis.Network(this.container, this.data, this.options);
  };
}
