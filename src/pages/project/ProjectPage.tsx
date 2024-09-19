import './ProjectPage.css';
import '../../App.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProjectInfo, updateTaskParent } from '../../redux/actions/project-action';
import Header from './components/Header/Header';
import SearchBar from './components/SearchBar/SearchBar';
import AddTask from './components/Tasks/AddTask/AddTask';
import TaskContainer from './components/Tasks/TaskContainer';
import {
  closestCenter,
  defaultDropAnimation,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  useDroppable
} from '@dnd-kit/core';
import Task from './components/Tasks/Task';
import Droppable from './components/Tasks/DnD/Droppable';

function ProjectPage() {
  const {projectId} = useParams();
  const dispatch = useDispatch();
  const [activeTaskId, setActiveTaskId] = useState<null | string>(null);
  const projectData: Project | null = useSelector((state: RootState) => {
    return state.project.selectedProject;
  });
  const {setNodeRef} = useDroppable({
    id: 'root',
  });

  useEffect(() => {
    dispatch(getProjectInfo(projectId));
  }, [projectId, dispatch]);

  const handleDragStart = ({active}: DragStartEvent) => {
    setActiveTaskId(active.id as string);
  };

  const handleDragEnd = ({active, over}: DragEndEvent) => {
    if (!over || active.id === over.id) return;

    const task = projectData?.tasks.entities[active.id];
    const newParentId = projectData?.tasks.entities[over.id].parentTaskId;
    dispatch(updateTaskParent(task, newParentId))
  };

  const task = activeTaskId && projectData ? projectData.tasks.entities[activeTaskId] : null;

  return (
    <div className={'page'} id={'project-page'}>
      <Header selectedProject={projectData}/>
      <SearchBar/>
      <div id={'all-task-container'}>
        <AddTask/>
        <DndContext
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          collisionDetection={closestCenter}
        >
          <div style={{paddingBottom: '1em'}} ref={setNodeRef}>
            {projectData?.tasks?.hierarchy
              ? projectData.tasks?.hierarchy?.root?.map((taskId: string) => {
                return <TaskContainer
                  taskLevel={0}
                  key={taskId}
                  task={projectData.tasks.entities[taskId]}
                />;
              })
              : null
            }
          </div>
          <Droppable id={'root'}>
            <div style={{height: '100%'}}/>
          </Droppable>
          <DragOverlay style={{cursor: 'grabbing'}} dropAnimation={defaultDropAnimation}>
            {task ? <Task task={task} dragOverlay={true}/> : null}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );
}

export default ProjectPage;
