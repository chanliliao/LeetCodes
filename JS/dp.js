// Question 70
// Climbing Stairs

let climbStairs = (n) => {
  // fibinaci algo
  let prev = 0;
  let cur = 1;
  let temp;

  for (let i = 0; i < n; i++) {
    temp = prev;
    prev = cur;
    cur += temp;
  }
  return cur;
};

let climbStairs1 = (n, memo = { 1: 1, 2: 2 }) => {
  // using memoization and recursion
  if (memo[n] !== undefined) return memo[n];
  memo[n] = climbStairs(n - 1, memo) + climbStairs(n - 2, memo);
  return memo[n];
};

// Q198
// house robber

var rob2 = function (nums) {
  let memo = [];
  memo[0] = 0;
  memo[1] = nums[0];

  for (let i = 1; i < nums.length; i++) {
    memo[i + 1] = Math.max(memo[i], memo[i - 1] + nums[i]);
  }

  return memo[nums.length];
};

// Q322
// // Coin Change

const coinChange = (coins, amount) => {
  // dp[i] represents the least amount of coins that can make the value equals to the i
  const dp = Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  for (let i = 1; i <= amount; i++) {
    for (const coin of coins) {
      if (i - coin >= 0) {
        dp[i] = Math.min(dp[i], dp[i - coin] + 1);
      }
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
};

// Q300
// Longest incraseing subsquence

var lengthOfLIS = function (nums) {
  const dp = Array.from(nums, () => 1);

  for (let i = 1; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[i] > nums[j]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
  }

  return Math.max(...dp);
};

// Q1143
// Longest common subsquence

let lcs = (t1, t2) => {
  const dp = Array(t1.length + 1)
    .fill(0)
    .map(() => Array(t2.length + 1).fill(0));

  for (let i = 1; i <= text1.length; i++) {
    for (let j = 1; j <= text2.length; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        dp[i][j] = 1 + dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }
  return dp[0][0];
};

// Q62

// brute force recursive
const uniquePaths = (m, n) => {
  return helper(m, n, 1, 1);
};

const helper = (m, n, row, col) => {
  if (row === m && col === n) return 1;
  if (row > m || col > n) return 0;

  const pathsRight = helper(m, n, row, col + 1);
  const pathsDown = helper(m, n, row + 1, col);

  return pathsRight + pathsDown;
};

// Q 139
// Word Break

const wordBreak = (s, wordDict) => {
  if (wordDict == null || wordDict.length === 0) return false;

  const set = new Set(wordDict);
  const dp = Array(s.length + 1).fill(false);
  dp[0] = true;

  for (let end = 1; end <= s.length; end++) {
    for (let start = 0; start < end; start++) {
      const w = s.slice(start, end);
      if (dp[start] === true && set.has(w)) {
        dp[end] = true;
        break;
      }
    }
  }
  return dp[s.length];
};

//Q337
// Combination sum IV

// TC = O(mn); SC = O(m)
var combinationSum4 = function (nums, target) {
  const dp = Array(target + 1).fill(0);
  dp[0] = 1;

  // for each target sum, find the number of combinations possible
  for (let i = 1; i <= target; ++i) {
    nums.forEach((num) => {
      if (i >= num) {
        dp[i] += dp[i - num];
      }
    });
  }
  return dp[target];
};

// Q213

// the idea is to get two dp array one with the first house and one with the last house
var rob2 = function (nums) {
  let n = nums.length;
  if (n === 0) return 0;
  if (n === 1) return nums[0];
  if (n === 2) return Math.max(nums[0], nums[1]);

  let dp1 = new Array(n);
  let dp2 = new Array(n);

  computeResult(0, n - 2, dp1, nums);
  computeResult(1, n - 1, dp2, nums);

  function computeResult(i, n, dp, nums) {
    dp[i] = nums[i];
    dp[i + 1] = Math.max(dp[i], nums[i + 1]);

    for (let j = i + 2; j <= n; j++) {
      dp[j] = Math.max(dp[j - 1], dp[j - 2] + nums[j]);
    }
  }
  return Math.max(dp1[n - 2], dp2[n - 1]);
};

// Q91
// decode ways

const numDecodings = (s) => {
  const dp = Array(s.length + 1).fill(0);
  dp[0] = 1;
  for (let i = 1; i <= s.length; i++) {
    const one = Number(s.slice(i - 1, i)); // '0' to '9'
    const two = Number(s.slice(i - 2, i)); // '00' to '99'
    if (one !== 0) dp[i] += dp[i - 1]; // We want [1, 9]
    if (10 <= two && two <= 26) dp[i] += dp[i - 2]; // We want [10, 26]
  }
  return dp[s.length];
};

// DP
var uniquePaths = function (m, n) {
  let dp = new Array(m).fill(0).map(() => new Array(n));
  for (let row = 0; row < m; row++) {
    for (let col = 0; col < n; col++) {
      if (row === 0 || col === 0) {
        dp[row][col] = 1;
      } else {
        dp[row][col] = dp[row - 1][col] + dp[row][col - 1];
      }
    }
  }
  return dp[m - 1][n - 1];
  // T.C: O(M*N)
  // S.C: O(M*N)
};

// Q55
// jump game

var canJump = function (nums) {
  let max = 0;

  for (let i = 0; i < nums.length; i++) {
    if (i > max) return false;

    if (i + nums[i] >= nums.length - 1) return true;

    max = Math.max(max, i + nums[i]);
  }
};
