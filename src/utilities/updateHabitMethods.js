import { calculateHabitDonePercentage } from "./utilitiesMethods";

export function updateTrackObjToFullyComplete({ trackObj, dailyGoal }) {
  trackObj.isFullyComplete = true;
  trackObj.isPartialComplete = true;
  trackObj.done = dailyGoal;

  return trackObj;
}

export function updateStatusObjToFullyComplete({ dailyGoal }) {
  const statusObj = {};
  statusObj.isFullyComplete = true;
  statusObj.isPartialComplete = true;
  statusObj.done = dailyGoal;
  statusObj.percentageDone = 100;
  return statusObj;
}

export function isHabitFullyDone(clickedHabitStatus, habit) {
  return clickedHabitStatus.done === habit.dailyGoal;
}

export function updateLocalHabitStatus({
  habit,
  habitStatus,
  updatedStatusObj,
  dispatch,
  index,
}) {
  const newStatus = { ...habitStatus };
  newStatus[`${habit.habitName}`][index] = updatedStatusObj;
  dispatch({ type: "SET_HABIT_STATUS", payload: newStatus });
  console.log(habitStatus);
}

export function isHabitDailyGoalMetAfterClick(
  dailyGoalOfCurrentHabit,
  clickedHabitStatus
) {
  return dailyGoalOfCurrentHabit === clickedHabitStatus.done + 1;
}

export function updateStatusObjToPartialComplete({ currentGoal, dailyGoal }) {
  const statusObj = {};
  statusObj.isFullyComplete = false;
  statusObj.isPartialComplete = true;
  statusObj.done = currentGoal + 1;
  statusObj.percentageDone = calculateHabitDonePercentage(
    currentGoal + 1,
    dailyGoal
  );
  return statusObj;
}

export function updateTrackObjToPartialComplete({
  trackObj,
  currentGoalCount,
}) {
  trackObj.isPartialComplete = true;
  trackObj.done = currentGoalCount + 1;
  return trackObj;
}
