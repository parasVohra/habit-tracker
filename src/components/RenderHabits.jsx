import {
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import React, { useContext, useEffect } from "react";

import RenderHabitsByCategory from "../components/RenderHabitsByCategory";
import { Context } from "../Store/habitStore";

const RenderHabits = ({ habit, date }) => {
  const [state, dispatch] = useContext(Context);
  const classes = useStyles();

  useEffect(() => {
    const [habit, category] = HabitsByCategory(state.habits);

    dispatch({ type: "SET_CATEGORY", payload: category });

    dispatch({ type: "SET_HABIT_RESTRUCTURE", payload: habit });

    console.log("hi");
  }, [dispatch, state.habits]);

  return (
    <div className={classes.root}>
      <TableContainer className={classes.table} component={Paper}>
        <Table
          aria-label="simple table"
          padding="none"
          size="small"
          stickyHeader
        >
          <TableHead>
            <TableRow>
              <TableCell align="center">Habits </TableCell>
              <TableCell align="center">S</TableCell>
              <TableCell align="center">M</TableCell>
              <TableCell align="center">T</TableCell>
              <TableCell align="center">W</TableCell>
              <TableCell align="center">T</TableCell>
              <TableCell align="center">F</TableCell>
              <TableCell align="center">S</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {state.habitRestructure ? (
              <>
                {state.category ? (
                  state.category.map((c, index) => {
                    return (
                      <>
                        <TableRow key={c}>
                          <TableCell>
                            <strong>{c}</strong>
                          </TableCell>
                          <TableCell></TableCell>
                          <TableCell></TableCell>
                          <TableCell></TableCell>
                          <TableCell></TableCell>
                          <TableCell></TableCell>
                          <TableCell></TableCell>
                          <TableCell></TableCell>
                        </TableRow>
                        <RenderHabitsByCategory category={c} />
                      </>
                    );
                  })
                ) : (
                  <TableCell>ss</TableCell>
                )}
              </>
            ) : (
              <TableCell>ss</TableCell>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: "5px",
    textAlign: "center",
    color: "black",
  },
  table: {
    minWidth: 350,
  },
}));

//restructure habits by categories
function HabitsByCategory(habits) {
  let habitRestructure = {};
  let categories = [];
  // if category is present in object
  if (habits) {
    for (let h of habits) {
      if (!habitRestructure.hasOwnProperty(h.category)) {
        categories.push(h.category);
        habitRestructure[h.category] = [];
        habitRestructure[h.category].push(h);
      } else {
        habitRestructure[h.category].push(h);
      }
    }
  }
  return [habitRestructure, categories];
}
export default RenderHabits;