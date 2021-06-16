// Question 268
// Missing Number
// Given an array nums containing n distinct numbers in the range [0, n], return the only number in the range that is missing from the array.
// Follow up: Could you implement a solution using only O(1) extra space complexity and O(n) runtime complexity?
// Example 1:
// Input: nums = [3,0,1]
// Output: 2
// Explanation: n = 3 since there are 3 numbers, so all numbers are in the range [0,3]. 2 is the missing number in the range since it does not appear in nums.
// Example 2:
// Input: nums = [0,1]
// Output: 2
// Explanation: n = 2 since there are 2 numbers, so all numbers are in the range [0,2]. 2 is the missing number in the range since it does not appear in nums.
// Example 3:
// Input: nums = [9,6,4,2,3,5,7,0,1]
// Output: 8
// Explanation: n = 9 since there are 9 numbers, so all numbers are in the range [0,9]. 8 is the missing number in the range since it does not appear in nums.

let missingNumber = (nums) => {
  let a = new Set(nums);
  for (let i = 0; i <= nums.length; i++) {
    if (!a.has(i)) {
      return i;
    }
  }
};

let missingNumber1 = (nums) => {
  // sort function
  nums.sort((a, b) => a - b);

  for (let i = 0; i <= nums.length; i++) {
    if (i !== nums[i]) {
      return i;
    }
  }
};

let missingNumber2 = (nums) => {
  // sort function
  return nums.reduce((acc, val, i) => (acc += i + 1 - val), 0);
};

//console.log(missingNumber2([9,6,5,4,7,1,2,3,0]))
