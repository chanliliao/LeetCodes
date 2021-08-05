// Q104
// Max Depth of binary tree

// non-recurv
var maxDepth = function (root) {
  if (!root) return 0;
  const queue = [root];
  let depth = 0;
  while (queue.length !== 0) {
    depth++;
    const len = queue.length;
    for (let i = 0; i < len; i++) {
      if (queue[i].left) queue.push(queue[i].left);
      if (queue[i].right) queue.push(queue[i].right);
    }
    queue.splice(0, len);
  }
  return depth;
};
// recurv
var maxDepth = function (root) {
  if (!root) return 0;
  return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;
};

//Q100
// same tree

// recurv
let sameTree = (p, q) => {
  if (!p && !q) return true;
  if (!p || !q || p.val !== q.val) return false;

  return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
};
// non -recurv
let sameTree = (p, q) => {
  let queueOne = [p];
  let queueTwo = [q];

  while (queueOne.length && queueTwo.length) {
    const currOne = queueOne.shift();
    const currTwo = queueTwo.shift();

    if (currOne && currTwo && currOne.val !== currTwo.val) {
      return false;
    }

    if (currOne && !currTwo) {
      return false;
    }

    if (currTwo && !currOne) {
      return false;
    }

    if (currOne) {
      queueOne.push(currOne.left);
      queueOne.push(currOne.right);
    }

    if (currTwo) {
      queueTwo.push(currTwo.left);
      queueTwo.push(currTwo.right);
    }
  }

  return queueOne.length === 0 && queueTwo.length === 0;
};
// non -recurv ES6
let sameTree = (p, q) => {
  let stack = [[p, q]];

  while (stack.length) {
    let [x, y] = stack.shift();

    // if both leaves
    if (x == null && y == null) continue;
    if (!x || !y) return false;
    if (x.val == y.val) {
      stack.push([x.left, y.left]);
      stack.push([x.right, y.right]);
    } else return false;
  }
  return true;
};

// Q226
// invert Binary Tree

// Recursion
function invertTree(root) {
  if (root == null) return root;
  [root.left, root.right] = [invertTree(root.right), invertTree(root.left)];
  return root;
}

// DFS
function invertTree(root) {
  const stack = [root];

  while (stack.length) {
    const n = stack.pop();
    if (n != null) {
      [n.left, n.right] = [n.right, n.left];
      stack.push(n.left, n.right);
    }
  }

  return root;
}

// BFS
function invertTree(root) {
  const queue = [root];

  while (queue.length) {
    const n = queue.shift();
    if (n != null) {
      [n.left, n.right] = [n.right, n.left];
      queue.push(n.left, n.right);
    }
  }

  return root;
}

// Q572
// subtree of another tree

var isSubtree = function (s, t) {
  if (!s) return !t;
  return isEqual(s, t) || isSubtree(s.left, t) || isSubtree(s.right, t);
};

function isEqual(root1, root2) {
  if (!root1 || !root2) return !root1 && !root2;
  if (root1.val !== root2.val) return false;
  return isEqual(root1.left, root2.left) && isEqual(root1.right, root2.right);
}

// Q235
// LCA of a BSTc

// iterative
var lowestCommonAncestor = function (root, p, q) {
  while (root) {
    if (root.val < p.val && root.val < q.val) {
      root = root.right;
    } else if (root.val > p.val && root.val > q.val) {
      root = root.left;
    } else {
      break;
    }
  }
  return root;
  while (root) {
    if (root.val < p.val && root.val < q.val) {
      root = root.right;
    } else if (root.val > p.val && root.val > q.val) {
      root = root.left;
    } else {
      break;
    }
  }
  return root;
};

// recursive
var lowestCommonAncestor = function (root, p, q) {
  if (root.val < p.val && root.val < q.val) {
    return lowestCommonAncestor(root.right, p, q);
  }
  if (root.val > p.val && root.val > q.val) {
    return lowestCommonAncestor(root.left, p, q);
  }
  return root;
  if (root.val < p.val && root.val < q.val) {
    return lowestCommonAncestor(root.right, p, q);
  }
  if (root.val > p.val && root.val > q.val) {
    return lowestCommonAncestor(root.left, p, q);
  }
  return root;
};

// Q102
// binary tree level order traversal
// a
// recursive
function levelOrder(root, level = 0, result = []) {
  if (root) {
    // init subarray if it doesn't exist
    let arr = (result[level] = result[level] || []);
    arr.push(root.val);

    levelOrder(root.left, level + 1, result);
    levelOrder(root.right, level + 1, result);
  }
  return result;
}

// iterative
var levelOrder = function (root) {
  let q = [root],
    ans = [];
  while (q[0]) {
    let qlen = q.length,
      row = [];
    for (let i = 0; i < qlen; i++) {
      let curr = q.shift();
      row.push(curr.val);
      if (curr.left) q.push(curr.left);
      if (curr.right) q.push(curr.right);
    }
    ans.push(row);
  }
  return ans;
};

// Q105
//binary tree from preorder to inorder traversal
var buildTree = function (preorder, inorder) {
  if (!preorder.length) return null;
  const index = inorder.indexOf(preorder[0]);
  const left = buildTree(preorder.slice(1, index + 1), inorder.slice(0, index));
  const right = buildTree(preorder.slice(index + 1), inorder.slice(index + 1));
  return { val: preorder[0], left, right };
};

// iterative
var isValidBST = function (root) {
  let stack = [];
  let inorder = Number.NEGATIVE_INFINITY;

  while (stack.length > 0 || root != null) {
    while (root != null) {
      stack.push(root);
      root = root.left;
    }

    root = stack.pop();

    // if next element in inorder traversal
    // is smaller than the previous one
    // that's not BST

    if (root.val <= inorder) {
      return false;
    }

    inorder = root.val;
    root = root.right;
  }

  return true;
};

// recurve
var isValidBST = function (root, min = null, max = null) {
  if (!root) return true;
  if (min && root.val <= min.val) return false;
  if (max && root.val >= max.val) return false;
  return isValidBST(root.left, min, root) && isValidBST(root.right, root, max);
};

// Q 230.
// Kth Smallest Element in a BST

// recurve
var kthSmallest = function (root, k) {
  let treeStack = [];

  traverse(root);

  if (treeStack.length < k) {
    return null;
  } else {
    return treeStack[k - 1];
  }

  function traverse(root) {
    if (root.left) {
      traverse(root.left);
    }

    treeStack.push(root.val);

    if (root.right) {
      traverse(root.right);
    }
  }
};

// Q124
// Binary Tree maximum path sum
// A path in a binary tree is a sequence of nodes where each pair of adjacent nodes in the sequence has an edge connecting them. A node can only appear in the sequence at most once. Note that the path does not need to pass through the root.
// The path sum of a path is the sum of the node's values in the path.
// Given the root of a binary tree, return the maximum path sum of any path.
// Example 1:
// Input: root = [1,2,3]
// Output: 6
// Explanation: The optimal path is 2 -> 1 -> 3 with a path sum of 2 + 1 + 3 = 6.
// Example 2:
// Input: root = [-10,9,20,null,null,15,7]
// Output: 42
// Explanation: The optimal path is 15 -> 20 -> 7 with a path sum of 15 + 20 + 7 = 42.

// The Idea
// Use DFS
// If a branch's maximum sum is negative, we will never consider that route so we set it to 0
// Right before we backtrack, calculate the global maximum sum
// For the backtrack value, we return the current route's max sum
var maxPathSum = function (root) {
  let max = -Infinity;
  var recur = function (node) {
    if (node == null) return 0;
    let left = Math.max(0, recur(node.left)); // negative sums will just be ignored
    let right = Math.max(0, recur(node.right));
    max = Math.max(left + right + node.val, max); // calculate the global max
    return Math.max(left, right) + node.val; // return current route's best sum
  };
  recur(root);
  return max;
};

// Q208
// Implement Trie (Prefix Tree)

// The Idea
// Store the entire trie in an object
// Each node is an object that uses character as keys to connect to other characters
// Set isEnd to true for the last character node in a word
/**
 * Initialize your data structure here.
 */
var Trie = function () {
  this.root = {};
};

/**
 * Inserts a word into the trie.
 * @param {string} word
 * @return {void}
 */
Trie.prototype.insert = function (word) {
  let node = this.root;
  word.split('').forEach((char) => {
    if (!node[char]) node[char] = {};
    node = node[char];
  });
  node.isEnd = true;
};

/**
 * Returns if the word is in the trie.
 * @param {string} word
 * @return {boolean}
 */
Trie.prototype.search = function (word) {
  let node = this.searchNode(word);
  return node != null ? node.isEnd == true : false;
};

/** javaScript
 * Returns if there is any word in the trie that starts with the given prefix.
 * @param {string} prefix
 * @return {boolean}
 */
Trie.prototype.startsWith = function (prefix) {
  let node = this.searchNode(prefix);
  return node != null;
};

Trie.prototype.searchNode = function (word) {
  let node = this.root;
  for (let char of word.split('')) {
    if (node[char]) {
      node = node[char];
    } else {
      return null;
    }
  }
  return node;
};

// Q211
// /Design add adn search words data structure
// The idea
// Store words as trie
// Traverse trie using dfs
/**
 * Initialize your data structure here.
 */
var WordDictionary = function () {
  this.trie = {};
};

/**
 * Adds a word into the data structure.
 * @param {string} word
 * @return {void}
 */
WordDictionary.prototype.addWord = function (word) {
  let root = this.trie;
  for (let i = 0; i < word.length; i++) {
    if (root[word[i]] == null) root[word[i]] = {};
    root = root[word[i]];
  }
  root.isEnd = true;
};

/**
 * Returns if the word is in the data structure. A word could contain the dot character '.' to represent any one letter.
 * @param {string} word
 * @return {boolean}
 */
WordDictionary.prototype.search = function (word) {
  return this.dfs(word, 0, this.trie);
};

WordDictionary.prototype.dfs = function (word, index, node) {
  if (index == word.length) return node.isEnd == true;

  if (word[index] == '.') {
    for (let key in node) {
      if (this.dfs(word, index + 1, node[key])) return true;
    }
  } else {
    if (node[word[index]] != null) {
      return this.dfs(word, index + 1, node[word[index]]);
    }
  }
  return false;
};

/**
 * Your WordDictionary object will be instantiated and called as such:
 * var obj = new WordDictionary()
 * obj.addWord(word)
 * var param_2 = obj.search(word)
 */

// Q297
// Serialize and deserialize Binary tree

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
var serialize = function (root) {
  if (root === null) {
    return '';
  }
  var result = [];
  var queue = [root];

  while (queue.length > 0) {
    var node = queue.shift();

    if (node === null) {
      result.push('null');
      continue;
    }
    result.push(node.val);
    queue.push(node.left);
    queue.push(node.right);
  }

  // Remove the trailing nulls
  loop: for (var i = result.length - 1; i >= 0; i--) {
    if (result[i] === 'null') {
      result.splice(i, 1);
    } else {
      break loop;
    }
  }

  return result.toString();
};

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
var deserialize = function (data) {
  if (data === '') {
    return null;
  }
  var values = data.split(',');
  var root = new TreeNode(parseInt(values[0]));
  var queue = [root];
  for (var i = 1; i < values.length; i++) {
    var parent = queue.shift();

    if (values[i] !== 'null') {
      var left = new TreeNode(parseInt(values[i]));
      parent.left = left;
      queue.push(left);
    }
    if (values[++i] !== 'null' && i !== values.length) {
      var right = new TreeNode(parseInt(values[i]));
      parent.right = right;
      queue.push(right);
    }
  }

  return root;
};

/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */
