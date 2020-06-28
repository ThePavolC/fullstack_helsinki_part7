import React, { useState } from "react";
import { useDispatch } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

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
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: "100vh" }}
    >
      <Typography variant="h6">log in to application</Typography>
      <form onSubmit={handleLogin} id="loginForm">
        <Grid container direction="column">
          <Grid item>
            <TextField
              type="text"
              value={username}
              label="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </Grid>
          <Grid item>
            <TextField
              type="password"
              value={password}
              label="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </Grid>
          <Grid>
            <Button type="submit" id="loginButton">
              login
            </Button>
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
};

export default LoginForm;
