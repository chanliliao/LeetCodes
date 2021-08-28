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