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
import React, { useContext, useState, useEffect } from "react";
import { format, eachDayOfInterval } from "date-fns";
import RenderHabitsByCategory from "../components/RenderHabitsByCategory";
import { Context } from "../Store/habitStore";
import HabitCard from "./HabitCard/HabitCard";

const RenderHabits = () => {
  const [state, dispatch] = useContext(Context);
  const classes = useStyles();
  const [isHabitEmpty, setIsHabitEmpty] = useState(false);
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  useEffect(() => {
    if (JSON.stringify(state.habitRestructure) === "{}") {
      setIsHabitEmpty(true);
    }
  }, [state.habitRestructure]);

  useEffect(() => {
    const fetchCurrentWeekDates = () => {
      const result = eachDayOfInterval({
        start: state.weekStartDate,
        end: state.weekEndDate,
      });

      const formatDates = result.map((date) => {
        let intDate = format(date, "dd");
        return intDate;
      });

      dispatch({ type: "SET_CURRENT_WEEK_DATES", payload: formatDates });
    };

    fetchCurrentWeekDates();
  }, [state.weekStartDate, state.weekEndDate, dispatch]);

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
              {weekDays.map((day, index) => {
                return (
                  <TableCell align="center">{`${day} ${state.currentWeekDates[index]}`}</TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {state.habitRestructure && !isHabitEmpty ? (
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
                  <TableRow>ss</TableRow>
                )}
              </>
            ) : (
              <TableRow>
                <TableCell align="center">{`Loading ...  `} </TableCell>
              </TableRow>
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
export default RenderHabits;
