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

// console.log(findMin([3, 4, 5, 1, 2]));

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
// Constraints:c
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

// console.log(search([4, 5, 6, 7, 0, 1, 2, 3], 0));

// Q15
// 3Sum
// Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.
// Notice that the solution set must not contain duplicate triplets.
// Example 1:
// Input: nums = [-1,0,1,2,-1,-4]
// Output: [[-1,-1,2],[-1,0,1]]
// Example 2:
// Input: nums = []
// Output: []
// Example 3:
// Input: nums = [0]
// Output: []
// Constraints:
// 0 <= nums.length <= 3000
// -105 <= nums[i] <= 105

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
        continue;
      }
      if (sum < target) {
        j++;
        continue;
      }
      if (sum > target) {
        k--;
        continue;
      }
    }
  }
  return result;
};

// console.log(threeSum([-1, 0, 1, 2, -1, 4]));

// Q11
// Container with Most Water
// Given n non-negative integers a1, a2, ..., an , where each represents a point at coordinate (i, ai). n vertical lines are drawn such that the two endpoints of the line i is at (i, ai) and (i, 0). Find two lines, which, together with the x-axis forms a container, such that the container contains the most water.
// Notice that you may not slant the container.
// Example 1:
// Input: height = [1,8,6,2,5,4,8,3,7]
// Output: 49
// Explanation: The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water (blue section) the container can contain is 49.
// Example 2:
// Input: height = [1,1]
// Output: 1
// Example 3:
// Input: height = [4,3,2,1,4]
// Output: 16
// Example 4:
// Input: height = [1,2,1]
// Output: 2

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

console.log(maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7]));
