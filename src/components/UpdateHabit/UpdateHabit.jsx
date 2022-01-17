import React from "react";
import { Container, Typography } from "@material-ui/core";
import BackButton from "../FormComponents/BackButton/BackButton";
import useStyles from "./useStyles";
import HabitForm from "../CreateHabitForm/HabitForm";

const UpdateHabit = () => {
  const classes = useStyles();
  return (
    <Container>
      <BackButton />
      <Typography
        variant="h6"
        align="center"
        color="textSecondary"
        className={classes.title}
      >
        UPDATE HABIT
      </Typography>
      <HabitForm />
    </Container>
  );
};

export default UpdateHabit;
