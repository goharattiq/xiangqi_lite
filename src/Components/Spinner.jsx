import React from 'react';
import './Spinner.scss';

const Spinner = () => (
  <div className="d-flex justify-content-center align-items-center position-fixed w-100 h-100 spinner-screen">
    <div className="spinner-border" />
  </div>
);

export default Spinner;
