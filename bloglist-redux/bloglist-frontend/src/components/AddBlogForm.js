import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { createBlog } from "../reducers/blogReducer";

const AddBlogForm = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const dispatch = useDispatch();

  const handleAddBlog = async (event) => {
    event.preventDefault();
    dispatch(createBlog({ title, author, url }));
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleAddBlog} id="addBlogForm">
        <div>
          title:
          <input
            type="text"
            value={title}
            name="Title"
            id="titleInput"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={author}
            name="Author"
            id="authorInput"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={url}
            name="Url"
            id="urlInput"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit" id="createBlogButton">
          create
        </button>
      </form>
    </div>
  );
};

export default AddBlogForm;
