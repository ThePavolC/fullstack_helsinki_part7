import React, { useState } from "react";
import loginService from "../services/login";
import PropTypes from "prop-types";

const LoginForm = ({
  blogService,
  setUser,
  setNotification,
  setIsErrorNotification,
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));

      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setUsername("");
      setPassword("");
      setNotification("wrong username or password");
      setIsErrorNotification(true);
      setTimeout(() => {
        setIsErrorNotification(false);
        setNotification(null);
      }, 2000);
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

LoginForm.propTypes = {
  blogService: PropTypes.object.isRequired,
  setUser: PropTypes.func.isRequired,
  setNotification: PropTypes.func.isRequired,
  setIsErrorNotification: PropTypes.func.isRequired,
};

export default LoginForm;
