import React from "react";

import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <React.Fragment>
      <nav>
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
      </nav>
    </React.Fragment>
  );
};

export default NavBar;
