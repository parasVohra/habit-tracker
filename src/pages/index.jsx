import React, { useContext, useEffect, useState } from "react";
import { Context } from "../Store/habitStore";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Grid } from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import { addDays, format, subDays } from "date-fns";
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
  console.log(state.habitView);

  useEffect(() => {
    async function hydrateStoreState() {
      dispatch({ type: "SET_IS_LOADING", payload: true });
      const habitObj = await fetchHabitData();

      dispatch({ type: "SET_HABIT", payload: habitObj });
      const [habitRestructure, categories] =
        await extractCategoriesAndRestructureHabits(habitObj);

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
      dispatch({ type: "SET_IS_LOADING", payload: false });
    }

    hydrateStoreState();
  }, [dispatch]);

  // this fetch function is need to extracted and need to be reused

  const changeDate = async (method, n) => {
    // change the current date to prev or next date
    if (method === "add") {
      let changedDate = addDays(state.currentDate, n);
      dispatch({ type: "SET_CURRENT_DATE", payload: changedDate });
      const newStartWeekDate = await getWeekStartDate(changedDate);
      const newEndWeekDate = await getWeekEndDate(changedDate);
      dispatch({ type: "SET_WEEK_END_DATE", payload: newEndWeekDate });
      dispatch({ type: "SET_WEEK_START_DATE", payload: newStartWeekDate });
    }
    if (method === "sub") {
      let changedDate = subDays(state.currentDate, n);
      dispatch({ type: "SET_CURRENT_DATE", payload: changedDate });
      const newStartWeekDate = await getWeekStartDate(changedDate);
      const newEndWeekDate = await getWeekEndDate(changedDate);

      dispatch({ type: "SET_WEEK_START_DATE", payload: newStartWeekDate });
      dispatch({ type: "SET_WEEK_END_DATE", payload: newEndWeekDate });
    }
  };

  function setHabitView(viewType) {
    dispatch({ type: "SET_HABIT_VIEW", payload: viewType });
  }

  return (
    <React.Fragment>
      <div style={{ margin: "20px" }}>
        {`${format(state.weekStartDate, "dd MMMM")} to ${format(
          state.weekEndDate,
          "dd MMMM"
        )}`}
      </div>

      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12}>
          <Grid container justify="center">
            <Grid item>
              <Button
                style={{ margin: "20px" }}
                variant="contained"
                color="primary"
                onClick={() => changeDate("sub", 7)}
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
                onClick={() => changeDate("add", 7)}
              >
                Next
              </Button>
            </Grid>
            <Grid item>
              <Button
                style={{ margin: "20px" }}
                disabled={isNextDisable}
                onClick={() => setHabitView("daily")}
              >
                Daily
              </Button>
            </Grid>
            <Grid item>
              <Button
                style={{ margin: "20px" }}
                disabled={isNextDisable}
                onClick={() => setHabitView("Weekly")}
              >
                Weekly
              </Button>
            </Grid>
            <Grid xs={3} item></Grid>
            <Grid item justify="flex-end">
              <TrackHabit />
            </Grid>
          </Grid>
          <Grid container justify="center">
            {state.isLoading ? (
              <div
                style={{ fontSize: "4vw" }}
              >{`Loading Habits .... \uD83E\uDD2A`}</div>
            ) : (
              <RenderHabits />
            )}
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

  spinIt: {
    width: 10,
    height: 10,
  },
});
