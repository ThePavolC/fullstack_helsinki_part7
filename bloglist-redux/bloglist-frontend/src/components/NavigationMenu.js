import React from "react";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";

import UserPanel from "./UserPanel";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  userPanelContainer: {
    marginLeft: "auto",
  },
}));

const NavigationMenu = () => {
  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.root}>
      <Toolbar>
        <Button color="inherit" component={Link} to="/blogs">
          blogs
        </Button>
        <Button color="inherit" component={Link} to="/users">
          users
        </Button>

        <Box className={classes.userPanelContainer}>
          <UserPanel />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavigationMenu;
