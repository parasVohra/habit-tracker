import { Checkbox, TableCell, TableRow } from "@material-ui/core";
import React, { useState } from "react";

const RenderHabitsByCategory = ({ category, habit }) => {
  const [isCompleted, setIsCompleted] = useState(true);
  //handle the habit status and get habits data from server

  //also handle async call and

  //handle habit update

  //and also update the data base

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
