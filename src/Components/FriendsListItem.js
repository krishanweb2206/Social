import React from 'react';
import { Link } from 'react-router-dom';

function FriendsListItem(props) {
  return (
    <div>
      <Link className="friends-item" to={`user/${props.friend._id}`}>
        <div className="friends-img">
          <img
            src="https://cdn-icons-png.flaticon.com/512/64/64572.png"
            alt="user-pic"
          />
        </div>
        <div className="friends-name">{props.friend.name}</div>
      </Link>
    </div>
  );
}

export default FriendsListItem;
