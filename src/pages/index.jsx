import React, { useContext, useEffect, useState } from "react";
import { HabitContext } from "../context/HabitContext";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
} from "@material-ui/core";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { green } from "@material-ui/core/colors";
import RenderHabitsByCategory from "../components/RenderHabitsByCategory";
import Popover from "@material-ui/core/Popover";
import HabitService from "../services/habitService";

const useStyles = makeStyles({
  table: {
    minWidth: 200,
    maxWidth: 600,
    paddingLeft: 10,
  },
  checkbox: {
    color: green[400],
    "&$checked": {
      color: green[600],
    },
  },
});

const habitCategory = habits => {
  let category = {};
  let categoryArray = [];
  if (habits) {
    for (let h of habits) {
      if (!category.hasOwnProperty(h.category)) {
        categoryArray.push(h.category);
        category[h.category] = " ";
      } else {
        category[h.category] = " ";
      }
    }
  }

  return categoryArray;
};

export function Index() {
  //const { habit } = useContext(HabitContext);
  const [habits, setHabits] = useState(null);
  const [categories, setCategories] = useState(null);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    async function fetchData() {
      // You can await here
      const { data } = await HabitService.getHabits();
      console.log(data);
      setHabits(data);
      let categoryArray = habitCategory(data);
      setCategories(categoryArray);
    }
    fetchData();
  }, []);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <h2>Home</h2>
      <Fab
        aria-describedby={id}
        size="small"
        color="primary"
        onClick={handleClick}
      >
        <AddIcon />
      </Fab>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <div>
          <div>
            <div>
              Habit name <Checkbox />
            </div>
            <div>
              Habit name <Checkbox />
            </div>

            <div>
              Habit name <Checkbox />
            </div>
            <div>
              Habit name <Checkbox />
            </div>
          </div>
        </div>
      </Popover>

      <TableContainer className={classes.table} component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Habits </TableCell>
              <TableCell align="center">Current Day</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories
              ? categories.map(c => {
                  return (
                    <RenderHabitsByCategory
                      category={c}
                      habit={habits}
                      key={c}
                    />
                  );
                })
              : null}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
