// Question 242
// Valid Anagram
// Given two strings s and t , write a function to determine if t is an anagram of s.
// Example 1:
// Input: s = "anagram", t = "nagaram"
// Output: true

const isAnagram1 = (s, t) => {
  let map = {};
  if (s.length !== t.length) {
    return false;
  }
  for (let i = 0; i < s.length; i++) {
    map[s[i]] = ++map[s[i]] || 1;
  }
  for (let i = 0; i < t.length; i++) {
    if (!map[t[i]]) return false;
    map[t[i]]--;
  }
  return true;
};

const isAnagram2 = (s, t) => {
  let newS = s.split('').sort().join();
  let newT = t.split('').sort().join();
  return newS === newT ? true : false;
};

// console.log(isAnagram1('abbbc', 'babbb'));

// Question 20
// Valid Parentheses
// Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.
// An input string is valid if:
// Open brackets must be closed by the same type of brackets.
// Open brackets must be closed in the correct order.
// Example 1:
// Input: s = "()"
// Output: true
// Example 2:
// Input: s = "()[]{}"
// Output: true
// Example 3:
// Input: s = "(]"
// Output: false

let isValid = (s) => {
  // const stack = [];
  // const map = {
  //   '(': ')',
  //   '[': ']',
  //   '{': '}',
  // };

  // for (let i = 0; i < s.length; i++) {
  //   let c = s[i];
  //   if (map[c]) {
  //     stack.push(map[c]);
  //   } else if (c !== stack.pop()) {
  //     return false;
  //   }
  // }

  // return !stack.length;

  let n = -1;
  while (s.length != n) {
    n = s.length;
    s = s.replace('()', '');
    s = s.replace('[]', '');
    s = s.replace('{}', '');
  }
  if (s.length == 0) return 'YES';
  else return 'NO';
};

// console.log(isValid('{()()}'));

//Question 125
//Valid Palindrome
// Given a string s, determine if it is a palindrome, considering only alphanumeric characters and ignoring cases.
// Example 1:
// Input: s = "A man, a plan, a canal: Panama"
// Output: true
// Explanation: "amanaplanacanalpanama" is a palindrome.
// Example 2:
// Input: s = "race a car"
// Output: false
// Explanation: "raceacar" is not a palindrome.

let isPalindrome = (s) => {
  // using built in methods with regex
  //   Performance:
  // Small: 0.1633 ms
  // Medium: 0.1986 ms
  // Large: 1.5192 ms
  // Pros
  // Concise and very readable.
  // Easy to understand what is going on.
  // Cons
  // Not the most well-performing, namely on small strings.
  let reg = /[\W_]/g;
  let a = s.toLowerCase().replace(reg, '');
  let reverse = a.split('').reverse().join('');

  if (a === reverse) return true;
  return false;
};

let isPalindrome1 = (s) => {
  // for loop
  //  Performance:
  // Small: 0.0731 ms
  // Medium: 0.1267 ms
  // Large: 0.6272 ms
  // Pros
  // Performs very well, even on large strings.
  // We are able to return as soon as we identify the first violation.
  // Cons
  // In the world of ES6 and Bable, for loops aren't the most used anymore, and this solution appears a bit “clumsy” to read.
  let reg = /[\W_]/g;
  const cleanStr = s.toLowerCase().replace(reg, '');
  console.log(cleanStr);
  for (let i = 0; i < cleanStr.length / 2; i++) {
    if (cleanStr[i] !== cleanStr[cleanStr.length - 1 - i]) {
      return false;
    }
  }
  return true;
};

let isPalindrome2 = (s) => {
  // for of
  // Performance:
  // Small: 0.0415 ms
  // Medium: 0.0966 ms
  // Large: 0.9997 ms
  // Pros
  // Performs good, and looks fairly readable.
  // We are able to return as soon as we identify the first violation.
  // Cons
  // We imperatively mutate the array, which cost us a bit of performance.
  let reg = /[\W_]/g;
  const cleanStr = s.toLowerCase().replace(reg, '').split('');
  console.log(cleanStr);
  for (let c of cleanStr) {
    if (c !== cleanStr.pop()) {
      return false;
    }
  }
  return true;
};

let isPalindrome3 = (s) => {
  // for each
  // Performance:
  // Small: 0.0444 ms
  // Medium: 0.1487 ms
  // Large: 1.2537 ms
  // Pros
  // Plus points for using ES6 methods.
  // Overall more readable and easy to understand.
  // Cons
  // With forEach we cannot break the iteration, nor can we ensure only doing string.length / 2 total iterations.
  // This cost us a bit of performance.
  let reg = /[\W_]/g;
  const cleanStr = s.toLowerCase().replace(reg, '');
  console.log(cleanStr);
  let isPalindrome = true;
  cleanStr.split('').forEach((c, i) => {
    if (c !== cleanStr[cleanStr.length - 1 - i]) {
      isPalindrome = false;
    }
  });
  return isPalindrome;
};

let isPalindrome4 = (s) => {
  // map
  // Performance:
  // Small: 0.0644 ms
  // Medium: 0.1560 ms
  // Large: 0.9630 ms
  // Pros
  // Plus points for using ES6 methods.
  // Cons
  // With map we cannot break the iteration, nor can we ensure only doing string.length / 2 total iterations.
  // Additionally, we have to create a new list which cost extra memory, and we have to iterate through this new list — potentially — one whole extra time.
  // This cost us a bit of performance.
  let reg = /[\W_]/g;
  const cleanStr = s.toLowerCase().replace(reg, '');
  console.log(cleanStr);

  const letterMatches = cleanStr.split('').map((c, i) => {
    return c !== cleanStr[cleanStr.length - 1 - i];
  });

  console.log(letterMatches);
  return letterMatches.some((m) => !m);
};

let isPalindrome5 = (s) => {
  // reduce
  // Performance:
  // Small: 0.0425 ms
  // Medium: 0.1830 ms
  // Large: 0.8459 ms
  // Pros
  // Plus points for using ES6 methods.
  // Cons
  // With reduce we cannot break the iteration, nor can we ensure only doing string.length / 2 total iterations.
  // If the check fails early, we keep passing on false to the next iteration.
  // This may seem like quite a waste, namely on larger strings.
  let reg = /[\W_]/g;
  const cleanStr = s.toLowerCase().replace(reg, '');
  console.log(cleanStr);

  return cleanStr.split('').reduce((match, c, i) => {
    if (!match) {
      return false;
    }

    return c === cleanStr[cleanStr.length - 1 - i];
  }, true);
};

let isPalindrome6 = (s) => {
  // every
  // Performance:
  // Small: 0.0414 ms
  // Medium: 0.1977 ms
  // Large: 1.4204 ms
  // Pros
  // Very concise and easy to read.
  // Will break early if a character does not match.
  // Cons
  // We can’t ensure only doing string.length / 2 total iterations.
  // In the case of a palindrome, every will continue to iterate through the whole array.
  let reg = /[\W_]/g;
  const cleanStr = s.toLowerCase().replace(reg, '');
  console.log(cleanStr);

  return cleanStr
    .split('')
    .every((c, i) => c === cleanStr[cleanStr.length - 1 - i]);
};

let isPalindrome7 = (s) => {
  // recursion
  // Performance:
  //Small: 0.0842 ms
  // Medium: 5.1806 ms
  // Large: 108.5716 ms
  // Pros
  // The interviewer may give you credit for knowing how to handle recursion.
  // Other than that, there is probably not much good to say about this solution.
  // Cons
  // There are, on the other hand, some considerations here.
  // We are opening a lot of function closures, and a building up a — potentially — large call stack.
  // Notice how the performance on the large string blows through the roof here, compared to any of the previous solutions.
  let reg = /[\W_]/g;
  const cleanStr = s.toLowerCase().replace(reg, '');
  const strLength = cleanStr.length;
  console.log(cleanStr);

  if (strLength <= 1) {
    return true;
  }

  if (cleanStr[0] === cleanStr[strLength - 1]) {
    return isPalindrome7(cleanStr.slice(1, strLength - 1));
  } else {
    return false;
  }
};

// console.log(isPalindrome7('Aa man, a plan, a canal: Panama'));

// Q3
// Longest Substring Without Repeating Characters
// Given a string s, find the length of the longest substring without repeating characters.
// Example 1:
// Input: s = "abcabcbb"
// Output: 3
// Explanation: The answer is "abc", with the length of 3.
// Example 2:
// Input: s = "bbbbb"
// Output: 1
// Explanation: The answer is "b", with the length of 1.
// Example 3:
// Input: s = "pwwkew"
// Output: 3
// Explanation: The answer is "wke", with the length of 3.
// Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.
// Example 4:
// Input: s = ""
// Output: 0
// Constraints:
// 0 <= s.length <= 5 * 104
// s consists of English letters, digits, symbols and spaces.

let lenOfLongestSub = (s) => {
  // no map or set
  var sLen = s.length,
    maxLen = 0,
    maxStr = '',
    tmpStr,
    posIndex,
    i;

  for (i = 0; i < sLen; i++) {
    tmpStr = s[i];
    posIndex = maxStr.indexOf(tmpStr);

    if (posIndex > -1) {
      maxStr = maxStr.substring(posIndex + 1);
    }

    maxStr += tmpStr;
    maxLen = Math.max(maxLen, maxStr.length);
  }

  return maxLen;
};

let lenOfLongestSub1 = (s) => {
  //set = sliding window
  let seen = new Set();
  let longest = 0;
  let l = 0;
  for (let r = 0; r < s.length; r++) {
    while (seen.has(s[r])) {
      seen.delete(s[l]);
      l++;
    }
    seen.add(s[r]);
    longest = Math.max(longest, r - l + 1);
  }
  return longest;
};

// console.log(lenOfLongestSub(abcabcbb));

const precomputed = [0, 1, 2, 3];
let reverseArray = (n) => {
  while (n >= precomputed.length) {
    const x = precomputed.length;
    const sqrt = Math.floor(Math.sqrt(x));
    let min = precomputed[x - 1];
    for (let i = 2; i <= sqrt; i++) {
      if (x % i === 0) {
        min = Math.min(min, precomputed[x / i]);
      }
    }
    precomputed.push(1 + min);
  }
  return precomputed[n];
};

console.log(reverseArray(6));

// Q5
// Longest Palindromic substring
// Given a string s, return the longest palindromic substring in s.
// Example 1:
// Input: s = "babad"
// Output: "bab"
// Note: "aba" is also a valid answer.
// Example 2:
// Input: s = "cbbd"
// Output: "bb"
// Example 3:
// Input: s = "a"
// Output: "a"
// Example 4:
// Input: s = "ac"
// Output: "a"
// Constraints:
// 1 <= s.length <= 1000
// s consist of only digits and English letters (lower-case and/or upper-case),

let longestPalindrome = (s) => {
  var max = '';
  for (var i = 0; i < s.length; i++) {
    for (var j = 0; j < 2; j++) {
      var left = i;
      var right = i + j;
      while (s[left] && s[left] === s[right]) {
        left--;
        right++;
      }
      if (right - left - 1 > max.length) {
        max = s.substring(left + 1, right);
      }
    }
  }
  return max;
};

let longestPalindrome = (s) => {
  // using bubble sort
  let maxPal = '';

  for (let i = 0; i < s.length; i++) {
    bubble(i, i); // odd palindrome
    bubble(i, i + 1); // even palindrome
  }

  function bubble(left, right) {
    while (left >= 0 && s[left] === s[right]) {
      left--;
      right++;
    }
    left++;
    right--;

    if (maxPal.length < right - left + 1) {
      maxPal = s.slice(left, right + 1);
    }
  }
  return maxPal;
};

console.log(longestPalindrome('babad'));

// Q49
// Group Anagrams
// Given an array of strings strs, group the anagrams together. You can return the answer in any order.
// An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.
// Example 1:
// Input: strs = ["eat","tea","tan","ate","nat","bat"]
// Output: [["bat"],["nat","tan"],["ate","eat","tea"]]
// Example 2:
// Input: strs = [""]
// Output: [[""]]
// Example 3:
// Input: strs = ["a"]
// Output: [["a"]]

var groupAnagrams = function (strs) {
  let obj = {};
  for (let str of strs) {
    let letters = str.split('').sort().join('');
    obj[letters] ? obj[letters].push(str) : (obj[letters] = [str]);
  }
  return Object.values(obj);
};
// Time Complexity: O(n*klog(k)) where n is the length of input array and k is the maximum length of a string in input array
// Space Complexity: O(n)

var groupAnagrams = function (strs) {
  let m = new Map();
  for (let str of strs) {
    let sorted = str.split('').sort().join('');
    if (m.has(sorted)) m.set(sorted, [...m.get(sorted), str]);
    else m.set(sorted, [str]);
  }
  return Array.from(m.values());
};

// Time Complexity: O(n*klog(k)) where n is the length of input array and k is the maximum length of a string in input array
// Space Complexity: O(n)

var groupAnagrams = function (strs) {
  let res = {};
  for (let str of strs) {
    let count = new Array(26).fill(0);
    for (let char of str) count[char.charCodeAt() - 97]++;
    let key = count.join('#');
    res[key] ? res[key].push(str) : (res[key] = [str]);
  }
  return Object.values(res);
};
// Time Complexity: O(n*k) where n is the size of input array and k is the maximum length of string in input array
// Space Complexity: O(n)

/**
 * @param {string[]} strs
 * @return {string[][]}
 *
 * key point:
 * prime multiply prime is unique, each char canbe represented by a prime
 * since [a-z] to  [0-25]
 * use `[charCodeAt() - 97]` to get unique index from the prime array
 * the prodcut can be set to the key name "prod"
 **/
var groupAnagrams = function (strs) {
  const map = {};
  const primes = [
    2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71,
    73, 79, 83, 89, 97, 101,
  ];
  strs.forEach((str) => {
    let prod = str
      .split('')
      .reduce((r, c) => r * primes[c.charCodeAt() - 97], 1);
    map[prod] ? map[prod].push(str) : (map[prod] = [str]);
  });
  return Object.values(map);
};

// 424
//  Longest Repeating Character Replacement

// Maintain left and right pointer, max instances of a single char, and visit counts for each char.
// for each char in string
// increment visit count for this char
// if new visit count is higher than max, update max
// if length of current string without max char count is greater than k,
// then we know the new char made it such that there are more chars missing than can be replaced by k,
// so we will remove the first char
// and increment left pointer
// increment right pointer to look at next char.
// In the end, the answer is whatever the window size is. This is because we never shrink the window size.
// As we look at new chars, we increase the window size.
// Once we see we can no longer increase due to limitation of k, we slide the window forward.
// In these inbetween states, it's possible the window doesn't span a valid subset,
// but that doesn't matter because the window size at one point did span a valid set.
// Instead, we wait until there's a possibility of a better set, which is when there is a substring with more instances of some char.
const characterReplacement = (s, k) => {
  let left = 0;
  let right = 0;
  let maxCharCount = 0;
  const visited = {};

  while (right < s.length) {
    const char = s[right];
    visited[char] = visited[char] ? visited[char] + 1 : 1;

    if (visited[char] > maxCharCount) maxCharCount = visited[char];

    if (right - left + 1 - maxCharCount > k) {
      visited[s[left]]--;
      left++;
    }

    right++;
  }

  return right - left;
};

// Q76
// Minimum Window Substring
// Given two strings s and t of lengths m and n respectively, return the minimum window substring of s such that every character in t (including duplicates) is included in the window. If there is no such substring, return the empty string "".
// The testcases will be generated such that the answer is unique.
// A substring is a contiguous sequence of characters within the string.
// Example 1:
// Input: s = "ADOBECODEBANC", t = "ABC"
// Output: "BANC"
// Explanation: The minimum window substring "BANC" includes 'A', 'B', and 'C' from string t.
// Example 2:
// Input: s = "a", t = "a"
// Output: "a"
// Explanation: The entire string s is the minimum window.
// Example 3:
// Input: s = "a", t = "aa"
// Output: ""
// Explanation: Both 'a's from t must be included in the window.
// Since the largest window of s only has one 'a', return empty string.

// sliding window
var minWindow = function (s, t) {
  let m = new Map();
  for (let i = 0; i < t.length; i++) {
    m.set(t[i], m.get(t[i]) + 1 || 1);
  }
  let start = 0,
    end = 0;
  let minStart = null,
    minEnd = null;
  let uniqueChars = m.size; // # of unique characters in t
  while (end < s.length) {
    if (m.has(s[end])) {
      m.set(s[end], m.get(s[end]) - 1);
      // unique chars to collect decrements by 1
      if (m.get(s[end]) === 0) {
        uniqueChars -= 1;
      }
    }
    while (uniqueChars === 0 && start <= end) {
      if (minStart === null || minEnd - minStart > end - start) {
        minStart = start;
        minEnd = end;
      }
      if (m.has(s[start])) {
        m.set(s[start], m.get(s[start]) + 1);
        // unique chars to collect increments by 1
        if (m.get(s[start]) === 1) {
          uniqueChars += 1;
        }
      }
      start++;
    }
    end++;
  }
  return minStart === null ? '' : s.substring(minStart, minEnd + 1);
  // T.C: O(N)
  // S.C: O(N)
};
