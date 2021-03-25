import { Checkbox, TableCell, TableRow } from "@material-ui/core";
import React, { useCallback, useEffect, useState } from "react";
import moment from "moment";

const RenderHabitsByCategory = ({ category, habit }) => {
  const [habitData] = useState(habit);
  const [cat] = useState(category);

  let catt = cat;

  console.log(catt);

  console.log(habitData[catt]);

  return (
    <>
      {habitData[cat].map((h) => {
        return (
          <TableRow key={h._id}>
            <TableCell key={h._id} align="center">
              {h.habitName}
            </TableCell>
            <TableCell align="center">
              <Checkbox></Checkbox>
            </TableCell>
          </TableRow>
        );
      })}
    </>
  );
};

export default RenderHabitsByCategory;
