import React, { useState } from "react";
import { Menu, MenuItem, Typography } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import { tokenKey } from "../config.json";
import Fab from "@material-ui/core/Fab";
import { makeStyles } from "@material-ui/core/styles";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import BottomNav from "./BottomNav/BottomNav";

const NavBar = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
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
              size="small"
              color="secondary"
              onClick={handleClick}
              className={classes.topProfileButton}
            >
              <PersonIcon className={classes.addIcon} />
            </Fab>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
              getContentAnchorEl={null}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
              transformOrigin={{ vertical: "top", horizontal: "center" }}
            >
              <MenuItem onClick={handleClose} className={classes.menuItem}>
                <NavLink className={classes.link} to="/signOut">
                  <ExitToAppIcon fontSize="small" />
                  <Typography
                    variant="subtitle2"
                    className={classes.optionText}
                  >
                    Sign Out
                  </Typography>
                </NavLink>
              </MenuItem>
            </Menu>
            <BottomNav />
          </React.Fragment>
        ) : (
          <React.Fragment></React.Fragment>
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
    padding: "0 4px",
    minHeight: "1rem",
  },
  optionText: {
    marginLeft: "0.5rem",
    textAlign: "center",
  },
  topProfileButton: {
    position: "absolute",
    right: "1rem",
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
