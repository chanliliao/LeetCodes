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
  let next = null;

  while (head) {
    // save next
    next = head.next;
    // reverse
    head.next = previous;
    // move prev and head
    previous = head;
    head = next;
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

// Q237 delete ndoe in LL
// middle of the LL
const deleteLL = (node) => {
  node.val = node.next.val;
  node.next = node.next.next;
};

// Q237 delete ndoe in LL
// middle of the LL
const removeDup = (node) => {
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
