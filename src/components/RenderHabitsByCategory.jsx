import { Checkbox, TableCell, TableRow } from "@material-ui/core";
import React, { useCallback, useEffect, useState } from "react";
import moment from "moment";

import HabitService from "../services/habitService";
import Condition from "yup/lib/Condition";

const RenderHabitsByCategory = ({ category, habit }) => {
  const [habitData, setHabit] = useState(habit);

  const [habitStatus, setHabitStatus] = useState([]);

  const HabitState = (habit) => {
    habit.forEach((h) => {
      let status = false;

      let trackCount = h.habitTrack.length;

      if (trackCount === 0) {
        status = false;
      } else {
        h.habitTrack.forEach((val) => {
          if (val.date === moment().format("DDMMYYYY")) {
            status = val.isComplete;
          } else {
            status = false;
          }
        });
      }

      setHabitStatus((oldHabit) => [
        ...oldHabit,
        {
          habitId: h._id,
          habitName: h.habitName,
          habitCategory: h.category,
          habitCheck: status,
          habitTracked: h.isTracked,
          habitInputType: h.inputType,
        },
      ]);
    });
  };

  useEffect(() => {
    HabitState(habitData);

    return () => {};
  }, [habitData]);

  const handleChange = (e, habit) => {
    if (habit) {
      console.log(habit);
      console.log(e.target.checked);
    }

    if (habit.habitInputType !== "checkbox" && e.target.checked === true) {
      let popupVal = prompt(`Enter the  value for ${habit.habitName}`, "");

      if (popupVal === null) {
        alert("Please enter the value ");
      } else {
        // save the changes to data base
        let data = {
          id: habit.habitId,
          date: moment().format("DDMMYYYY"),
          day: moment().format("ddd"),
          isComplete: e.target.checked,
          inputData: popupVal,
        };
        let updateStatus = async () => {
          let response = await HabitService.updateHabitStatus(data);
          if (response.status === 200) {
            const { data } = await HabitService.getHabits();

            console.log(data);
            setHabit(data);
            setHabitStatus([]);
          }
        };
        updateStatus();
      }
    } else {
      //format data for update which includes date, day , isComplete, data
      let data = {
        id: habit.habitId,
        date: moment().format("DDMMYYYY"),
        day: moment().format("ddd"),
        isComplete: e.target.checked,
        inputData: null,
      };
      //send post request to server to update data
      let updateStatus = async () => {
        let response = await HabitService.updateHabitStatus(data);
        if (response.status === 200) {
          const { data } = await HabitService.getHabits();

          console.log(data);
          setHabit(data);
          setHabitStatus([]);
        }
      };
      updateStatus();
    }
  };

  return (
    <>
      <TableRow align="left">{category}</TableRow>
      {habitStatus
        ? habitStatus.map((h, i) => {
            return h.habitCategory === category && h.habitTracked === true ? (
              <TableRow key={i}>
                <TableCell align="center">{h.habitName}</TableCell>
                <TableCell align="center">
                  <Checkbox
                    checked={h.habitCheck} // call a function to to find current day in habit tracker and check isComplete status
                    onChange={(e) => handleChange(e, h)}
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
