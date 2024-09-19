import axios from 'axios';
import { NewTaskDto } from '../types/redux-types';

const BASE_URL = process.env.REACT_APP_BASE_URL;

async function getProjectTasks(projectId: string, search?: string, completed?: boolean, pending?: boolean) {
  const params: Record<string, any> = {search};
  if (completed !== pending) {
    params['completedFilter'] = completed;
  }
  return await axios.get(
    `${BASE_URL}/task/project/${projectId}`,
    {
      params
    }
  );
}

async function createNewTask(newTask: NewTaskDto) {
  return await axios.post(
    `${BASE_URL}/task`,
    newTask
  );
}

async function deleteTask(taskId: string) {
  return await axios.delete(`${BASE_URL}/task/${taskId}`);
}

async function updateTaskData(updatedTask: Task) {
  return await axios.patch(
    `${BASE_URL}/task`,
    updatedTask
  );
}

async function updateTaskStatus(updatedTask: Task) {
  return await axios.patch(
    `${BASE_URL}/task/status`,
    {
      _id: updatedTask._id,
      parentTaskId: updatedTask.parentTaskId,
      completed: !updatedTask.completed
    }
  );
}

export const ProjectService = {
  getProjectTasks,
  updateTaskStatus,
  updateTaskData,
  createNewTask,
  deleteTask
};