import React, { useContext } from "react";
import useStyles from "./useStyles";
import { Grid, Container, Paper, Typography, Button } from "@material-ui/core";
import { Context } from "../../Store/habitStore";
import BackButton from "../FormComponents/BackButton/BackButton";
import { NavLink } from "react-router-dom";

const Summary = () => {
  const classes = useStyles();
  const [state, dispatch] = useContext(Context);

  function handleClick(habit) {
    console.log("clicked with ", habit.habitName);
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
                      <NavLink
                        activeStyle={{
                          color: "black",
                          fontSize: "4vw",
                        }}
                        to="/updateHabit"
                      >
                        <Button>Edit</Button>
                      </NavLink>
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
