/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';

import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { updateProfile } from '../redux/profile/thunk';

const EditProfile = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { user, player_bio } = useSelector(({ profile }) => ({
    user: profile.user,
    player_bio: profile.bio,
  }));

  const [profile, setProfile] = useState({
    first_name: user?.first_name ? user.first_name : '',
    last_name: user?.last_name ? user.last_name : '',
    bio: player_bio || '',
    photo: '',
  });
  const { bio, first_name, last_name } = profile;
  const handleChange = ({ target: { name, value } }) => {
    setProfile({
      ...profile,
      [name]: value,
    });
  };
  useEffect(() => {
    if (!profile) {
      history.push('/profile');
    }
  }, []);
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(updateProfile(user.pk, profile, history));
    setProfile({
      first_name: '',
      last_name: '',
      bio: '',
    });
  };

  const handleFileChange = (event) => {
    setProfile({
      ...profile,
      photo: event.target.files[0],
    });
  };

  return (
    <Form className="sign-form" onSubmit={handleSubmit}>
      <FloatingLabel
        label="First Name"
      >
        <Form.Control
          type="text"
          name="first_name"
          value={first_name}
          placeholder="First Name"
          onChange={handleChange}
        />
      </FloatingLabel>

      <FloatingLabel
        label="Last Name"
      >
        <Form.Control
          type="text"
          name="last_name"
          value={last_name}
          placeholder="Last Name"
          onChange={handleChange}
        />
      </FloatingLabel>

      <FloatingLabel
        label="Bio"
      >
        <Form.Control
          type="textarea"
          name="bio"
          value={bio}
          placeholder="Bio"
          onChange={handleChange}
        />
      </FloatingLabel>
      <Form.Control
        type="file"
        name="photo"
        onChange={handleFileChange}
      />
      <Button
        className="form-button"
        type="submit"
      >
        Submit
      </Button>
    </Form>
  );
};

export default EditProfile;
