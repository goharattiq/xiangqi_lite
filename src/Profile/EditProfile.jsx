/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';

import {
  Button, FloatingLabel, Form, Row,
} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import { fetchUserProfile, updateProfile } from '../redux/profile/thunk';
import { setToast } from '../redux/toast/actions';
import { ALLOWED_EXTENSTIONS } from '../utilis/constants';

const EditProfile = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { profileUsername } = useParams();
  const { user, player_bio } = useSelector(({ profile }) => ({
    user: profile.user,
    player_bio: profile.bio,
  }));
  const [imagePreview, setImagePreview] = useState(null);
  const [profile, setProfile] = useState({
    first_name: user?.first_name ? user.first_name : '',
    last_name: user?.last_name ? user.last_name : '',
    bio: player_bio || '',
    photo: null,
  });
  const {
    bio, first_name, last_name, photo,
  } = profile;
  const handleChange = ({ target: { name, value } }) => {
    setProfile({
      ...profile,
      [name]: value,
    });
  };
  useEffect(() => {
    if (!profile) {
      dispatch(fetchUserProfile(profileUsername));
    }
  }, []);
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(updateProfile(user.username, profile, history));
    setProfile({
      first_name: '',
      last_name: '',
      bio: '',
      photo: null,
    });
  };

  const handleFileChange = (event) => {
    const [file, ..._] = event.target.files;
    const [_0, extention] = file.name.split('.');
    if (ALLOWED_EXTENSTIONS.includes(extention.toUpperCase())) {
      setProfile({
        ...profile,
        photo: event.target.files[0],
      });
    } else {
      dispatch(setToast('This file is not allowed', 'danger', dispatch));
    }
  };

  useEffect(() => {
    if (!photo) {
      return;
    }
    const fileUrl = URL.createObjectURL(photo);
    setImagePreview(fileUrl);
    // eslint-disable-next-line consistent-return
    return () => (URL.revokeObjectURL(fileUrl));
  }, [photo]);

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
        accept="image/png, image/jpeg, image/jpg"
        onChange={handleFileChange}
      />
      {
        imagePreview
          ? (
            <Row className="m-2 justify-content-center">
              <img src={imagePreview} className="profile-avatar" alt="Profile-preview" />
            </Row>

          )
          : ''
      }

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
