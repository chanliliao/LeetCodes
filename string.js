// Question 387
// First Unique Character in a String
// Given a string, find the first non-repeating character in it and return its index. If it doesn't exist, return -1.
// Examples:
// s = "leetcode"
// return 0.
// s = "loveleetcode"
// return 2.

let firstUniqChar = (s) => {
  // using string function
  for (let i = 0; i < s.length; ++i)
    if (s.indexOf(s[i]) === s.lastIndexOf(s[i])) return i;
  return -1;
};

let firstUniqChar1 = (s) => {
  // using map
  const map = new Map();

  for (const letter of s) {
    map.set(letter, map.get(letter) + 1 || 1);
  }

  for (let i = 0; i < s.length; i++) {
    if (map.get(s[i]) === 1) {
      return i;
    }
  }

  return -1;
};

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

// Q1108
// Defanging an IP Address
// Given a valid (IPv4) IP address, return a defanged version of that IP address.
// A defanged IP address replaces every period "." with "[.]".
// Example 1:
// Input: address = "1.1.1.1"
// Output: "1[.]1[.]1[.]1"
// Example 2:
// Input: address = "255.100.50.0"
// Output: "255[.]100[.]50[.]0"

// normal
var defangIPaddr = function (address) {
  var result = '';

  for (var i = 0; i < address.length; i++) {
    if (address[i] === '.') result += '[.]';
    else result += address[i];
  }

  return result;
};

// built in string function
var defangIPaddr = function (address) {
  return address.split('.').join('[.]');
};

// regex
var defangIPaddr = function (address) {
  return address.replace(/\./g, '[.]');
};

//Q953
//  Verifyinh an Aliean dictionary
// In an alien language, surprisingly they also use english lowercase letters, but possibly in a different order. The order of the alphabet is some permutation of lowercase letters.
// Given a sequence of words written in the alien language, and the order of the alphabet, return true if and only if the given words are sorted lexicographicaly in this alien language.
// Example 1:
// Input: words = ["hello","leetcode"], order = "hlabcdefgijkmnopqrstuvwxyz"
// Output: true
// Explanation: As 'h' comes before 'l' in this language, then the sequence is sorted.
// Example 2:
// Input: words = ["word","world","row"], order = "worldabcefghijkmnpqstuvxyz"
// Output: false
// Explanation: As 'd' comes after 'l' in this language, then words[0] > words[1], hence the sequence is unsorted.
// Example 3:
// Input: words = ["apple","app"], order = "abcdefghijklmnopqrstuvwxyz"
// Output: false
// Explanation: The first three characters "app" match, and the second string is shorter (in size.) According to lexicographical rules "apple" > "app", because 'l' > '∅', where '∅' is defined as the blank character which is less than any other character (More info).

var isAlienSorted = function (W, O) {
  //   The naive approach here would be to iterate through pairs of consecutive words in our input array (W) and compare the position of each letter in the input alphabet (O), moving letter by letter until we find a discrepancy and can determine which word comes first lexicographically.

  // As this is an Easy question, this method works, but with a time complexity of O(N * M * P) where N is the length of W, M is the average length of each word in W, and P is the length of O.

  // Rather than repetitively finding the position of a character in O, however, we can create a lookup table of indexes from O (alpha) at a time complexity of O(P) and turn every position lookup into a simple O(1) operation. That changes the overall time complexity to O(N * M + P).

  // Then, as noted before, we can just iterate through word pairs (a, b) in W, then iterate through comparative characters (achar, bchar) in those two words and evaluate them based on their lexicographical indexes (aix, bix).

  // If aix < bix or if we reach the end of a, then the two words are in correct lexicographical order and we should move to the next pair of words. If aix > bix or if we reach the end of b, the two words are not in correct lexicographical order and we should return false.

  // If we reach the end without exiting, we should return true.
  let alpha = new Map([['', -1]]);
  for (let i = 0; i < O.length; i++) alpha.set(O.charAt(i), i);
  for (let i = 1; i < W.length; i++) {
    let a = W[i - 1],
      b = W[i];
    for (let j = 0; j < a.length; j++) {
      let achar = a.charAt(j),
        bchar = b.charAt(j),
        aix = alpha.get(achar),
        bix = alpha.get(bchar);
      if (aix < bix) break;
      if (aix > bix) return false;
    }
  }
  return true;
};

// Q917
// Reverse only string
// Given a string s, return the "reversed" string where all characters that are not a letter stay in the same place, and all letters reverse their positions.
// Example 1:
// Input: s = "ab-cd"
// Output: "dc-ba"
// Example 2:
// Input: s = "a-bC-dEf-ghIj"
// Output: "j-Ih-gfE-dCba"
// Example 3:
// Input: s = "Test1ng-Leet=code-Q!"
// Output: "Qedo1ct-eeLg=ntse-T!"

// (A <= char <= Z) || (a <= char <= z)
var isLetter = function (c) {
  return (c >= 65 && c <= 90) || (c >= 97 && c <= 122);
};

var swap = function (array, a, b) {
  let t = array[a];
  array[a] = array[b];
  array[b] = t;
};

var reverseOnlyLetters = function (S) {
  var result = S.split('');
  let l = 0;
  let r = result.length - 1;

  while (l < r) {
    if (!isLetter(result[l].charCodeAt())) {
      l++;
    } else if (!isLetter(result[r].charCodeAt())) {
      r--;
    } else {
      swap(result, l++, r--);
    }
  }

  return result.join('');
};

// time O(n * m) space O(1)
var reverseOnlyLetters = function (S) {
  const array = S.split('');
  const alphabets = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let start = 0;
  let end = S.length - 1;

  while (start < end) {
    while (!alphabets.includes(array[start]) && start < end) {
      start++;
    }
    while (!alphabets.includes(array[end]) && start < end) {
      end--;
    }

    const temp = array[start];
    array[start] = array[end];
    array[end] = temp;
    start++;
    end--;
  }

  return array.join('');
};
// time O(n) space O(1)
var reverseOnlyLetters = function (S) {
  const array = S.split('');
  let start = 0;
  let end = array.length - 1;
  const regex = /[a-zA-Z]/;

  while (start <= end) {
    if (!regex.test(array[start])) {
      start++;
      continue;
    }
    if (!regex.test(array[end])) {
      end--;
      continue;
    }

    const temp = array[start];
    array[start] = array[end];
    array[end] = temp;

    start++;
    end--;
  }

  return array.join('');
};

// Medium

// Q443
// String Compression
// Given an array of characters chars, compress it using the following algorithm:
// Begin with an empty string s. For each group of consecutive repeating characters in chars:
// If the group's length is 1, append the character to s.
// Otherwise, append the character followed by the group's length.
// The compressed string s should not be returned separately, but instead be stored in the input character array chars. Note that group lengths that are 10 or longer will be split into multiple characters in chars.
// After you are done modifying the input array, return the new length of the array.
// You must write an algorithm that uses only constant extra space.
// Example 1:
// Input: chars = ["a","a","b","b","c","c","c"]
// Output: Return 6, and the first 6 characters of the input array should be: ["a","2","b","2","c","3"]
// Explanation: The groups are "aa", "bb", and "ccc". This compresses to "a2b2c3".
// Example 2:
// Input: chars = ["a"]
// Output: Return 1, and the first character of the input array should be: ["a"]
// Explanation: The only group is "a", which remains uncompressed since it's a single character.
// Example 3:
// Input: chars = ["a","b","b","b","b","b","b","b","b","b","b","b","b"]
// Output: Return 4, and the first 4 characters of the input array should be: ["a","b","1","2"].
// Explanation: The groups are "a" and "bbbbbbbbbbbb". This compresses to "ab12".
// Example 4:
// Input: chars = ["a","a","a","b","b","a","a"]
// Output: Return 6, and the first 6 characters of the input array should be: ["a","3","b","2","a","2"].
// Explanation: The groups are "aaa", "bb", and "aa". This compresses to "a3b2a2". Note that each group is independent even if two groups have the same character.
// Constraints:
// 1 <= chars.length <= 2000
// chars[i] is a lower-case English letter, upper-case English letter, digit, or symbol.

var compress = function (chars) {
  let write = 0,
    count = 0,
    letter = chars[0];
  for (let read = 0; read <= chars.length; ++read) {
    if (chars[read] === letter) {
      ++count;
    } else {
      chars[write++] = letter;
      letter = chars[read];
      if (count > 1) {
        for (const number of String(count)) {
          chars[write++] = number;
        }
      }
      count = 1;
    }
  }
  return write;
};

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
  // using bubble sortcc
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

// Question 344
// Reverse String
// Write a function that reverses a string. The input string is given as an array of characters char[].
// Do not allocate extra space for another array, you must do this by modifying the input array in-place with O(1) extra memory.
// You may assume all the characters consist of printable ascii characters.
//
// example:
// Input: ["h","e","l","l","o"]
// Output: ["o","l","l","e","h"]

const reverseString1 = (s) => {
  for (let a = 0, b = s.length - 1; a < s.length / 2; a++, b--) {
    // typical swaping code
    let temp = s[a];
    s[a] = s[b];
    s[b] = temp;
  }
  return s;
};
const reverseString2 = (s) => {
  for (let a = 0, b = s.length - 1; a < s.length / 2; a++, b--) {
    // es6
    [s[a], s[b]] = [s[b], s[a]];
  }
  return s;
};

const reverseString3 = (s) => {
  // string function
  return s.reverse();
};

const reverseString4 = (s) => {
  // recursion
  return Helper(0, s.length - 1);

  function Helper(l, r) {
    if (l >= r) return s;
    let temp = s[r];
    s[r] = s[l];
    s[l] = temp;

    return Helper(l + 1, r - 1);
  }
};

console.log(reverseString4(['h', 'e', 'l', 'l', 'o']));
