import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { logoutUser } from "../reducers/userReducer";

const UserPanel = () => {
  const dispatch = useDispatch();
  const user = useSelector(({ user }) => user.user);

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
