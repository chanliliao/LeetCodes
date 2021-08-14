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