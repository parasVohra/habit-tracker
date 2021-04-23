import { Checkbox, TableCell, TableRow } from "@material-ui/core";
import React, { useEffect, useState, useRef, useContext } from "react";
import moment from "moment";
import HabitService from "../services/habitService";
import { Context } from "../Store/habitStore";

// First day of week is sunday
const FIRST_WEEKDAY_INDEX = 0;

// Last day of week is saturday
const LAST_WEEKDAY_INDEX = 6;

const RenderHabitsByCategory = ({ category }) => {
  const [state, dispatch] = useContext(Context);
  const [habitData, setHabitData] = useState(null);
  const [cat] = useState(category);
  const [currentDate, setCurrentDate] = useState(null);
  const [habitStatus, setHabitStatus] = useState(false);
  const [startDate, setStartDate] = useState(null);

  useEffect(() => {
    setHabitData(state.habitRestructure);
    setCurrentDate(state.currentDate);
    setStartDate(state.weekStartDate);
  }, [
    state.habitRestructure,
    state.category,
    state.currentDate,
    state.weekStartDate,
  ]);

  console.log(habitData);

  useEffect(() => {
    const getCurrentStatus = (habit) => {
      console.log(habit);
      habit[cat].map((h) => {
        console.log(h);
        //let fDate = moment(currentDate).format("DDMMYYYY");

        console.log("in for each");

        let ishabitComplete = {};
        let name = h.habitName;
        ishabitComplete[name] = [];
        let forloop = false;
        for (let i = FIRST_WEEKDAY_INDEX; i <= LAST_WEEKDAY_INDEX; i++) {
          console.log("in for each");
          let dateCounter = moment(startDate).add(i, "days");
          let formatedDate = moment(dateCounter).format("DDMMYYYY");
          let status = h.habitTrack.filter((d) => d.date === formatedDate);
          //console.log(status[0].isComplete);
          if (status.length > 0 && status[0].isComplete) {
            console.log(h.habitName, formatedDate, "true");
            ishabitComplete[name][i] = true;
          } else {
            console.log(status);
            ishabitComplete[name][i] = false;
          }

          if (i === 6) {
            forloop = true;
          }
        }

        if (forloop) {
          dispatch({ type: "SET_HABIT_STATUS", payload: ishabitComplete });
        }
      });
    };
    getCurrentStatus(state.habitRestructure);
  }, [cat, dispatch, startDate, state.habitRestructure]);

  const check = useRef();

  const updateStatus = async (data) => {
    let response = await HabitService.updateHabitStatus(data);
    console.log(response);
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
    console.log(data);

    let updateData = state.habitStatus;
    updateData[name][index] = e.target.checked;
    dispatch({ type: "SET_HABIT_STATUS", payload: updateData });

    console.log("new status", state.habitStatus);

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
        <></>
      )}
    </>
  );
};

export default RenderHabitsByCategory;
