import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteUserData, setUserData } from '../store/actions';

export const useLogOff = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const logOff = () => {
    dispatch(deleteUserData());
    localStorage.removeItem('token');
    dispatch(setUserData(null));
    history.push('/login');
  };

  return { logOff };
};
