import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form, FloatingLabel, Button } from 'react-bootstrap';
import { signinUser } from '../redux/auth/thunk';
import './SignUpIn.scss';

const SignIn = () => {
  const dispatch = useDispatch();
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const { email, password } = credentials;
  const handleChange = ({ target: { name, value } }) => {
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(signinUser(credentials));
  };

  return (
    <Form className="w-50 form-position" onSubmit={handleSubmit}>
      <FloatingLabel
        controlId="floatingInput"
        label="Email or Username"
        className="m-3"
      >
        <Form.Control
          type="text"
          name="email"
          value={email}
          placeholder="Email or Username"
          onChange={handleChange}
        />
      </FloatingLabel>

      <FloatingLabel
        controlId="floatingPassword"
        className="m-3"
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
      <Button className="position-relative form-button" type="submit">SIGNIN</Button>
    </Form>
  );
};

export default SignIn;
