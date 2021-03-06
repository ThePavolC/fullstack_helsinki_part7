import loginService from "../services/login";
import blogService from "../services/blogs";

import {
  showNotificationWithTimeout,
  showErrorNotificationWithTimeout,
  NOTIFICATION_TIMEOUT,
} from "./notificationReducer";

const setLoggedInUser = (user) => {
  return {
    type: "SET_USER",
    user,
  };
};

export const loginUser = (username, password, localStorageUser = null) => {
  return async (dispatch) => {
    try {
      let user;

      if (localStorageUser) {
        user = localStorageUser;
      } else {
        user = await loginService.login({
          username,
          password,
        });
      }

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));

      blogService.setToken(user.token);
      dispatch(setLoggedInUser(user));
    } catch (error) {
      dispatch(
        showErrorNotificationWithTimeout(
          `wrong username or password`,
          NOTIFICATION_TIMEOUT
        )
      );
    }
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    window.localStorage.removeItem("loggedBlogappUser");
    blogService.setToken(null);
    dispatch(setLoggedInUser(null));
    dispatch(showNotificationWithTimeout(`logged out`, NOTIFICATION_TIMEOUT));
  };
};

const loggedInUserReducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_USER":
      return { user: action.user };
    default:
      return state;
  }
};

export default loggedInUserReducer;
