import { useDispatch } from 'react-redux';
import { resetHealth } from '../store/actions';

export const useResetHealth = () => {
    const dispatch = useDispatch();
  
    const resetGameHealth = () => {
      dispatch(resetHealth());
    };
  
    return { resetGameHealth };
};
