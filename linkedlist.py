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