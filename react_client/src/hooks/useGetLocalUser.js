import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUserData } from '../store/actions';

/*
	this hook check for user data in the browser local storage
	and place it on the redux store
*/

export const useGetLocalUser = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const userData = localStorage.getItem('token');
    // need to transform to JSON the data
    // because localstorage save it as string
    userData && dispatch(setUserData(JSON.parse(userData)));
  }, []);
};
