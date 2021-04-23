/**
 *  Utilities methods
 */

//Dependencies
import { startOfWeek, endOfWeek } from "date-fns";
import habitService from "../services/habitService";

// fetch data from habit server
export function fetchHabitData() {
  new Promise(async (resolve, reject) => {
    try {
      // perform api request
      let habits = await habitService.getHabits();
      resolve(habits);
    } catch (err) {
      reject(null);
    }

    //  return data;
  });
}

/**
 * @requires: habits object
 * @returns: categories array or error string
 */
export function extractCategories(habitObject) {
  // if passed argument is of type object then reduce categories else return error msg
  if (typeof habitObject === "object") {
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
  } else {
    return "passed habit object is not a object";
  }
}

/**
 * @requires: habits object
 * @returns: habit restructure array
 */
export function restructureHabits(habitObject) {
  // if passed argument is of type object then map habit by categories else return error msg
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
