// Question 1
// Two Sum

// # Iteratively double for loop
let twoSum = (nums, target) => {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j];
      }
    }
  }
};

// Iteratively with map
let twoSum1 = (nums, target) => {
  let map = new Map();
  for (let i = 0; i < nums.length; i++) {
    if (map.has(target - nums[i])) {
      return [map.get(target - nums[i]), i];
    }
    map.set(nums[i], i);
  }
};

// Example 121
// Best Time to Buy and Sell Stock

// two pointer
let maxProfit = (prices) => {
  let profit = 0;
  let min = prices[0];

  for (let i = 1; i < prices.length; ++i) {
    if (min > prices[i]) {
      min = prices[i];
    } else if (prices[i] - min > profit) {
      profit = prices[i] - min;
    }
  }

  return profit;
};

// es6 foreach
let maxProfit1 = (prices) => {
  let currentMaxProfit = 0;
  let minPrice = prices[0];

  prices.forEach((price) => {
    const profitMargin = price - minPrice;
    if (profitMargin > currentMaxProfit) currentMaxProfit = profitMargin;
    if (price < minPrice) minPrice = price;
  });
  return currentMaxProfit;
};

//  Question 217
//  Contains duplicate

// using set
let containsDuplicate = (nums) => {
  // t=O(n), s=O(n)
  let set = new Set();
  for (const num of nums) {
    if (set.has(num)) {
      return true;
    } else {
      set.add(num);
    }
  }
  return false;
};

// using sort
let containsDuplicate2 = (nums) => {
  // t=O(nlogn), s=O(1)
  nums.sort((a, b) => a - b);

  for (let i = 0; i < nums.length - 1; i++) {
    if (nums[i] === nums[i + 1]) {
      return true;
    }
  }
  return false;
};

// using the idea set does not containe duplicate. length is less
let containsDuplicate3 = (nums) => {
  return new Set(nums).size !== nums.length;
};

// Q53
// Maximum subarray

let maxSubArray = (nums) => {
  let max = nums[0];
  let current = Math.max(max, 0);

  for (let i = 1; i < nums.length; i += 1) {
    current += nums[i];
    max = Math.max(max, current);
    current = Math.max(current, 0);
  }

  return max;
};

// Q238
// Product of array except self

let productExceptSelf = (nums) => {
  var output = [];
  var leftMult = 1;
  var rightMult = 1;
  for (var i = nums.length - 1; i >= 0; i--) {
    output[i] = rightMult;
    rightMult *= nums[i];
  }
  for (var j = 0; j < nums.length; j++) {
    output[j] *= leftMult;
    leftMult *= nums[j];
  }
  return output;
};

let productExceptSelf1 = (nums) => {
  // map and reduce
  return nums.map(function (curr, i, arr) {
    let temp = arr.slice();
    temp.splice(i, 1);
    return temp.reduce((product = 1, num) => product * num);
  });
};

let productExceptSelf3 = (nums) => {
  // recursive
  function recurseProd(i = 0, leftProd = 1) {
    if (i >= nums.length) return 1;
    const rightProd = recurseProd(i + 1, nums[i] * leftProd);
    const tmp = nums[i];
    nums[i] = leftProd * rightProd;
    return rightProd * tmp;
  }

  recurseProd(0, 1);
  return nums;
};

// Question 152
// Maximum Product Subarray

let maxProduct = (nums) => {
  let max = -Infinity;
  let currentMax = 1;
  let currentMin = 1;

  for (let i = 0; i < nums.length; i++) {
    let prevMax = currentMax;
    currentMax = Math.max(nums[i], prevMax * nums[i], currentMin * nums[i]);
    currentMin = Math.min(nums[i], prevMax * nums[i], currentMin * nums[i]);
    max = Math.max(currentMax, max);
  }

  return max;
};

// Q153
// Find Minimum in Rotated Sorted Array

let findMin = (nums) => {
  res = nums[0];
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    if (nums[left] < nums[right]) {
      res = Math.min(res, nums[left]);
      break;
    }
    let pivot = Math.floor((right + left) / 2);
    res = Math.min(res, nums[pivot]);
    if (nums[m] >= nums[l]) {
      left = pivot + 1;
    } else {
      right = pivot - 1;
    }
  }

  return res;
};

// Q33
// Search in Rotated Sorted Array

let search = (nums, target) => {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);

    if (nums[mid] === target) {
      return mid;
    }

    // When dividing the roated array into two halves, one must be sorted.

    // Check if the left side is sorted
    if (nums[left] <= nums[mid]) {
      if (nums[left] <= target && target <= nums[mid]) {
        // target is in the left
        right = mid - 1;
      } else {
        // target is in the right
        left = mid + 1;
      }
    }

    // Otherwise, the right side is sorted
    else {
      if (nums[mid] <= target && target <= nums[right]) {
        // target is in the right
        left = mid + 1;
      } else {
        // target is in the left
        right = mid - 1;
      }
    }
  }
  c;
  return -1;
};

// Q15
// 3Sum

let threeSum = (nums) => {
  const result = [];
  let target = 0;

  // we need 3 values for this to work
  // so return an empty array if we have less than 3
  if (nums.length < 3) {
    return result;
  }

  // sorting is ok because the function is already O(n^2)
  // and sort is O(nlogn)
  // this also lets us stop iterating once weve passed the target value
  nums = nums.sort((a, b) => a - b);

  // well use i as our anchor as we move through the array
  // we stop at nums.length - 2 to prevent undefined for k
  for (let i = 0; i < nums.length - 2; i++) {
    // because we sorted the array already
    // we can stop here if the current iterator is greater than the target value
    if (nums[i] > target) {
      break;
    }

    // if our iterator is the same as the previous value
    // skip it to prevent duplicate results
    if (i > 0 && nums[i] === nums[i - 1]) {
      continue;
    }

    // start j at i + 1
    let j = i + 1;

    // start k at end of array
    let k = nums.length - 1;

    // walking j and k towards each other to find all possible values
    // with i as our anchor value
    while (j < k) {
      let sum = nums[i] + nums[j] + nums[k];
      if (sum === target) {
        result.push([nums[i], nums[j], nums[k]]);

        // skip duplicate values of j and k
        while (nums[j] === nums[j + 1]) j++;
        while (nums[k] === nums[k - 1]) k--;

        // move j and k inward
        j++;
        k--;
      }
      if (sum < target) {
        j++;
      }
      if (sum > target) {
        k--;
      }
    }
  }
  return result;
};

// Q11
// Container with Most Water

let maxArea = (height) => {
  let ans = 0,
    i = 0,
    j = height.length - 1;
  while (i < j) {
    ans = Math.max(ans, Math.min(height[i], height[j]) * (j - i));
    height[i] <= height[j] ? i++ : j--;
  }
  return ans;
};

// Extra

// Q1299
// replace elemenet with greatest ele on right side

const replaceEle = (arr) => {
  // variables
  let rightMax = -1;
  let lastIdx = arr.length - 1;

  // traverse the arr in reverse
  for (let i = lastIdx; i >= 0; i--) {
    let newMax = Math.max(rightMax, arr[i]);
    arr[i] = rightMax;
    rightMax = newMax;
  }
  return arr;
};

// Example 121
// pascal triangle

// DP
let pasvalTri = (numOfRows) => {
  let pt = [];

  for (let i = 0; i < numOfRows; i++) {
    pt[i] = [];
    for (let j = 0; j < i + 1; j++) {
      if (j == 0 || j == i) {
        pt[i][j] = 1;
      } else {
        pt[i][j] = pt[i - 1][j - 1] + pt[i - 1][j];
      }
    }
  }
  return pt;
};

// Example 66
// plus one

let plusOne = (digits) => {
  for (var i = digits.length - 1; i >= 0; i--) {
    digits[i]++;
    if (digits[i] > 9) {
      digits[i] = 0;
    } else {
      return digits;
    }
  }
  digits.unshift(1);
  return digits;
};

// Example 108
// convert sorted array to bi tree

let arrToTree = (nums) => {
  function helper(l, r) {
    // base case
    if (l > r) return null;

    let m = Math.round((l + r) / 2);
    let root = new TreeNode(nums[m]);
    root.left = helper(l, m - 1);
    root.right = helper(m + 1, r);
    return root;
  }
  return helper(0, nums.length - 1);
};

// Example 1046
// last stone weight

let lastStoneWeight = (stones) => {
  while (stones.length > 1) {
    let max1 = Math.max(...stones);
    stones.splice(stones.indexOf(max1), 1);
    let max2 = Math.max(...stones);
    stones.splice(stones.indexOf(max2), 1);
    if (max1 !== max2) stones.push(Math.abs(max1 - max2));
  }
  return stones[0] || 0;
};

// Q 35
// search insert position

// binary search
let BinarySearch = (nums, target) => {
  let l = 0;
  let r = nums.length - 1;

  while (l <= r) {
    let m = Math.round((l + r) / 2);
    if (nums[m] === target) {
      return m;
    }
    if (target > nums[m]) {
      l = m + 1;
    } else {
      r = m - 1;
    }
  }
  return l;
};

// Q953
// verifiying an alian dict

// binary search
let verifyingAlienDict = (words, order) => {
  let orderIdx = new Map();
  for (let i = 0; i < order.length; i++) {
    let char = order[i];
    orderIdx[char] = i;
  }

  for (let i = 0; i < words.length - 1; i++) {
    let w1 = words[i];
    let w2 = words[i + 1];

    for (let j = 0; j < w1.length; j++) {
      if (j == w2.length) {
        return false;
      }
      if (w1[j] != w2[j]) {
        if (orderIdx[w2[j]] < orderIdx[w1[j]]) {
          return false;
        }
        break;
      }
    }
  }
  return true;
};

// Q88
// merge Sorted Array

// merge sort
let merge = (nums1, m, nums2, n) => {
  let idx1 = m - 1,
    idx2 = n - 1,
    idx3 = m + n - 1;
  while (idx2 >= 0) {
    nums1[idx3--] = nums1[idx1] > nums2[idx2] ? nums1[idx1--] : nums2[idx2--];
  }
};

// Example 121
// Best Time to Buy and Sell Stock II

// two pointer
let maxProfit = (prices) => {
  let profit = 0;

  for (let i = 0; i < prices.length; i++) {
    if (prices[i] < prices[i + 1]) {
      profit += prices[i + 1] - prices[i];
    }
  }

  return profit;
};

// Q189
// rotate array

let rotateArr = (nums) => {
  for (let i = 0; i < k; i++) {
    nums.unshift(nums.pop());
  }
};

let rotateArr = (nums) => {
  k = k % nums.length;
  let left = 0;
  let right = nums.length - 1;

  reverse(left, right);
  reverse(left, k - 1);
  reverse(k, right);

  function reverse(l, r) {
    while (l < r) {
      [nums[l], nums[r]] = [nums[r], nums[l]];
      l++;
      r--;
    }
  }
  return nums;
};

// Q36
// rotate array

let validSudoku = (board) => {
  for (let i = 0; i < 9; i++) {
    let row = new Set(),
      col = new Set(),
      box = new Set();

    for (let j = 0; j < 9; j++) {
      let _row = board[i][j];
      let _col = board[j][i];
      let _box =
        board[3 * Math.floor(i / 3) + Math.floor(j / 3)][3 * (i % 3) + (j % 3)];

      if (_row != '.') {
        if (row.has(_row)) return false;
        row.add(_row);
      }
      if (_col != '.') {
        if (col.has(_col)) return false;
        col.add(_col);
      }

      if (_box != '.') {
        if (box.has(_box)) return false;
        box.add(_box);
      }
    }
  }
  return true;
};

// Q287
// find the duplicate number

let findDupNum = (nums) => {
  let slow = nums[0];
  let fast = nums[nums[0]];

  while (slow != fast) {
    // we are guaranteed to have a cycle
    slow = nums[slow];
    fast = nums[nums[fast]];
  }

  slow = 0;

  while (slow != fast) {
    slow = nums[slow];
    fast = nums[fast];
  }

  return slow;
};

// Q128
// longest consectueive sequence

let lcs = (nums) => {
  let set = new Set(nums);
  let longest = 0;

  for (let n of nums) {
    if (!set.has(n - 1)) {
      let len = 0;
      while (set.has(n + len)) {
        len++;
      }
      longest = Math.max(len, longest);
    }
  }
  return longest;
};

// Q41
// first missing pos

let firstMissingPos = (nums) => {
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] < 0) {
      nums[i] = 0;
    }
  }

  for (let i = 0; i < nums.length; i++) {
    val = Math.abs(nums[i]);
    if (1 <= val && val <= nums.length) {
      if (nums[val - 1] > 0) {
        nums[val - 1] = -nums[val - 1];
      }
      if (nums[val - 1] === 0) {
        nums[val - 1] = -1 * (nums.length + 1);
      }
    }
  }

  for (let i = 1; i < nums.length + 1; i++) {
    if (nums[i - 1] >= 0) {
      return i;
    }
  }
  return nums.length + 1;
};
