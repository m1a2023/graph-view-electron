let _span_container = {
  __default_name: "network",
  __default_flow_data: new _graph_data(
    new vis.DataSet([
      { id: 1, label: "1", value: 31 },
      { id: 2, label: "2", value: 5 },
      { id: 3, label: "3", value: 19 },
      { id: 4, label: "4", value: 31 },
      { id: 5, label: "5", value: 11 },
    ]),
    new vis.DataSet([
      { from: 1, to: 2 },
      { from: 2, to: 3 },
      { from: 3, to: 2 },
      { from: 3, to: 4 },
      { from: 4, to: 5 },
    ])
  ),
  __default_flow_options: new _graph_options({
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
          background: "#FFFFFF",
        },
      },
    },
    edges: {
      arrows: "to",
      scaling: { min: 1, max: 10 },
    },
  }),
};

class SpaningTree {
  constructor(data, options, container = _span_container.__default_name) {
    this.data = data;
    this.options = options;
    this.container = container;

    if (!this.container) {
      throw new Error(`Container with id ${this.container.id} not found.`);
    }

    this.network = new vis.network(this.container, this.data, this.options);
  }

  get = () => {
    return this.network;
  };

  getData = () => {
    return this.data;
  };

  getOptions = () => {
    return this.options;
  };

  getContainer = () => {
    return this.container;
  };
}
