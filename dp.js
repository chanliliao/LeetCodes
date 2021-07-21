// Question 70
// Climbing Stairs
// You are climbing a staircase. It takes n steps to reach the top.
// Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?
// Example 1:
// Input: n = 2
// Output: 2
// Explanation: There are two ways to climb to the top.
// 1. 1 step + 1 step
// 2. 2 steps
// Example 2:
// Input: n = 3
// Output: 3
// Explanation: There are three ways to climb to the top.
// 1. 1 step + 1 step + 1 step
// 2. 1 step + 2 steps
// 3. 2 steps + 1 step
// Constraints:
// 1 <= n <= 45

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

console.log(climbStairs1(7));

// question 53
// Maximum subarray
// Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.
// Example 1:
// Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
// Output: 6
// Explanation: [4,-1,2,1] has the largest sum = 6.
// Example 2:
// Input: nums = [1]
// Output: 1
// Example 3:
// Input: nums = [5,4,-1,7,8]
// Output: 23

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

let maxSubArray1 = (nums) => {
  // DP
  for (let i = 1; i < nums.length; i++) {
    nums[i] = Math.max(nums[i], nums[i] + nums[i - 1]);
  }
  return Math.max(...nums);
};
