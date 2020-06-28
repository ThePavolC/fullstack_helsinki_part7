import React from "react";
import { useDispatch } from "react-redux";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

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
      <Typography variant="h6">{blog.title}</Typography>
      <Card>
        <CardContent>
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
        </CardContent>
      </Card>

      <hr />
      <Typography variant="subtitle1">comments:</Typography>
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
