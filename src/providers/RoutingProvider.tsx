import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import LoginPage from '../pages/login/LoginPage';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux';
import ProjectPage from '../pages/project/ProjectPage';
import { loadCachedUser } from '../redux/actions/login-action';

function RoutingProvider() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => {
    return state.login.user;
  });
  const {pathname} = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && pathname !== '/login') {
      const loggedInUser = localStorage.getItem('user');
      if (loggedInUser) {
        const cachedUser = JSON.parse(loggedInUser);
        dispatch(loadCachedUser(cachedUser));
        return navigate(`/project/${cachedUser.projects[0]._id}`);
      }
      navigate('/login');
    }
  }, [pathname, user]);

  return (
    <Routes>
      <Route path={'/login'} element={<LoginPage/>}/>
      <Route path={'/project/:projectId'} element={<ProjectPage/>}/>
    </Routes>
  );
}

export default RoutingProvider;
