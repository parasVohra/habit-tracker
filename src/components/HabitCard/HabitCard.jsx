import React, { Fragment, useState, useContext } from "react";
import useStyles from "./useStyles";
import { Grid, Container, Paper, Typography } from "@material-ui/core";
import { Context } from "../../Store/habitStore";
import { makeStyles } from "@material-ui/core/styles";

function HabitCard(habits) {
  const classes = useStyles();
  const habit = habits.habit;
  const [state, dispatch] = useContext(Context);
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
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

  const dateClasses = (dateColor, index) =>
    makeStyles(() => ({
      selected: {
        marginTop: "0.2rem",
        height: "2rem",
        width: "2rem",
        textAlign: "center",
        lineHeight: "2rem",
        color: "#ffffff",
        border: "2px solid",
        borderRadius: "2rem",
        //backgroundColor: dateColor.color,
        background: `linear-gradient(to right, ${dateColor.color} 0%,  ${
          dateColor.color
        }  ${
          state.habitStatus[habit.habitName][index].percentageDone
        }%, rgba(0,0,0,0) ${
          state.habitStatus[habit.habitName][index].percentageDone
        }%,rgba(0,0,0,0) 100%)`,
        borderColor: dateColor.color,
        cursor: "pointer",
        boxShadow: "1px 1px 4px 0px #000000ab",
      },
      unSelected: {
        marginTop: "0.2rem",
        height: "2rem",
        width: "2rem",
        textAlign: "center",
        lineHeight: "2rem",
        color: dateColor.color,
        border: "2px solid",
        borderRadius: "2rem",
        borderColor: dateColor.color,
        cursor: "pointer",
      },
    }));

  function handleClick(e) {
    const id = e.target.id;
    const [habitName, index] = id.split(",");
    let updateStatus = state.habitStatus;
    updateStatus[habitName][index] = !updateStatus[habitName][index];
    dispatch({ type: "SET_HABIT_STATUS", payload: updateStatus });
    //update database
  }

  function SelectedDate(index) {
    const dateC = dateClasses(dateColor, index)();
    return (
      <div
        id={`${habit.habitName},${index}`}
        onClick={(e) => handleClick(e)}
        className={dateC.selected}
      >
        {state.currentWeekDates[index]}
      </div>
    );
  }

  function UnSelectedDate(index) {
    const dateC = dateClasses(dateColor, index)();
    return (
      <div
        id={`${habit.habitName},${index}`}
        onClick={(e) => handleClick(e)}
        className={dateC.unSelected}
      >
        {state.currentWeekDates[index]}
      </div>
    );
  }
  return (
    <Container className={classes.root}>
      <Grid
        container
        direction="column"
        xs={12}
        sm={12}
        md={12}
        elevation={6}
        className={classes.habitContainer}
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
              className={classes.textGrey}
              variant="subtitle1"
            >
              6 times a week
            </Typography>
          </Grid>
        </Grid>

        <Grid item container direction="row">
          {weekDays.map((day, index) => {
            return (
              <Fragment key={index}>
                <Grid item className={classes.titleText}>
                  <Typography
                    align="center"
                    variant="h6"
                    className={classes.textGrey}
                  >{`${day}`}</Typography>
                  {state.habitStatus[habit.habitName][index]
                    ? SelectedDate(index)
                    : UnSelectedDate(index)}
                </Grid>
              </Fragment>
            );
          })}
        </Grid>
      </Grid>
    </Container>
  );
}

export default HabitCard;
