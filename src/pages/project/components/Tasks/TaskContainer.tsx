import './Task.css';
import { useState, memo } from 'react';
import PendingTaskIcon from '../../../../assets/Icons/TaskIcons/PendingTask.svg';
import { useDispatch, useSelector } from 'react-redux';
import { createNewTask } from '../../../../redux/actions/project-action';
import { RootState } from '../../../../redux';
import AddTaskForm from './AddTask/AddTaskForm';
import Droppable from './DnD/Droppable';
import Task from './Task';
import {TaskI} from '../../../../types/task-types'

interface TaskProps {
  taskId: string;
  taskLevel: number;
}

function TaskContainer(
  {
    taskId,
    taskLevel,
  }: TaskProps
) {
  const dispatch = useDispatch();
  const projectId: string | undefined = useSelector((state: RootState) => {
    return state.project.selectedProject?._id;
  });
  const taskData: TaskI | undefined = useSelector((state: RootState) => {
    return state.project.selectedProject!.tasks.entities[taskId];
  });
  const taskHierarchy: string[] | undefined = useSelector((state: RootState) => {
    return state.project.selectedProject?.tasks.hierarchy[taskId];
  });
  const disabledDroppable: boolean = useSelector((state: RootState) => {
    return state.project.invalidTaskDrop.includes(taskId);
  });
  const [addSubtask, setAddSubtask] = useState<boolean>(false);

  function handleAddNewSubtask(subtaskTitle: string) {
    setAddSubtask(false);
    const newTask = {
      title: subtaskTitle,
      projectId: projectId,
      parentTaskId: taskId,
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
      <Task task={taskData} setAddSubtask={setAddSubtask}/>
      <Droppable disabled={disabledDroppable} id={taskId}/>
      <div className={'sub-task-container'}>
        <Droppable width={'100vw'} marginLeft={'2.5em'} disabled={disabledDroppable} id={taskId + '-subtask'}/>
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
          taskHierarchy?.map((subtaskId: string) => {
            return <TaskContainer
              key={subtaskId}
              taskId={subtaskId}
              taskLevel={taskLevel + 1}
            />;
          })
        }
      </div>
    </div>
  );
}

export default memo(TaskContainer);
