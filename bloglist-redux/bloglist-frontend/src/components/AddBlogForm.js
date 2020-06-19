import React, { useState } from "react";
import PropTypes from "prop-types";

const AddBlogForm = ({
  blogService,
  setBlogs,
  setNotification,
  setIsErrorNotification,
}) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleAddBlog = async (event) => {
    event.preventDefault();
    try {
      await blogService.addBlog({ title, author, url });
      setNotification(`a new blog ${title} by ${author} added`);
      setTimeout(() => setNotification(null), 2000);
    } catch (error) {
      setNotification(`a new blog ${title} by ${author} added`);
      setIsErrorNotification(true);
      setTimeout(() => {
        setIsErrorNotification(false);
        setNotification(null);
      }, 2000);
    }

    const updatedBlogs = await blogService.getAll();
    setBlogs(updatedBlogs);
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

AddBlogForm.propTypes = {
  blogService: PropTypes.object.isRequired,
  setBlogs: PropTypes.func.isRequired,
  setNotification: PropTypes.func.isRequired,
  setIsErrorNotification: PropTypes.func.isRequired,
};

export default AddBlogForm;
