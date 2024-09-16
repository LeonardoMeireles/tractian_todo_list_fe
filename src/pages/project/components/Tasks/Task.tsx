import './Task.css';
import { useState } from 'react';
import CompletedTaskIcon from '../../../../assets/Icons/TaskIcons/CompletedTask.svg';
import PendingTaskIcon from '../../../../assets/Icons/TaskIcons/PendingTask.svg';
import TaskEditFinishIcon from '../../../../assets/Icons/TaskIcons/TaskEditFinish.svg';
import DragIcon from '../../../../assets/Icons/DragIcon.svg';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask, updateTaskStatus, updateTaskTitle } from '../../../../redux/actions/project-action';
import { RootState } from '../../../../redux';
import TaskButtons from './TaskButtons';

interface TaskProps {
  task: Task;
  taskLevel: number;
}

function Task(
  {
    task,
    taskLevel
  }: TaskProps
) {
  const dispatch = useDispatch();
  const projectData: Project | null = useSelector((state: RootState) => {
    return state.project.selectedProject;
  });
  const [editInput, setEditInput] = useState<string>(task.title);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [taskHover, setTaskHover] = useState<boolean>(false);

  function handleEditMode() {
    setTaskHover(false);
    setEditMode(true);
  }

  return (
    <div className={'task-container'}>
      <div
        className={'parent-task-container normal-task-container'}
        style={{
          paddingLeft: `${(taskLevel) * 1.5}em`,
          background: taskHover ? '#F5F5FC' : 'transparent'
        }}
        onMouseEnter={() => {
          if (!editMode) setTaskHover(true);
        }}
        onMouseLeave={() => setTaskHover(false)}
      >
        {taskHover
          ? <img
            width={16}
            height={16}
            src={DragIcon}
            alt={'Drag Icon'}
          />
          : null
        }
        <img
          width={16}
          height={16}
          onClick={(e) => {
            dispatch(updateTaskStatus(task));
          }}
          style={{marginLeft: taskHover ? '0' : '1.5em'}} //Avoids task moving when drag icon appears
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
              width={16}
              height={16}
              onClick={() => {
                if (task.title !== editInput) dispatch(updateTaskTitle(task, editInput));
                setEditMode(false);
              }}
              style={{marginLeft: '0.5em'}} //Avoids task moving when drag icon appears
              src={TaskEditFinishIcon}
              alt={'Finish task edit icon'}
            />
          </>
          : <p className={task.completed ? 'completed-task' : ''}>
            {task.title}
          </p>
        }
        {taskHover
          ? <TaskButtons
            onEditClick={handleEditMode}
            onDeleteClick={() => dispatch(deleteTask(task))}
          />
          : null
        }
      </div>
      <div className={'sub-task-container'}>
        {
          projectData!.tasks.hierarchy[task._id]?.map((subtaskId: string) => {
            return <Task
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

export default Task;
