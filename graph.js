// Q200
// number of islands

// Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands.
// An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.
// Example 1:
// Input: grid = [
//   ["1","1","1","1","0"],
//   ["1","1","0","1","0"],
//   ["1","1","0","0","0"],
//   ["0","0","0","0","0"]
// ]
// Output: 1
// Example 2:
// Input: grid = [
//   ["1","1","0","0","0"],
//   ["1","1","0","0","0"],
//   ["0","0","1","0","0"],
//   ["0","0","0","1","1"]
// ]
// Output: 3

// O(m*n)
const numIslands = (grid) => {
  // set variables
  let islands = 0;
  let rows = grid.length;
  let cols = grid[0].length;

  // loop through grid
  for (let i = 0; i < rows - 1; i++) {
    for (let j = 0; j < cols - 1; j++) {
      if (grid[i][j] === 1) {
        // sink the islands
        sink(grid, i, j, rows, cols);
        islands++;
      }
    }
  }
  return Islands;
};

function sink(grid, i, j, rows, cols) {
  // if is not out of bounds and not water
  if (i < 0 || j < 0 || i >= rows || j >= cols || grid[i][j] === 0) {
    return;
  }
  //First let's set the current spot to "0"
  grid[i][j] = 0;

  //Possibilites:
  sink(grid, i, j - 1, row, cols);
  sink(grid, i, j + 1, row, cols);
  sink(grid, i - 1, j, row, cols);
  sink(grid, i + 1, j, row, cols);
}

// Q695
// max area of island
// You are given an m x n binary matrix grid. An island is a group of 1's (representing land) connected 4-directionally (horizontal or vertical.) You may assume all four edges of the grid are surrounded by water.
// The area of an island is the number of cells with a value 1 in the island.
// Return the maximum area of an island in grid. If there is no island, return 0.

// O(m*n)
var maxAreaOfIsland = function (grid) {
  // set variables
  let max = 0;
  let rows = grid.length;
  let cols = grid[0].length;

  // loop through grid
  for (let i = 0; i < rows - 1; i++) {
    for (let j = 0; j < cols - 1; j++) {
      if (grid[i][j] === 1) {
        // get area of island
        let area = getArea(grid, i, j, row, cols);
        max = Math.max(max, area);
      }
    }
  }
  return max;
};

const getArea = (grid, i, j, rows, cols) => {
  // check for out of bounds and if position is 0 (water)
  if (i < 0 || j < 0 || i >= rows || j >= cols || grid[i][j] == 0) return 0;
  // change counted to 0 so no double count
  grid[i][j] = 0;
  // check all direction
  const left = getArea(grid, i, j - 1, row, cols);
  const right = getArea(grid, i, j + 1, row, cols);
  const up = getArea(grid, i - 1, j, row, cols);
  const down = getArea(grid, i + 1, j, row, cols);
  return up + down + left + right + 1;
};

// Q694
// num of distinct islands
// O(m*n)
var numDistinctIslands = function (grid) {
  // set variables
  let set = new Set();
  let rows = grid.length;
  let cols = grid[0].length;

  // loop through grid
  for (let i = 0; i < rows - 1; i++) {
    for (let j = 0; j < cols - 1; j++) {
      if (grid[i][j] === 1) {
        // get area of island
        let path = computePath(grid, i, j, rows, cols, 'X');
        set.add(path);
      }
    }
  }
  return max;
};

const computePath = (grid, i, j, rows, cols, direction) => {
  // check for out of bounds and if position is 0 (water)
  if (i < 0 || j < 0 || i >= rows || j >= cols || grid[i][j] == 0) return 'O';
  // change counted to 0 so no double count
  grid[i][j] = 0;
  // check all direction
  const left = computePath(grid, i, j - 1, row, cols, 'L');
  const right = computePath(grid, i, j + 1, row, cols, 'R');
  const up = computePath(grid, i - 1, j, row, cols, 'U');
  const down = computePath(grid, i + 1, j, row, cols, 'D');
  return direction + up + down + left + right;
};

// Q1254
// Num of closed islands
// Given a 2D grid consists of 0s (land) and 1s (water).  An island is a maximal 4-directionally connected group of 0s and a closed island is an island totally (all left, top, right, bottom) surrounded by 1s.
// Return the number of closed islands.
// Example 1:
// Input: grid = [[1,1,1,1,1,1,1,0],[1,0,0,0,0,1,1,0],[1,0,1,0,1,1,1,0],[1,0,0,0,0,1,0,1],[1,1,1,1,1,1,1,0]]
// Output: 2
// Explanation:
// Islands in gray are closed because they are completely surrounded by water (group of 1s).
// Example 2
// Input: grid = [[0,0,1,0,0],[0,1,0,1,0],[0,1,1,1,0]]
// Output: 1
// Example 3:
// Input: grid = [[1,1,1,1,1,1,1],
//                [1,0,0,0,0,0,1],
//                [1,0,1,1,1,0,1],
//                [1,0,1,0,1,0,1],
//                [1,0,1,1,1,0,1],
//                [1,0,0,0,0,0,1],
//                [1,1,1,1,1,1,1]]
// Output: 2

// O(m*n)
var closedIsland = function (grid) {
  // set variables
  let closeIslands = 0;
  let rows = grid.length;
  let cols = grid[0].length;

  // loop through grid
  for (let i = 0; i < rows - 1; i++) {
    for (let j = 0; j < cols - 1; j++) {
      if (grid[i][j] === 0) {
        // if there is a closed island
        if (isClosedIsland(grid, i, j, rows, cols)) {
          closeIslands++;
        }
      }
    }
  }
  return closeIslands;
};

function isClosedIsland(grid, i, j, rows, cols) {
  // -1 visited
  // 1 water
  // 0 land
  if (grid[i][j] == -1 || grid[i][j] === 1) return true;
  // we know we hav a 0 (land)
  if (isOnPerimeter(i, j, rows, cols)) return false;
  // confirm visited
  grid[r][c] = -1;
  // check all directions
  const left = isClosedIsland(grid, i, j - 1, rows, cols);
  const right = isClosedIsland(grid, i, j + 1, rows, cols);
  const up = isClosedIsland(grid, i - 1, j, rows, cols);
  const down = isClosedIsland(grid, i + 1, j, rows, cols);
  // if all true return true
  return left && right && up && down;
}

function isOnPerimeter(i, j, rows, cols) {
  return i == 0 || j === 0 || i == rows - 1 || j == cols - 1;
}

// Q1210
// Path to max gold
// In a gold mine grid of size m x n, each cell in this mine has an integer representing the amount of gold in that cell, 0 if it is empty.
// Return the maximum amount of gold you can collect under the conditions:
// Every time you are located in a cell you will collect all the gold in that cell.
// From your position, you can walk one step to the left, right, up, or down.
// You can't visit the same cell more than once.
// Never visit a cell with 0 gold.
// You can start and stop collecting gold from any position in the grid that has some gold.

// O(m*n)
var maxGold = function (grid) {
  // set variables
  let max = 0;
  let rows = grid.length;
  let cols = grid[0].length;

  // loop through grid
  for (let i = 0; i < rows - 1; i++) {
    for (let j = 0; j < cols - 1; j++) {
      if (grid[i][j] !== 0) {
        let gold = findMaxGold(grid, i, j, row, cols);
        max = Math.max(max, gold);
      }
    }
  }
  return max;
};

const findMaxGold = (grid, i, j, rows, cols, gold = 0) => {
  // check for out of boundsvisted
  if (i < 0 || j < 0 || i >= rows || j >= cols) {
    return gold;
  } else if (grid[i][j] !== 0) {
    gold += grid[i][j];
    let temp = grid[i][j];
    grid[i][j] = 0;
    let left = maxGold(grid, i, j - 1, rows, cols, gold);
    let right = maxGold(grid, i, j - 1, rows, cols, gold);
    let top = maxGold(grid, i, j - 1, rows, cols, gold);
    let bottom = maxGold(grid, i, j - 1, rows, cols, gold);
    grid[i][j] = temp;
    return Math.max(left, right, top, bottom);
  } else {
    return gold;
  }
};

// Q797
// all path from source to target
// Given a directed acyclic graph (DAG) of n nodes labeled from 0 to n - 1, find all possible paths from node 0 to node n - 1 and return them in any order.
// The graph is given as follows: graph[i] is a list of all nodes you can visit from node i (i.e., there is a directed edge from node i to node graph[i][j]).
// Example 1:
// Input: graph = [[1,2],[3],[3],[]]
// Output: [[0,1,3],[0,2,3]]
// Explanation: There are two paths: 0 -> 1 -> 3 and 0 -> 2 -> 3.

var allPathsSourceTarget = function (graph) {
  const target = graph.length - 1;

  const res = [];

  const DFS = (node, path) => {
    path.push(node);

    // if we've reached the target, we've found a path
    if (node === target) {
      res.push(path);
      return;
    }

    for (let edge of graph[node]) {
      DFS(edge, [...path]);
    }
  };

  DFS(0, []);

  return res;
};
