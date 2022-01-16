import React, { useContext } from "react";
import useStyles from "./useStyles";
import { Grid, Container, Paper, Typography, Button } from "@material-ui/core";
import { Context } from "../../Store/habitStore";
import BackButton from "../FormComponents/BackButton/BackButton";
import { NavLink, useHistory } from "react-router-dom";
import { FormContext } from "../../Store/habitFormContext";

const Summary = () => {
  const classes = useStyles();
  const history = useHistory();
  const [state] = useContext(Context);
  const [habitForm, dispatch] = useContext(FormContext);

  function handleClick(habit) {
    console.log("clicked with ", habit);
  }

  function handleEditClick({
    category,
    color,
    dailyGoal,
    habitName,
    habitUnit,
    weeklyGoal,
    trackType,
  }) {
    console.log(
      category,
      color,
      dailyGoal,
      habitName,
      habitUnit,
      weeklyGoal,
      trackType
    );
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

  return (
    <>
      <BackButton />
      {state.habits.length
        ? state.habits.map((habit) => {
            return (
              <Container
                className={classes.root}
                key={habit._id}
                onClick={() => handleClick(habit)}
              >
                <Grid
                  container
                  direction="column"
                  xs={12}
                  sm={12}
                  md={12}
                  elevation={6}
                  className={classes.box}
                  component={Paper}
                  item
                >
                  <Grid item container>
                    <Grid item xs={6}>
                      <Typography>{habit.habitName}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      {/* <NavLink
                        activeStyle={{
                          color: "black",
                          fontSize: "4vw",
                        }}
                        to="/updateHabit"
                      >
                        <Button>Edit</Button>
                      </NavLink> */}
                      <Button onClick={() => handleEditClick(habit)}>
                        Edit
                      </Button>
                    </Grid>
                  </Grid>

                  <Grid item container direction="row">
                    <Typography
                      align="left"
                      variant="subtitle2"
                      className={classes.doneText}
                    >
                      C
                    </Typography>
                  </Grid>
                </Grid>
              </Container>
            );
          })
        : null}
    </>
  );
};

export default Summary;
