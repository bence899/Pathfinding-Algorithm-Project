// astar.js
export function astar(grid, startNode, finishNode) {
    const visitedNodesInOrder = [];
    startNode.distance = 0;
    startNode.h = heuristic(startNode, finishNode);
    startNode.f = startNode.h;
  
    const openSet = [];
    openSet.push(startNode);
  
    while (openSet.length > 0) {
      sortNodesByFValue(openSet);
      const currentNode = openSet.shift();
  
      if (currentNode.isWall) continue;
      if (currentNode === finishNode) {
        visitedNodesInOrder.push(currentNode);
        return visitedNodesInOrder;
      }
  
      currentNode.isVisited = true;
      visitedNodesInOrder.push(currentNode);
  
      const neighbors = getNeighbors(currentNode, grid);
      for (const neighbor of neighbors) {
        if (neighbor.isWall || neighbor.isVisited) continue;
  
        const tentativeGScore = currentNode.distance + 1;
  
        if (tentativeGScore < neighbor.distance) {
          neighbor.previousNode = currentNode;
          neighbor.distance = tentativeGScore;
          neighbor.h = heuristic(neighbor, finishNode);
          neighbor.f = neighbor.distance + neighbor.h;
  
          if (!openSet.includes(neighbor)) {
            openSet.push(neighbor);
          }
        }
      }
    }
    return visitedNodesInOrder;
  }
  
  function heuristic(nodeA, nodeB) {
    // Manhattan Distance
    const dx = Math.abs(nodeA.col - nodeB.col);
    const dy = Math.abs(nodeA.row - nodeB.row);
    return dx + dy;
  }
  
  function sortNodesByFValue(openSet) {
    openSet.sort((nodeA, nodeB) => nodeA.f - nodeB.f);
  }
  
  function getNeighbors(node, grid) {
    const neighbors = [];
    const { col, row } = node;
  
    if (row > 0) neighbors.push(grid[row - 1][col]); // Up
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]); // Down
    if (col > 0) neighbors.push(grid[row][col - 1]); // Left
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]); // Right
  
    return neighbors;
  }
  