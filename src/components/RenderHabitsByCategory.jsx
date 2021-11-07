import React, {
  useEffect,
  useState,
  useRef,
  useContext,
  Fragment,
} from "react";
import moment from "moment";
import HabitService from "../services/habitService";
import { Context } from "../Store/habitStore";
import { addDays, format } from "date-fns";
import HabitCard from "./HabitCard/HabitCard";
import DailyHabitCard from "./DailyHabitCard/DailyHabitCard";
import { Button } from "@material-ui/core";

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

  const updateStatus = async (data) => {
    let response = await HabitService.updateHabitStatus(data);

    if (response.status === 200) {
      alert("Habit Status updated");
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
            <Fragment>
              {state.habitView === "daily" ? (
                <DailyHabitCard habit={h} />
              ) : (
                <HabitCard habit={h} />
              )}
            </Fragment>
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
