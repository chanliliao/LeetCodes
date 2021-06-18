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

// Question 190
// Reverse bits of a given 32 bits unsigned integer.
// Note:
// Note that in some languages such as Java, there is no unsigned integer type. In this case, both input and output will be given as a signed integer type. They should not affect your implementation, as the integer's internal binary representation is the same, whether it is signed or unsigned.
// In Java, the compiler represents the signed integers using 2's complement notation. Therefore, in Example 2 above, the input represents the signed integer -3 and the output represents the signed integer -1073741825.
// Follow up:
// If this function is called many times, how would you optimize it?
// Example 1:
// Input: n = 00000010100101000001111010011100
// Output:    964176192 (00111001011110000010100101000000)
// Explanation: The input binary string 00000010100101000001111010011100 represents the unsigned integer 43261596, so return 964176192 which its binary representation is 00111001011110000010100101000000.

let reverseBits = (n) => {
  return parseInt(
    n.toString(2).padStart(32, '0').split('').reverse().join(''),
    2
  );
};

let reverseBits1 = (n) => {
  let res = 0; //convert binary to decimal(32bit integer)
  let index = 31; //32bit 0-31index
  while (n > 0) {
    //no num anymore
    if (n % 2 != 0) {
      //n's rightmost digit is 1 similar like n % 10 get rightmost digit
      res += Math.pow(2, index); //reverse & convert to decimal at the same time
    }
    n = Math.floor(n / 2); //right shift  similar n/10 get rest of num exclude current digit
    index--;
  }
  return res;
};

//console.log(reverseBits1('00000010100101000001111010011100'));
