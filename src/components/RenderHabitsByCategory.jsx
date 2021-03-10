import { Checkbox, TableCell, TableRow } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import moment from "moment";

import HabitService from "../services/habitService";

const checkStatus = h => {
  let trackCount = h.habitTrack.length;
  if (trackCount === 0) {
    return false;
  } else {
    return true;
  }
};

const RenderHabitsByCategory = ({ category, habit }) => {
  const [statusArray, setStatusArray] = useState([]);
  //const [habits, setHabits] = useState(null);

  useEffect(() => {
    console.log(habit.length);
  }, []);

  const handleChange = (e, habit) => {
    if (habit) {
      console.log(habit);
      console.log(e.target.checked);
    }

    //format data for update which includes date, day , isComplete, data
    let data = {
      id: habit._id,
      date: moment().format("DDMMYYYY"),
      day: moment().format("ddd"),
      isComplete: e.target.checked,
    };

    //send post request to server to update data
    let updateStatus = async () => {
      let response = await HabitService.updateHabitStatus(data);

      console.log(response);
    };

    updateStatus();
    //after getting response check the status of check box and update it
  };

  //3 display habits and there status
  //4 handle change in habits and update the status locally
  //5 update the server with the new habit status update.
  //6 show popup to confirm that habit is updated

  return (
    <>
      <TableRow align="left">{category}</TableRow>
      {habit
        ? habit.map((h, i) => {
            return h.category === category ? (
              <TableRow key={i}>
                <TableCell align="center">{h.habitName}</TableCell>
                <TableCell align="center">
                  <Checkbox
                    checked={checkStatus(h)} // call a function to to find current day in habit tracker and check isComplete status
                    onChange={e => handleChange(e, h)}
                  ></Checkbox>
                </TableCell>
              </TableRow>
            ) : null;
          })
        : null}
    </>
  );
};

export default RenderHabitsByCategory;
