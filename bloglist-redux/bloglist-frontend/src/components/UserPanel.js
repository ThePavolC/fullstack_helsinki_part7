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
    <p>
      {user.name} logged in{" "}
      <button onClick={handleLogout} id="logoutButton">
        logout
      </button>
    </p>
  );
};

export default UserPanel;
