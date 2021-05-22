import { Checkbox, TableCell, TableRow } from "@material-ui/core";
import React, { useEffect, useState, useRef, useContext } from "react";
import moment from "moment";
import HabitService from "../services/habitService";
import { Context } from "../Store/habitStore";
import { addDays, format } from "date-fns";

// First day of week is sunday
const FIRST_WEEKDAY_INDEX = 0;

// Last day of week is saturday
const LAST_WEEKDAY_INDEX = 6;

const RenderHabitsByCategory = ({ category }) => {
  const [state, dispatch] = useContext(Context);
  const [habitData, setHabitData] = useState(null);
  const [cat] = useState(category);

  useEffect(() => {
    setHabitData(state.habitRestructure);
  }, [state.habitRestructure]);

  useEffect(() => {
    const getCurrentStatus = (habit) => {
      habit[cat].forEach((h) => {
        let isHabitComplete = {};
        let name = h.habitName;
        isHabitComplete[name] = [];
        let forloop = false;
        for (let i = FIRST_WEEKDAY_INDEX; i <= LAST_WEEKDAY_INDEX; i++) {
          let dateCounter = addDays(state.weekStartDate, i);

          let formatDate = format(dateCounter, "ddMMyyyy");
          let status = h.habitTrack.filter((d) => d.date === formatDate);

          if (status.length > 0 && status[0].isComplete) {
            isHabitComplete[name][i] = true;
          } else {
            isHabitComplete[name][i] = false;
          }

          if (i === 6) {
            forloop = true;
          }
        }

        if (forloop) {
          dispatch({ type: "SET_HABIT_STATUS", payload: isHabitComplete });
        }
      });
    };
    getCurrentStatus(state.habitRestructure);
  }, [cat, dispatch, state.weekStartDate, state.habitRestructure]);

  const check = useRef();

  const updateStatus = async (data) => {
    let response = await HabitService.updateHabitStatus(data);

    if (response.status === 200) {
      alert("Habit Status updated");
      check.current.focus();
    }
  };

  const handelChange = (e, habit, index) => {
    let data = {
      id: habit._id,
      date: moment(state.weekStartDate).add(index, "days").format("DDMMYYYY"),
      day: moment(state.weekStartDate).add(index, "days").format("ddd"),
      isComplete: e.target.checked,
      inputData: null,
    };
    let name = habit.habitName;

    let updateData = state.habitStatus;
    updateData[name][index] = e.target.checked;
    dispatch({ type: "SET_HABIT_STATUS", payload: updateData });

    if (habit.inputType !== "checkbox" && e.target.checked === true) {
      let popupVal = prompt(`Enter the  value for ${habit.habitName}`, "");

      if (popupVal === null) {
        alert("Please enter the value ");
      } else {
        // save the changes to data base
        data.inputData = popupVal;
        updateStatus(data);
      }
    } else {
      //format data for update which includes date, day , isComplete, data
      //send post request to server to update data
      updateStatus(data);
    }
  };

  return (
    <>
      {habitData ? (
        habitData[cat].map((h) => {
          return (
            <TableRow key={h._id}>
              <TableCell key={h._id} align="center">
                {h.habitName}
              </TableCell>
              <TableCell align="center">
                <Checkbox
                  checked={state.habitStatus[h.habitName][0] || false}
                  index={0}
                  id={h._id}
                  onChange={(e) => handelChange(e, h, 0)}
                  ref={check}
                  size="small"
                ></Checkbox>
              </TableCell>
              <TableCell align="center">
                <Checkbox
                  checked={
                    state.habitStatus
                      ? state.habitStatus[h.habitName][1]
                      : false
                  }
                  index={1}
                  id={h._id}
                  onChange={(e) => handelChange(e, h, 1)}
                  ref={check}
                  size="small"
                ></Checkbox>
              </TableCell>
              <TableCell align="center">
                <Checkbox
                  checked={
                    state.habitStatus
                      ? state.habitStatus[h.habitName][2]
                      : false
                  }
                  index={2}
                  id={h._id}
                  onChange={(e) => handelChange(e, h, 2)}
                  ref={check}
                  size="small"
                ></Checkbox>
              </TableCell>
              <TableCell align="center">
                <Checkbox
                  checked={
                    state.habitStatus
                      ? state.habitStatus[h.habitName][3]
                      : false
                  }
                  index={3}
                  id={h._id}
                  onChange={(e) => handelChange(e, h, 3)}
                  ref={check}
                  size="small"
                ></Checkbox>
              </TableCell>
              <TableCell align="center">
                <Checkbox
                  checked={
                    state.habitStatus
                      ? state.habitStatus[h.habitName][4]
                      : false
                  }
                  index={4}
                  id={h._id}
                  onChange={(e) => handelChange(e, h, 4)}
                  ref={check}
                  size="small"
                ></Checkbox>
              </TableCell>
              <TableCell align="center">
                <Checkbox
                  checked={
                    state.habitStatus
                      ? state.habitStatus[h.habitName][5]
                      : false
                  }
                  index={5}
                  id={h._id}
                  onChange={(e) => handelChange(e, h, 5)}
                  ref={check}
                  size="small"
                ></Checkbox>
              </TableCell>
              <TableCell align="center">
                <Checkbox
                  checked={
                    state.habitStatus
                      ? state.habitStatus[h.habitName][6]
                      : false
                  }
                  index={6}
                  id={h._id}
                  onChange={(e) => handelChange(e, h, 6)}
                  ref={check}
                  size="small"
                ></Checkbox>
              </TableCell>
            </TableRow>
          );
        })
      ) : (
        <div>
          You are no tracking any habits yet, please add habits and it will show
          here
        </div>
      )}
    </>
  );
};

export default RenderHabitsByCategory;
