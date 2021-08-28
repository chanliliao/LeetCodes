// Extra

// Q200
// number of islands

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

// O(m*n
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
