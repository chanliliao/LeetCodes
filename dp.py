# Q70
# climbing stairs 

# Top down - TLE
def climbStairs1(self, n):
    if n == 1:
        return 1
    if n == 2:
        return 2
    return self.climbStairs(n-1)+self.climbStairs(n-2)
 
# Bottom up, O(n) space
def climbStairs2(self, n):
    if n == 1:
        return 1
    res = [0 for i in range(n)]
    res[0], res[1] = 1, 2
    for i in range(2, n):
        res[i] = res[i-1] + res[i-2]
    return res[-1]

# Bottom up, constant space
def climbStairs3(self, n):
    if n == 1:
        return 1
    a, b = 1, 2
    for i in range(2, n):
        tmp = b
        b = a+b
        a = tmp
    return b
    
# Top down + memorization (list)
def climbStairs4(self, n):
    if n == 1:
        return 1
    dic = [-1 for i in range(n)]
    dic[0], dic[1] = 1, 2
    return self.helper(n-1, dic)
    
def helper(self, n, dic):
    if dic[n] < 0:
        dic[n] = self.helper(n-1, dic)+self.helper(n-2, dic)
    return dic[n]
    
# Top down + memorization (dictionary)  
def __init__(self):
    self.dic = {1:1, 2:2}
    
def climbStairs(self, n):
    if n not in self.dic:
        self.dic[n] = self.climbStairs(n-1) + self.climbStairs(n-2)
    return self.dic[n]

# Q198
# climbing stairs 

def houseRobber(nums):
  rob1, rob2 = 0,0

  for i in nums:
    temp = max(i+rob1, rob2)
    rob1 = rob2
    rob2 = temp
  return rob2

# Q198
# climbing stairs 

# # DP
def coinChange(coins,amount):
  dp = [amount+1] * (amount+1)
  dp[0]=0

  for i in range(1, amount + 1):
    for c in coins:
      if i - c >= 0:
        dp[i] = min(dp[i], 1+dp[i-c])
  return dp[amount] if dp[amount] != amount+1 else -1

# Q300
# longest increasing sub

# DP bottom up
def lis(nums):
  dp = [1] * len(nums)

  for i in range(1, len(nums)):
    for j in range(i):
      if nums[i] > nums[j]:
        dp[i] = max(dp[i], dp[j]+1)
  
  return max(dp)

  # Brute-force recursion (TLE): time O(2^n) space O(n)
def lengthOfLIS(self, nums) -> int:
	def max_lis(idx, cur_max):
		if idx == len(nums):
			return 0
		if nums[idx] > cur_max:
			return max(1 + max_lis(idx + 1, nums[idx]), max_lis(idx + 1, cur_max))
		return max_lis(idx + 1, cur_max)
	return max_lis(0, float('-inf'))

# Recursion with memoization (DP): time O(n^2) space O(n^2)
from collections import defaultdict
def lengthOfLIS(self, nums) -> int:
	cache = defaultdict(dict) # 2D cache of prev_max_idx & cur_idx
	nums.append(float('-inf'))
	def max_lis(idx, prev_max_idx):
		if idx == len(nums) - 1:
			return 0
		if prev_max_idx not in cache or idx not in cache[prev_max_idx]:
			if nums[idx] > nums[prev_max_idx]:
				cache[prev_max_idx][idx] = max(1 + max_lis(idx + 1, idx), max_lis(idx + 1, prev_max_idx))
			else:
				cache[prev_max_idx][idx] = max_lis(idx + 1, prev_max_idx)
		return cache[prev_max_idx][idx]
	return max_lis(0, -1)

# Bottom-up DP + binary-search: time O(nlogn) space O(n)
def lengthOfLIS(self, nums) -> int:
	if not nums:
		return 0
	dp = [nums[0]]
	len_dp = 1
	for i in range(1, len(nums)):
		left, right = 0, len(dp) - 1
		while left < right:
			mid = (left + right) // 2
			if dp[mid] < nums[i]:
				left = mid + 1
			else:
				right = mid
		if dp[left] < nums[i]:
			dp.append(nums[i])
			len_dp += 1
		else:
			dp[left] = nums[i]
	return len_dp

# Q1143
# longest common sub

# 2d grid 
def lcs(text1,text2):
  dp = [[0 for j in range(len(text2)+1)] for i in range(len(text1)+1)] 
    
  for i in range(len(text1)-1, -1, -1): 
    for j in range(len(text2)-1, -1, -1):
        if text1[i]==text2[j]:
          dp[i][j] = 1 + dp[i+1][j+1]
        else:
          dp[i][j] = max(dp[i][j+1], dp[i+1][j])
  return dp[0][0]

# Q139
# word break

def wordBreak(s, wordDict):
  dp = [False] *(len(s)+1)
  dp[len(s)]= True

  for i in range(len(s)-1,-1,-1):
    for w in wordDict:
      if(i+len(w)) <= len(s) and s[i:i+len(w)] == w:
        dp[i] = dp[i+len(w)]
      if dp[i]:
        break
  return dp[0]

# Q139
# comb sum

def combSum4(nums,target):
  dp = {0:1}

  for total in range(1, target+1):
    dp[total] = 0
    for n in nums:
      dp[total] += dp.get(total-n,0)
  return dp[target]

# Q213
# house robber II

def houseRobber2(self,nums):
  # apply the function to first without last and last without first
  return max(nums[0], helper(nums[1:]),helper(nums[:-1]))

def helper(self,nums):
  rob1, rob2 = 0,0
  for i in nums:
    temp = max(i+rob1, rob2)
    rob1 = rob2
    rob2 = temp
  return rob2

# Q139
# decode ways

def decode(s):
  dp={ len(s):1}

  for i in range(len(s) -1, -1, -1):
    if s[i]== '0':
      dp[i]= 0
    else: 
      dp[i] = dp[i+1]
    
    if (i+1 < len(s) and (s[i] == '1' or s[i] == '2' and s[i+1] in '0123456')):
      dp[i] += dp[i+2]
  return dp[0]


# Q139
# unique paths

def uniquePaths(m,n):
  row = [1]*n

  for i in range(m-1):
    newRow = [1]*m
    for j in range(n-2-1,-1,-1):
      newRow[j] = newRow[j+1] +row[i]
    row=newRow
  return row[0]

# Q139
# jump game

def jumpGame(nums):
  goal = len(nums) -1

  for i in range(len(nums) -1, -1, -1):
    if i + nums[i] >= goal:
      goal= int(nums[i])
  return True if goal == 0 else False