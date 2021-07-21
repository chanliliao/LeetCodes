// Q1791
// find center of star Graph
// There is an undirected star graph consisting of n nodes labeled from 1 to n. A star graph is a graph where there is one center node and exactly n - 1 edges that connect the center node with every other node.
// You are given a 2D integer array edges where each edges[i] = [ui, vi] indicates that there is an edge between the nodes ui and vi. Return the center of the given star graph.
// Example 1:
// Input: edges = [[1,2],[2,3],[4,2]]
// Output: 2
// Explanation: As shown in the figure above, node 2 is connected to every other node, so 2 is the center.
// Example 2:
// Input: edges = [[1,2],[5,1],[1,3],[1,4]]
// Output: 1

class Graph {
  // undirected; V; E; edges; /* edge list */; adjacents; /* or, adj list */ G;

  buildGraphG_asMofM_fromEdges = ({ undirected, V, E, edges }) => {
    const addConnM = (u, v) => {
      this.G.has(u) || this.G.set(u, new Map());
      const adjFreqMap = this.G.get(u);
      adjFreqMap.set(v, adjFreqMap.has(v) ? adjFreqMap.get(v) + 1 : 1);
    };

    this.undirected = undirected;
    this.V = V;
    this.E =
      E !== undefined ? E : this.undirected ? 2 * edges.length : edges.length;
    this.edges = edges;
    this.G = undefined;

    this.G = new Map();
    if (undirected) {
      for (let [u, v] of this.edges) addConnM(u, v), addConnM(v, u);
    } else {
      for (let [u, v] of this.edges) addConnM(u, v);
    }
  };
  constructor({ undirected, V, E, edges }) {
    this.buildGraphG_asMofM_fromEdges({ undirected, V, E, edges });
  }
}

var findCenter = function (edges) {
  let g = new Graph({ edges, undirected: true });
  for (let [u, adjFreqMap] of g.G)
    if (adjFreqMap.size > 1) {
      return u;
    }
};

var findCenter = function (edges) {
  let [u, v] = edges[0];
  let [u2, v2] = edges[1];

  if (u == u2 || u == v2) return u;
  if (v == u2 || v == v2) return v;
};

// Q997
// find town judge
// In a town, there are n people labeled from 1 to n. There is a rumor that one of these people is secretly the town judge.
// If the town judge exists, then:
// The town judge trusts nobody.
// Everybody (except for the town judge) trusts the town judge.
// There is exactly one person that satisfies properties 1 and 2.
// You are given an array trust where trust[i] = [ai, bi] representing that the person labeled ai trusts the person labeled bi.
// Return the label of the town judge if the town judge exists and can be identified, or return -1 otherwise.
// Example 1:
// Input: n = 2, trust = [[1,2]]
// Output: 2
// Example 2:
// Input: n = 3, trust = [[1,3],[2,3]]
// Output: 3
// Example 3
// Input: n = 3, trust = [[1,3],[2,3],[3,1]]
// Output: -1
// Example 4:
// Input: n = 3, trust = [[1,2],[2,3]]
// Output: -1
// Example 5:
// Input: n = 4, trust = [[1,3],[1,4],[2,3],[2,4],[4,3]]
// Output: 3

class Graph {
  // undirected; V; E; edges; /* edge list */; adjacents; /* or, adj list */ G;

  buildGraphG_asMofM_fromEdges = ({ undirected, V, E, edges }) => {
    const addConnM = (u, v) => {
      this.G.has(u) || this.G.set(u, new Map());
      const adjFreqMap = this.G.get(u);
      adjFreqMap.set(v, adjFreqMap.has(v) ? adjFreqMap.get(v) + 1 : 1);
    };

    this.undirected = undirected;
    this.V = V;
    this.E =
      E !== undefined ? E : this.undirected ? 2 * edges.length : edges.length;
    this.edges = edges;
    this.G = undefined;

    this.G = new Map();
    if (undirected) {
      for (let [u, v] of this.edges) addConnM(u, v), addConnM(v, u);
    } else {
      for (let [u, v] of this.edges) addConnM(u, v);
    }
  };
  constructor({ undirected, V, E, edges, adjacents }) {
    this.buildGraphG_asMofM_fromEdges({ undirected, V, E, edges });
  }
}

var findJudge = function (V, edges) {
  let set = new Set();
  for (let u = 1; u <= V; u++) set.add(u); // assume all does not trust any other
  for (let [u] of edges) set.delete(u); // remove who trusts others
  if (set.size !== 1) return -1; // remaining, who dont trust - shud be only 1 judge

  let j = [...set][0]; // found the judge

  let g = new Graph({ V, edges });
  for (let [_, adjFreqMap] of g.G) {
    if (!adjFreqMap.has(j)) return -1; // 1 person does not trust j
  }
  return j; // everyone trusts j
};

// set
var findJudge = function (V, edges) {
  // edges = array of [u,v] pairs,   u is from,  v is to
  let set = new Set(edges.map((uv) => uv[0])); // set of all unique u

  let A = Array.from({ length: V + 1 }, (_, i) => i) // 0 to V
    .filter((u) => u) // remove 0
    .filter((u) => !set.has(u)); // remove all u
  if (A.length !== 1) return -1; // remaining are possible judges, but < 1 or > 1 is fail

  let j = A[0]; // found the judge

  A = edges //
    .map(([u, v]) => (v === j ? u : 0)) // if v is judge, take u or 0
    .filter((u) => u); // remove 0
  return A.length === V - 1 ? j : -1; // everyone else trusts j ? j, or not (-1)
};
// indegree and outdegree
var findJudge = function (V, edges) {
  // edges = array of [u,v] pairs,   u is from,  v is to
  let outdegree = new Array(V + 1).fill(0); // index 0 is dummy
  let indegree = new Array(V + 1).fill(0); // index 0 is dummy

  edges.forEach(([u, v]) => (outdegree[u]++, indegree[v]++)); // count of each outgoing (trust from) & incoming (trust to)

  let judgeIndexes = outdegree
    .reduce((arr, u, i) => (i != 0 && u === 0 && arr.push(i), arr), []) // those whose "outdegree" is 0
    .filter((ji) => indegree[ji] === V - 1); // and also "indegree" is from all others

  return judgeIndexes.length !== 0 ? judgeIndexes[0] : -1; // only 1 (yes, only 1 max is possible)? then its judge: else not (-1)
};
// indegree and outdegree simpler
var findJudge = function (V, edges) {
  // edges = array of [u,v] pairs,   u is from,  v is to
  let outdegree = new Array(V + 1).fill(0); // index 0 is dummy
  let indegree = new Array(V + 1).fill(0); // index 0 is dummy

  edges.forEach(([u, v]) => (outdegree[u]++, indegree[v]++)); // count of each outgoing (trust from) & incoming (trust to)

  for (let u = 1; u <= V; u++)
    if (outdegree[u] === 0 && indegree[u] === V - 1) {
      return u; // outgoing is 0, and incoming is all others => u is judge
    }
  return -1; // no judge
};
// array
var findJudge = function (n, trust) {
  const trustRecord = new Array(n + 1).fill(0);
  for (const [person, trusted] of trust) {
    trustRecord[person]--;
    trustRecord[trusted]++;
  }
  for (let i = 1; i <= n; i++) {
    if (trustRecord[i] === n - 1) return i;
  }
  return -1;
};

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
// Takes a cell in a grid with a “1” , turns it into a “0” and explores (DFS) any of the left, right, up, down 1’s
function sink(row, col, grid) {
  //Let's return IF
  // row < 0 OR col < 0 OR row is out of bounds(meaning the row is larger than the number of arrays in the 2d array) OR col is at/out of bounds (meaning the current col is at/over the number of elements a row has.)
  if (
    row < 0 ||
    col < 0 ||
    row >= grid.length ||
    col >= grid[row].length ||
    grid[row][col] === '0'
  ) {
    return;
  }

  //Otherwise, we should explore it!
  //First let's set the current spot to "0"
  grid[row][col] = '0';

  //Possibilites:
  // 1) 1 to the right, left, top, bottom
  //right
  sink(row, col + 1, grid);
  //Left
  sink(row, col - 1, grid);
  //Down
  sink(row + 1, col, grid);
  //Up
  sink(row - 1, col, grid);
}

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
      if (grid[i][j] === 0) {
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
  grid[row][col] = 0;
  // check all direction
  const left = getArea(row, col - 1, grid);
  const right = getArea(row, col + 1, grid);
  const up = getArea(row - 1, col, grid);
  const down = getArea(row + 1, col, grid);
  return up + down + left + right + 1;
};
