interface ProjectData {
  _id: string,
  name: string,
  participants: string[],
}

export interface Project extends ProjectData {
  tasks: {
    entities: Record<string, TaskI>,
    hierarchy: Record<string, string[]>,
  },
}

export interface TaskI {
  _id: string,
  title: string,
  parentTaskId: string | null,
  projectId: string,
  completed: boolean,
  order: number,
  createdAt: Date,
}