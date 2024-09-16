import './ProjectPage.css';
import '../../App.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProjectInfo } from '../../redux/actions/project-action';
import Header from './components/Header/Header';
import SearchBar from './components/SearchBar/SearchBar';
import Task from './components/Tasks/Task';
import AddTask from './components/Tasks/AddTask';

function ProjectPage() {
  const {projectId} = useParams();
  const dispatch = useDispatch();
  const projectData: Project | null = useSelector((state: RootState) => {
    return state.project.selectedProject;
  });

  useEffect(() => {
    dispatch(getProjectInfo(projectId));
  }, [projectId, dispatch]);

  return (
    <div className={'page'} id={'project-page'}>
      <Header selectedProject={projectData}/>
      <SearchBar/>
      <div id={'all-task-container'}>
        <AddTask/>
        {projectData?.tasks?.hierarchy
          ? projectData.tasks?.hierarchy?.root?.map((taskId: string) => {
            return <Task
              taskLevel={0}
              key={taskId}
              task={projectData.tasks.entities[taskId]}
            />;
          })
          : null
        }
      </div>
    </div>
  );
}

export default ProjectPage;
