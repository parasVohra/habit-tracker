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
  Button,
  Grid,
} from "@material-ui/core";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { green } from "@material-ui/core/colors";
import RenderHabitsByCategory from "../components/RenderHabitsByCategory";
import Popover from "@material-ui/core/Popover";
import HabitService from "../services/habitService";
import moment from "moment";
import RenderHabits from "../components/RenderHabits";

export function Index() {
  //const { habit } = useContext(HabitContext);
  const [habits, setHabits] = useState(null);
  const [categories, setCategories] = useState(null);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentDate, setCurrentDate] = useState(moment()._d);
  const [isNextDisable, setNextDisable] = useState(false);

  // this fetch function is need to extracted and need to be reused
  useEffect(() => {
    //fetch habits from server
    if (
      moment(currentDate).format("DDMMYYYY") === moment().format("DDMMYYYY")
    ) {
      setNextDisable(true);
    } else {
      setNextDisable(false);
    }
    async function fetchData() {
      // You can await here
      const { data } = await HabitService.getHabits();
      setHabits(data);

      //create category array based on habits data
      let categoryArray = habitCategory(data);
      setCategories(categoryArray);
    }
    fetchData();
    console.log(currentDate);
  }, [currentDate]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const changeDate = (n) => {
    // change the current date to prev or next date
    let changedDate = moment(currentDate).add(n, "days");
    setCurrentDate(changedDate._d);
  };

  const handleChange = (event) => {
    let data = {
      id: event.target.id,
      isTracked: event.target.checked,
    };
    console.log(event);

    // update is track is also need to extracted
    async function updateIsTracked() {
      const res = await HabitService.updateIsTracked(data);
      if (res.status === 200 && res.data.nModified === 1) {
        // here i want to fetch the updated habit data from the server
        // and also i want want to render the habits
      }

      console.log(res);
    }

    updateIsTracked();
  };

  const open = Boolean(anchorEl);

  const id = open ? "simple-popover" : undefined;

  return (
    <React.Fragment>
      <div style={{ margin: "20px" }}>
        {moment(currentDate).format("DDMMYYYY")}
      </div>

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
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">Habits </TableCell>
                <TableCell align="center">Track Habit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {habits
                ? habits.map((h, i) => {
                    return (
                      <TableRow key={i}>
                        <TableCell align="center">{h.habitName}</TableCell>
                        <TableCell align="center">
                          <Checkbox
                            id={h._id}
                            onChange={(e) => handleChange(e)}
                            checked={h.isTracked}
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })
                : null}
            </TableBody>
          </Table>
        </div>
      </Popover>

      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12}>
          <Grid container justify="center">
            <Grid item>
              <Button
                style={{ margin: "20px" }}
                variant="contained"
                color="primary"
                onClick={() => changeDate(-1)}
              >
                Prev
              </Button>
            </Grid>
            <Grid item>
              <Button
                style={{ margin: "20px" }}
                disabled={isNextDisable}
                variant="contained"
                color="primary"
                onClick={() => changeDate(1)}
              >
                Next
              </Button>
            </Grid>
            <Grid xs={3} item></Grid>
            <Grid item justify="flex-end">
              <Fab
                aria-describedby={id}
                size="small"
                color="primary"
                onClick={handleClick}
              >
                <AddIcon />
              </Fab>
            </Grid>
          </Grid>
          <Grid container justify="center">
            <RenderHabits date={currentDate} />
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

const habitCategory = (habits) => {
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
