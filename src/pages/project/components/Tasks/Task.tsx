import './Task.css';
import { useState } from 'react';
import CompletedTaskIcon from '../../../../assets/Icons/TaskIcons/CompletedTask.svg';
import PendingTaskIcon from '../../../../assets/Icons/TaskIcons/PendingTask.svg';
import TaskEditFinishIcon from '../../../../assets/Icons/TaskIcons/TaskEditFinish.svg';
import DragIcon from '../../../../assets/Icons/DragIcon.svg';
import { useDispatch } from 'react-redux';
import { deleteTask, updateTaskStatus, updateTaskTitle } from '../../../../redux/actions/project-action';
import TaskButtons from './TaskButtons';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

interface TaskProps {
  task: Task;
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

  function handleEditMode() {
    setTaskHover(false);
    setEditMode(true);
  }

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging
  } = useDraggable({
    id: task._id
  });
  const draggableStyle = {
    transform: CSS.Transform.toString(transform),
    opacity: isDragging ? 0 : 1,
  };

  return (
    <div
      className={'parent-task-container normal-task-container'}
      style={{
        marginTop: dragOverlay ? 0 : '0.75em',
        ...draggableStyle,
        background: !dragOverlay && taskHover ? '#F5F5FC' : 'transparent'
      }}
      onMouseEnter={() => {
        if (!editMode) setTaskHover(true);
      }}
      onMouseLeave={() => setTaskHover(false)}
    >
      {!dragOverlay && taskHover
        ? <img
          ref={setNodeRef}
          {...listeners}
          {...attributes}
          width={16}
          height={16}
          src={DragIcon}
          alt={'Drag Icon'}
        />
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
          />
          <img
            className={'task-icon'}
            onClick={() => {
              if (task.title !== editInput) dispatch(updateTaskTitle(task, editInput));
              setEditMode(false);
            }}
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

export default Task;
