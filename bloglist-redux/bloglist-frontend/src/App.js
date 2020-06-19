import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import AddBlogForm from "./components/AddBlogForm";
import Toggable from "./components/Toggable";
import blogService from "./services/blogs";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState();
  const [notification, setNotification] = useState();
  const [isErrorNotification, setIsErrorNotification] = useState(false);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogout = async () => {
    window.localStorage.removeItem("loggedBlogappUser");
    setUser(null);
    blogService.setToken(null);
    setNotification("logged out");
    setTimeout(() => setNotification(null), 2000);
  };

  const handleAddLike = async (blog) => {
    const newBlog = await blogService.addLike(blog);
    const updatedBlogs = blogs.map((blog) =>
      blog.id === newBlog.id ? { ...blog, likes: newBlog.likes } : blog
    );
    setBlogs(updatedBlogs);
  };

  const handleRemove = async (deleteBlog) => {
    const canDelete = window.confirm(
      `Remove blog ${deleteBlog.title} by ${deleteBlog.author}`
    );
    if (canDelete) {
      await blogService.removeBlog(deleteBlog);
      const updatedBlogs = blogs.filter((blog) => blog.id !== deleteBlog.id);
      setBlogs(updatedBlogs);
      setNotification(`blog ${deleteBlog.title} removed`);
      setTimeout(() => setNotification(null), 2000);
    }
  };

  const content = () => (
    <div>
      <h2>blogs</h2>
      <p>
        {user.name} logged in{" "}
        <button onClick={handleLogout} id="logoutButton">
          logout
        </button>
      </p>
      <Toggable buttonLabel="new note">
        <AddBlogForm
          blogService={blogService}
          setBlogs={setBlogs}
          setNotification={setNotification}
          setIsErrorNotification={setIsErrorNotification}
        />
      </Toggable>

      <div id="blogsContainer">
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            handleAddLike={handleAddLike}
            handleRemove={handleRemove}
          />
        ))}
      </div>
    </div>
  );

  const notificationComponent = () => {
    const baseStyle = {
      border: "4px solid green",
      color: "green",
      backgroundColor: "lightgrey",
      padding: "10px",
      fontSize: "20px",
    };
    if (isErrorNotification) {
      baseStyle.border = "4px solid red";
      baseStyle.color = "red";
    }
    return (
      <div style={baseStyle} id="notification">
        {notification}
      </div>
    );
  };

  return (
    <div>
      {notification && notificationComponent()}
      {user ? (
        content()
      ) : (
        <LoginForm
          blogService={blogService}
          setUser={setUser}
          setNotification={setNotification}
          setIsErrorNotification={setIsErrorNotification}
        />
      )}
    </div>
  );
};

export default App;
