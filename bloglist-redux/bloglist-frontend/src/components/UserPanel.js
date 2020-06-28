import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";

import { logoutUser } from "../reducers/loggedInUserReducer";

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  panelWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    "& *": {
      marginLeft: theme.spacing(1),
    },
  },
}));

const UserPanel = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector(({ loggedInUser }) => loggedInUser.user);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <Paper className={classes.panelWrapper}>
      <Avatar className={classes.avatar}>{user.name[0]}</Avatar>
      <Typography color="textSecondary">{user.name} logged in</Typography>
      <Button onClick={handleLogout} id="logoutButton">
        logout
      </Button>
    </Paper>
  );
};

export default UserPanel;
