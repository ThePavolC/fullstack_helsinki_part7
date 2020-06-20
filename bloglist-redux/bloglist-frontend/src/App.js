import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import LoginForm from "./components/LoginForm";
import AddBlogForm from "./components/AddBlogForm";
import Toggable from "./components/Toggable";
import Notification from "./components/Notification";
import BlogList from "./components/BlogList";
import UserPanel from "./components/UserPanel";

import { initializeBlogs } from "./reducers/blogReducer";
import { loginUser } from "./reducers/userReducer";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector(({ user }) => user);

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

  let content;

  if (!isUserLoggedIn) {
    content = <LoginForm />;
  } else {
    content = (
      <>
        <h2>blogs</h2>
        <UserPanel />

        <Toggable buttonLabel="new blog">
          <AddBlogForm />
        </Toggable>

        <BlogList />
      </>
    );
  }

  return (
    <>
      <Notification />
      {content}
    </>
  );
};

export default App;
