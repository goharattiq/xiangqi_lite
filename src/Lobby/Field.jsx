/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

const Field = ({
  data, name, type, id, className, handleChange,
}) => (
  <>
    {
    data.map((item, index) => (
      <Form.Check
        label={item}
        name={name}
        type={type}
        // eslint-disable-next-line react/no-array-index-key
        key={`${id}-${index}`}
        id={`${id}-${index}`}
        className={className}
        onChange={handleChange}
        value={item}
      />
    ))
}
  </>
);

Field.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default Field;
