import blogService from "../services/blogs";

import {
  showNotificationWithTimeout,
  showErrorNotificationWithTimeout,
  NOTIFICATION_TIMEOUT,
} from "./notificationReducer";

export const createBlog = (content) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.addBlog(content);
      dispatch({
        type: "NEW_BLOG",
        data: newBlog,
      });
      dispatch(
        showNotificationWithTimeout(
          `a new blog ${content.title} by ${content.author} added`,
          NOTIFICATION_TIMEOUT
        )
      );
    } catch (error) {
      dispatch(
        showErrorNotificationWithTimeout(
          `there was an error when adding a new blog ${content.title}`,
          NOTIFICATION_TIMEOUT
        )
      );
    }
  };
};

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch({
      type: "INIT_BLOGS",
      data: blogs,
    });
  };
};

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.addLike(blog);
    dispatch({
      type: "ADD_LIKE",
      data: newBlog,
    });
  };
};

export const removeBlog = (blog) => {
  return async (dispatch) => {
    try {
      await blogService.removeBlog(blog);
      dispatch({
        type: "REMOVE_BLOG",
        data: blog,
      });
      dispatch(
        showNotificationWithTimeout(
          `a blog ${blog.title} was removed`,
          NOTIFICATION_TIMEOUT
        )
      );
    } catch (error) {
      dispatch(
        showErrorNotificationWithTimeout(
          `there was an error when removing blog ${blog.title}`,
          NOTIFICATION_TIMEOUT
        )
      );
    }
  };
};

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case "NEW_BLOG":
      return [...state, action.data];
    case "INIT_BLOGS":
      return action.data;
    case "ADD_LIKE":
      const { id } = action.data;
      const likedBlog = state.find((a) => a.id === id);
      const updatedBlog = {
        ...likedBlog,
        likes: likedBlog.likes + 1,
      };
      return state.map((blog) => (blog.id !== id ? blog : updatedBlog));
    case "REMOVE_BLOG":
      return state.filter((blog) => blog.id !== action.data.id);
    default:
      return state;
  }
};

export default blogReducer;
