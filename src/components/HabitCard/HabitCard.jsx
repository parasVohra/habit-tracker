import React, { Fragment, useState, useContext } from "react";
import useStyles from "./useStyles";
import { Grid, Container, Paper, Typography } from "@material-ui/core";
import { Context } from "../../Store/habitStore";

function HabitCard() {
  const classes = useStyles();
  const [state, dispatch] = useContext(Context);
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  console.log(state);
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
              Reading
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
              <Fragment>
                <Grid item className={classes.titleText}>
                  <Typography
                    variant="subtitle1"
                    className={classes.textGrey}
                  >{`${day}`}</Typography>
                  <div className={`${classes.datesBox} ${classes.textYellow}`}>
                    1
                  </div>
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
