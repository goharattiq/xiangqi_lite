import React, { useState } from 'react';

import { Form, FloatingLabel, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import { signupUser } from '../../redux/auth/thunk';
import './styles/SignUpIn.scss';

const SignUP = () => {
  const dispatch = useDispatch();
  const [credentials, setCredentials] = useState({
    username: '',
    email: '',
    password: '',
  });
  const { username, email, password } = credentials;
  const handleChange = ({ target: { name, value } }) => {
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(signupUser(credentials));
    setCredentials({
      username: '',
      email: '',
      password: '',
    });
  };
  return (
    <Form className="input-form" onSubmit={handleSubmit}>
      <FloatingLabel
        label="Username"
      >
        <Form.Control
          name="username"
          value={username}
          type="text"
          placeholder="Username"
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel
        label="Email"
      >
        <Form.Control
          name="email"
          value={email}
          type="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel
        label="Password"
      >
        <Form.Control
          name="password"
          value={password}
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      <Button
        className="position-relative form-button"
        type="submit"
      >
        SIGNUP
      </Button>
    </Form>
  );
};

export default SignUP;
