import './Header.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../redux';
import { logout } from '../../../../redux/actions/login-action';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  selectedProject: Project | null;
}

function Header(
  {
    selectedProject
  }: HeaderProps
) {
  const userProjects = useSelector((state: RootState) => {
    return state.login.user?.projects ?? [];
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className={'header-container'}>
      <div className={'section-container'}>
        <p id={'project-label'}>Project:</p>
        <select
          style={{cursor: 'pointer'}}
          value={selectedProject?._id}
          onChange={(e) => {
            navigate(`/project/${e.target.value}`);
          }}
        >
          {userProjects.map((project: Project) => {
            return <option
              key={project._id}
              value={project._id}
            >
              {project.name}
            </option>;
          })}
        </select>
      </div>
      <div className={'section-container'}>
        <p>Logged in Todoist</p>
        <p
          id={'logout-button'}
          onClick={() => {
            dispatch(logout());
          }}
        >
          Logout
        </p>
      </div>
    </div>
  );
}

export default Header;
