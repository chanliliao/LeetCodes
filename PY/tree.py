#  Extra 

# Q
# diameter of binary tree
from typing import Collection


def diameterTree(node):
  res =[0]

  def dfs(root):
    if not root:
      return -1
    left = dfs(root.left)
    right = dfs(root.right)
    # equation for diameter
    res[0] = max(res[0], 2 + right + left)
    # equation for height
    return 1 + max(left,right)

  dfs(node)
  return res[0]

# Q617
# merge two binary tree

def mergeTree(self,t1,t2):
  if not t1 and not t2:
    return None

  v1 = t1.val if t1 else 0
  v2 = t2.val if t2 else 0
  root = TreeNode(v1+v2)

  root.left = self.mergeTree(t1.left if t1 else None, t2.left if t2 else None)
  root.right = self.mergeTree(t1.right if t1 else None, t2.right if t2 else None)
  return root

# Q110
# balanced binary tree

def balanceBT(root):

  def dfs(root):
    if not root:
      return [True,0]
    
    left, right = dfs(root.left), dfs(root.right)
    balance = (left[0] and right[0] and abs(left[1] - right) <= 1)

    return [balance, 1 + max(left[1],right[1])]
  
  return dfs(root)[0]

# Q1448
# count good nodes in binary tree

def CountGoodNode (root):

  def dfs(node, largest):
    if not node: return 0
    res = 1 if node.val >= largest else 0

    largest = max(node.value, largest)
 
    res += dfs(node.left, largest)
    res += dfs(node.right, largest)

    return res
  dfs(root,root.value)  

# Q199
# rigth side view of BT

def BTRightSideView(root):
  queue = collections.deque([root])
  res = []

  while queue:
    rightSide = None
    qLen = len(queue)
    # this keep tracks how many node are in the level so at the end it is the right most 
    for i in range(qLen):
      node = queue.popleft()
      if node:
        rightSide = node
        queue.append(node.left)
        queue.append(node.right)
    if rightSide:
      res.append(rightSide.val)
  return res

# Q337
# house robber III

def houseRobberIII(root):

  # return pair of val[withroot, withoutroot]
  def dfs(node):
    if not node: return [0,0]
    left = dfs(node.left)
    right = dfs(node.right)
    # with root cannot include the root value of next
    withRoot = root.val + left[1] + right[1]
    withoutRoot = max(left) + max(right)

    return [withRoot, withoutRoot]
  
  return max(dfs(root))

# Q129
# house robber III

def subNum(root):

  def dfs(node, num):
    if not node: return 0

    num = num*10 + node.val
    # if this is true, it mean you found the end of the number
    if not node.left and not node.right:
      return num
    left = dfs(node.left, num)
    right = dfs(node.right, num)

    return right + left
  
  return dfs(root, 0)