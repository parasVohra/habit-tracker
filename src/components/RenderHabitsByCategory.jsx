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

const RenderHabitsByCategory = ({ category, habit, date }) => {
  const [habitData] = useState(habit);
  const [cat] = useState(category);
  const [currentDate, setCurrentDate] = useState(date);
  const check = useRef(false);

  const [state, dispatch] = useContext(Context);

  useEffect(() => {
    setCurrentDate(date);
  }, [date]);

  const getCurrentStatus = (currentDate, habit) => {
    //console.log(habit);
    let fDate = moment(currentDate).format("DDMMYYYY");
    let status = habit.filter((h) => h.date === fDate);

    //console.log(status);

    if (status.length === 0) {
      return false;
    } else {
      return status;
    }
  };

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
      {habitData[cat].map((h) => {
        return (
          <TableRow key={h._id}>
            <TableCell key={h._id} align="center">
              {h.habitName}
            </TableCell>
            <TableCell align="center">
              <Checkbox
                checked={getCurrentStatus(currentDate, h.habitTrack)}
                id={h._id}
                onChange={(e) => handelChange(e, h)}
                ref={check}
              ></Checkbox>
            </TableCell>
          </TableRow>
        );
      })}
    </>
  );
};

export default RenderHabitsByCategory;
