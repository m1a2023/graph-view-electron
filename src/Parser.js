class Parser {
  static parseNodes = (nodesRaw) => {
    const nodes = nodesRaw
      .split(/\n+/)
      .filter((line) => line.trim() != "")
      .map((line) => {
        const match = line.trim().match(/^(\d+)$/);
        if (!match) {
          throw new Error(`Invalid input line: ${line}`);
        }
        const [id] = match;
        return {
          id: id,
          label: id,
          value: 10,
        };
      });

    console.log("Parsed nodes: ", nodes);
    return nodes;
  };

  static parseSpaningNodes = (nodesRaw) => {
    const nodes = nodesRaw
      .split(/\n+/)
      .filter((line) => line.trim() != "")
      .map((line) => {
        const match = line.trim().match(/^(\d+) (\d+)$/);
        if (!match) {
          throw new Error(`Invalid input line: ${line}`);
        }
        const [id, value] = match;
        return {
          id: Number(id),
          label: id,
          value: value,
        };
      });

    console.log("Parsed spaning nodes: ", nodes);
    return nodes;
  };

  static parseEdges = (edgesRaw) => {
    const edges = edgesRaw
      .split(/\n+/)
      .filter(
        (line) =>
          line.trim() != "" &&
          line.trim()[0] != "#" &&
          line.trim()[0] != "$" &&
          line.trim()[0] != "/"
      )
      .map((line) => {
        const [from, to] = line.trim().split(/\s+/).map(Number);
        return { from, to };
      });

    console.log("Parsed edges: ", edges);
    return edges;
  };

  static parseFlowEdges = (edgesRaw) => {
    const edges = edgesRaw
      .split(/\n+/)
      .filter(
        (line) =>
          line.trim() != "" &&
          line.trim()[0] != "#" &&
          line.trim()[0] != "$" &&
          line.trim()[0] != "/"
      )
      .map((line) => {
        const [from, to, value] = line.trim().split(/\s+/).map(Number);

        return { from, to, value };
      });

    console.log("Parsed nodes: ", edges);
    return edges;
  };
}
