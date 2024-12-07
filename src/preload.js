window.addEventListener("DOMContentLoaded", () => {
  let rawData = document.getElementById("graph-input-data");
  let rawEdge = document.getElementById("graph-edges-data");

  rawData.addEventListener("dblclick", () => {
    console.log(Collector.get());
  });

  rawEdge.addEventListener("dblclick", () => {
    console.log(Collector.get());
  });

  const data = new _graph_data(
    new vis.DataSet([
      { id: 1, label: "Node 1" },
      { id: 2, label: "Node 2" },
      { id: 3, label: "Node 3" },
      { id: 4, label: "Node 4" },
      { id: 5, label: "Node 5" },
    ]),
    new vis.DataSet([
      { from: 1, to: 2 },
      { from: 1, to: 3 },
      { from: 2, to: 4 },
      { from: 2, to: 5 },
    ])
  );

  const options = new _graph_options({
    nodes: { shape: "dot", size: 13 },
    edges: { arrows: "to" },
    physics: { enabled: true },
  });

  const network = new GraphView(
    data,
    options,
    _graph_container.__base_name
  ).get();
});
