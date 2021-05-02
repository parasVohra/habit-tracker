import { createContext, useReducer } from "react";
import Reducer from "../reducer/reducer";
import {
  getTodayDate,
  getWeekStartDate,
  getWeekEndDate,
  fetchHabitData,
  extractHabitNames,
  extractCategories,
} from "../utilities/utilitiesMethods";

import habitService from "../services/habitService";
console.log("*************************In store");

let habits = [];
let habitList = [];
let category = [];

const TODAY_DATE = getTodayDate();
const CURRENT_WEEK_START_DATE = getWeekStartDate();
const CURRENT_WEEK_END_DATE = getWeekEndDate();

function* fetchAndRestructureData() {
  yield habitService.getHabits();
}

const gen = fetchAndRestructureData();
const futureData = gen.next().value;
console.log(futureData);
futureData.then((value) => {
  console.log(value.data);
  habits = value.data;
  habitList = extractHabitNames(habits);
  category = extractCategories(habits);

  console.log(habitList);
});

const initialState = {
  habits: habits || [],
  category: category || [],
  habitsNameList: habitList || [],
  habitRestructure: {},
  habitStatus: [],
  error: [],
  currentDate: TODAY_DATE,
  weekStartDate: CURRENT_WEEK_START_DATE,
  weekEndDate: CURRENT_WEEK_END_DATE,
};

const Store = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);
  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
};

export const Context = createContext(initialState);
export default Store;
