interface ProjectData {
  _id: string,
  name: string,
  participants: string[],
}

interface Project extends ProjectData {
  tasks: {
    entities: Record<string, Task>,
    hierarchy: Record<string, string[]>,
  },
}

interface Task {
  _id: string,
  title: string,
  parentTaskId: string | null,
  projectId: string,
  completed: boolean,
  createdAt: Date,
}