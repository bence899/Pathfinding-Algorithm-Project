// PathfindingVisualizer.jsx
import React, { Component } from 'react';
import Node from './Node/Node';
import { dijkstra, getNodesInShortestPathOrder } from '../algorithms/dijkstra';
import { bfs } from '../algorithms/bfs';
import { dfs } from '../algorithms/dfs';
import { astar } from '../algorithms/astar';

import './PathfindingVisualizer.css';

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

export default class PathfindingVisualizer extends Component {
  constructor() {
    super();
    this.state = {
      grid: [],
      mouseIsPressed: false,
      isRunning: false,
      canReset: false,
    };
  }

  componentDidMount() {
    const grid = getInitialGrid();
    this.setState({ grid });
  }

  handleMouseDown(row, col) {
    if (this.state.isRunning) return;
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({ grid: newGrid, mouseIsPressed: true });
  }

  handleMouseEnter(row, col) {
    if (!this.state.mouseIsPressed || this.state.isRunning) return;
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({ grid: newGrid });
  }

  handleMouseUp() {
    this.setState({ mouseIsPressed: false });
  }

  resetGrid() {
    const grid = getInitialGrid();
    this.setState({ grid, canReset: false });
    this.clearGrid();
  }

  clearGrid() {
    const { grid } = this.state;
    for (const row of grid) {
      for (const node of row) {
        const nodeElement = document.getElementById(`node-${node.row}-${node.col}`);
        if (nodeElement) {
          nodeElement.className = 'node';
          if (node.isStart) nodeElement.classList.add('node-start');
          if (node.isFinish) nodeElement.classList.add('node-finish');
          if (node.isWall) nodeElement.classList.add('node-wall');
        }
      }
    }
  }

  animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder) {
    this.setState({ isRunning: true });
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-visited';
      }, 10 * i);
    }
  }

  animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i <= nodesInShortestPathOrder.length; i++) {
      if (i === nodesInShortestPathOrder.length) {
        setTimeout(() => {
          this.setState({ isRunning: false, canReset: true });
        }, 50 * i);
        return;
      }
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-shortest-path';
      }, 50 * i);
    }
  }

  visualizeDijkstra() {
    this.resetVisitedNodes();
    const { grid } = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  visualizeBFS() {
    this.resetVisitedNodes();
    const { grid } = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = bfs(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  visualizeDFS() {
    this.resetVisitedNodes();
    const { grid } = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = dfs(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  visualizeAStar() {
    this.resetVisitedNodes();
    const { grid } = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = astar(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  resetVisitedNodes() {
    const newGrid = this.state.grid.slice();
    for (const row of newGrid) {
      for (const node of row) {
        node.isVisited = false;
        node.distance = Infinity;
        node.previousNode = null;
        node.f = 0;
        node.h = 0;
      }
    }
    this.setState({ grid: newGrid });
  }

  render() {
    const { grid, mouseIsPressed, isRunning, canReset } = this.state;

    return (
      <>
        <div className="controls">
          <button
            onClick={() => this.visualizeDijkstra()}
            disabled={isRunning || canReset}>
            Visualize Dijkstra's Algorithm
          </button>
          <button
            onClick={() => this.visualizeBFS()}
            disabled={isRunning || canReset}>
            Visualize BFS Algorithm
          </button>
          <button
            onClick={() => this.visualizeDFS()}
            disabled={isRunning || canReset}>
            Visualize DFS Algorithm
          </button>
          <button
            onClick={() => this.visualizeAStar()}
            disabled={isRunning || canReset}>
            Visualize A* Algorithm
          </button>
          <button
            onClick={() => this.resetGrid()}
            disabled={!canReset}>
            Reset
          </button>
        </div>
        <div className="grid">
          {grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx} className="grid-row">
                {row.map((node, nodeIdx) => {
                  const { row, col, isFinish, isStart, isWall } = node;
                  return (
                    <Node
                      key={nodeIdx}
                      col={col}
                      isFinish={isFinish}
                      isStart={isStart}
                      isWall={isWall}
                      mouseIsPressed={mouseIsPressed}
                      onMouseDown={(row, col) =>
                        this.handleMouseDown(row, col)
                      }
                      onMouseEnter={(row, col) =>
                        this.handleMouseEnter(row, col)
                      }
                      onMouseUp={() => this.handleMouseUp()}
                      row={row}></Node>
                  );
                })}
              </div>
            );
          })}
        </div>
      </>
    );
  }
}

const getInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < 20; row++) {
    const currentRow = [];
    for (let col = 0; col < 50; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};

const createNode = (col, row) => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    f: 0,
    h: 0,
    isVisited: false,
    isWall: false,
    previousNode: null,
  };
};

const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};
