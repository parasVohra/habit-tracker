import React, { useContext } from "react";
import { Context } from "../Store/habitStore";

import { NavLink } from "react-router-dom";
import { tokenKey } from "../config.json";

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
              Form
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
