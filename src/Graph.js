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

  /**
   *
   * @returns {vis.DataSet}
   */
  get() {
    return { nodes: this.nodes, edges: this.edges };
  }

  getNodes() {
    return this.nodes;
  }

  getEdges() {
    return this.edges;
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
  /**
   *
   * @returns {vis.options}
   */
  get() {
    return this.options;
  }
}

class GraphView {
  /**
   *
   * @param {_graph_data} graphData
   * @param {_graph_options} graphOptions
   * @param {_graph_container} graphContainer
   */
  constructor(
    graphData,
    graphOptions,
    graphContainerName = _graph_container.__base_name
  ) {
    this.container = document.getElementById(graphContainerName);
    this.data = graphData.get();
    this.options = graphOptions.get();

    if (!this.container) {
      throw new Error(
        "Container with id '${graphContainer.__base_name}' not found"
      );
    }
  }

  update = (data) => {
    this.network.setData(data);
  };

  /**
   *
   * @returns {vis.Network}
   */
  get = () => {
    return new vis.Network(this.container, this.data, this.options);
  };

  /**
   *
   * @returns {vis.DataSet}
   */
  getData = () => {
    return this.data;
  };

  /**
   *
   * @returns {vis.options}
   */
  getOptions = () => {
    return this.options;
  };

  /**
   *
   * @returns {HTMLElement}
   */
  getContainer = () => {
    return this.container;
  };
}

let _graph_container = {
  __default_name: "network",
  __default_graph_data: new _graph_data(
    new vis.DataSet([
      { id: 1, label: "1", value: 10 },
      { id: 2, label: "2", value: 10 },
      { id: 3, label: "3", value: 10 },
      { id: 4, label: "4", value: 10 },
      { id: 5, label: "5", value: 10 },
    ]),
    new vis.DataSet([
      { from: 1, to: 2 },
      { from: 2, to: 3 },
      { from: 1, to: 3 },
      { from: 4, to: 2 },
      { from: 4, to: 5 },
    ])
  ),
  __default_graph_options: new _graph_options({
    autoResize: true,
    nodes: {
      shape: "dot",
      size: 20,
      scaling: {
        min: 20,
        max: 40,
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
    edges: { arrows: "to", scaling: { min: 1, max: 10 } },
    physics: { enabled: true },
  }),
};
