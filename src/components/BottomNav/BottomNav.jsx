import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import { AddIcCallOutlined } from "@material-ui/icons";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import BarChartIcon from "@material-ui/icons/BarChart";
import { Fragment } from "react";
import useStyles from "./useStyles";
import PersonIcon from "@material-ui/icons/Person";
import { NavLink } from "react-router-dom";

const BottomNav = () => {
  const classes = useStyles();

  return (
    <Fragment>
      <NavLink
        activeStyle={{
          color: "black",
          fontSize: "4vw",
        }}
        to="/form"
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
      <Fab
        aria-label="add"
        variant="extended"
        color="secondary"
        className={classes.bottomSummaryButton}
      >
        <BarChartIcon className={classes.addIcon} />
        Summary
      </Fab>
    </Fragment>
  );
};
export default BottomNav;
