// Q104
// Max Depth of binary tree

// Iterative BFS
var maxDepth = function (root) {
  if (!root) return 0;
  let queue = [root];
  let max = 0;
  while (queue.length > 0) {
    let len = queue.length;
    max++;
    for (let i = 0; i < len; i++) {
      let node = queue.shift();
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }
  return max;
};

// Iterative DFS preorder r, l ,r order
var maxDepth = function (root) {
  let stack = [[root, 1]];
  let ans = 0;
  while (stack.length) {
    let [node, depth] = stack.pop();

    if (!node) {
      ans = Math.max(ans, depth);
      stack.push([node.left, depth + 1]);
      stack.push([node.right, depth + 1]);
    }
  }
  return ans;
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
// iterative BFS
let sameTree = (p, q) => {
  let queue = [[p, q]];

  while (queue.length) {
    let [x, y] = queue.shift();

    // if both leaves
    if (x == null && y == null) continue;
    if (!x || !y) return false;
    if (x.val == y.val) {
      queue.push([x.left, y.left]);
      queue.push([x.right, y.right]);
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

  function isEqual(root1, root2) {
    // if one is null, both have to be null
    if (!root1 || !root2) return !root1 && !root2;
    // at this point both node have sth so need to check val
    if (root1.val !== root2.val) return false;
    return isEqual(root1.left, root2.left) && isEqual(root1.right, root2.right);
  }
};

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
};

// Q102
// binary tree level order traversal
// a
// recursive
function levelOrder(root) {
  const result = [];

  function traverse(node, level) {
    if (!node) return;

    if (!result[level]) result[level] = [node.val];
    else result[level].push(node.val);

    traverse(node.left, level + 1);
    traverse(node.right, level + 1);
  }

  traverse(root, 0);
  return result;
}

// iterative BFS
var levelOrder = function (root) {
  if (!root) return [];
  let q = [root],
    ans = [];
  while (q.length > 0) {
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
  let root = preorder[0];
  const mid = inorder.indexOf(root);
  let newNode = new TreeNode(root);
  newNode.left = buildTree(preorder.slice(1, mid + 1), inorder.slice(0, mid));
  newNode.right = buildTree(preorder.slice(mid + 1), inorder.slice(mid + 1));

  return newNode;
};

// iterative DFS
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
var isValidBST = function (root, min = -Infinity, max = Infinity) {
  if (root === null) return true;
  if (root.val <= min || root.val >= max) return false;
  return (
    isValidBST(root.right, root.val, max) &&
    isValidBST(root.left, min, root.val)
  );
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

// iteravtily stack DFS inroder
var kthSmallest = function (root, k) {
  let n = 0;
  let stack = [];
  let curr = root;
  while (curr && stack) {
    while (curr) {
      stack.push(curr);
      curr = curr.left;
    }
    curr = stack.pop();
    n += 1;
    if (n === k) {
      return curr.val;
    }
    curr = curr.right;
  }
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

// Q124
// Binary Tree maximum path sum

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
