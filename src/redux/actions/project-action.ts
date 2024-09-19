import { ProjectService } from '../../services/project-service';
import { NewTaskDto } from '../../types/redux-types';

export const getProjectInfo: any = (projectId: string, search?: string, completed?: boolean, pending?: boolean) => (dispatch: any) => {
  dispatch({
    type: 'GET_PROJECT_INFO_REQUESTED',
  });
  return ProjectService.getProjectTasks(projectId, search, completed, pending)
    .then((res) => {
      dispatch({
        type: 'GET_PROJECT_INFO_SUCCESS',
        payload: {
          projectInfo: res.data,
          activeSearchInput: search,
        },
      });
    })
    .catch((err) => {
      dispatch({
        type: 'GET_PROJECT_INFO_ERROR',
        payload: err,
      });
    });
};

export const createNewTask: any = (newTask: NewTaskDto) => (dispatch: any) => {
  return ProjectService.createNewTask(newTask)
    .then((res) => {
      dispatch({
        type: 'CREATE_TASK_SUCCESS',
        payload: res.data,
      });
    });
};

export const deleteTask: any = (task: Task) => (dispatch: any) => {
  return ProjectService.deleteTask(task._id)
    .then((res) => {
      dispatch({
        type: 'DELETE_TASK_SUCCESS',
        payload: {
          taskId: task._id,
          parentTaskId: task.parentTaskId,
          deletedSubtasks: res.data.deletedSubtasks
        },
      });
    });
};

export const updateTaskStatus: any = (task: Task) => (dispatch: any) => {
  return ProjectService.updateTaskStatus(task)
    .then((res) => {
      dispatch({
        type: 'UPDATE_TASK_STATUS_SUCCESS',
        payload: res.data,
      });
    });
};

export const updateTaskTitle: any = (task: Task, newTitle: string) => (dispatch: any) => {
  task.title = newTitle;
  return ProjectService.updateTaskData(task)
    .then((res) => {
      dispatch({
        type: 'UPDATE_TASK_TITLE_SUCCESS',
        payload: res.data,
      });
    });
};

export const updateTaskParent: any = (task: Task, newParentId: string) => (dispatch: any) => {
  const updatedTask = {
    ...task,
    parentTaskId: newParentId,
  };
  return ProjectService.updateTaskData(updatedTask)
    .then(() => {
      dispatch({
        type: 'UPDATE_TASK_PARENT_SUCCESS',
        payload: {
          oldTask: task,
          updatedTask
        },
      });
    });
};