const displayOptionsDict = {
  Bfs: ["Distance", "IsVisited", "Coordinate", "None"],
  BBfs: ["Distance", "IsVisited1", "IsVisited2", "Coordinate", "None"],
  Dijkstra: ["Distance", "IsVisited", "Weight", "Coordinate", "None"],
  Dfs: ["Distance", "IsVisited", "Coordinate", "None"],
  GBfs: ["Distance", "IsVisited", "Heuristic", "Coordinate", "None"],
  AStar: ["Distance", "IsVisited", "Heuristic", "G", "F", "Coordinate", "None"]
};

// transfre from display option value to the name to display for it
const displayOptionToName = {
  Distance: "Distance",
  IsVisited: "Visited",
  IsVisited1: "Visited By Start",
  IsVisited2: "Visited By Finish",
  None: "None",
  Weight: "Weight",
  Heuristic: "H",
  G: "G",
  F: "F",
  Coordinate: "Coordinate"
};

export { displayOptionsDict, displayOptionToName };
