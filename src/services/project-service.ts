import axios from 'axios';
import { NewTaskDto } from '../types/redux-types';

const BASE_URL = process.env.REACT_APP_BASE_URL;

async function getProjectTasks(projectId: string) {
  return await axios.get(`${BASE_URL}/task/project/${projectId}`);
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

async function updateTaskTitle(updatedTask: Task, newTitle: string) {
  return await axios.patch(
    `${BASE_URL}/task`,
    {
      ...updatedTask,
      title: newTitle
    }
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
  updateTaskTitle,
  createNewTask,
  deleteTask
};