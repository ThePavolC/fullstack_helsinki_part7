import React, { useState } from "react";
import { useDispatch } from "react-redux";

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
        <input
          type="text"
          value={comment}
          name="comment"
          onChange={({ target }) => setComment(target.value)}
        />
        <button type="submit">add comment</button>
      </form>
    </>
  );
};

export default AddCommentForm;
