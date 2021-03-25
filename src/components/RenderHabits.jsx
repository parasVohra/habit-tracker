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

const RenderHabits = ({ date }) => {
  const [habits, setHabits] = useState([]);
  const [habitSt, setHabitSt] = useState(null);
  const [categories, setCategory] = useState([]);
  const classes = useStyles();

  async function getHabits() {
    const { data } = await HabitService.getHabits();
    setHabits(data);
  }

  useEffect(() => {
    getHabits();
  }, []);

  useEffect(() => {
    const [habit, category] = HabitsByCategory(habits);

    setCategory(category);

    setHabitSt(habit);

    console.log("hi");
  }, [habits]);

  console.log(habitSt);
  console.log(categories);

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
                          date={date}
                          category={c}
                          habit={habitSt}
                        />
                      </>
                    );
                  })
                ) : (
                  <TableCell>ss</TableCell>
                )}
                <TableRow align="left">
                  <TableCell>clod Shower</TableCell>
                  <TableCell align="right">
                    <Checkbox></Checkbox>
                  </TableCell>
                </TableRow>
              </>
            ) : (
              <TableCell>ss</TableCell>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <pre>{JSON.stringify(habitSt, null, 2)}</pre>
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
  for (let h of habits) {
    if (!habitRestructure.hasOwnProperty(h.category)) {
      categories.push(h.category);
      habitRestructure[h.category] = [];
      habitRestructure[h.category].push(h);
    } else {
      habitRestructure[h.category].push(h);
    }
  }
  return [habitRestructure, categories];
}
export default RenderHabits;
