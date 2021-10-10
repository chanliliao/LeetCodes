// Question 242
// Valid Anagram

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

//Question 125
//Valid Palindrome

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

// Question 20
// Valid Parentheses

let isValid = (s) => {
  // const stack = [];
  // const map = {
  // '(': ')',
  // '[': ']',
  // '{': '}'
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

// Q49
// Group Anagrams

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
  let res = {};
  for (let str of strs) {
    let count = new Array(26).fill(0);
    for (let char of str) count[char.charCodeAt() - 97]++;
    let key = count.join('#');
    res[key] ? res[key].push(str) : (res[key] = [str]);
  }
  return Object.values(res);
};

// Q5
// Longest Palindromic substring

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

// Q647
// palindromic substrings

const palindromeSub = (s) => {
  let count = 0;
  for (var i = 0; i < s.length; i++) {
    for (var j = 0; j < 2; j++) {
      var left = i;
      var right = i + j;
      while (s[left] && s[left] === s[right]) {
        count++;
        left--;
        right++;
      }
    }
    return max;
  }
};

// Q3
// Longest Substring Without Repeating Characters

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

// 424
//  Longest Repeating Character Replacement

// O(26N)
const characterReplacement = (s, k) => {
  let count = new Map();
  let res = 0;
  let l = 0;

  for (let r = 0; r < s.length; r++) {
    let temp = 1 + count.get(s[r]) || 0;
    count.set(s[r], temp);
    while (r - l + 1 - Math.max(count.values()) > k) {
      count[s[l]]--;
      l++;
    }
    res = Math.max(res, r - l + 1);
  }
  return res;
};

// O(N)
const characterReplacement = (s, k) => {
  let count = new Map();
  let res = 0;
  let l = 0;

  let maxf = 0;
  for (let r = 0; r < s.length; r++) {
    let temp = 1 + count.get(s[r]) || 0;
    count.set(s[r], temp);
    maxf = Math.max(maxf, count[s[r]]);
    while (r - l + 1 - maxf > k) {
      count[s[l]]--;
      l++;
    }
    res = Math.max(res, r - l + 1);
  }
  return res;
};

// Q
// encoding and decoding strings
const encodingDecoding = (arr) => {
  function encode(arr) {
    let res = '';
    for (let s of arr) {
      res += s.length.toString() + '#' + s;
    }
    return res;
  }

  function decode(s) {
    let res = [];
    let i = 0;

    while (i < s.length) {
      j = i;
      while (s[j] !== '#') {
        j++;
      }
      len = parseInt(s.slice(i, j));
      res.push(s.slice(j + 1, j + 1 + len));
      i = j + 1 + len;
    }
    return res;
  }
};

// Q76
// Minimum Window Substring

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

// Extra

// Q13
// Roman to int

const RomanInt = (s) => {
  const map = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
  let num = 0;

  for (let i = 0; i < s.length; i++) {
    const curr = map[s[i]],
      next = map[s[i + 1]];
    if (curr < next) num -= curr;
    else num += curr;
  }
  return num;
};

// Q67
// add binary

const addBinary = (a, b) => {
  let carry = 0;
  let result = '';

  let len1 = a.length - 1;
  let len2 = b.length - 1;

  for (; len1 >= 0 || len2 >= 0 || carry > 0; len1--, len2--) {
    let sum = (+a[len1] || 0) + (+b[len2] || 0) + carry;
    if (sum > 1) {
      sum = sum % 2;
      carry = 1;
    } else {
      carry = 0;
    }
    result = `${sum}${result}`;
  }
  return result;
};

// Q392
// is subsequence

const isSubsequence = (s, t) => {
  let i = (j = 0);

  while (i < s.length && j < t.length) {
    if (s[i] === t[j]) {
      i++;
    }
    j++;
  }
  return i === s.length ? true : false;
};

// Q
// robot bounded in circle

const robotCircle = (s) => {
  let dirX = 0;
  let dirY = 1;
  let x = 0;
  let y = 0;

  for (let d of s) {
    if (d === 'G') {
      x = x + dirX;
      y = y + dirY;
    } else if (d === 'L') {
      [x, y] = [-y, x];
    } else {
      [x, y] = [y, -x];
    }
  }
  return (!x && !y) || dir !== 1;
};

// Q17
// letter combo of phone number

const letterCombo = (s) => {
  let res = [];
  let map = {
    2: 'abc',
    3: 'def',
    4: 'ghi',
    5: 'jkl',
    6: 'mno',
    7: 'qprs',
    8: 'tuv',
    9: 'wxyz',
  };
  function backtracking(i, curStr) {
    if (curStr.length === s.length) {
      res.push(curStr);
      return;
    }
    for (let c of map[s[i]]) {
      backtracking(i + 1, curStr + c);
    }
  }

  if (s) {
    backtracking(0, '');
  }
  return res;
};

// Q22
// generate paraentheses

const generatParaenthses = (n) => {
  let res = [];
  let stack = [];
  let open = 0;
  let close = 0;

  function backtrack(o, c) {
    if (open === close && close === n) {
      res.push(''.join(stack));
    }
    if (o < n) {
      stack.push('(');
      backtrack(o + 1, c);
      stack.pop();
    }
    if (o > c) {
      stack.push(')');
      backtrack(o, c + 1);
      stack.pop();
    }
  }
  backtrack(open, close);
  return res;
};

// Q
// decode string

const decodeString = (s) => {
  let stack = [];

  for (let c of s) {
    if (c !== ']') {
      stack.push(c);
    } else {
      let str = '';
      while (stack[stack.length - 1] !== '[') {
        str = stack.pop() + str;
      }
      stack.pop();

      let k = '';
      while (
        stack.length != 0 &&
        !Number.isNaN(Number(stack[stack.length - 1]))
      ) {
        k = stack.pop() + k;
      }

      k = Number(k);
      stack.push(str.repeat(k));
    }
  }

  return stack.join('');
};

// Q71
// simplify path

const simpPath = (s) => {
  let stack = [];
  path = path.split('/');

  for (let i = 0; i < path.length; i++) {
    if (path[i] == '.' || path[i] == '') continue;
    if (path[i] == '..') stack.pop();
    else stack.push(path[i]);
  }

  return '/' + stack.join('/');
};

// Q71
// muktiply strings

const multipleyStrings = (s) => {
  let z = [];
  let hold = 0;
  let totalLength = num1.length + num2.length;

  if (num1 === '0' || num2 === '0') {
    return '0';
  }

  if (num1 === '1' || num2 === '1') {
    return num1 === '1' ? num2 : num1;
  }

  num1 = num1.split('').reverse();
  num2 = num2.split('').reverse();

  for (let k = 0; k < totalLength; k++) {
    for (let i = 0; i < num1.length; i++) {
      let j = k - i;

      if (num2[j]) {
        hold = hold + num1[i] * num2[j];
      }
    }

    if (k === totalLength - 1 && hold === 0) {
      continue;
    }

    z[k] = hold % 10;
    hold = Math.trunc(hold / 10);
  }

  return z.reverse().join('');
};
