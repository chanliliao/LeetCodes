# Q1 
# Two Sum

# Iteratively double for loop
def twoSum(nums, target):
  for i in range(len(nums)):
    for j in range(i+1,len(nums)):  
      if(nums[i] + nums[j] == target):
        return [i,j]

# Iteratively with map
def twoSum(self, nums, target):
  d={}
  for i,num in enumerate(nums):
    if target-num in d:
      return d[target-num], i
    d[num]=i

# Q121
# Best time to buy and sell stock

# Iteratively with two pointers
def stocks(prices):
  maxProfit = 0
  low = prices[0]

  for i in range(len(prices)):
    if prices[i] < low:
      low = prices[i]
    elif prices[i] - low > maxProfit:
      maxProfit = prices[i] - low
  return maxProfit

# Q217 
# Contains Duplicate

# Iteratively with set
def duplicate(arr):
  seen = set()

  for num in arr:
    if num in seen:
      return True
    else :
      seen.append(num) 
  return False

# Iteratively after sorting
def duplicate(arr):
  arr.sort()

  for i in range(len(arr)-1):
    if arr[i] == arr[i+1]:
      return False
  return True

# Iteratively with set and check length
def containsDuplicate(self, arr):
  return len(arr) != len(set(arr))

# Q53 
# Maximum Subarray

# sliding window where negative prefix is remove
def maxSub(arr):
  maxNum = arr[0]
  curr = 0

  for num in arr:
    curr += num
    maxNum = max(curr,maxNum)
    curr = max(curr, 0)
  return maxNum

# Q238
# product of array except self

def productArrayExceptSelf(arr):
  ans = [1] * (len(arr))
  pre = 1
  post = 1

  for i in range(len(arr)):
    ans[i] = pre
    pre *= arr[i]
  
  for i in range(len(arr)-1,-1,-1):
    ans[i] *= post
    post *= arr[i]
  return ans

# Q152
# Maximum product subarray

def maxProductSub(arr):
  maxNum = max(arr)
  currMin, currMax = 1,1

  for n in arr:
    temp = currMax * n
    currMax = max(n, temp, currMin * n)
    currMin = max(n, temp, currMin * n)
    maxNum = max(currMax, maxNum)
  return maxNum

# Q152
# Find Minimun in Roated Sorted Array

def minRotated(arr):
  res = arr[0]
  left = 0
  right = len(arr) -1 

  while left <= right:
    if arr[left] < arr[right]: 
      res = min(res, arr[left])
      break
    pivot = (left + right) // 2
    res = min(res, arr[pivot])
    if arr[pivot] >= arr[left]:
      left = pivot + 1
    else :
      right = pivot - 1
  return res

# Q33 
# search in rotated sorted array

def searchRotated(arr,target):
  left = 0
  right = len(arr) -1 

  while left <= right:
    pivot = (left + right) // 2
    if arr[pivot] == target: return pivot
    if arr[left] < arr[pivot]:
      # left side
      if arr[left] <= target and target <= arr[pivot]:
        right = pivot -1
      else :
        left = pivot + 1
    else :
      # right side
      if arr[pivot] <= target and target <= arr[right]:
        left = pivot + 1
      else :
        right = pivot - 1
  return -1

# Q15
# 3sum

def threeSum(arr):
  res = []
  target = 0

  if len(arr) < 3: 
    return None

  arr.sort()

  for i, num in enumerate(arr):
    if i > 0 and num == arr[i-1]:
      continue

    l,r = i + 1, len(arr)-1
    while l < r:
      sum = num + arr[l] + arr[r]
      if sum < target:
        l += 1
      elif sum > target:
        r -= 1
      else:
        res.append([num,arr[l],arr[r]])
        l +=1
        while arr[l] == arr[l-1] and l < r:
          l +=1
  return res


# Q11
# Container with Most Water

def maxArea(height):
  ans = 0
  l, r = 0, len(height)-1

  while l < r:
    ans = max(ans, min(height[l], height[r]) * (r - l))
    if height[l] <= height[r]: 
      l += 1
    else :
      r -=1
  return ans


# Extra
