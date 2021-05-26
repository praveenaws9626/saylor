import React from 'react';
import { useHistory } from 'react-router-dom';

// custom hooks
import { useStateForm, useRegistration } from '../../hooks';

const initialFormState = {
  email: '',
  password: '',
  name: ''
};


export default function Registration() {

  const history = useHistory();
  
  // form state manager
  const { formState, onChange, resetForm } = useStateForm(initialFormState);

   // manage submit
   const { onSubmit } = useRegistration(
    formState,
    () => {
      resetForm();
      // displaySnackbar('success', 'Welcome!');
      history.push('/login');
    },
    () => {
      // displaySnackbar('error', 'Please verify the credentials');
    }
  );

    return(
    <div className="login-wrapper">
    <h1>Please Log In</h1>
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <label>Full Name</label>
        <input type="text" name="name" className="form-control" id="exampleInputName1" placeholder="Enter Name" onChange={onChange}/>
      </div>
      <div className="form-group">
        <label>Email address</label>
        <input type="email" name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" onChange={onChange}/>
        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
      </div>
      <div className="form-group">
        <label >Password</label>
        <input type="password" name="password" className="form-control" id="exampleInputPassword1" placeholder="Password" onChange={onChange}/>
      </div>
      <button className="btn btn-success btn-lg" type="submit">SIGN UP</button>
      <span className="link" onClick={e => history.push('/login')}>Already Have an account? Login Here</span>
      
    </form>
  </div>
  )
}
