import './ProjectPage.css';
import '../../App.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProjectInfo } from '../../redux/actions/project-action';
import Header from './components/Header/Header';
import SearchBar from './components/SearchBar/SearchBar';
import AllTaskContainer from './components/AllTaskContainer';

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
      <AllTaskContainer/>
    </div>
  );
}

export default ProjectPage;
