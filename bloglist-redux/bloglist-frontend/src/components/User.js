import React from "react";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const User = ({ user }) => {
  if (!user) {
    return null;
  }
  return (
    <>
      <Typography variant="h6">{user.name}</Typography>
      <Typography variant="subtitle1">Added blogs:</Typography>
      <List>
        {user.blogs.map((blog) => (
          <ListItem key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>
              <ListItemText primary={blog.title} />
            </Link>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default User;
