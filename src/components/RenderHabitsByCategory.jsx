import { Checkbox, TableCell, TableRow } from "@material-ui/core";
import React, { useEffect, useState } from "react";

import HabitService from "../services/habitService";

const habitStatus = (habitId, statusArray) => {
  const currentStatus = statusArray.filter(
    status => status.habitID === habitId
  );

  return currentStatus;
};

const RenderHabitsByCategory = ({ category, habit }) => {
  const [statusArray, setStatusArray] = useState([]);
  //const [habits, setHabits] = useState(null);

  useEffect(() => {
    async function getStatus() {
      const status = await HabitService.getHabitStatus();
      console.log(status.data);
      setStatusArray(status.data);
    }
    getStatus();
  }, []);

  const handleChange = (habit, e) => {
    if (habit) {
      console.log(habit);
      console.log(e.target.checked);

      const data = {
        status: {
          isCompleted: e.target.checked,
        },
        habitID: habit[0].habitID,
      };

      const res = HabitService.updateHabitStatus(data);

      console.log(res);
    }

    //call put request to update status of checkbox
  };

  //1. get habits from server

  //2 get habits status from the server
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
                    checked={habitStatus(h.id, statusArray).isCompleted}
                    onChange={e =>
                      handleChange(habitStatus(h.id, statusArray), e)
                    }
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
