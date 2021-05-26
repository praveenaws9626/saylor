import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
// import { userLogin } from '../services';
import authenticationSvc from '../services/authentication';
import { setUserData } from '../store/actions';

export const useLogin = (formState, handleSuccess, handleFailure) => {
  const history = useHistory();
  const { userLogin } = authenticationSvc;
  const dispatch = useDispatch();

  const onSubmit = async event => {
    event.preventDefault();
    const loginRes = await userLogin(formState);
    if (loginRes && loginRes.status === 200) {
      handleSuccess();
      const fullUser = Object.assign({}, loginRes.data);
      localStorage.setItem('token', JSON.stringify(fullUser));
      dispatch(setUserData(fullUser));
      history.push('/');
    } else {
      handleFailure();
    }
  };

  return { onSubmit };
};
