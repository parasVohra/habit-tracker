import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import BarChartIcon from "@material-ui/icons/BarChart";
import { Fragment } from "react";
import useStyles from "./useStyles";
import { NavLink } from "react-router-dom";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";

const BottomNav = () => {
  const [width, setWidth] = useState(window.innerWidth);
  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  let isMobile = width <= 768;
  const classes = useStyles();

  return (
    <Fragment>
      {isMobile ? (
        <Fragment>
          <div className={classes.bottomContainer}>
            <Grid
              container
              xs={12}
              align="center"
              className={classes.bottomGrid}
            >
              <Grid item align="center" xs={4}>
                <NavLink
                  activeStyle={{
                    color: "black",
                    fontSize: "4vw",
                  }}
                  to="/"
                >
                  <HomeOutlinedIcon className={classes.icon} />
                </NavLink>
              </Grid>
              <Grid item xs={4}>
                <NavLink
                  activeStyle={{
                    color: "black",
                    fontSize: "4vw",
                  }}
                  to="/createHabit"
                >
                  <AddIcon className={classes.icon} />
                </NavLink>
              </Grid>
              <Grid item xs={4}>
                <NavLink
                  activeStyle={{
                    color: "black",
                    fontSize: "4vw",
                  }}
                  to="/summary"
                >
                  <BarChartIcon className={classes.icon} />
                </NavLink>
              </Grid>
            </Grid>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <NavLink
            activeStyle={{
              color: "black",
              fontSize: "4vw",
            }}
            to="/createHabit"
          >
            <Fab
              aria-label="add"
              variant="extended"
              color="secondary"
              className={classes.bottomAddButton}
            >
              <AddIcon className={classes.addIcon} />
              ADD HABIT
            </Fab>
          </NavLink>
          <NavLink
            activeStyle={{
              color: "black",
              fontSize: "4vw",
            }}
            to="/summary"
          >
            <Fab
              aria-label="add"
              variant="extended"
              color="secondary"
              className={classes.bottomSummaryButton}
            >
              <BarChartIcon className={classes.addIcon} />
              Summary
            </Fab>
          </NavLink>
        </Fragment>
      )}
    </Fragment>
  );
};
export default BottomNav;
