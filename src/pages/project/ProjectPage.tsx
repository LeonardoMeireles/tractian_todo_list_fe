import './ProjectPage.css';
import '../../App.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProjectInfo } from '../../redux/actions/project-action';
import Header from './components/Header/Header';
import SearchBar from './components/SearchBar/SearchBar';
import AllTaskContainer from './components/AllTaskContainer';
import { RootState } from '../../redux';
import { LifeCycle } from '../../types/redux-types';

function ProjectPage() {
  const {projectId} = useParams();
  const dispatch = useDispatch();
  const projectInfoState: LifeCycle | undefined = useSelector((state: RootState) => {
    return state.project.projectInfoState.lifeCycle;
  });

  useEffect(() => {
    dispatch(getProjectInfo(projectId));
  }, [projectId, dispatch]);

  return (
    <div className={'page'} id={'project-page'}>
      <Header/>
      <SearchBar/>
      {projectInfoState === 'ERROR' && <p>Failed to retrieve tasks, please try again...</p>}
      {projectInfoState === 'REQUESTED' && <p>Loading tasks...</p>}
      {projectInfoState === 'SUCCESS' && <AllTaskContainer/>}
    </div>
  );
}

export default ProjectPage;
