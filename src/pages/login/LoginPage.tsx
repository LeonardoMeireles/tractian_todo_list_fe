import './LoginPage.css';
import '../../App.css';
import TextInput from '../../components/TextInput/TextInput';
import { useDispatch, useSelector } from 'react-redux';
import { loginToApp } from '../../redux/actions/login-action';
import { RootState } from '../../redux';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginState = useSelector((state: RootState) => {
    return state.login.loginState.lifeCycle;
  });

  function handleSubmit(e: any) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const loginInfo = Object.fromEntries(formData.entries());
    dispatch(loginToApp(loginInfo, navigate));
  }

  return (
    <div className={'page'} id={'login-page'}>
      <div className={'login-container'}>
        <div className={'header'}>
          <h1 className={'title'}>Sign in</h1>
          <p className={'message'}>Improve your productivity today with Todoist!</p>
        </div>
        <form className={'login-form'} onSubmit={handleSubmit}>
          <TextInput
            minHeight={'4em'}
            padding={'1em'}
            required={true}
            name={'username'}
            placeholder={'Username'}
          />
          <TextInput
            minHeight={'4em'}
            padding={'1em'}
            required={true}
            name={'password'}
            placeholder={'Password'}
            type={'password'}
          />
          {loginState === 'ERROR'
            ? <div className={'error-container'}>
              <p className={'error-message'}>Incorrect username or password</p>
            </div>
            : null
          }
          <button className={'login-button'}>Login</button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
