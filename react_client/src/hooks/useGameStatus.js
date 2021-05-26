import { useDispatch } from 'react-redux';
import { setGameStatus } from '../store/actions';

export const useGameStatus = (status) => {
    const dispatch = useDispatch();
    console.log(status, "status")
    const gameStatus = () => {
      dispatch(setGameStatus(status));
    };
  
    return { gameStatus };
};
