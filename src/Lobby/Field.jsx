/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

const Field = ({
  data, name, type, id, className,
}) => (
  <>
    {
    data.map((item, index) => (
      <Form.Check
        label={item}
        name={name}
        type={type}
        id={`${id}-${index}`}
        className={className}
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
};

export default Field;
