class Parser {
  static parse = () => {};

  static parseNodes = (nodesRaw) => {
    const nodes = nodesRaw
      .split(/[\s,]+/)
      .filter((element) => element.trim() != "")
      .map((element, index) => ({
        id: index + 1,
        label: element.trim(),
        value: 10,
      }));

    console.log("Parsed nodes: ");
    console.log(nodes);
    return nodes;
  };

  static parseEdges = (edgesRaw) => {
    const edges = edgesRaw
      .split(/\n+/)
      .filter((line) => line.trim() != "")
      .map((line) => {
        const [from, to] = line.trim().split(/\s+/).map(Number);
        return { from, to, capacity: 1 };
      });

    console.log("Parsed edges: ");
    console.log(edges);
    return edges;
  };

  static parseToMap = (edgesRaw) => {
    const generalGraph = new GeneralGraph(new Map());

    edgesRaw.forEach(({ from, to }) => {
      generalGraph.add(from, to);
    });

    console.log("Parsed graph as Map: ");
    console.log(generalGraph.get());
    return generalGraph.get();
  };
}
