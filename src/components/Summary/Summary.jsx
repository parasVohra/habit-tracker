import React, { useContext } from "react";
import useStyles from "./useStyles";
import { Grid, Container, Paper, Typography, Button } from "@material-ui/core";
import { Context } from "../../Store/habitStore";
import BackButton from "../FormComponents/BackButton/BackButton";
import { useHistory } from "react-router-dom";
import { FormContext } from "../../Store/habitFormContext";
import { calculateLongestStreak } from "../../utilities/calculateStreak";
import {
  calculatePartiallyCompletedHabitCount,
  calculateFullyCompletedHabitCount,
} from "../../utilities/utilitiesMethods";

const Summary = () => {
  const classes = useStyles();
  const history = useHistory();
  const [state] = useContext(Context);
  const [habitForm, dispatch] = useContext(FormContext);

  function handleEditClick({
    _id,
    category,
    color,
    dailyGoal,
    habitName,
    habitUnit,
    weeklyGoal,
    trackType,
  }) {
    console.log(
      _id,
      category,
      color,
      dailyGoal,
      habitName,
      habitUnit,
      weeklyGoal,
      trackType
    );
    dispatch({ type: "SET_HABIT_ID", payload: _id });
    dispatch({ type: "SET_CATEGORY", payload: category });
    dispatch({ type: "SET_HABIT_NAME", payload: habitName });
    dispatch({ type: "SET_DAILY_GOAL", payload: dailyGoal });
    dispatch({ type: "SET_WEEKLY_GOAL", payload: weeklyGoal.value });
    dispatch({ type: "SET_WEEKLY_INPUT_TYPE", payload: weeklyGoal.type });
    dispatch({ type: "SET_COLOR", payload: color });
    dispatch({ type: "SET_HABIT_UNIT", payload: habitUnit.value });
    dispatch({ type: "SET_HABIT_UNIT_TYPE", payload: habitUnit.type });
    dispatch({ type: "SET_INPUT_TYPE", payload: trackType });
    history.push("/updateHabit");
  }
  function handleStatsClick(habit) {
    history.push("/habitStats");
  }

  return (
    <>
      <BackButton />
      {state.habits.length
        ? state.habits.map((habit) => {
            return (
              <Container
                className={classes.root}
                style={{ color: `${habit.color}` }}
                key={habit._id}
              >
                <Grid
                  container
                  direction="column"
                  xs={12}
                  sm={12}
                  md={12}
                  elevation={6}
                  className={classes.habitContainer}
                  component={Paper}
                  style={{ color: `${habit.color}` }}
                  item
                >
                  <Grid item container>
                    <Grid item xs={8}>
                      <Typography>{habit.habitName}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Button onClick={() => handleEditClick(habit)}>
                        Edit
                      </Button>
                      <Button onClick={() => handleStatsClick(habit)}>
                        stats
                      </Button>
                    </Grid>
                  </Grid>

                  <Grid item container direction="row" className={classes.box}>
                    <Grid item xs={4}>
                      <Typography className={classes.statsText} align="center">
                        Completed
                      </Typography>
                      <Typography className={classes.statsText} align="center">
                        {getCompletedHabitCount(habit)}
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography className={classes.statsText} align="center">
                        Partial
                      </Typography>
                      <Typography className={classes.statsText} align="center">
                        {getPartiallyCompletedHabitCount(habit)}
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography className={classes.statsText} align="center">
                        Longest Streak
                      </Typography>
                      <Typography className={classes.statsText} align="center">
                        {getLongestStreak(habit.habitTrack)}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Container>
            );
          })
        : null}
    </>
  );
};
function getConcurredPercentage(habit) {
  return 23;
}
function getCompletedHabitCount(habit) {
  let res = calculateFullyCompletedHabitCount(habit.habitTrack);
  return res.count;
}
function getPartiallyCompletedHabitCount(habit) {
  let res = calculatePartiallyCompletedHabitCount(habit.habitTrack);
  return res.count;
}
function getLongestStreak(habitTrack) {
  return calculateLongestStreak(habitTrack).longestStreak;
}

export default Summary;
