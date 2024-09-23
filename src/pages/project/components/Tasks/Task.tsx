import './Task.css';
import { memo, useState } from 'react';
import CompletedTaskIcon from '../../../../assets/Icons/TaskIcons/CompletedTask.svg';
import PendingTaskIcon from '../../../../assets/Icons/TaskIcons/PendingTask.svg';
import TaskEditFinishIcon from '../../../../assets/Icons/TaskIcons/TaskEditFinish.svg';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask, updateTaskStatus, updateTaskTitle } from '../../../../redux/actions/project-action';
import TaskButtons from './TaskButtons';
import { TaskI } from '../../../../types/task-types';
import Draggable from './DnD/Draggable';
import { RootState } from '../../../../redux';

interface TaskProps {
  task: TaskI;
  dragOverlay?: boolean;
  setAddSubtask?: (value: boolean) => void;
}

function Task(
  {
    task,
    dragOverlay = false,
    setAddSubtask
  }: TaskProps
) {
  const dispatch = useDispatch();
  const [editInput, setEditInput] = useState<string>(task.title);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [taskHover, setTaskHover] = useState<boolean>(false);
  const taskBeingDragged: boolean = useSelector((state: RootState) => {
    return state.project.taskBeingDragged === task._id && !dragOverlay;
  });

  function handleEditMode() {
    setTaskHover(false);
    setEditMode(true);
  }

  function handleTitleEdit() {
    if (task.title !== editInput) dispatch(updateTaskTitle(task, editInput));
    setEditMode(false);
  }

  return (
    <div
      className={'parent-task-container normal-task-container'}
      style={{
        marginTop: dragOverlay ? 0 : '0.75em',
        opacity: taskBeingDragged ? 0 : 1,
        background: !dragOverlay && taskHover ? '#F5F5FC' : 'transparent'
      }}
      onMouseEnter={() => {
        if (!editMode) setTaskHover(true);
      }}
      onMouseLeave={() => setTaskHover(false)}
    >
      {!dragOverlay && taskHover
        ? <Draggable id={task._id}/>
        : null
      }
      <img
        className={'task-icon'}
        onClick={(e) => {
          dispatch(updateTaskStatus(task));
        }}
        style={{marginLeft: !dragOverlay && taskHover ? '0' : '1.5em'}} //Avoids task moving when drag icon appears
        src={task.completed ? CompletedTaskIcon : PendingTaskIcon}
        alt={'Tasks Icon'}
      />
      {editMode
        ? <>
          <input
            autoFocus={true}
            className={'task-form-input'}
            value={editInput}
            onChange={(e) => setEditInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleTitleEdit();
            }}
          />
          <img
            className={'task-icon'}
            onClick={() => handleTitleEdit()}
            style={{marginLeft: '0.5em'}} //Avoids task moving when drag icon appears
            src={TaskEditFinishIcon}
            alt={'Finish task edit icon'}
          />
        </>
        : <p className={'task-title ' + (task.completed ? 'completed-task' : '')}>
          {task.title}
        </p>
      }
      {!dragOverlay && taskHover
        ? <TaskButtons
          onEditClick={handleEditMode}
          onDeleteClick={() => dispatch(deleteTask(task))}
          onAddSubtaskClick={() => {
            if (setAddSubtask) setAddSubtask(true);
          }}
        />
        : null
      }
    </div>
  );
}

export default memo(Task);
