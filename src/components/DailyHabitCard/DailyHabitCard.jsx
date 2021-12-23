import React, { useContext, useEffect, useState } from "react";
import useStyles from "./useStyles";
import { Grid, Container, Paper, Typography } from "@material-ui/core";
import { Context } from "../../Store/habitStore";
import { makeStyles } from "@material-ui/core/styles";
import { getDay } from "date-fns";
import { calculateCurrentStreak } from "../../utilities/calculateStreak";

function DailyHabitCard({ habit }) {
  const classes = useStyles();
  //const habit = habits.habit;
  const [state, dispatch] = useContext(Context);
  const todayDayIndex = getDay(new Date());
  const [streak, setStreak] = useState({
    currentStreak: 0,
    longestStreak: 0,
    previousDate: null,
  });
  const colors = {
    yellow: "#FFB427",
    lightblue: "#4EB1CB",
    green: "#50D890",
    black: "#000000",
    red: "#FF6B7A",
    purple: "#5666F3",
    blue: "#3a8dff",
    orange: "#FF8C00",
  };
  const dateColor = {
    color: habit.color,
  };

  useEffect(() => {
    if (state.habits) {
      setStreak(calculateCurrentStreak(habit.habitTrack));
    }
  }, [habit.habitTrack, state.habits]);

  const dateClasses = (dateColor) =>
    makeStyles(() => ({
      selected: {
        alignItems: "center",
        minWidth: "20rem",
        maxWidth: "50rem",
        minHeight: "4rem",
        margin: "auto",
        // backgroundColor: "#303038",
        borderRadius: "10px",
        padding: "0.5rem",
        borderStyle: "solid",
        borderWidth: "1px",
        //backgroundColor: dateColor.color,
        background: `linear-gradient(to right, ${dateColor.color} 0%,  ${dateColor.color}  88%, rgba(0,0,0,0) 88%,rgba(0,0,0,0) 100%)`,
        borderColor: dateColor.color,
        cursor: "pointer",
        boxShadow: "1px 1px 10px 0px #000000ab",
      },
      unSelected: {
        alignItems: "center",
        minWidth: "20rem",
        maxWidth: "50rem",
        minHeight: "4rem",
        margin: "auto",
        backgroundColor: "#303038",
        borderRadius: "10px",
        borderColor: dateColor.color,
        borderStyle: "solid",
        borderWidth: "1px",
        padding: "0.5rem",
        cursor: "pointer",
      },
    }));

  const dateC = dateClasses(dateColor)();

  function handleClick(habitName, index) {
    let updateStatus = state.habitStatus;
    updateStatus[habitName][index] = !updateStatus[habitName][index];
    dispatch({ type: "SET_HABIT_STATUS", payload: updateStatus });
    //update database
  }

  function SelectedDate(index) {
    return (
      <Container
        className={classes.root}
        onClick={() => handleClick(habit.habitName, index)}
      >
        <Grid
          container
          direction="column"
          xs={12}
          sm={12}
          md={12}
          elevation={6}
          className={dateC.selected}
          component={Paper}
          item
        >
          <Grid item container className={classes.habitTitleBox}>
            <Grid item xs={6}>
              <Typography align="left" variant="h5">
                {habit.habitName}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                align="right"
                className={classes.textStreak}
                variant="h5"
              >
                {streak.currentStreak} 🔥
              </Typography>
            </Grid>
          </Grid>

          <Grid item container direction="row">
            <Typography
              align="left"
              variant="subtitle2"
              className={classes.doneText}
            >
              DONE: 0 / 2
            </Typography>
          </Grid>
        </Grid>
      </Container>
    );
  }

  function UnSelectedDate(index) {
    return (
      <Container
        className={classes.root}
        onClick={() => handleClick(habit.habitName, index)}
      >
        <Grid
          container
          direction="column"
          xs={12}
          sm={12}
          md={12}
          elevation={6}
          className={dateC.unSelected}
          component={Paper}
        >
          <Grid item container className={classes.habitTitleBox}>
            <Grid item xs={6}>
              <Typography align="left" variant="h5">
                {habit.habitName}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                align="right"
                className={classes.textStreak}
                variant="h5"
              >
                {streak.currentStreak} 🔥
              </Typography>
            </Grid>
          </Grid>

          <Grid item container direction="row">
            <Typography
              align="left"
              variant="subtitle2"
              className={classes.doneText}
            >
              DONE: 0 / 2
            </Typography>
          </Grid>
        </Grid>
      </Container>
    );
  }
  return state.habitStatus[habit.habitName][todayDayIndex]
    ? SelectedDate(todayDayIndex)
    : UnSelectedDate(todayDayIndex);
}

export default DailyHabitCard;
