import './Task.css';
import EditTaskIcon from '../../../../assets/Icons/EditIcon.svg';
import DeleteTaskIcon from '../../../../assets/Icons/DeleteIcon.svg';
import AddSubtaskIcon from '../../../../assets/Icons/TaskIcons/AddSubtask.svg';

interface TaskButtonsProps {
  onEditClick: () => void,
  onDeleteClick: () => void,
  onAddSubtaskClick: () => void,
}

function TaskButtons(
  {
    onEditClick,
    onDeleteClick,
    onAddSubtaskClick,
  }: TaskButtonsProps
) {
  return (
    <>
      <div
        className={'task-button-container'}
        onClick={() => {
          onEditClick();
        }}
      >
        <img
          className={'task-icon'}
          src={EditTaskIcon}
          alt={'Edit Tasks Icon'}
        />
        <p className={'task-button-text'}>
          Edit
        </p>
      </div>
      <div
        className={'task-button-container'}
        onClick={() => {
          onAddSubtaskClick();
        }}
      >
        <img
          className={'task-icon'}
          src={AddSubtaskIcon}
          alt={'Add Subtasks Icon'}
        />
        <p className={'task-button-text'}>
          Add Subtask
        </p>
      </div>
      <div
        className={'task-button-container'}
        onClick={() => {
          onDeleteClick();
        }}
      >
        <img
          className={'task-icon'}
          src={DeleteTaskIcon}
          alt={'Edit Tasks Icon'}
        />
        <p className={'task-button-text'} style={{color: '#EB0100'}}>
          Delete
        </p>
      </div>
    </>
  );
}

export default TaskButtons;
