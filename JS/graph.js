// Q133
// clone graph

const cloneGraph = (node) => {
  if (node === null) {
    return null;
  }
  const map = new Map();

  function clone(root) {
    if (!map.has(root.val)) {
      let newCopy = new Node(root.val);
      map.set(root.val, newCopy);
      let copy = map.get(root.val);
      copy.neighbors = root.neighbors.map(clone);
    }
    return map.get(root.val);
  }
  return clone(node);
};

// Q207
// course schedule

const canFinish = (numCourses, preReq) => {
  visited = new Set();
  let adj = {};
  for (var i = 0; i < numCourses; i++) {
    adj[i] = [];
  }

  for (var preq of prereq) {
    adj[preq[0]].push(preq[1]);
  }

  function dfs(v) {
    if (visited.has(v)) {
      return false;
    }

    if (adj[v] === []) {
      return false;
    }

    visited.add(v);

    for (let pre of adj[v]) {
      if (!dfs(pre)) {
        return false;
      }
    }
    visited.delete(v);
    adj[v] = [];
    return true;
  }

  for (let crs = 0; crs < numCourses; crs++) {
    if (!dfs(crs)) {
      return false;
    }
  }
  return true;
};

// Q417
// pac Atl

const pacAtl = (heights) => {
  if (heights.length === 0) return [];
  let numRows = heights.length;
  let numCols = heights[0].length;

  let atlantic = [];
  let pacific = [];
  for (let i = 0; i < numRows; i++) {
    atlantic.push(new Array(numCols).fill(false));
    pacific.push(new Array(numCols).fill(false));
  }

  for (let col = 0; col < heights[0].length; col++) {
    dfs(heights, 0, col, Number.MIN_SAFE_INTEGER, pacific);
    dfs(heights, numRows - 1, col, Number.MIN_SAFE_INTEGER, atlantic);
  }

  for (let row = 0; row < heights.length; row++) {
    dfs(heights, row, 0, Number.MIN_SAFE_INTEGER, pacific);
    dfs(heights, row, numCols - 1, Number.MIN_SAFE_INTEGER, atlantic);
  }

  let res = [];
  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      if (atlantic[i][j] && pacific[i][j]) {
        res.push([i, j]);
      }
    }
  }

  function dfs(heights, i, j, prev, ocean) {
    //checkOutOfBounds
    if (i < 0 || i > heights.length - 1 || j < 0 || j > heights[i].length - 1)
      return;

    if (heights[i][j] < prev) return;
    if (ocean[i][j]) return;
    ocean[i][j] = true;

    dfs(heights, i + 1, j, heights[i][j], ocean);
    dfs(heights, i - 1, j, heights[i][j], ocean);
    dfs(heights, i, j + 1, heights[i][j], ocean);
    dfs(heights, i, j - 1, heights[i][j], ocean);
  }
  return res;
};

// Q200
// number of islands

// O(m*n)
const numIslands = (grid) => {
  // set variables
  let islands = 0;
  let rows = grid.length;
  let cols = grid[0].length;

  // loop through grid
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
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
  sink(grid, i, j - 1, rows, cols);
  sink(grid, i, j + 1, rows, cols);
  sink(grid, i - 1, j, rows, cols);
  sink(grid, i + 1, j, rows, cols);
}

// Q261
// graph valid tree

const validTree = (n, edges) => {};

//  Q261
//  graph valid tree

var validTree = function (n, edges) {
  if (n < 2) return true;
  var adj = {};

  // Initalize adjacency list
  for (var i = 0; i < n; i++) {
    adj[i] = [];
  }

  // Populate adjacency list
  for (var edge of edges) {
    adj[edge[0]].push(edge[1]);
    adj[edge[1]].push(edge[0]);
  }

  // Check if there are cycles
  var visited = new Set();

  function dfs(i, prev) {
    if (visited.has(i)) return false;

    visited.add(i);
    for (let j of adj[i]) {
      if (j === prev) {
        continue;
      }
      if (!dfs(j, i)) return false;
    }
    return true;
  }
  return dfs(0, -1) && n == visited.size;
};
