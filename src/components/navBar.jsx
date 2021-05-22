import React, { useContext } from "react";
import { Context } from "../Store/habitStore";

import { NavLink } from "react-router-dom";
import { tokenKey } from "../config.json";
import { Label } from "@material-ui/icons";

const NavBar = () => {
  const [state] = useContext(Context);

  return (
    <React.Fragment>
      <nav>
        {localStorage.getItem(tokenKey) ? (
          <React.Fragment>
            <NavLink
              style={{
                textDecoration: "none",
                padding: "20px",
                color: "grey",
                fontSize: "25px",
              }}
              activeStyle={{
                color: "black",
                fontSize: "26px",
              }}
              to="/"
              exact
            >
              Home
            </NavLink>
            <NavLink
              style={{
                textDecoration: "none",
                padding: "20px",
                color: "grey",
                fontSize: "25px",
              }}
              activeStyle={{
                color: "black",
                fontSize: "26px",
              }}
              to="/form"
            >
              Add Habit
            </NavLink>

            <NavLink
              style={{
                textDecoration: "none",
                padding: "20px",
                color: "grey",
                fontSize: "25px",
              }}
              activeStyle={{
                color: "black",
                fontSize: "26px",
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
              style={{
                textDecoration: "none",
                padding: "20px",
                color: "grey",
                fontSize: "25px",
              }}
              activeStyle={{
                color: "black",
                fontSize: "26px",
              }}
              to="/signUp"
            >
              SignUp
            </NavLink>
            <NavLink
              style={{
                textDecoration: "none",
                padding: "20px",
                color: "grey",
                fontSize: "25px",
              }}
              activeStyle={{
                color: "black",
                fontSize: "26px",
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

export default NavBar;
