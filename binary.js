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

// Q191
// Num of 1 Bits
// Write a function that takes an unsigned integer and returns the number of '1' bits it has (also known as the Hamming weight).
// Note:
// Note that in some languages, such as Java, there is no unsigned integer type. In this case, the input will be given as a signed integer type. It should not affect your implementation, as the integer's internal binary representation is the same, whether it is signed or unsigned.
// In Java, the compiler represents the signed integers using 2's complement notation. Therefore, in Example 3, the input represents the signed integer. -3.
// Example 1:
// Input: n = 00000000000000000000000000001011
// Output: 3
// Explanation: The input binary string 00000000000000000000000000001011 has a total of three '1' bits.
// Example 2:
// Input: n = 00000000000000000000000010000000
// Output: 1
// Explanation: The input binary string 00000000000000000000000010000000 has a total of one '1' bit.
// Example 3:
// Input: n = 11111111111111111111111111111101
// Output: 31
// Explanation: The input binary string 11111111111111111111111111111101 has a total of thirty one '1' bits.

let hammingWeight = (n) => {
  let sum = 0;

  while (n != 0) {
    sum += n & 1;
    n = n >>> 1;
  }

  return sum;
};

let hammingWeight2 = (n) => {
  // remove 0s from base2 representation of the number
  return n.toString(2).replace(/0/g, '').length;
};

console.log(hammingWeight2(00000000000000000000000000001011));

// Q371
// sum of two integers
// Given two integers a and b, return the sum of the two integers without using the operators + and -.
// Example 1:
// Input: a = 1, b = 2
// Output: 3
// Example 2:
// Input: a = 2, b = 3
// Output: 5
// Constraints:
// -1000 <= a, b <= 1000

let getSum = (a, b) => {
  let carry;
  while ((a & b) !== 0) {
    carry = (a & b) << 1;
    a = a ^ b;
    b = carry;
  }
  return a ^ b;
};

var getSum1 = function (a, b) {
  // recursive
  return b ? getSum(a ^ b, (a & b) << 1) : a;
};

// Ok, so we all know that numbers represented on computers are groups of 1's and 0's (binary, two states). Like in decimal, what we are all familar with (base 10), when we add numbers and they exceed the base (10), we add to the next column left.

// For example adding 5+6 (both numbers using "units" place), and get 1 (tens place) and 1 (units place). The point is, that adding numbers will fill the "units" bucket, and overflow to the next one as needed. So, what's important? Add the numbers to the "units" bucket, and keep track of the overflow.

// in binary, xor or ^ will add digits (but doesn't care about overflow). XOR/exclusive or, works like or, but if both are positive, it switches to negative,

// so 4+3
// 100
// 011

// 111 (because 1 or 0 is 1 in xor)
// this makes sense because in binary, 3+4 also equals 7

// what about 5+1?
// 101
// 001

// 100, that's 4, but 5+1 = 6, not four. That's because we have a carry. The rightmost 1's should carry to the next place, so that's where the next part of the process comes, the &. The AND will only return 1 when both are 1 so, so 001+001 = 001, and we shift it left with << 1, so it becomes 010 or 2, so it's 4(100)+2(010) which equals 6 (110)

// So, for this to work we need to add the numbers with xOR ^, and also add the carry that comes from AND &.

// When we do that, it's possible that again, we have a carry, so we would need to repeat. think about binary of 3+7.
// 011 (3)
// 111 (7)
// XOR
// 100 (4)

// AND
// 011 (3) since it is the carry, we shift <<1, so it becomes 110 or 6. now we add using ^, but that gets us

// 100
// 110
// XOR
// 010 or 2, but we also still have a new carry which is 100 & 110 or 100 and shifted <<1 is 1000. add that to the 010 and we have 1010 or 10.

// So the point of the second example is that you keep having to run the operation whenever there is a carry. In my first example I did it with the loop, below with recursion.

// Recursive with syntactic sugar

// var getSum = function(a, b) {
// return b ? getSum(a ^ b, (a & b) << 1) : a;
// };
// I hope this example helped to understand how the binary operations actually happen, if it helped you, maybe you could upvote it so others might notice it.

// Btw, it's called a half adder and is physically used in building physical memory/computer systems. I learned in at UMD, College Park in CS311 computer architecture a long time ago, happy to see that it was useful :-)

// If this post helped, please upvote it so others can notice and read it. thanks!
