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
        return { from, to };
      });

    return edges;
  };

  static parseFlowEdges = (edgesRaw) => {
    const edges = edgesRaw
      .split(/\n+/)
      .filter((line) => line.trim() != "")
      .map((line) => {
        const [from, to, value] = line.trim().split(/\s+/).map(Number);

        return { from, to, value };
      });
    console.log("Parsed nodes: ");
    console.log(nodes);

    return edges;
  };
}
