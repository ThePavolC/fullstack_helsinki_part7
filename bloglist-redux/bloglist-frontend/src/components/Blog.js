import React, { useState } from "react";
import PropTypes from "prop-types";

const Blog = ({ blog, handleAddLike, handleRemove }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const [visible, setVisible] = useState(false);

  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const onClickAddLike = async () => {
    await handleAddLike(blog);
  };

  const onClickRemove = async () => {
    await handleRemove(blog);
  };

  return (
    <div style={blogStyle} id="blog">
      <span id="title">{blog.title}</span>{" "}
      <span id="author">{blog.author}</span>
      <span>
        <button onClick={toggleVisibility} className="toggleButton">
          {visible ? "hide" : "view"}
        </button>
      </span>
      <div style={showWhenVisible} className="togglableContent">
        <div>{blog.url}</div>
        <div>
          likes {blog.likes}{" "}
          <button onClick={onClickAddLike} className="likeButton">
            like
          </button>
        </div>
        <div>{blog.user.name}</div>
        <button onClick={onClickRemove}>remove</button>
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string,
    author: PropTypes.string,
    url: PropTypes.string,
    likes: PropTypes.number,
    user: PropTypes.object,
  }).isRequired,
  handleAddLike: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
};

export default Blog;
