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

// iterative
var isValidBST = function (root) {
  let map = new Map();
  inorder.forEach((ele, index = 0) => map.set(ele, index));

  return buildTreeHelper(0, inorder.length - 1);
  function buildTreeHelper(startPtr, endPtr) {
    if (startPtr > endPtr) return null;

    const value = preorder.shift();
    const index = map.get(value);
    const root = new TreeNode(value);

    root.left = buildTreeHelper(startPtr, index - 1);
    root.right = buildTreeHelper(index + 1, endPtr);

    return root;
  }
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
  if (inorder.length === 0) return null;

  const root = new TreeNode(preorder.shift());
  const indexOfRoot = inorder.indexOf(root.val);

  root.left = buildTree(preorder, inorder.slice(0, indexOfRoot));
  root.right = buildTree(preorder, inorder.slice(indexOfRoot + 1));

  return root;
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
