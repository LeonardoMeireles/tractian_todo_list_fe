export enum LifeCycle {
  'NONE' = 'NONE',
  'REQUESTED' = 'REQUESTED',
  'ERROR' = 'ERROR',
  'SUCCESS' = 'SUCCESS'
}

export interface UpdateStatusRes {
  tasksUpdated: string[],
  newStatus: boolean,
}

export interface NewTaskDto {
  title: string,
  projectId: string,
  parentTaskId: string | null,
}

export interface TaskFilter {
  searchInput: string | null,
  status: {
    completed: boolean,
    pending: boolean,
  }
}