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
                padding: "15px",
                color: "darkgrey",
                fontSize: "4vw",
              }}
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
              style={{
                textDecoration: "none",
                padding: "15px",
                color: "darkgrey",
                fontSize: "4vw",
              }}
              activeStyle={{
                color: "black",
                fontSize: "4vw",
              }}
              to="/form"
            >
              Add Habit
            </NavLink>

            <NavLink
              style={{
                textDecoration: "none",
                padding: "15px",
                color: "darkgrey",
                fontSize: "4vw",
              }}
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
              style={{
                textDecoration: "none",
                padding: "15px",
                color: "darkgrey",
                fontSize: "4vw",
              }}
              activeStyle={{
                color: "black",
                fontSize: "4vw",
              }}
              to="/signUp"
            >
              SignUp
            </NavLink>
            <NavLink
              style={{
                textDecoration: "none",
                padding: "15px",
                color: "darkgrey",
                fontSize: "4vw",
              }}
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

export default NavBar;
