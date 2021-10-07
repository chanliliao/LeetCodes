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
# pacificAtlantic 
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

# Q200
# number of islands

def numIslands(self, grid):
  island, rows, cols = 0, len(grid), len(grid[0])

  for i in range(rows):
    for j in range(cols):
        if grid[i][j] == '1':
          self.sink(grid,i,j,rows,cols)
          island += 1

  return island
        
def sink(self, grid, i, j, rows, cols):
  if i < 0 or j < 0 or i >= rows or j >= cols or grid[i][j] == 0:
    return 
  grid[i][j] = 0
  self.sink(grid, i, j - 1, rows, cols)
  self.sink(grid, i, j + 1, rows, cols)
  self.sink(grid, i - 1, j, rows, cols)
  self.sink(grid, i + 1, j, rows, cols)


# Q261
# graph valid tree

def validTree(n, edges):
  if not n:
    return True

  # create adj list
  adj = {i:[] for i in range(n)}
  for n1,n2 in edges:
    adj[n1].append(n2)
    adj[n2].append(n1)

  visited = set()

  def dfs(i, prev):
    if i in visited:
      return False
    
    visited.add(i)
    for j in adj[i]:
      if j == prev:
        continue
      if not dfs(i,j):
        return False
    return True

  return dfs(0,-1) and n == len(visited)


# Q323
# Num of connected compoent in an undirected graph
# union Find

def countComponents(n, edges):
  # parent array to see which nodes parents 
  # rank array keep track of how many nodes under parent node
  par = [i for i in range(n)]
  rank = [1] * n

  # look for the parent node
  def find(n1):
    res = n1
    while res != par[res]:
      # optimzation 
      par[res] = par[par[res]]
      res = par[res]
    return res

  # union the nodes base on the parent node and update the arrays
  def union(n1, n2):
    p1, p2 = find(n1), find(n2)
    if p1 == p2:
      return 0
    if rank[p2] > rank[p1]:
      par[p1] =p2
      rank[p2] += rank[p1]
    else:
      par[p2] = p1
      rank[p1] += rank[p2]
    return 1

  res =n 
  # loop through the nodes in edges
  for n1, n2 in edges:
    res -= union(n1,n2)
  return res

# Extra

# Q 1466
# Reoder routes

def reorderRoutes(n , connections):
  # start at city 0
  # recusively check its neighbors
  # coutn outgoing edges
  edges = {(a,b) for a,b, in connections}
  neighbors = {city:[] for city in range(n)}
  visited = set()
  changes = 0

  # fill neighbors/ adj list
  for a, b in connections:
    neighbors[a].append(b)
    neighbors[b].append(a)

  def dfs(city):
    nonlocal edges, neigbhors, visit, change

    for neighbor in neighbors[city]:
      if neighbor in vitited:
        continue
      # check if this neighbor can reach city 0
      if(neighbor, city) not in edges:
        changes += 1
      visited.add(neighbor)
      dfs(neighbor)

  visited.add(0)
  dfs(0)
  return changes

# Q684
#  Redundant connection

def redundantConnection(edges):
  par = [i for i in range(len(edges)+1)]
  rank = [1] * n

  # look for the parent node
  def find(n1):
    res = n1
    while res != par[res]:
      # optimzation 
      par[res] = par[par[res]]
      res = par[res]
    return res

  # union the nodes base on the parent node and update the arrays
  def union(n1, n2):
    p1, p2 = find(n1), find(n2)
    if p1 == p2:
      return False
    if rank[p2] > rank[p1]:
      par[p1] =p2
      rank[p2] += rank[p1]
    else:
      par[p2] = p1
      rank[p1] += rank[p2]
    return True

  for n1, n2 in edges:
    if not union(n1,n2):
      return [n1,n2]

# Q743
# Network Delay Time

def delayTime(times,n,k):
  # create a hashmap
  edges = collections.defaultdict(list)
  for u,v,w in times:
    edges[u].append((v,w))

  minHeap=[(0,k)]
  visit = set()
  t = 0
  while minHeap:
    # grab the min data weight and node
    w1, n1 = heapq.heapop(minHeap)
    # check if node is visited or not
    if n1 in visit:
      continue
    # if not add it to set
    visit.add(n1)
    # find out the weight of time and pick the biggest
    t = max(t,w1)

    # loop through all the node BFS
    for n2, w2 in edges[n1]:
      # if not visited push to the heap 
      if n2 not in visit:
        heapq.heappush(minHeap,(w1+w2,n2))

  return t if len(visit) == n  else -1
    
# Q210
# course sechedule II

def courseSchedule(n,pq):
  # create adj list
  prereq = {c:[] for c in range(n)}
  for crs, pre in pq:
    prereq[crs].append(pre)

  # a course has 3 possible states:
  # visited --> crs has been added to output
  # visiting --> crs not added to out but addle to cycle
  # unvisited --> crs not added to output or cycle
  output=[]
  visit, cycle = set(), set()
  def dfs(crs):
    # cycle detection first
    if crs in cycle:
        return False
    if crs in visit:
      return True
    # when is visted, add to visiting
    cycle.add(crs)
    # dfs looking ne prereqs
    for pre in prereq[crs]:
      if dfs(pre) == False:
        return False
    # update the sets and result
    cycle.remove(crs)
    visit.add(crs)
    output.append(crs)
    return True

  for c in range(n):
    if dfs(c) == False:
      return []
  return output
