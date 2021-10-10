// Q206
//Reverse a singly Linked List

// ES6
let reverseLL = (head) => {
  let prev = null;
  while (head) {
    [head.next, prev, head] = [prev, head, head.next];
  }

  return prev;
};

// using stack
let reverseLL = (head) => {
  const stack = [];
  let node = head;
  while (node) {
    stack.push(node.data);
    node = node.next;
  }

  node = head;
  let i = stack.length - 1;

  while (i >= 0) {
    node.data = stack[i];
    node = node.next;
    i--;
  }

  return head;
};

// iteratively with two pointers
let reverseLL = (head) => {
  if (head === null) return null;
  let previous = null;
  let temp = null;

  while (head) {
    // save next
    temp = head.next;
    // reverse
    head.next = previous;
    // move prev and head
    previous = head;
    head = temp;
  }
  return previous;
};

// recurv
let reverseLL = (head, prev = null) => {
  if (!head) return prev;
  let next = head.next;
  head.next = prev;
  return reverseList(next, head);
};

// Q141
// cycleLL

// iteratively with set
let cycleLL = (head) => {
  let set = new Set();
  let dummy = head;

  while (dummy) {
    if (set.has(dummy)) {
      return true;
    } else {
      set.add(dummy);
    }

    dummy = dummy.next;
  }
  return false;
};

// iteratively with two pointers
let cycleLL = (head) => {
  if (head == null) {
    return 0;
  }

  let slow = head;
  let fast = head;

  while (fast != null && fast.next != null) {
    slow = slow.next;
    fast = fast.next.next;

    if (slow == fast) {
      return 1;
    }
  }
  return 0;
};

// Q21
// Merge sort LL

// recurv
let mergeSortLL = (l1, l2) => {
  if (!l1 || !l2) return l1 ? l1 : l2;
  if (l1.val < l2.val) {
    l1.next = mergeTwoLists(l1.next, l2);
    return l1;
  } else {
    l2.next = mergeTwoLists(l1, l2.next);
    return l2;
  }
};
// ES6 recurv
let mergeSortLL = (l1, l2) => {
  if (!l1 || !l2) return l1 || l2;
  if (l1.val > l2.val) {
    [l1, l2] = [l2, l1];
  }
  l1.next = mergeTwoLists(l1.next, l2);
  return l1;
};
// non-recurv
let mergeSortLL = (head1, head2) => {
  let newHead = new SinglyLinkedListNode(-1);
  let curr = newHead;
  while (head1 != null && head2 != null) {
    if (head1.data <= head2.data) {
      curr.next = head1;
      curr = curr.next;
      head1 = head1.next;
    } else {
      curr.next = head2;
      curr = curr.next;
      head2 = head2.next;
    }
  }

  curr.next = head1 != null ? head1 : head2;
  return newHead.next;
};

// Q143
// reorder list
// --> split middel
// --> reverse
// --> merage

let reorderList = (head) => {
  if (head === null) {
    return;
  }
  /**
   * The goal is to reverse the second half of the list and merge it onto
   * the first half of the list. The first half will have at most one more
   * element than the second half.
   */
  let second = split(head);
  second = reverse(second);
  merge(head, second);
};

let split = (node) => {
  let fast = node;
  let slow = node;

  while (fast !== null) {
    if (fast.next !== null && fast.next.next !== null) {
      slow = slow.next;
      fast = fast.next.next;
    } else {
      fast = null;
    }
  }

  const secondHalf = slow.next;
  slow.next = null;

  return secondHalf;
};

let reverse = (node) => {
  let curr = node;
  let prev = null;
  let next = null;

  while (curr !== null) {
    next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }

  return prev;
};

let merge = (l1, l2) => {
  let l1Next = null;
  let l2Next = null;

  while (l2 !== null) {
    l1Next = l1.next;
    l2Next = l2.next;

    l1.next = l2;
    l2.next = l1Next;

    l1 = l1Next;
    l2 = l2Next;
  }
};

// Q19
// Remove nth node from end of list

let removeNthFromEnd = (head, n) => {
  // two pointer one moving n ahead
  let fast = head,
    slow = head;
  for (let i = 0; i < n; i++) fast = fast.next;
  if (!fast) return head.next;
  while (fast.next) (fast = fast.next), (slow = slow.next);
  slow.next = slow.next.next;
  return head;
};

// Extra

// Q1290
// convert Binary Num in a linked
const convertB = (head) => {
  let res = 0;
  let node = head;
  while (node) {
    res = res * 2 + node.val;
    node = node.next;
  }
  return res;
};

// Q876
// middle of the LL
const middleLL = (head) => {
  let slow = head;
  let fast = head;

  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }

  return slow;
};

// Q237
// delete ndoe in LL
const deleteLL = (node) => {
  node.val = node.next.val;
  node.next = node.next.next;
};

// Q83
// remove duplicates from sorted list
let deleteDuplicates = (head) => {
  var current = head;

  while (current) {
    if (current.next !== null && current.val == current.next.val) {
      current.next = current.next.next;
    } else {
      current = current.next;
    }
  }

  return head;
};

// Q160
// intersection of two LL
let getIntersectionNode = (headA, headB) => {
  let a = headA,
    b = headB;
  while (a !== b) {
    a = !a ? headB : a.next;
    b = !b ? headA : b.next;
  }
  return a;
};

// Q234
// palindrome ll
let palindromeLL = (head) => {
  // split half
  let secondHalf = split(head);
  // reverse the second half
  let reverseLL = reverse(secondHalf);
  // compare the heads
  while (reverseLL) {
    if (reverseLL.val !== head.val) {
      return false;
    } else {
      reverseLL = reverseLL.next;
      head = head.next;
    }
  }
  return true;

  function split(h) {
    let slow = (fast = h);

    while (fast && fast.next) {
      fast = fast.next.next;
      slow = slow.next;
    }

    return slow;
  }

  function reverse(h) {
    let prev = (next = null);

    while (h) {
      next = h.next;
      h.next = prev;
      prev = h;
      h = next;
    }

    return prev;
  }
};

// Q203
// remove LL element
let removeLLElement = (head, target) => {
  let dummy = new ListNode(0, (next = head));
  let curr = head;
  let prev = dummy;

  while (curr) {
    let next = curr.next;

    if (curr.val === target) {
      prev.next = next;
    } else {
      prev = curr;
    }

    curr = curr.next;
  }

  return dummy.next;
};

// Q2
// add two numbers
let addTwoNums = (l1, l2) => {
  var List = new ListNode(0);
  var head = List;
  var sum = 0;
  var carry = 0;

  while (l1 !== null || l2 !== null || sum > 0) {
    if (l1 !== null) {
      sum = sum + l1.val;
      l1 = l1.next;
    }
    if (l2 !== null) {
      sum = sum + l2.val;
      l2 = l2.next;
    }
    if (sum >= 10) {
      carry = 1;
      sum = sum - 10;
    }

    head.next = new ListNode(sum);
    head = head.next;

    sum = carry;
    carry = 0;
  }

  return List.next;
};

// Q24
// swap node in pairs
let sawpNodeInPairs = (head) => {
  let dummy = new ListNode(0, head);
  let curr = head;
  let prev = dummy;

  while (curr && curr.next) {
    let nextPair = curr.next.next;
    second = curr.next;

    second.next = curr;
    curr.next = nextPair;
    prev.next = second;

    prev = curr;
    curr = nextPair;
  }

  return dummy.next;
};

// Q148
// Sort List

let sortList = (head) => {
  // base case
  if (!head || !head.next) {
    return head;
  }
  // split
  let left = head;
  let right = split(head);
  let temp = right.next;
  right.next = null;
  right = temp;
  // recursive on splits
  left = sortList(left);
  right = sortList(right);

  return merge(left, right);

  function split(h) {
    let slow = h;
    let fast = h.next;

    while (fast && fast.next) {
      fast = fast.next.next;
      slow = slow.next;
    }

    return slow;
  }

  function merge(head1, head2) {
    let newHead = new SinglyLinkedListNode(-1);
    let curr = newHead;
    while (head1 != null && head2 != null) {
      if (head1.val <= head2.val) {
        curr.next = head1;
        curr = curr.next;
        head1 = head1.next;
      } else {
        curr.next = head2;
        curr = curr.next;
        head2 = head2.next;
      }
    }

    curr.next = head1 != null ? head1 : head2;
    return newHead.next;
  }
};

// Q86
// partition list

let partitionLL = (head, x) => {
  let smaller = new ListNode();
  let larger = new ListNode();

  let sTail = smaller;
  let lTail = larger;

  while (head) {
    if (head.val < x) {
      sTail.next = head;
      sTail = sTail.next;
    } else {
      lTail.next = head;
      lTail = lTail.next;
    }
    head = head.next;
  }

  sTail.next = larger.next;
  lTail.next = null;

  return smaller.next;
};

// Q138
// copy list with random pointer

let copyLLWithRandomPointer = (head, x) => {
  if (!head) {
    return null;
  }
  const clones = new Map();
  let n = head;
  while (n) {
    clones.set(n, new Node(n.val));
    n = n.next;
  }
  n = head;
  while (n) {
    clones.get(n).next = clones.get(n.next) || null;
    clones.get(n).random = clones.get(n.random) || null;
    n = n.next;
  }
  return clones.get(head);
};
