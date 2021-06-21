// Question 1
// Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
// You may assume that each input would have exactly one solution, and you may not use the same element twice.
// You can return the answer in any order.
// Example 1:
// Input: nums = [2,7,11,15], target = 9
// Output: [0,1]
// Output: Because nums[0] + nums[1] == 9, we return [0, 1].
// Example 2:
// Input: nums = [3,2,4], target = 6
// Output: [1,2]

let twoSum = (nums, target) => {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j];
      }
    }
  }
  c;
};

let twoSum1 = (nums, target) => {
  let map = new Map();
  for (let i = 0; i < nums.length; i++) {
    if (map.has(target - nums[i])) {
      return [map.get(target - nums[i]), i];
    }
    map.set(nums[i], i);
  }
};

// console.log(twoSum1([3, 2, 4], 6));

// Example 121
// Best Time to Buy and Sell Stock
// You are given an array prices where prices[i] is the price of a given stock on the ith day.
// You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.
// Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.
// Example 1:
// Input: prices = [7,1,5,3,6,4]
// Output: 5
// Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.
// Note that buying on day 2 and selling on day 1 is not allowed because you must buy before you sell.
// Example 2:
// Input: prices = [7,6,4,3,1]
// Output: 0
// Explanation: In this case, no transactions are done and the max profit = 0.

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

// console.log(maxProfit1([7, 1, 5, 3, 6, 4]));

//  Question 217
//  Contains duplicate
// Given an array of integers, find if the array contains any duplicates.
// Your function should return true if any value appears at least twice in the array, and it should return false if every element is distinct.
// Example 1:
// Input: [1,2,3,1]
// Output: true

let containsDuplicate = (nums) => {
  // t=O(n), s=O(n)
  let map = new Set();
  for (const num of nums) {
    if (map.has(num)) {
      return true;
    } else {
      map.add(num);
    }
  }
  return false;
};

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

let containsDuplicate3 = (nums) => {
  // set does not include same number therefor if duplicate, length is less
  return new Set(nums).size !== nums.length;
};

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

//console.log(maxSubArray1([-2, 1, -3, 4, -1, 2, 1, -5, 4]));

// Q238
// Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i].
// The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.
// You must write an algorithm that runs in O(n) time and without using the division operation.
// Example 1:
// Input: nums = [1,2,3,4]
// Output: [24,12,8,6]
// Example 2:
// Input: nums = [-1,1,0,-3,3]
// Output: [0,0,9,0,0]
// Constraints:
// 2 <= nums.length <= 105
// -30 <= nums[i] <= 30
// The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.
// Follow up: Can you solve the problem in O(1) extra space complexity? (The output array does not count as extra space for space complexity analysis.)

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

let productExceptSelf2 = (nums) => {
  // O(1) space
  let result = [1],
    right = 1;
  for (let i = 1; i < nums.length; i++) {
    result.push(result[i - 1] * nums[i - 1]);
  }

  for (let i = nums.length - 1; i >= 0; i--) {
    result[i] = result[i] * right;
    right *= nums[i];
  }
  return result;
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

// console.log(productExceptSelf([1, 2, 3, 4]));

// Question 152
// Maximum Product Subarray
// Given an integer array nums, find a contiguous non-empty subarray within the array that has the largest product, and return the product.
// It is guaranteed that the answer will fit in a 32-bit integer.
// A subarray is a contiguous subsequence of the array.
// Example 1:
// Input: nums = [2,3,-2,4]
// Output: 6
// Explanation: [2,3] has the largest product 6.
// Example 2:
// Input: nums = [-2,0,-1]
// Output: 0
// Explanation: The result cannot be 2, because [-2,-1] is not a subarray.
// Constraints:
// 1 <= nums.length <= 2 * 104
// -10 <= nums[i] <= 10
// The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.

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

// console.log(maxProduct([2, 3, -2, 4, 6, -2, -2]));

// Q153
// Find Minimum in Rotated Sorted Array
// Suppose an array of length n sorted in ascending order is rotated between 1 and n times. For example, the array nums = [0,1,2,4,5,6,7] might become:
// [4,5,6,7,0,1,2] if it was rotated 4 times.
// [0,1,2,4,5,6,7] if it was rotated 7 times.
// Notice that rotating an array [a[0], a[1], a[2], ..., a[n-1]] 1 time results in the array [a[n-1], a[0], a[1], a[2], ..., a[n-2]].
// Given the sorted rotated array nums of unique elements, return the minimum element of this array.
// You must write an algorithm that runs in O(log n) time.
// Example 1:
// Input: nums = [3,4,5,1,2]
// Output: 1
// Explanation: The original array was [1,2,3,4,5] rotated 3 times.
// Example 2:
// Input: nums = [4,5,6,7,0,1,2]
// Output: 0
// Explanation: The original array was [0,1,2,4,5,6,7] and it was rotated 4 times.
// Example 3:
// Input: nums = [11,13,15,17]
// Output: 11
// Explanation: The original array was [11,13,15,17] and it was rotated 4 times.
// Constraints:
// n == nums.length
// 1 <= n <= 5000
// -5000 <= nums[i] <= 5000
// All the integers of nums are unique.
// nums is sorted and rotated between 1 and n times.

let findMin = (nums) => {
  let left = 0;
  let right = nums.length - 1;

  if (nums[left] <= nums[right]) {
    return nums[left];
  }

  while (left < right) {
    let pivot = left + (right - left) / 2;
    if (nums[pivot] >= nums[0]) {
      left = pivot + 1;
    } else {
      right = pivot;
    }
  }

  return nums[left];
};

console.log(findMin([3, 4, 5, 1, 2]));

// Q33
// Search in Rotated Sorted Array
// There is an integer array nums sorted in ascending order (with distinct values).
// Prior to being passed to your function, nums is rotated at an unknown pivot index k (0 <= k < nums.length) such that the resulting array is [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]] (0-indexed). For example, [0,1,2,4,5,6,7] might be rotated at pivot index 3 and become [4,5,6,7,0,1,2].
// Given the array nums after the rotation and an integer target, return the index of target if it is in nums, or -1 if it is not in nums.
// You must write an algorithm with O(log n) runtime complexity.
// Example 1:
// Input: nums = [4,5,6,7,0,1,2], target = 0
// Output: 4
// Example 2:
// Input: nums = [4,5,6,7,0,1,2], target = 3
// Output: -1
// Example 3:
// Input: nums = [1], target = 0
// Output: -1
// Constraints:
// 1 <= nums.length <= 5000
// -104 <= nums[i] <= 104
// All values of nums are unique.
// nums is guaranteed to be rotated at some pivot.
// -104 <= target <= 104

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

  return -1;
};

console.log(search([4, 5, 6, 7, 0, 1, 2, 3], 0));
