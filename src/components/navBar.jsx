import React, { useContext } from "react";
import { Context } from "../Store/habitStore";

import { NavLink } from "react-router-dom";
import { tokenKey } from "../config.json";
import { Label } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

const NavBar = () => {
  const [state] = useContext(Context);
  const classes = useStyles();

  return (
    <React.Fragment>
      <nav>
        {localStorage.getItem(tokenKey) ? (
          <React.Fragment>
            <NavLink
              className={classes.link}
              activeStyle={{
                color: "black",
                fontSize: "4vw",
              }}
              to="/"
              exact
            >
              Home
            </NavLink>
            <NavLink
              className={classes.link}
              activeStyle={{
                color: "black",
                fontSize: "4vw",
              }}
              to="/form"
            >
              Add Habit
            </NavLink>
            <NavLink
              className={classes.link}
              activeStyle={{
                color: "black",
                fontSize: "4vw",
              }}
              to="/habitCard"
            >
              Habits
            </NavLink>
            <NavLink
              className={classes.link}
              activeStyle={{
                color: "black",
                fontSize: "4vw",
              }}
              to="/dailyHabitCard"
            >
              Daily
            </NavLink>

            <NavLink
              className={classes.link}
              activeStyle={{
                color: "black",
                fontSize: "4vw",
              }}
              to="/signOut"
            >
              SignOut
            </NavLink>
            <h2>{`Hello, ${state.userInfo.firstName}`} </h2>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {" "}
            <NavLink
              className={classes.link}
              activeStyle={{
                color: "black",
                fontSize: "4vw",
              }}
              to="/signUp"
            >
              SignUp
            </NavLink>
            <NavLink
              className={classes.link}
              activeStyle={{
                color: "black",
                fontSize: "4vw",
              }}
              to="/signIn"
            >
              SignIn
            </NavLink>{" "}
          </React.Fragment>
        )}
      </nav>
    </React.Fragment>
  );
};

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: "none",
    padding: "15px",
    color: "darkgrey",
    fontSize: "4vw",
  },
}));

export default NavBar;
