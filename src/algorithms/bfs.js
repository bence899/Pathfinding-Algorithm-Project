// bfs.js
export function bfs(grid, startNode, finishNode) {
    const visitedNodesInOrder = [];
    const queue = [];
    startNode.isVisited = true;
    queue.push(startNode);
  
    while (queue.length > 0) {
      const currentNode = queue.shift();
      visitedNodesInOrder.push(currentNode);
  
      if (currentNode === finishNode) return visitedNodesInOrder;
  
      const unvisitedNeighbors = getUnvisitedNeighbors(currentNode, grid);
      for (const neighbor of unvisitedNeighbors) {
        if (neighbor.isWall) continue;
        neighbor.isVisited = true;
        neighbor.previousNode = currentNode;
        queue.push(neighbor);
      }
    }
    return visitedNodesInOrder;
  }
  
  function getUnvisitedNeighbors(node, grid) {
    const neighbors = [];
    const { col, row } = node;
  
    if (row > 0) neighbors.push(grid[row - 1][col]); // Up
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]); // Down
    if (col > 0) neighbors.push(grid[row][col - 1]); // Left
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]); // Right
  
    return neighbors.filter((neighbor) => !neighbor.isVisited);
  }
  