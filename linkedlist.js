// Q206
//Reverse Linked List
// Given the head of a singly linked list, reverse the list, and return the reversed list.

let reverseLL = (head) => {
  // ES6
  let prev = null;
  while (head) {
    [head.next, prev, head] = [prev, head, head.next];
  }

  return prev;
};

let reverseLL = (head) => {
  // using stack
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

let reverseLL = (head, prev = null) => {
  // recurv
  if (!head) return prev;
  let next = head.next;
  head.next = prev;
  return reverseList(next, head);
};

// Q21
// Merge sort LL

let mergeSortLL = (l1, l2) => {
  // recurv
  if (!l1 || !l2) return l1 ? l1 : l2;
  if (l1.val < l2.val) {
    l1.next = mergeTwoLists(l1.next, l2);
    return l1;
  } else {
    l2.next = mergeTwoLists(l1, l2.next);
    return l2;
  }
};

let mergeSortLL = (l1, l2) => {
  // ES6 recurv
  if (!l1 || !l2) return l1 || l2;
  if (l1.val > l2.val) {
    [l1, l2] = [l2, l1];
  }
  l1.next = mergeTwoLists(l1.next, l2);
  return l1;
};

let mergeSortLL = (head1, head2) => {
  // itl
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

// Q141
// cycleLL

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

// Q19
// Remove nth node from end of list

let removeNthFromEnd = (head, n) => {
  let fast = head,
    slow = head;
  for (let i = 0; i < n; i++) fast = fast.next;
  if (!fast) return head.next;
  while (fast.next) (fast = fast.next), (slow = slow.next);
  slow.next = slow.next.next;
  return head;
};
