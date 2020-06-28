import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { likeBlog, removeBlog } from "../reducers/blogReducer";

const useStyles = makeStyles((theme) => ({
  details: {
    flexDirection: "column",
    maxWidth: "20%",
  },
  column: {
    flexBasis: "33.33%",
  },
}));

const BlogListItem = ({ blog }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const onClickAddLike = async () => {
    dispatch(likeBlog(blog));
  };

  const onClickRemove = async () => {
    const canDelete = window.confirm(
      `Remove blog ${blog.title} by ${blog.author}`
    );
    if (canDelete) {
      dispatch(removeBlog(blog));
    }
  };

  return (
    <div id="blog">
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Link to={`/blogs/${blog.id}`}>
            <span style={{ marginRight: 6 }} id="title">
              {blog.title}
            </span>
            <span style={{ marginRight: 6 }} id="author">
              {blog.author}
            </span>
          </Link>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.details}>
          <div className={classes.column}>{blog.url}</div>
          <div className={classes.column}>
            likes {blog.likes}{" "}
            <button onClick={onClickAddLike} className="likeButtonClass">
              like
            </button>
          </div>
          <div className={classes.column}>{blog.user.name}</div>
          <button onClick={onClickRemove} className={classes.column}>
            remove
          </button>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
};

BlogListItem.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string,
    author: PropTypes.string,
    url: PropTypes.string,
    likes: PropTypes.number,
    user: PropTypes.object,
  }).isRequired,
};

export default BlogListItem;
