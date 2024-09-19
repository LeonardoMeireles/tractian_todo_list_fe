import './Task.css';
import { useState } from 'react';
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
}

function TaskContainer(
  {
    task,
    taskLevel,
  }: TaskProps
) {
  const dispatch = useDispatch();
  const projectData: Project | null = useSelector((state: RootState) => {
    return state.project.selectedProject;
  });
  const [addSubtask, setAddSubtask] = useState<boolean>(false);

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
        paddingLeft: `${taskLevel ? 1.5 : 0}em`,
      }}
    >
      <Droppable id={task._id}>
        <Task task={task} setAddSubtask={setAddSubtask}/>
      </Droppable>
      <div className={'sub-task-container'}>
        {
          addSubtask
            ? <div
              className={'parent-task-container normal-task-container'}
              style={{
                paddingLeft: `${taskLevel ? 1.5 : 0}em`,
                marginTop: '0.75em'
              }}
            >
              <img
                width={16}
                height={16}
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

export default TaskContainer;
