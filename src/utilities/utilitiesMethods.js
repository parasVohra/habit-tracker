/**
 *  Utilities methods
 */

//Dependencies
import { startOfWeek, endOfWeek } from "date-fns";
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
  console.log(date);
  return Promise.resolve(date);
}

// get start of week from date fns
export function getWeekStartDate(date = new Date()) {
  console.log(date);
  let weekStartDate = startOfWeek(date);
  console.log(weekStartDate);
  return weekStartDate;
}

// get end of week from date fns
export function getWeekEndDate(date = new Date()) {
  let weekEndDate = endOfWeek(date);

  return weekEndDate;
}
