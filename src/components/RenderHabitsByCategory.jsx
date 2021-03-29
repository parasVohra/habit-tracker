import { Checkbox, TableCell, TableRow } from "@material-ui/core";
import React, {
  useCallback,
  useEffect,
  useState,
  useRef,
  useContext,
} from "react";
import moment from "moment";
import HabitService from "../services/habitService";
import { Context } from "../Store/habitStore";

const RenderHabitsByCategory = ({ category }) => {
  const [state, dispatch] = useContext(Context);
  const [habitData, setHabitData] = useState(null);
  const [cat] = useState(category);
  const [currentDate, setCurrentDate] = useState(null);
  const [habitStatus, setHabitStatus] = useState(null);

  useEffect(() => {
    setHabitData(state.habitRestructure);
    setCurrentDate(state.currentDate);
    setHabitStatus(state.habitStatus);
  }, [
    state.habitRestructure,
    state.category,
    state.currentDate,
    state.habitStatus,
  ]);

  useEffect(() => {
    const getCurrentStatus = (currentDate, habit) => {
      console.log(cat);
      habit
        ? habit[cat].forEach((h) => {
            let fDate = moment(currentDate).format("DDMMYYYY");
            console.log(fDate);
            let status = h.habitTrack.filter((d) => d.date === fDate);

            console.log(status);

            if (status.length === 0) {
              let data = {};
              console.log(status);
              let name = h.habitName;
              let complete = false;
              data[name] = complete;
              dispatch({ type: "SET_HABIT_STATUS", payload: data });
            } else if (status.length > 0) {
              console.log(status);
              let name = h.habitName;
              let complete = status[0].isComplete;
              let data = {};
              data[name] = complete;
              console.log(data);
              dispatch({ type: "SET_HABIT_STATUS", payload: data });
            }
          })
        : console.log(habit);
    };
    getCurrentStatus(currentDate, habitData);
  }, [currentDate, habitData, cat, dispatch]);

  console.log(habitData);
  console.log(state);

  const check = useRef();

  const updateStatus = async (data) => {
    let response = await HabitService.updateHabitStatus(data);
    console.log(response);
    if (response.status === 200) {
      alert("Habit Status updated");
      check.current.focus();
    }
  };

  const handelChange = (e, habit) => {
    if (habit) {
      console.log(habit);
      console.log(e.target.checked);
    }
    let data = {
      id: habit._id,
      date: moment(currentDate).format("DDMMYYYY"),
      day: moment(currentDate).format("ddd"),
      isComplete: e.target.checked,
      inputData: null,
    };

    let name = habit.habitName;

    let updateData = {};
    updateData[name] = e.target.checked;
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
                  checked={habitStatus[h.habitName]}
                  id={h._id}
                  onChange={(e) => handelChange(e, h)}
                  ref={check}
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
