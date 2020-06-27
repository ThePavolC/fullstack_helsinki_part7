import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Notification from "./components/Notification";
import UserPanel from "./components/UserPanel";
import LoginForm from "./components/LoginForm";

import BlogsRoute from "./components/routes/BlogsRoute";
import UsersRoute from "./components/routes/UsersRoute";

import { initializeBlogs } from "./reducers/blogReducer";
import { loginUser } from "./reducers/loggedInUserReducer";

import "./App.css";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector(({ loggedInUser }) => loggedInUser);

  const isUserLoggedIn = user.user && user.user !== null;

  useEffect(() => {
    if (isUserLoggedIn) {
      dispatch(initializeBlogs());
    }
  }, [isUserLoggedIn, dispatch]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(loginUser(null, null, user));
    }
  }, [dispatch]);

  if (!isUserLoggedIn) {
    return (
      <>
        <Notification />
        <LoginForm />
      </>
    );
  }

  return (
    <Router>
      <div className="menu">
        <Link to="/">home</Link>
        <Link to="/users">users</Link>
      </div>

      <Notification />

      <h2>blogs</h2>
      <UserPanel />

      <Switch>
        <Route path="/users">
          <UsersRoute />
        </Route>
        <Route path="/">
          <BlogsRoute />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
