import './Task.css';
import { useState } from 'react';
import TaskEditFinishIcon from '../../../../assets/Icons/TaskIcons/TaskEditFinish.svg';
import TaskEditCancelIcon from '../../../../assets/Icons/TaskIcons/TaskEditCancel.svg';

interface AddTaskFormProps {
  onCompleteClick: (title: string) => void;
  onCancelClick: () => void;
}

function AddTaskForm(
  {
    onCompleteClick,
    onCancelClick,
  }: AddTaskFormProps
) {
  const [newTaskTitle, setNewTaskTitle] = useState<string>('');

  return (
    <div className={'add-task-form'}>
      <input
        autoFocus={true}
        className={'task-form-input'}
        placeholder={'New task'}
        value={newTaskTitle}
        onChange={(e) => setNewTaskTitle(e.target.value)}
      />
      <img
        width={16}
        height={16}
        onClick={() => {
          onCompleteClick(!newTaskTitle ? 'New task' : newTaskTitle);
        }}
        style={{marginLeft: '0.5em'}} //Avoids task moving when drag icon appears
        src={TaskEditFinishIcon}
        alt={'Finish task edit icon'}
      />
      <img
        width={16}
        height={16}
        onClick={() => {
          onCancelClick();
        }}
        style={{marginLeft: '0.5em'}} //Avoids task moving when drag icon appears
        src={TaskEditCancelIcon}
        alt={'Finish task edit icon'}
      />
    </div>
  );
}

export default AddTaskForm;
