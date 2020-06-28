import React from "react";
import { useDispatch } from "react-redux";

import AddCommentForm from "./AddCommentForm";

import { likeBlog } from "../reducers/blogReducer";

const Blog = ({ blog }) => {
  const dispatch = useDispatch();

  const onClickAddLike = async () => {
    dispatch(likeBlog(blog));
  };

  if (!blog) {
    return null;
  }

  return (
    <>
      <h2>{blog.title}</h2>
      <div>
        <a href={blog.url}>{blog.url}</a>
      </div>
      <div>
        likes {blog.likes}{" "}
        <button onClick={onClickAddLike} className="likeButtonClass">
          like
        </button>
      </div>
      <div>added by {blog.author}</div>

      <h3>comments</h3>
      <AddCommentForm blog={blog} />
      <ul>
        {blog.comments &&
          blog.comments.map((comment) => (
            <li key={comment.id}>{comment.content}</li>
          ))}
      </ul>
    </>
  );
};

export default Blog;
