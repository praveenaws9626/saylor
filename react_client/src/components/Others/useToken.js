import { useState } from 'react';

export default function useToken() {
  const getToken = () => {
    const tokenString = localStorage.getItem('token');
    const userToken = tokenString && tokenString !== '' ? JSON.parse(tokenString) : {};
    return userToken?.token
  };

  const [token, setToken] = useState(getToken());

  const saveToken = user => {
    console.log(user);
    localStorage.setItem('token', JSON.stringify(user));
    setToken(user?.token);
  };

  return {
    setToken: saveToken,
    token
  }
}