let _flow_container = {
  __default_name: "network",
  __default_flow_data: new _graph_data(
    new vis.DataSet([
      { id: 1, label: "1" },
      { id: 2, label: "2" },
      { id: 3, label: "3" },
      { id: 4, label: "4" },
      { id: 5, label: "5" },
    ]),
    new vis.DataSet([
      { from: 1, to: 2, value: 10 },
      { from: 2, to: 3, value: 5 },
      { from: 3, to: 2, value: 50 },
      { from: 4, to: 5, value: 19 },
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
          background: "#D2E5FF",
        },
      },
    },
    edges: {
      arrows: "to",
      scaling: { min: 1, max: 10 },
      font: { size: 16, align: "middle" },
      color: { color: "#848484", highlight: "#848484" },
    },
  }),
};

class FlowView {
  constructor(
    data,
    options,
    flowContainerName = _flow_container.__default_name
  ) {
    this.data = data.get();
    this.options = options.get();
    this.container = document.getElementById(flowContainerName);

    if (!this.container) {
      throw new Error(`Container with id '${this.container.id}' not found`);
    }

    this.network = new vis.Network(this.container, this.data, this.options);
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
