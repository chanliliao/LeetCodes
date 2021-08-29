# Q133
# clone graph

class Node:
  def __init(self,val=0,neighbors=None):
    self.val=val
    self.neighbors = neighbors

def cloneGraph(node):
  oldToNew = {}
  
  def clone(node):
    if node in oldToNew:
      return oldToNew[node]
    
    copy = Node(node.val)
    oldToNew[node] = copy

    for neighbor in node.neighbors:
      copy.neighbors.append(clone(neighbor))
    return copy
  
  return clone(node) if node else None

# Q207
# course schedule
def canFinish(numCourses, prereq):
  # map each course to prereq list
  preMap = {i:[] for i in range(numCourses)}
  for crs, pre in prereq:
    preMap[crs].append[pre]
  
  # visitedset  = all course along the curr dfs path
  visitSet = set()

  def dfs(crs):
    if crs in visitSet:
      return False
    if preMap[crs] == []:
      return True

    visitSet.add(crs)
    for pre in preMap[crs]:
      if not dfs(pre): 
        return False 
    visitSet.remove(crs)
    preMap[crs] = []
    return True
  for crs in range(numCourses):
    if not dfs(crs):
      return False
  return True

# Q417
# course schedule
def pacificAtlantic(heights):
  # define rows and cols and the sets 
  ROW,COL = len(heights), len(heights[0])
  pac, atl = set(), set()

  # dfs
  def dfs(r,c,visited,prevHeight):
    if(r,c) in visited or r < 0 or c < 0 or r == ROW or c == COL or heights[r][c] < prevHeight:
      return
    visited.add((r,c))
    dfs(r-1,c,visited,heights[r][c])
    dfs(r,c-1,visited,heights[r][c])
    dfs(r+1,c,visited,heights[r][c])
    dfs(r,c+1,visited,heights[r][c])

  # loop through the graph for col
  for c in range(COL):
    dfs(0,c,pac,heights[0][c])
    dfs(ROW -1,c,atl,heights[ROW-1][c])
  # loop through the graph for row
  for r in range(ROW):
    dfs(r,0,pac,heights[r][0])
    dfs(r,COL-1,atl,heights[r][COL-1])

  # loop through graph again to see intersection and add to result
  res = []
  for r in range(ROW):
    for c in range(COL):
      if (r,c) in pac and (r,c) in atl:
        res.append([r,c])
  return res