import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route, Link, useRouteMatch } from "react-router-dom";

import Notification from "./components/Notification";
import UserPanel from "./components/UserPanel";
import LoginForm from "./components/LoginForm";
import User from "./components/User";

import BlogsRoute from "./components/routes/BlogsRoute";
import UsersRoute from "./components/routes/UsersRoute";

import { initializeBlogs } from "./reducers/blogReducer";
import { loginUser } from "./reducers/loggedInUserReducer";
import { getAllUsers } from "./reducers/usersReducer";

import "./App.css";

const App = () => {
  const dispatch = useDispatch();
  const loggedInUser = useSelector(({ loggedInUser }) => loggedInUser);
  const users = useSelector(({ users }) => users);

  const isUserLoggedIn = loggedInUser.user && loggedInUser.user !== null;

  useEffect(() => {
    if (isUserLoggedIn) {
      dispatch(initializeBlogs());
      dispatch(getAllUsers());
    }
  }, [isUserLoggedIn, dispatch]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(loginUser(null, null, user));
    }
  }, [dispatch]);

  const match = useRouteMatch("/users/:id");
  const user = match ? users.find((user) => user.id === match.params.id) : null;

  if (!isUserLoggedIn) {
    return (
      <>
        <Notification />
        <LoginForm />
      </>
    );
  }

  return (
    <>
      <div className="menu">
        <Link to="/">home</Link>
        <Link to="/users">users</Link>
      </div>

      <Notification />

      <h2>blogs</h2>
      <UserPanel />

      <Switch>
        <Route path="/users/:id">
          <User user={user} />
        </Route>
        <Route path="/users">
          <UsersRoute users={users} />
        </Route>
        <Route path="/">
          <BlogsRoute />
        </Route>
      </Switch>
    </>
  );
};

export default App;
