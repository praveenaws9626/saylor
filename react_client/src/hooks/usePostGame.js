
// import { userLogin } from '../services';
import gamesSvc from '../services/games';

export const usePostGame = (payload, handleSuccess, handleFailure) => {
  const { postGame } = gamesSvc;

  const onSubmit = async event => {
    event.preventDefault();
    console.log(payload);
    const gamesRes = await postGame(payload);
    if (gamesRes.status === 200) {
      handleSuccess();
    } else {
      handleFailure();
    }
  };

  return { onSubmit };
};
