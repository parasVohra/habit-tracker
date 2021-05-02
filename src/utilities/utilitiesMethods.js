/**
 *  Utilities methods
 */

//Dependencies
import { startOfWeek, endOfWeek } from "date-fns";
import habitService from "../services/habitService";

console.log("*************************In Utilities");

// fetch data from habit server
export function fetchHabitData() {
  let habits = habitService.getHabits();
  Promise.all([habits]).then((x) => {
    return x[0].data;
  });
}

/**
 * @requires: habits object
 * @returns: categories array or error string
 */
export function extractCategories(habitObject) {
  // if passed argument is of type object then reduce categories else return error msg

  let uniqueCategories = {};

  // reduce categories from habit object
  let categoryArray = habitObject.reduce((categories, habits) => {
    if (!uniqueCategories.hasOwnProperty(habits.category)) {
      categories.push(habits.category);
    }
    uniqueCategories[habits.category] = "";
    return categories;
  }, []);

  return categoryArray;
}

/**
 *
 * @param {*} habitObject
 * @returns habitsNameList
 */
export function extractHabitNames(habitObject) {
  console.log(habitObject);
  return habitObject.map((habit) => {
    return habit.habitName;
  }, []);
}

//etchHabitData();

/**
 * @requires: habits object
 * @returns: habit restructure array
 */
export function restructureHabits(habitObject) {
  // if passed argument is of type object then map habit by categories else return error msg
  let uniqueCategories = {};

  // reduce categories from habit object
  let categoryArray = habitObject.reduce((categories, habits) => {
    if (!uniqueCategories.hasOwnProperty(habits.category)) {
      categories.push(habits.category);
    }
    uniqueCategories[habits.category] = "";
    return categories;
  }, []);

  return categoryArray;
}

export function getTodayDate() {
  return new Date();
}

// get start of week from date fns
export function getWeekStartDate() {
  let weekStartDate = startOfWeek(new Date());
  return weekStartDate;
}

// get end of week from date fns
export function getWeekEndDate() {
  let weekEndDate = endOfWeek(new Date());
  return weekEndDate;
}
