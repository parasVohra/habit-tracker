import React, { useContext, useEffect, useState } from "react";
import { Context } from "../Store/habitStore";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Grid } from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import { addDays, format } from "date-fns";
import RenderHabits from "../components/RenderHabits";
import TrackHabit from "../components/TrackHabit";
import {
  fetchHabitData,
  extractCategoriesAndRestructureHabits,
  getTodayDate,
  getWeekStartDate,
  getWeekEndDate,
  extractHabitNames,
} from "../utilities/utilitiesMethods";

console.log("************ In Home page Component ");

export default function Home() {
  const [state, dispatch] = useContext(Context);
  const classes = useStyles();
  const [isNextDisable, setNextDisable] = useState(false);

  console.log(state);

  useEffect(() => {
    async function hydrateStoreState() {
      const habitObj = await fetchHabitData();

      console.log(habitObj);
      dispatch({ type: "SET_HABIT", payload: habitObj });
      const [
        habitRestructure,
        categories,
      ] = await extractCategoriesAndRestructureHabits(habitObj);

      dispatch({ type: "SET_HABIT_RESTRUCTURE", payload: habitRestructure });
      dispatch({ type: "SET_CATEGORY", payload: categories });

      const habitNameList = extractHabitNames(habitObj);
      dispatch({ type: "SET_HABIT_NAME_LIST", payload: habitNameList });

      const todayDate = await getTodayDate();
      dispatch({ type: "SET_CURRENT_DATE", payload: todayDate });

      const weekStartDate = await getWeekStartDate(new Date());
      const weekEndDate = await getWeekEndDate(new Date());

      dispatch({ type: "SET_WEEK_START_DATE", payload: weekStartDate });
      dispatch({ type: "SET_WEEK_END_DATE", payload: weekEndDate });
    }

    hydrateStoreState();
  }, [dispatch]);

  // this fetch function is need to extracted and need to be reused

  const changeDate = async (n) => {
    // change the current date to prev or next date
    let changedDate = addDays(state.currentDate, n);
    dispatch({ type: "SET_CURRENT_DATE", payload: changedDate });
    const newStartWeekDate = await getWeekStartDate(changedDate);

    dispatch({ type: "SET_WEEK_START_DATE", payload: newStartWeekDate });
  };

  return (
    <React.Fragment>
      <div style={{ margin: "20px" }}>
        {format(state.currentDate, "dd MMMM yyyy")}
      </div>

      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12}>
          <Grid container justify="center">
            <Grid item>
              <Button
                style={{ margin: "20px" }}
                variant="contained"
                color="primary"
                onClick={() => changeDate(-7)}
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
                onClick={() => changeDate(7)}
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
