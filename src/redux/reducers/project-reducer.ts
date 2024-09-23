import { AnyAction, createReducer } from '@reduxjs/toolkit';
import { TaskFilter, LifeCycle, UpdateStatusRes } from '../../types/redux-types';
import { TaskI, Project } from '../../types/task-types';

interface ProjectReducer {
  selectedProject: Project | null,
  projectInfoState: { lifeCycle: LifeCycle, projectId: string },
  invalidTaskDrop: string[],
  taskBeingDragged: string,
  appliedFilter: TaskFilter,
}

const initState: ProjectReducer = {
  selectedProject: null,
  projectInfoState: {lifeCycle: LifeCycle.NONE, projectId: ''},
  invalidTaskDrop: [],
  taskBeingDragged: '',
  appliedFilter: {
    searchInput: null,
    status: {
      completed: true,
      pending: true,
    }
  }
};

function handleOrderChange(oldTask: TaskI, updatedTask: TaskI, state: ProjectReducer) {
  state.invalidTaskDrop = [];
  state.selectedProject!.tasks.entities[updatedTask._id] = updatedTask;
  const hierarchy = state.selectedProject!.tasks.hierarchy;
  hierarchy[oldTask.parentTaskId ?? 'root'] = hierarchy[oldTask.parentTaskId ?? 'root'].filter((taskId: string) => taskId !== oldTask._id);
  if (updatedTask.parentTaskId && !hierarchy[updatedTask.parentTaskId]) {
    hierarchy[updatedTask.parentTaskId] = [updatedTask._id];
  } else {
    hierarchy[updatedTask.parentTaskId ?? 'root'].splice(updatedTask.order, 0, updatedTask._id);
  }
  state.invalidTaskDrop = [];
}


const reducer = createReducer(initState, {
  GET_PROJECT_INFO_REQUESTED(state: ProjectReducer, action: AnyAction) {
    state.projectInfoState = {lifeCycle: LifeCycle.REQUESTED, projectId: action.payload};
  },
  GET_PROJECT_INFO_SUCCESS(state: ProjectReducer, action: AnyAction) {
    state.projectInfoState.lifeCycle = LifeCycle.SUCCESS;
    state.selectedProject = action.payload.projectInfo;
    state.appliedFilter.searchInput = action.payload.activeSearchInput;
  },
  GET_PROJECT_INFO_ERROR(state: ProjectReducer) {
    state.projectInfoState.lifeCycle = LifeCycle.ERROR;
  },
  CREATE_TASK_SUCCESS(state: ProjectReducer, action: AnyAction) {
    const newTask: TaskI = action.payload;
    state.selectedProject!.tasks.entities[newTask._id] = newTask;
    if (newTask.parentTaskId && !state.selectedProject!.tasks.hierarchy[newTask.parentTaskId]) {
      state.selectedProject!.tasks.hierarchy[newTask.parentTaskId] = [newTask._id];
    } else {
      state.selectedProject!.tasks.hierarchy[newTask.parentTaskId ?? 'root'].unshift(newTask._id);
    }
  },
  DELETE_TASK_SUCCESS(state: ProjectReducer, action: AnyAction) {
    const {taskId, parentTaskId, deletedSubtasks} = action.payload;
    delete state.selectedProject!.tasks.entities[taskId];
    delete state.selectedProject!.tasks.hierarchy[taskId];
    state.selectedProject!.tasks.hierarchy[parentTaskId ?? 'root'] =
      state.selectedProject!.tasks.hierarchy[parentTaskId ?? 'root'].filter((task: string) => task !== taskId);
    for (const subTaskDeleted of deletedSubtasks) {
      delete state.selectedProject!.tasks.entities[subTaskDeleted];
      delete state.selectedProject!.tasks.hierarchy[subTaskDeleted];
    }
  },
  UPDATE_TASK_STATUS_SUCCESS(state: ProjectReducer, action: AnyAction) {
    const updateStatusRes: UpdateStatusRes = action.payload;
    for (const updatedTask of updateStatusRes.tasksUpdated) {
      state.selectedProject!.tasks.entities[updatedTask].completed = updateStatusRes.newStatus;
    }
  },
  UPDATE_TASK_TITLE_SUCCESS(state: ProjectReducer, action: AnyAction) {
    const updatedTitle = action.payload;
    state.selectedProject!.tasks.entities[updatedTitle._id].title = updatedTitle.title;
  },
  START_TASK_DRAG(state: ProjectReducer, action: AnyAction) {
    state.invalidTaskDrop = action.payload.invalidTasks;
    state.taskBeingDragged = action.payload.taskId;
  },
  TASK_DRAG_CANCEL(state: ProjectReducer) {
    state.invalidTaskDrop = [];
    state.taskBeingDragged = '';
  },
  UPDATE_TASK_PARENT_REQUESTED(state: ProjectReducer, action: AnyAction) {
    const {updatedTask, oldTask} = action.payload;
    state.taskBeingDragged = '';
    handleOrderChange(oldTask, updatedTask, state);
  },
  UPDATE_TASK_PARENT_ERROR(state: ProjectReducer, action: AnyAction) {
    const {updatedTask, oldTask} = action.payload;
    handleOrderChange(updatedTask, oldTask, state); //Undo change made by request action
  },
});

export default reducer;