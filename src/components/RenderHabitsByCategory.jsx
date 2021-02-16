import { Checkbox, TableCell, TableRow } from "@material-ui/core";
import React, { useEffect, useState } from "react";

const RenderHabitsByCategory = ({ category, habit }) => {
  const [isCompleted, setIsCompleted] = useState(true);
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
                  <Checkbox checked={isCompleted}></Checkbox>
                </TableCell>
              </TableRow>
            ) : null;
          })
        : null}
    </>
  );
};

export default RenderHabitsByCategory;
