import React, { useContext, useEffect, useState } from "react";
import useStyles from "./useStyles";
import { Grid, Container, Paper, Typography } from "@material-ui/core";
import { Context } from "../../Store/habitStore";
import { makeStyles } from "@material-ui/core/styles";
import { getDay, format } from "date-fns";
import { calculateCurrentStreak } from "../../utilities/calculateStreak";
import HabitService from "../../services/habitService";
import { calculateHabitDonePercentage } from "../../utilities/utilitiesMethods";

function DailyHabitCard({ habit }) {
  const classes = useStyles();
  const [state, dispatch] = useContext(Context);
  const todayDayIndex = getDay(new Date());
  const [streak, setStreak] = useState({
    currentStreak: 0,
    longestStreak: 0,
    previousDate: null,
  });
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
        background: `linear-gradient(to right, ${dateColor.color} 0%,  ${
          dateColor.color
        }  ${
          state.habitStatus[habit.habitName][todayDayIndex].percentageDone
        }%, rgba(0,0,0,0) ${
          state.habitStatus[habit.habitName][todayDayIndex].percentageDone
        }%,rgba(0,0,0,0) 100%)`,
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
    const clickedHabitStatus = state.habitStatus[habitName][index];
    const dailyGoalOfCurrentHabit = habit.dailyGoal;
    console.log("clicked habit status", clickedHabitStatus);
    if (clickedHabitStatus.done !== habit.dailyGoal) {
      const updatedTrackObj = {
        id: habit._id,
        date: format(state.currentDate, "ddMMyyyy"),
        day: format(state.currentDate, "EEE"),
        data: "",
      };

      const updatedStatusObj = {};

      if (dailyGoalOfCurrentHabit === clickedHabitStatus.done + 1) {
        updatedTrackObj.isFullyComplete =
          updatedStatusObj.isFullyComplete = true;
        updatedTrackObj.isPartialComplete =
          updatedStatusObj.isPartialComplete = true;
        updatedTrackObj.done = updatedStatusObj.done =
          clickedHabitStatus.done + 1;
        updatedStatusObj.percentageDone = calculateHabitDonePercentage(
          clickedHabitStatus.done + 1,
          dailyGoalOfCurrentHabit
        );
      } else {
        updatedTrackObj.isFullyComplete =
          updatedStatusObj.isFullyComplete = false;
        updatedTrackObj.isPartialComplete = true;
        updatedTrackObj.isPartialComplete =
          updatedStatusObj.isPartialComplete = true;
        updatedTrackObj.done = updatedStatusObj.done =
          clickedHabitStatus.done + 1;
        updatedStatusObj.percentageDone = calculateHabitDonePercentage(
          clickedHabitStatus.done + 1,
          dailyGoalOfCurrentHabit
        );
      }

      const newStatus = state.habitStatus;
      newStatus[habitName][index] = updatedStatusObj;
      dispatch({ type: "SET_HABIT_STATUS", payload: newStatus });
      console.log(updatedTrackObj, updatedStatusObj);
      console.log(state.habitStatus);

      updateStatus(updatedTrackObj);
    } else {
      const updatedTrackObj = {
        id: habit._id,
        date: format(state.currentDate, "ddMMyyyy"),
        day: format(state.currentDate, "EEE"),
        data: "",
      };
      const updatedStatusObj = {};
      updatedTrackObj.isFullyComplete =
        updatedStatusObj.isFullyComplete = false;
      updatedTrackObj.isPartialComplete = false;
      updatedTrackObj.isPartialComplete =
        updatedStatusObj.isPartialComplete = false;
      updatedTrackObj.done = updatedStatusObj.done = 0;
      updatedStatusObj.percentageDone = 0;
      const newStatus = state.habitStatus;
      newStatus[habitName][index] = updatedStatusObj;
      dispatch({ type: "SET_HABIT_STATUS", payload: newStatus });
      console.log(updatedTrackObj, updatedStatusObj);
      console.log(state.habitStatus);

      updateStatus(updatedTrackObj);
    }
  }
  const updateStatus = async (data) => {
    let response = await HabitService.updateHabitStatus(data);

    if (response.status === 200) {
      alert("Habit Status updated");
    }
  };

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
              {`DONE ${state.habitStatus[habit.habitName][index].done} / ${
                habit.dailyGoal
              } `}
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
