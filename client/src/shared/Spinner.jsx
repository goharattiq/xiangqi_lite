import React from 'react';
import './Spinner.scss';

// eslint-disable-next-line react/prop-types
const Spinner = (WarappedComponenet) => ({ isLoading, ...props }) => (isLoading ? (
  <div className="d-flex justify-content-center align-items-center position-fixed w-100 h-100 spinner-screen">
    <div className="spinner-border" />
  </div>
) : (
  <WarappedComponenet {...props} />
));

export default Spinner;
