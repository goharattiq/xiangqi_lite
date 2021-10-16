/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';

import PropTypes from 'prop-types';
import {
  Button, FloatingLabel, Form, Row,
} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { clearProfile } from '../../redux/profile/actions';
import { fetchUserProfile, updateProfile } from '../../redux/profile/thunk';
import { setToast } from '../../redux/toast/actions';
import { ALLOWED_EXTENSTIONS, BACKGROUND } from '../../utilis/constants';
import Spinner from '../shared/Spinner';
import './styles/EditProfile.scss';

const EditProfile = ({
  profile, handleChange, handleFileChange, handleSubmit,
}) => {
  const {
    bio,
    first_name,
    last_name,
    imagePreview,
  } = profile;

  return (
    <Form className="input-form" onSubmit={handleSubmit}>
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
          && (
            <Row className="m-2 justify-content-center">
              <img src={imagePreview} className="preview-avatar" alt="Profile-preview" />
            </Row>

          )
      }
      <Button
        className="position-relative form-button"
        type="submit"
      >
        Submit
      </Button>
    </Form>
  );
};

const EditProfileWithSpinner = Spinner(EditProfile);

const EditProfileContainer = () => {
  document.body.style.backgroundColor = BACKGROUND;
  const dispatch = useDispatch();
  const { profileUsername } = useParams();
  const { user, player_bio, player_photo } = useSelector(({ profile }) => ({
    user: profile.user,
    player_bio: profile.bio,
    player_photo: profile.photo,
  }));
  const [profile, setProfile] = useState({
    first_name: user?.first_name ? user.first_name : '',
    last_name: user?.last_name ? user.last_name : '',
    bio: player_bio || '',
    photo: player_photo,
    imagePreview: player_photo,
  });
  const {
    photo,
    bio,
    first_name,
    last_name,
  } = profile;

  useEffect(() => {
    if (!user) {
      dispatch(fetchUserProfile(profileUsername));
    }
    let fileUrl;
    if (photo) {
      fileUrl = typeof (photo) !== 'string' && URL.createObjectURL(photo);
    }
    if (user) {
      setProfile({
        ...profile,
        first_name: user?.first_name ? user.first_name : '',
        last_name: user?.last_name ? user.last_name : '',
        bio: player_bio || '',
        imagePreview: fileUrl,
      });
    }
    return () => {
      photo && URL.revokeObjectURL(fileUrl);
    };
  }, [photo, user]);

  const handleChange = ({ target: { name, value } }) => {
    setProfile({
      ...profile,
      [name]: value,
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
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(clearProfile());
    dispatch(updateProfile(user.username, typeof (photo) === 'string' ? {
      bio,
      first_name,
      last_name,
    } : {
      bio,
      first_name,
      last_name,
      photo,
    }));
  };
  return (
    <EditProfileWithSpinner
      isLoading={!user}
      profile={profile}
      handleChange={handleChange}
      handleFileChange={handleFileChange}
      handleSubmit={handleSubmit}

    />
  );
};

EditProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleFileChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default EditProfileContainer;
