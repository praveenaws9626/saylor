import { useDispatch } from 'react-redux';
import { setHealth } from '../store/actions';

export const useSetHealth = (payload) => {
  const dispatch = useDispatch();

  const setGameHealth = () => {
    dispatch(setHealth(payload));
  };
  return { setGameHealth };
};

