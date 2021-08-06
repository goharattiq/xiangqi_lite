import React from 'react';
import './SignUp.scss';
import { Form, FloatingLabel } from 'react-bootstrap';

const SignUP = () => (
  <div className="w-50 form-position">

    <FloatingLabel
      controlId="floatingInput"
      label="Username"
      className="m-3"
    >
      <Form.Control type="text" placeholder="Username" />
    </FloatingLabel>

    <FloatingLabel
      controlId="floatingInput"
      label="Email"
      className="m-3"
    >
      <Form.Control type="email" placeholder="Email" />
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

export default SignUP;
