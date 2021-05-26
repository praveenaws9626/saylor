import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
// import { userLogin } from '../services';
import gamesSvc from '../services/games';
import { setGameData } from '../store/actions';

export const useGetGames = (gameIsRunning) => {
  const { getGames } = gamesSvc;
  const dispatch = useDispatch();
    useEffect(async () => {
      if(!gameIsRunning) {
      const gamesRes = await getGames();
      if (gamesRes && gamesRes.status === 200) {
        dispatch(setGameData(gamesRes.data));
      }
    }
    }, [gameIsRunning]);
};
