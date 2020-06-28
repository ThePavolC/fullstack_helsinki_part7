import React, { useState } from "react";
import { useDispatch } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import { createBlog } from "../reducers/blogReducer";

const AddBlogForm = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const dispatch = useDispatch();

  const handleAddBlog = async (event) => {
    event.preventDefault();
    dispatch(createBlog({ title, author, url }));
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <div>
      <Typography variant="subtitle2">create new</Typography>
      <form onSubmit={handleAddBlog} id="addBlogForm">
        <Grid container direction="column">
          <Grid item xs={6}>
            <TextField
              type="text"
              value={title}
              label="Title"
              margin="dense"
              onChange={({ target }) => setTitle(target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              type="text"
              value={author}
              label="Author"
              margin="dense"
              onChange={({ target }) => setAuthor(target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              type="text"
              value={url}
              label="Url"
              margin="dense"
              onChange={({ target }) => setUrl(target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <Button type="submit" id="createBlogButton">
              create
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddBlogForm;
