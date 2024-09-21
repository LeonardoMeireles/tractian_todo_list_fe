//Made the getAllDescendants iterative instead of recursive to avoid stackoverflow on a huge dataset
export function getAllDescendants(hierarchies: Record<string, string[]>, taskId: string) {
  const descendantIds: string[] = [taskId];
  const stack = [taskId];

  while (stack.length) {
    const currentTaskId = stack.pop();
    if (currentTaskId && hierarchies[currentTaskId]?.length) {
      for (const id of hierarchies[currentTaskId]) {
        descendantIds.push(id);
        stack.push(id);
      }
    }
  }

  return descendantIds;
}