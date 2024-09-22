import './Task.css';
import { useState, memo } from 'react';
import PendingTaskIcon from '../../../../assets/Icons/TaskIcons/PendingTask.svg';
import { useDispatch, useSelector } from 'react-redux';
import { createNewTask } from '../../../../redux/actions/project-action';
import { RootState } from '../../../../redux';
import AddTaskForm from './AddTask/AddTaskForm';
import Task from './Task';
import Droppable from './DnD/Droppable';

interface TaskProps {
  task: Task;
  taskLevel: number;
  taskBeingDragged: string | null;
}

function TaskContainer(
  {
    task,
    taskLevel,
    taskBeingDragged,
  }: TaskProps
) {
  const dispatch = useDispatch();
  const projectData: Project | null = useSelector((state: RootState) => {
    return state.project.selectedProject;
  });
  const invalidTaskDrop: string[] = useSelector((state: RootState) => {
    return state.project.invalidTaskDrop;
  });
  const [addSubtask, setAddSubtask] = useState<boolean>(false);
  const disabledDroppable = invalidTaskDrop.includes(task._id);

  function handleAddNewSubtask(subtaskTitle: string) {
    setAddSubtask(false);
    const newTask = {
      title: subtaskTitle,
      projectId: projectData?._id,
      parentTaskId: task._id,
    };
    dispatch(createNewTask(newTask));
  }

  return (
    <div
      className={'task-container'}
      style={{
        marginLeft: `${taskLevel ? 1.5 : 0}em`,
      }}
    >
      <Task task={task} setAddSubtask={setAddSubtask}/>
      {taskBeingDragged && <Droppable disabled={disabledDroppable} id={task._id}/>}
      <div className={'sub-task-container'}>
        {taskBeingDragged &&
            <Droppable width={'100vw'} marginLeft={'2.5em'} disabled={disabledDroppable} id={task._id + '-subtask'}/>}
        {
          addSubtask
            ? <div
              className={'parent-task-container normal-task-container'}
              style={{
                marginLeft: `${1.5}em`,
                marginTop: '0.75em'
              }}
            >
              <img
                className={'task-icon'}
                style={{marginLeft: '1.5em'}}
                src={PendingTaskIcon}
                alt={'New subtask icon'}
              />
              <AddTaskForm
                onCompleteClick={(subtaskTitle) => handleAddNewSubtask(subtaskTitle)}
                onCancelClick={() => setAddSubtask(false)}
              />
            </div>
            : null
        }
        {
          projectData!.tasks.hierarchy[task._id]?.map((subtaskId: string) => {
            return <TaskContainer
              taskBeingDragged={taskBeingDragged}
              key={subtaskId}
              task={projectData!.tasks.entities[subtaskId]}
              taskLevel={taskLevel + 1}
            />;
          })
        }
      </div>
    </div>
  );
}

export default memo(TaskContainer);
