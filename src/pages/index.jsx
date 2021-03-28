import React, { useContext, useEffect, useState } from "react";
import { Context } from "../Store/habitStore";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Grid } from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import HabitService from "../services/habitService";
import moment from "moment";
import RenderHabits from "../components/RenderHabits";
import TrackHabit from "../components/TrackHabit";

export function Home() {
  const [state, dispatch] = useContext(Context);
  const classes = useStyles();
  const [isNextDisable, setNextDisable] = useState(false);

  console.log(state);

  // this fetch function is need to extracted and need to be reused
  useEffect(() => {
    //fetch habits from server
    if (
      moment(state.currentDate).format("DDMMYYYY") ===
      moment().format("DDMMYYYY")
    ) {
      setNextDisable(true);
    } else {
      setNextDisable(false);
    }
    async function fetchData() {
      // You can await here
      const { data } = await HabitService.getHabits();
      dispatch({ type: "SET_HABIT", payload: data });
    }
    fetchData();
  }, [state.currentDate, dispatch]);

  const changeDate = (n) => {
    // change the current date to prev or next date
    let changedDate = moment(state.currentDate).add(n, "days");
    dispatch({ type: "SET_CURRENT_DATE", payload: changedDate._d });
  };

  return (
    <React.Fragment>
      <div style={{ margin: "20px" }}>
        {moment(state.currentDate).format("DDMMYYYY")}
      </div>

      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12}>
          <Grid container justify="center">
            <Grid item>
              <Button
                style={{ margin: "20px" }}
                variant="contained"
                color="primary"
                onClick={() => changeDate(-1)}
              >
                Prev
              </Button>
            </Grid>
            <Grid item>
              <Button
                style={{ margin: "20px" }}
                disabled={isNextDisable}
                variant="contained"
                color="primary"
                onClick={() => changeDate(1)}
              >
                Next
              </Button>
            </Grid>
            <Grid xs={3} item></Grid>
            <Grid item justify="flex-end">
              <TrackHabit />
            </Grid>
          </Grid>
          <Grid container justify="center">
            <RenderHabits />
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

const useStyles = makeStyles({
  table: {
    minWidth: 200,
    maxWidth: 600,
    paddingLeft: 10,
  },
  checkbox: {
    color: green[400],
    "&$checked": {
      color: green[600],
    },
  },
});
