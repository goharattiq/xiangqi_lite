import React from 'react';
import { Form, FloatingLabel } from 'react-bootstrap';
import './SignUpIn.scss';

const SignIn = () => (
  <div className="w-50 form-position">

    <FloatingLabel
      controlId="floatingInput"
      label="Email or Username"
      className="m-3"
    >
      <Form.Control type="text" placeholder="Email or Username" />
    </FloatingLabel>

    <FloatingLabel
      controlId="floatingPassword"
      label="Password"
      className="m-3"
    >
      <Form.Control type="password" placeholder="Password" />
    </FloatingLabel>

  </div>
);

export default SignIn;
