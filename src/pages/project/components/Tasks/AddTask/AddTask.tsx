import '../Task.css';
import './AddTask.css';
import AddTaskIcon from '../../../../../assets/Icons/TaskIcons/AddTask.svg';
import { useState } from 'react';
import AddTaskForm from './AddTaskForm';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../redux';
import { createNewTask } from '../../../../../redux/actions/project-action';

function AddTask() {
  const dispatch = useDispatch();
  const [addNewTask, setAddNewTask] = useState<boolean>(false);
  const projectId: string | undefined = useSelector((state: RootState) => {
    return state.project.selectedProject?._id;
  });

  function onCompleteClick(newTaskTitle: string) {
    setAddNewTask(false);
    const newTask = {
      title: newTaskTitle,
      projectId,
      parentTaskId: null,
    };
    dispatch(createNewTask(newTask));
  }

  return (
    <div
      className={'task-container'}
      id={'add-task-container'}
    >
      <div
        className={'parent-task-container'}
        onClick={() => {
          if (!addNewTask) setAddNewTask(true);
        }}
      >
        <img
          id={'add-task-icon'}
          src={AddTaskIcon}
          style={{marginLeft: '1.5em'}}
          alt={'Add Tasks Icon'}
        />
        {
          addNewTask
            ? <AddTaskForm
              onCompleteClick={(newTaskTitle) => onCompleteClick(newTaskTitle)}
              onCancelClick={() => setAddNewTask(false)}
            />
            : <p className={'task-title'}>Add new task</p>
        }
      </div>
    </div>
  );
}

export default AddTask;
