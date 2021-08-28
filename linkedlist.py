# Q206
# Reverse a singly linked list

# Iteratively two pointers
def reverseLL (self, head):
  # check if there is data in the head
  if not head: return None

  # set two pointers
  prev = None
  curr = head

  # looping through the list until it hits null
  while curr:
    next = curr.next
    curr.next = prev
    prev = curr
    curr = next
      
  return prev

# Iteratively using Stack
def reverseLL (self, head):
  # check if there is data in the head
  if not head: return None

  # creat stack
  stack = []
  dummy = curr = head

  # looping through the list until it hits null
  while dummy:
    stack.append(dummy.val)
    dummy = dummy.next

  #reset the val of the linked list
  while stack:
    curr = stack.pop()
    curr = curr.next
      
  return head

#  Recursivly
def reverseLL (self, head, prev = None):
  # base case, check if head is none
  if not head: 
    return prev
  #swap
  next = head.next
  head.next = prev
  # set head to next and prev to head
  return self.reverseList(next, head)

# Q141
# LL Cycle

#Iteratively with Set
def cycleLL (self, head):
  #check if head is null
  if not head:
    return None
  
  #create a set to record 
  mySet = set()
  dummy = head
  
  #iterate through the list and check with set
  while dummy:
    if dummy in mySet:
      return True
    else : mySet.add(dummy)
    dummy = dummy.next

  #if is out of loop, it means it hit null and no loop     
  return False

#Iteratively with two pinters
def cycleLL (self, head):
  #check if head is null
  if not head: 
    return False

  #create two pointers  
  slow,fast = head, head

  #iterate through while fast is 2x faster 
  while fast and fast.next:
    slow = slow.next
    fast = fast.next.next
    #if they are equal, return true
    if slow == fast:
      return True

  #out of loop mean no loop      
  return False
        

# Q21 
# Merge two sorted LL

# Iteratively
def mergeSortedLL(self,l1,l2):
  # create the new node
  dummy = ListNode()
  curr = dummy

  #loop though both node only if both are not null
  while l1 and l2:
    if l1.val < l2.val:
      curr.next = l1
      l1 = l1.next
    else :
      curr.next = l2
      l2 = l2.next
    curr = curr.next
  
  # at the end put the rest to the new node
  if l1:
    curr.next = l1
  else:
    curr.next = l2
  return dummy.next

# Recursively
def mergeSortedLL(self,l1,l2):
  # check emtpys
  if not l1:
    return l2
  if not l2:
    return l2
  
  # check value and start a new node with that value
  if l1.val > l2.val:
    ans = ListNode(l2.val)
    ans.next = self.mergeSortedLL(l1,l2.next)
  else :
    ans = ListNode(l1.val)
    ans.next = self.mergeSortedLL(l1.next,l2)
  return ans

# Q143
# Reorder LL

#Iteratively with array 
def reorderLL(self,head):


  return 1

#Iteratively with split,reverse,merge using pointers 
def reorderLL(head):
  def split(node):
    secondHalf = None
    slow,fast = node, node

    while fast and fast.next:
      slow = slow.next
      fast = fast.next.next
      
    secondHalf = slow.next
    return secondHalf

  def reverse(node):
    prev = None
    curr = node

    while curr:
      next = curr.next
      curr.next = prev
      curr = next 
    
    return node

  def merge(l1, l2):
    l1next = None
    l2next = None

    while l2:
      l1next = l1.next
      l2next = l2.next
      
      l1.next = l2
      l2.next = l1next

      l1 = l1next
      l2 = l2next
  
  endHalf = split(head)
  endHalf = reverse(endHalf)
  merge(endHalf)

# Q19
# Remove Nth node from end of list

#Iteratively with arr and arr methods
def removeNthNode (self, head, n):
  return 1

#Iteratively two pinter
def removeNthNode (self, head, n):
  # create dummy 
  dummy = ListNode(0,head)
  left = dummy
  right = head

  # create distance n using while loop
  while n > 0 and right:
    right = right.next
    n -= 1
  
  # traverse the LL
  while right:
    left = left.next
    right = right.next
  
  # delete the node
  left.next = left.next.next

  return dummy.next

# Extra

# Q1290
# convert Binary Num in a linked 

def covertB (head):
  res = 0
  node = head
  while node:
    res = res * 2 + node.value
    res = res.next
  return res

# Q876
# middle of the LL

def middleOfLL (head):
  slow, fast = head, head, head

  while fast and fast.next:
    fast = fast.next.next
    slow = slow.next
  return slow

# Q237 delete ndoe in LL
# middle of the LL
def deleteLL (node):
  node.val = node.next.val
  node.next = node.next.next

#  Q83
#  remove duplicates from sorted list
def deleteDuplicates (head):
  current = head

  while current:
    if current.next and current.val == current.next.val: 
      current.next = current.next.next
    else: 
      current = current.next
  return head

# Q160
# intersection of two LL
def getIntersectionNode(headA, headB):
  a ,b  = headA, headB
  while a!= b:
    a = headB if a is None else a.next
    b = headA if b is None else b.next
  return a

# Q234
# palindrome LL
def palindromeLL(head):
  def split(h):
    slow, fast = head,head

    while fast and fast.next:
      fast = fast.next.next
      slow = slow.next
    return slow
  
  def reverse(h):
    prev,next = None, None

    while h:
      next = h.next
      h.next = prev
      prev = h
      h = next
    
    return prev
  # split LL half
  secondHalf = split(head)
  # reverseLL
  reverseLL = reverse(secondHalf)
  # compare old and reverse 
  while reverseLL:
    if reverseLL.val != head.val:
      return False
    else:
      reverseLL = reverseLL.next
      head = head.next
  
#  Q203
# remove LL element
def removeLLElement (head,val):
  dummy = ListNode(next=head)
  curr = head
  prev = dummy

  while curr:
    next = curr.next

    if curr.val == val:
      prev.next = next
    else:
      prev = curr
    curr = curr.next
  return dummy.next

#  Q2
# add two number
def addtwonumber(l1,l2):
  node = ListNode(0)
  head = node
  sum = 0
  carry = 0

  while l1 or l2 or sum > 0:
    if l1:
      sum = sum + l1.val
      l1 = l1.next
    if l2:
      sum = sum + l2.val
      l2 = l2.next
    if sum > 9:
      carry = 1
      sum = sum - 10
    
    head.next = ListNode(sum)
    head = head.next
    sum = carry
    carry = 0
  return node.next

# Q24
# swap node in pair
def swapNode(self,head):
  dummy = ListNode(0,next=head)
  prev,curr = dummy, head

  while curr and curr.next:
    nextPair = head.next.next
    second = head.next

    prev.next = second
    second.next = curr
    curr.next = nextPair
    
    prev = curr
    curr = nextPair
  
  return dummy.next

# Q148
# sortList
def sortList(self,head):
  def split(h):
    slow, fast = h, h.next

    while fast and fast.next:
      fast = fast.next.next
      slow = slow.next
    return slow

  def merge(h1,h2):
    curr = dummy = ListNode()

    while h1 and h2:
      if h1.val <= h2.val:
        curr.next = h1
        h1 = h1.next      
      else: 
        curr.next = h2
        h2 = h2.next
      curr = curr.next
    if h1:
      curr.next = h1    
    if h2:
      curr.next = h2
    return dummy.next
  # base case
  if not head or not head.next:
    return head

  # split
  left = head
  right = split(head)
  # break link
  temp = right.next
  right.next = None
  right = temp
  # recursive on splits
  left = self.sortList(left)
  right = self.sortList(right)

  return merge(left,right)

# Q86
# partition list

def partitionLL(head,x):
  # dummy nodes and tail tracker
  smaller = ListNode()
  larger = ListNode()
  sTail, lTail = smaller, larger
  # move through and compare and assign 
  while head:
    if head.val < x: 
      sTail.next = head
      sTail = sTail.next
    else:
      lTail.next = head
      lTail = lTail.next
    head = head.next
  # connect tail to head
  sTail.next = larger.next
  lTail.next = None
  # return answer
  return smaller.next

# Q138
# copy list with random pointer

def copyLLWithRandomPointer(head):
  copy = {None:None}

  cur = head
  while cur:
    temp = Node(cur.val)
    copy[cur] = temp
    cur = cur.next
  
  cur= head
  while cur:
    temp = copy[cur]
    temp.next = copy[cur.next]
    temp.random = copy[cur.random]
    cur = cur.next
  return copy[head]