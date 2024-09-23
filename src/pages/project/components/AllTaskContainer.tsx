import '../ProjectPage.css'
import '../../../App.css'
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { dragCancel, startDrag, updateTaskParent } from '../../../redux/actions/project-action';
import AddTask from './Tasks/AddTask/AddTask';
import TaskContainer from './Tasks/TaskContainer';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  useDroppable,
} from '@dnd-kit/core';
import Task from './Tasks/Task';
import Droppable from './Tasks/DnD/Droppable';
import { RootState } from '../../../redux';
import { Project } from '../../../types/task-types';

function AllTaskContainer() {
  const dispatch = useDispatch();
  const [taskBeingDragged, setTaskBeingDragged] = useState<null | string>(null);
  const projectData: Project | null = useSelector((state: RootState) => {
    return state.project.selectedProject;
  });
  const draggedTask = taskBeingDragged && projectData ? projectData.tasks.entities[taskBeingDragged] : null;
  const { setNodeRef } = useDroppable({
    id: 'root',
  });

  const handleDragStart = ({ active }: DragStartEvent) => {
    if (!projectData) return;

    setTaskBeingDragged(active.id as string);
    dispatch(startDrag(projectData.tasks.hierarchy, active.id));
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    setTaskBeingDragged(null);
    if (!projectData || !over || active.id === over.id) return dispatch(dragCancel());

    const task = projectData?.tasks.entities[active.id];
    let newOrder: number;
    if (over.id === 'root-top' || over.id === 'root-bottom') {
      newOrder = over.id === 'root-bottom' ? projectData?.tasks.hierarchy['root'].length : 0;
      over.id = 'root';
      return dispatch(updateTaskParent(task, over.id, newOrder));
    }

    let newParentTaskId: string;
    if ((over.id as string).includes('-subtask')) {
      newParentTaskId = (over.id as string).split('-')[0];
      newOrder = 0;
    } else {
      const taskOver = projectData.tasks.entities[over.id];
      newParentTaskId = taskOver.parentTaskId ?? 'root';
      newOrder = projectData.tasks.hierarchy[newParentTaskId]
        .findIndex((id: string) => id === taskOver._id) + 1;
    }
    dispatch(updateTaskParent(task, newParentTaskId, newOrder));
  };

  return (
    <div id={'all-task-container'}>
      <DndContext
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <AddTask/>
        <Droppable width={'50vw'} id={'root-top'} disabled={false}/>
        <div ref={setNodeRef}>
          {projectData?.tasks?.hierarchy
            ? projectData.tasks?.hierarchy?.root?.map((taskId: string) => {
              return <TaskContainer
                taskLevel={0}
                key={taskId}
                taskId={taskId}
              />;
            })
            : null
          }
        </div>
        <Droppable id={'root-bottom'} disabled={false}/>
        <DragOverlay style={{ cursor: 'grabbing' }} dropAnimation={null}>
          {draggedTask ? <Task task={draggedTask} dragOverlay={true}/> : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}

export default AllTaskContainer;
