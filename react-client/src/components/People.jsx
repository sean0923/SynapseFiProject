import React from 'react';
import { Icon } from 'semantic-ui-react';

const People = ({ usersDropDownOption }) => {
  return (
    <div className="people">
      <h2>Users:</h2>
      {usersDropDownOption.map((user, idx) => {
        return (
          <div key={idx} className="profileSmallBox">
            <Icon name="user" />
            {user.text}
          </div>
        );
      })}
    </div>
  );
};

export default People;
