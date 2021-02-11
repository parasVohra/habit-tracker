import { Checkbox, TableCell, TableRow } from "@material-ui/core";
import React from "react";

const RenderHabitsByCategory = ({ category, habit }) => {
  console.log("Render CAteg:" + category);
  return (
    <>
      <TableRow align="left">{category}</TableRow>
      {habit
        ? habit.map((h, i) => {
            return h.category === category ? (
              <TableRow key={i}>
                <TableCell align="center">{h.habitName}</TableCell>
                <TableCell align="center">
                  <Checkbox></Checkbox>
                </TableCell>
              </TableRow>
            ) : (
              ""
            );
          })
        : " "}
    </>
  );
};

export default RenderHabitsByCategory;
