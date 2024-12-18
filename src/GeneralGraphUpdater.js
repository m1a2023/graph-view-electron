class GeneralGraphUpdater extends UIUpdater {
  static update = (element, event, generalGraph, graph) => {
    super.update(element, event, () => {
      console.log("graph cleared");
      generalGraph.clear(); // Очищаем старые данные

      console.log("got edges data");
      const edges = graph.get().body.data.edges.get(); // Получаем обновленные рёбра
      console.log(edges);

      // Создаем новый граф
      const parsedData = Parser.parseToMap(edges);
      console.log("Parsed graph as Map: ", parsedData.get());

      generalGraph.update(parsedData.get()); // Обновляем данные в generalGraph

      // Обновляем визуализацию графа
      graph.update(parsedData.get());
    });
  };
}
