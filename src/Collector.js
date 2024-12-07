class Collector {
  static collect(from) {
    return document.getElementById(from).value;
  }
  static _parse() {
    var nodesRaw = Collector.collect("graph-input-data");
    var edgesRaw = Collector.collect("graph-edges-data");
    return { nodesRaw, edgesRaw };
  }

  static get() {
    return Collector._parse();
  }
}
