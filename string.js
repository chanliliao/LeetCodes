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

console.log(isAnagram1('abbbc', 'babbb'));

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
  const stack = [];
  const map = {
    '(': ')',
    '[': ']',
    '{': '}',
  };

  for (let i = 0; i < s.length; i++) {
    let c = s[i];
    if (map[c]) {
      stack.push(map[c]);
      console.log(stack);
    } else if (c !== stack.pop()) {
      return false;
    }
  }

  return !stack.length;
};

//console.log(isValid('(}'));

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

console.log(isPalindrome7('Aa man, a plan, a canal: Panama'));
