/**
 *  Utilities methods
 */

//Dependencies
import { startOfWeek, endOfWeek, addDays, format } from "date-fns";
import habitService from "../services/habitService";

// fetch data from habit server
export async function fetchHabitData() {
  let response = await habitService.getHabits();
  return response.data;
}

/**
 *
 * @param {*} habitObject
 * @returns habitsNameList
 */
export function extractHabitNames(habitObject) {
  return habitObject.map((habit) => {
    return habit.habitName;
  }, []);
}

/**
 *
 * @param {*} habits
 * @returns habit restructured object and categories array
 */
export function extractCategoriesAndRestructureHabits(habits) {
  let habitRestructure = {};
  let categories = [];
  // if category is present in object
  if (habits && typeof habits === "object") {
    for (let h of habits) {
      if (!habitRestructure.hasOwnProperty(h.category)) {
        categories.push(h.category);
        habitRestructure[h.category] = [];
        habitRestructure[h.category].push(h);
      } else {
        habitRestructure[h.category].push(h);
      }
    }
  }
  return Promise.resolve([habitRestructure, categories]);
}

export function getTodayDate() {
  const date = new Date();
  return Promise.resolve(date);
}

// get start of week from date fns
export function getWeekStartDate(date = new Date()) {
  let weekStartDate = startOfWeek(date);
  return weekStartDate;
}

// get end of week from date fns
export function getWeekEndDate(date = new Date()) {
  let weekEndDate = endOfWeek(date);
  return weekEndDate;
}

/**
 *
 * @param {Array} habits
 * @param {Date} weekStartDate
 * @returns
 */
export function processHabitStatus(habits, weekStartDate) {
  const FIRST_WEEKDAY_INDEX = 0;
  const LAST_WEEKDAY_INDEX = 6;
  const isHabitComplete = {};

  habits.forEach((habit) => {
    const habitName = habit.habitName;
    isHabitComplete[habitName] = [];

    for (let i = FIRST_WEEKDAY_INDEX; i <= LAST_WEEKDAY_INDEX; i++) {
      let dateCounter = addDays(weekStartDate, i);
      let formatDate = format(dateCounter, "ddMMyyyy");
      let status = habit.habitTrack.filter((d) => d.date === formatDate);
      if (status.length > 0) {
        isHabitComplete[habitName][i] = {
          isFullyComplete: status[0].isFullyComplete,
          isPartialComplete: status[0].isPartialComplete,
          done: status[0].done,
          percentageDone: calculateHabitDonePercentage(
            status[0].done,
            habit.dailyGoal
          ),
        };
      } else {
        isHabitComplete[habitName][i] = {
          isFullyComplete: false,
          isPartialComplete: false,
          done: 0,
          percentageDone: 0,
        };
      }
    }
  });

  return Promise.resolve(isHabitComplete);
}

export function calculateHabitDonePercentage(done, dailyGoal) {
  return 100 * (done / dailyGoal);
}

export function isFullyComplete(habit) {
  if (habit.dailyGoal === 1) return true;
}

export function isPartialComplete(habit) {
  if (habit.dailyGoal === 1) return true;
}

/**
 *
 * @param {array} habitTrack
 * @returns {number} count of partially completed habits
 */
export function calculatePartiallyCompletedHabitCount(habitTrack) {
  //write reducer function to count where partial completed is true
  let result = habitTrack.reduce(
    (acc, habit) => {
      if (habit.isPartialComplete) {
        acc.count = acc.count + 1;
      }
      return acc;
    },
    {
      count: 0,
    }
  );
  return result;
}
/**
 *
 * @param {array} habitTrack
 * @returns {object} count of fully completed habits
 */
export function calculateFullyCompletedHabitCount(habitTrack) {
  let result = habitTrack.reduce(
    (acc, habit) => {
      if (habit.isFullyComplete) {
        acc.count = acc.count + 1;
      }
      return acc;
    },
    {
      count: 0,
    }
  );
  return result;
}

export function calculateHabitStrength(habitTrack) {
  // calculate past 66 day date from current day
  // then count how many times habit partially performed since last 66 days
  // percentage is = (count / 66 ) * 100
}
