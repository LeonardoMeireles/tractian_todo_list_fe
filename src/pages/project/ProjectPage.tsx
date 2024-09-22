import './ProjectPage.css';
import '../../App.css';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProjectInfo } from '../../redux/actions/project-action';
import Header from './components/Header/Header';
import SearchBar from './components/SearchBar/SearchBar';
import AllTaskContainer from './components/AllTaskContainer';

function ProjectPage() {
  const {projectId} = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProjectInfo(projectId));
  }, [projectId, dispatch]);

  return (
    <div className={'page'} id={'project-page'}>
      <Header/>
      <SearchBar/>
      <AllTaskContainer/>
    </div>
  );
}

export default ProjectPage;
