export function replaceTask(tasks, updatedTask) {
    return tasks.map(task => {
      if (task.id === updatedTask.id) {
        return updatedTask;
      }
      return task;
    });
  }