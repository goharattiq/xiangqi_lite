import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Form, FloatingLabel, Button,
} from 'react-bootstrap';
import { signinUser } from '../redux/auth/thunk';
import './SignUpIn.scss';

const SignIn = () => {
  const dispatch = useDispatch();
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const { username, password } = credentials;
  const handleChange = ({ target: { name, value } }) => {
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(signinUser(credentials));
    setCredentials({
      username: '',
      password: '',
    });
  };
  return (
    <Form className="sign-form" onSubmit={handleSubmit}>
      <FloatingLabel
        label="Username"
      >
        <Form.Control
          type="text"
          name="username"
          value={username}
          placeholder="Username"
          onChange={handleChange}
        />
      </FloatingLabel>

      <FloatingLabel
        label="Password"
      >
        <Form.Control
          type="password"
          name="password"
          value={password}
          placeholder="Password"
          onChange={handleChange}
        />
      </FloatingLabel>
      <Button
        className="form-button"
        type="submit"
      >
        SIGNIN
      </Button>
    </Form>
  );
};

export default SignIn;
