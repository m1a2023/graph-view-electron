window.addEventListener("DOMContentLoaded", () => {
  let rawData = document.getElementById("graph-input-data");
  let rawEdge = document.getElementById("graph-edges-data");

  const data = new _graph_data(
    new vis.DataSet([
      { id: 1, label: "1" },
      { id: 2, label: "2" },
      { id: 3, label: "3" },
    ]),
    new vis.DataSet([
      { from: 1, to: 2 },
      { from: 1, to: 3 },
    ])
  );

  const options = new _graph_options({
    nodes: { shape: "dot", size: 13 },
    edges: { arrows: "to" },
    physics: { enabled: true },
  });

  let graph = new GraphView(data, options, _graph_container.__base_name);
  let network = graph.get();

  rawData.addEventListener("dblclick", () => {
    const nodes = Parser.parseNodes(Collector.collect("graph-input-data"));
    const edges = Parser.parseEdges(Collector.collect("graph-edges-data"));

    network.setData({
      nodes: new vis.DataSet(nodes),
      edges: new vis.DataSet(edges),
    });

    console.log(nodes);
    console.log(edges);
  });

  rawEdge.addEventListener("dblclick", () => {
    const edges = Parser.parseEdges(Collector.collect("graph-edges-data"));

    network.setData({
      nodes: network.body.data.nodes,
      edges: new vis.DataSet(edges),
    });

    console.log(edges);
  });
});
