import React, { useState } from "react";
import { useDispatch } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { addCommentToBlog } from "../reducers/blogReducer";

const AddCommentForm = ({ blog }) => {
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();

  const handleAddComment = async (event) => {
    event.preventDefault();
    dispatch(addCommentToBlog(blog, comment));
    setComment("");
  };

  return (
    <>
      <form onSubmit={handleAddComment}>
        <TextField
          type="text"
          value={comment}
          name="comment"
          onChange={({ target }) => setComment(target.value)}
        />
        <Button type="submit">add comment</Button>
      </form>
    </>
  );
};

export default AddCommentForm;
