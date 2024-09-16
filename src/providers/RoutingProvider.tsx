import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import LoginPage from '../pages/login/LoginPage';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux';
import ProjectPage from '../pages/project/ProjectPage';

function RoutingProvider() {
  const user = useSelector((state: RootState) => {
    return state.login.user;
  });
  const {pathname} = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [pathname, user, navigate]);

  return (
    <Routes>
      <Route path={'/login'} element={<LoginPage/>}/>
      <Route path={'/project/:projectId'} element={<ProjectPage/>}/>
    </Routes>
  );
}

export default RoutingProvider;
