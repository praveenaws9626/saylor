import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import './Login.css';

import { useSelector } from 'react-redux'

// custom hooks
import { useStateForm, useLogin } from '../../hooks';

const initialFormState = {
  email: '',
  password: '',
};


export default function Login() {

  const history = useHistory();
  const [error, setError] = useState('');
  const username = useSelector(state => state.userInfo.name);
  if(username || localStorage.getItem('token')) {
      history.push('/');
  }
  // form state manager
  const { formState, onChange, resetForm } = useStateForm(initialFormState);

  // manage submit
  const { onSubmit } = useLogin(
    formState,
    () => {
      resetForm();
      // displaySnackbar('success', 'Welcome!');
      history.push('/');
    },
    () => {
      const error = "Invalid Email/Password";
      setError(error);
      // displaySnackbar('error', 'Please verify the credentials');
    }
  );
  return (
    <div className="login-wrapper">
    <h1>Please Log In</h1>
    {error !== "" && <div className="alert alert-danger" role="alert">
      {error}
  </div> }
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <label>Email address</label>
        <input type="email" className="form-control"
          name="email"
          value={formState.email}
          onChange={onChange}/>
      </div>
      <div className="form-group">
        <label >Password</label>
        <input type="password" className="form-control"
          name="password"
          value={formState.password}
          onChange={onChange} />
      </div>
      <button className="btn btn-success" type="submit">LOGIN</button>
        <span className="link" onClick={() => history.push('/registration')}>
          Don't have an account? Create one
        </span>
    </form>
  </div>
  )
}
