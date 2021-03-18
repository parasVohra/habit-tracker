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
        </React.Fragment>
      </nav>
    </React.Fragment>
  );
};

export default NavBar;
