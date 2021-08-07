import React from 'react';
import { Container } from 'react-bootstrap';

const Profile = () => {
  const activeTab = 0;
  return (
    <Container>
      <div>
        <p>{activeTab}</p>
        <p>goahrattiq</p>
      </div>
    </Container>
  );
};

export default Profile;
