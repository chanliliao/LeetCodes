// Q133
// clone graph

const cloneGraph = (node) => {
  if (node === null) {
    return null;
  }
  const map = new Map();
  const clone = (root) => {
    if (!map.has(root.val)) {
      map.set(root.val, new Node(root.val));
      map.get(root.val).neighbors = root.neighbors.map(clone);
    }
    return map.get(root.val);
  };
  return clone(node);
};

// Q207
// course schedule

const canFinish = (numCourses, preReq) => {
  graph = new Map();
  visiting = new Set();
  visited = new Set();

  for (let [v, e] of prerequisites) {
    if (graph.has(v)) {
      let edges = graph.get(v);
      edges.push(e);
      graph.set(v, edges);
    } else {
      graph.set(v, [e]);
    }
  }

  for (const [v, e] of graph) {
    if (DFS(v)) {
      return false; //if cyclic it will not finish so it is false
    }
  }

  function DFS(v) {
    visiting.add(v);
    let edges = graph.get(v); // get all the edges to explore

    if (edges) {
      //console.log(edges)
      for (let e of edges) {
        if (visited.has(e)) {
          //skip if it is explored already
          continue;
        }

        if (visiting.has(e)) {
          //found e is being explored
          return true;
        }

        if (DFS(e)) {
          // DFS deeper if this e is cyclic
          return true;
        }
      }
    }

    visiting.delete(v); // remove from visiting set when all decedant v are visited
    visited.add(v);
    return false;
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
  for (let i = 0; i < rows - 1; i++) {
    for (let j = 0; j < cols - 1; j++) {
      if (grid[i][j] === 1) {
        // sink the islands
        sink(grid, i, j, rows, cols);
        islands++;
      }
    }
  }
  ('ㄥ');
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
