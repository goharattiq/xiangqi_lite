import React from 'react';

import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';

const Field = ({
  data, name, type, id, className, handleChange, check,
}) => (
  <>
    {
    data.map((item, index) => (
      <Form.Check
        label={item}
        name={name}
        type={type}
        key={item}
        id={`${id}-${index}`}
        className={className}
        onChange={handleChange}
        value={item}
        checked={check === item}
      />
    ))
}
  </>
);

Field.propTypes = {
  data: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  check: PropTypes.string.isRequired,
};

export default Field;
