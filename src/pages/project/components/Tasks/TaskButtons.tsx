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
          width={16}
          height={16}
          src={EditTaskIcon}
          alt={'Edit Tasks Icon'}
        />
        <p>
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
          width={16}
          height={16}
          src={AddSubtaskIcon}
          alt={'Add Subtasks Icon'}
        />
        <p>
          Add subtask
        </p>
      </div>
      <div
        className={'task-button-container'}
        onClick={() => {
          onDeleteClick();
        }}
      >
        <img
          width={16}
          height={16}
          src={DeleteTaskIcon}
          alt={'Edit Tasks Icon'}
        />
        <p style={{color: '#EB0100'}}>
          Delete
        </p>
      </div>
    </>
  );
}

export default TaskButtons;
