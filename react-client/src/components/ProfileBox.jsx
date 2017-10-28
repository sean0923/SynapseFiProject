import React from 'react';
import { Loader, Segment, Icon } from 'semantic-ui-react';

const ProfileBox = (props) => {
  if (props.nodeDropDownFromOptions.length === 0) {
    return (
      <div className="profile">
        <h2 style={{ display: 'inline-block', margin: 0, marginRight: 20 }}>My Profile:</h2>
        <Loader active size='mini' inline /> 
        <Segment stacked>
          <div className="profileSmallBox">
            <Icon name="user outline" />
            Full name
          </div>
          <div className="profileSmallBox">
            <Icon name="credit card alternative" />
            Node nickname
          </div>
        </Segment>
      </div>
    );
  }

  let userName = props.justCreatedUser.json.legal_names;
  let accountNickname = props.nodeDropDownFromOptions[0].nickname;
  return (
    <div className="profile">
      <h2>My Profile:</h2>
      <Segment stacked>
        <div className="profileSmallBox">
          <Icon name="user outline" />
          {userName}
        </div>
        <div className="profileSmallBox">
          <Icon name="credit card alternative" />
          {accountNickname}
        </div>
      </Segment>
    </div>
  );
};

export default ProfileBox;