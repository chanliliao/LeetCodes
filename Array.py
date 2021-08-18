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

#Q238
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