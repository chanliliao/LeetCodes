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

  