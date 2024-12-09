class Parser {
  static parse = () => {
    var nodes = [];
    var edges = [];
  };

  static parseNodes = (nodesRaw) => {
    const nodes = nodesRaw
      .split(/[\s,]+/)
      .filter((element) => element.trim() != "")
      .map((element, index) => ({
        id: index + 1,
        label: element.trim(),
        value: 10,
      }));

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
}
