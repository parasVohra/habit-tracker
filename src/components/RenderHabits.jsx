import {
  Checkbox,
  Grid,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
//import moment from "moment";

import HabitService from "../services/habitService";
import RenderHabitsByCategory from "../components/RenderHabitsByCategory";

const RenderHabits = ({ habit, date }) => {
  const [habits, setHabits] = useState(habit);
  const [habitSt, setHabitSt] = useState(null);
  const [categories, setCategory] = useState([]);
  const classes = useStyles();
  const [currentDate, setCurrentDate] = useState(date);

  // async function getHabits() {
  //   const { data } = await HabitService.getHabits();
  //   setHabits(data);
  // }

  // useEffect(() => {
  //   getHabits();
  // }, [currentDate]);

  useEffect(() => {
    setCurrentDate(date);
    setHabits(habit);
  }, [date, habit]);

  useEffect(() => {
    const [habit, category] = HabitsByCategory(habits);

    setCategory(category);

    setHabitSt(habit);

    console.log("hi");
  }, [habits]);

  return (
    <div className={classes.root}>
      <TableContainer className={classes.table} component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Habits </TableCell>
              <TableCell align="center">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {habitSt ? (
              <>
                {categories ? (
                  categories.map((c, index) => {
                    return (
                      <>
                        <TableRow key={index}>
                          <TableCell>{c}</TableCell>
                          <TableCell></TableCell>
                        </TableRow>
                        <RenderHabitsByCategory
                          date={currentDate}
                          category={c}
                          habit={habitSt}
                        />
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
    padding: "20px",
    textAlign: "center",
    color: "black",
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
