import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route, useRouteMatch } from "react-router-dom";

import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import User from "./components/User";
import Blog from "./components/Blog";
import NavigationMenu from "./components/NavigationMenu";

import BlogsRoute from "./components/routes/BlogsRoute";
import UsersRoute from "./components/routes/UsersRoute";

import { initializeBlogs } from "./reducers/blogReducer";
import { loginUser } from "./reducers/loggedInUserReducer";
import { getAllUsers } from "./reducers/usersReducer";

const App = () => {
  const dispatch = useDispatch();
  const loggedInUser = useSelector(({ loggedInUser }) => loggedInUser);
  const users = useSelector(({ users }) => users);
  const blogs = useSelector(({ blogs }) => blogs);

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

  const userMatch = useRouteMatch("/users/:id");
  const user = userMatch
    ? users.find((user) => user.id === userMatch.params.id)
    : null;

  const blogMatch = useRouteMatch("/blogs/:id");
  const blog = blogMatch
    ? blogs.find((blog) => blog.id === blogMatch.params.id)
    : null;

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
      <NavigationMenu />
      <Notification />

      <h2>blog app</h2>

      <Switch>
        <Route path="/users/:id">
          <User user={user} />
        </Route>
        <Route path="/users">
          <UsersRoute users={users} />
        </Route>
        <Route path="/blogs/:id">
          <Blog blog={blog} />
        </Route>
        <Route path="/blogs">
          <BlogsRoute />
        </Route>
        <Route path="/">
          <BlogsRoute />
        </Route>
      </Switch>
    </>
  );
};

export default App;
