import React, { useContext } from "react";
import { Context } from "../Store/habitStore";
import {
  Button,
  Grid,
  CircularProgress,
  Menu,
  MenuItem,
  ListItemIcon,
  Typography,
} from "@material-ui/core";
import { NavLink } from "react-router-dom";
import { tokenKey } from "../config.json";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { Label } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const NavBar = () => {
  const [state] = useContext(Context);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <nav>
        {localStorage.getItem(tokenKey) ? (
          <React.Fragment>
            <Fab
              aria-label="add"
              variant="extended"
              color="secondary"
              onClick={handleClick}
              className={classes.topProfileButton}
            >
              <PersonIcon className={classes.addIcon} />
              Pursharth
            </Fab>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              dark
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
              getContentAnchorEl={null}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
              transformOrigin={{ vertical: "top", horizontal: "center" }}
            >
              <MenuItem onClick={handleClose}>
                <NavLink className={classes.link} to="/signOut">
                  <ExitToAppIcon />
                  <Typography
                    variant="subtitle1"
                    className={classes.optionText}
                  >
                    Sign Out
                  </Typography>
                </NavLink>
              </MenuItem>
            </Menu>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Grid container justify="center">
              <Grid item>
                <NavLink
                  className={classes.link}
                  activeStyle={{
                    background: "rgba(196, 196, 196, 0.19)",
                    color: "#FFFFFF",
                  }}
                  to="/signUp"
                >
                  <Button>Sign Up</Button>
                </NavLink>
              </Grid>
              <Grid item>
                <NavLink
                  className={classes.link}
                  activeStyle={{
                    background: "rgba(196, 196, 196, 0.19)",
                    color: "#FFFFFF",
                  }}
                  to="/signIn"
                >
                  <Button>Sign In</Button>
                </NavLink>
              </Grid>
            </Grid>
          </React.Fragment>
        )}
      </nav>
    </React.Fragment>
  );
};

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: "none",
    display: "contents",
    color: "#FFFFFF",
  },
  menuItem: {
    background: "#303038",
    color: "#FFFFFF",
  },
  optionText: {
    marginLeft: "1rem",
  },
  topProfileButton: {
    position: "fixed",
    right: "2rem",
    top: "1rem",
    fontWeight: "bold",
  },
  activeButton: {
    background: "rgba(196, 196, 196, 0.19)",
    color: "#FFFFFF",
  },
  disabledButton: {
    background: "rgba(196, 196, 196, 0.04)",
    color: "#8F8E8E",
  },
}));

export default NavBar;
