import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { loginUser } from "../reducers/loggedInUserReducer";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      dispatch(loginUser(username, password));
    } catch (exception) {
      setUsername("");
      setPassword("");
    }
  };

  return (
    <div>
      <h2>log in to application</h2>
      <form onSubmit={handleLogin} id="loginForm">
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            id="username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            id="password"
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit" id="loginButton">
          login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
