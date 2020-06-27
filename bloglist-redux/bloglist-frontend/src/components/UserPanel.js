import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { logoutUser } from "../reducers/loggedInUserReducer";

const UserPanel = () => {
  const dispatch = useDispatch();
  const user = useSelector(({ loggedInUser }) => loggedInUser.user);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div>
      {user.name} logged in{" "}
      <button onClick={handleLogout} id="logoutButton">
        logout
      </button>
    </div>
  );
};

export default UserPanel;
