import { AnyAction, createReducer } from '@reduxjs/toolkit';
import { LifeCycle, UpdateStatusRes } from '../../types/redux-types';

interface ProjectReducer {
  selectedProject: Project | null,
  projectInfoState: { lifeCycle: LifeCycle }
}

const initState: ProjectReducer = {
  selectedProject: null,
  projectInfoState: {lifeCycle: LifeCycle.NONE}
};

const reducer = createReducer(initState, {
  PROJECT_INFO_REQUESTED(state: ProjectReducer) {
    state.projectInfoState = {lifeCycle: LifeCycle.REQUESTED};
  },
  PROJECT_INFO_SUCCESS(state: ProjectReducer, action: AnyAction) {
    state.projectInfoState = {lifeCycle: LifeCycle.SUCCESS};
    state.selectedProject = action.payload;
  },
  PROJECT_INFO_ERROR(state: ProjectReducer) {
    state.projectInfoState = {lifeCycle: LifeCycle.ERROR};
  },
  CREATE_TASK_SUCCESS(state: ProjectReducer, action: AnyAction) {
    const newTask: Task = action.payload;
    state.selectedProject!.tasks.entities[newTask._id] = newTask;
    state.selectedProject!.tasks.hierarchy.root.push(newTask._id);
  },
  DELETE_TASK_SUCCESS(state: ProjectReducer, action: AnyAction) {
    const {taskId, parentTaskId, deletedSubtasks} = action.payload;
    delete state.selectedProject!.tasks.entities[taskId];
    delete state.selectedProject!.tasks.hierarchy[taskId];
    state.selectedProject!.tasks.hierarchy[parentTaskId ?? 'root'] =
      state.selectedProject!.tasks.hierarchy[parentTaskId ?? 'root'].filter((task) => task !== taskId);
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
    const updatedTask = action.payload;
    state.selectedProject!.tasks.entities[updatedTask._id] = updatedTask;
  },
});

export default reducer;